import { useState } from "react";
import {
    Plus,
    Search,
    Trophy,
    Users,
    Star,
    Eye,
    Pencil,
    Trash2,
    MapPin,
    TrendingUp,
    Medal,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import JockeyDetailsModal from "../components/jockeys/JockeyDetailsModal";
import CreateJockeyModal  from "../components/jockeys/CreateJockeyModal";
import EditJockeyModal    from "../components/jockeys/EditJockeyModal";
import ConfirmModal       from "../components/common/ConfirmModal";
import toast from "react-hot-toast";

// ── Config ──────────────────────────────────────────────
const statusConfig = {
    Elite: {
        style: "bg-yellow-100 text-yellow-800 ring-yellow-300",
        dot:   "bg-yellow-500",
    },
    Professional: {
        style: "bg-blue-100 text-blue-700 ring-blue-300",
        dot:   "bg-blue-500",
    },
    "Rising Star": {
        style: "bg-emerald-100 text-emerald-700 ring-emerald-300",
        dot:   "bg-emerald-500",
    },
    Amateur: {
        style: "bg-zinc-100 text-zinc-600 ring-zinc-300",
        dot:   "bg-zinc-400",
    },
};

const avatarColors = [
    "from-yellow-400 to-amber-500",
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-purple-500",
    "from-rose-400 to-pink-500",
    "from-orange-400 to-red-500",
    "from-cyan-400 to-sky-500",
    "from-lime-400 to-green-500",
];

const countryFlags = {
    "United Kingdom": "🇬🇧",
    "United States":  "🇺🇸",
    Japan:            "🇯🇵",
    Spain:            "🇪🇸",
    France:           "🇫🇷",
    Australia:        "🇦🇺",
    Brazil:           "🇧🇷",
    Germany:          "🇩🇪",
};

// ── JockeyCard ───────────────────────────────────────────
function JockeyCard({ jockey, index, onView, onEdit, onDelete }) {
    const status  = statusConfig[jockey.status] || statusConfig.Amateur;
    const gradient = avatarColors[index % avatarColors.length];
    const flag     = countryFlags[jockey.country] || "🌐";
    const maxWins  = 60;
    const winPct   = Math.min((jockey.wins / maxWins) * 100, 100);

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5">

            {/* Top row: avatar + status */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black shadow-sm flex-shrink-0`}>
                        {jockey.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-black text-zinc-900 text-base leading-tight">
                            {jockey.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-zinc-400 text-xs">
                            <MapPin size={11} />
                            <span>{flag} {jockey.country}</span>
                        </div>
                    </div>
                </div>

                <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${status.style}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {jockey.status}
                </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-50 rounded-2xl p-3 text-center">
                    <p className="text-2xl font-black text-yellow-500">{jockey.wins}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 font-medium">Total Wins</p>
                </div>
                <div className="bg-zinc-50 rounded-2xl p-3 text-center">
                    <p className="text-2xl font-black text-zinc-900">{jockey.experience}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 font-medium">Experience</p>
                </div>
            </div>

            {/* Win rate bar */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-zinc-400 font-medium">Win Rate</span>
                    <span className="text-xs font-bold text-zinc-700">{winPct.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${winPct}%` }}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => onView(jockey)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition-all text-xs font-bold"
                >
                    <Eye size={13} /> Profile
                </button>
                <button
                    onClick={() => onEdit(jockey)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 transition-all text-xs font-bold"
                >
                    <Pencil size={13} /> Edit
                </button>
                <button
                    onClick={() => onDelete(jockey)}
                    className="w-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                >
                    <Trash2 size={14} />
                </button>
            </div>

        </div>
    );
}

// ── Main Page ────────────────────────────────────────────
function Jockeys() {
    const [search,      setSearch]      = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [openDetails, setOpenDetails] = useState(false);
    const [openCreate,  setOpenCreate]  = useState(false);
    const [openEdit,    setOpenEdit]    = useState(false);
    const [openDelete,  setOpenDelete]  = useState(false);
    const [selectedJockey, setSelectedJockey] = useState(null);

    const itemsPerPage = 8;

    const [jockeys, setJockeys] = useState([
        { id: 1, name: "James Carter",     country: "United Kingdom", wins: 48, experience: "8 Years",  status: "Elite"        },
        { id: 2, name: "Ryan Cooper",       country: "United States",  wins: 36, experience: "5 Years",  status: "Professional" },
        { id: 3, name: "Akira Sato",        country: "Japan",          wins: 52, experience: "10 Years", status: "Elite"        },
        { id: 4, name: "Lucas Fernandez",   country: "Spain",          wins: 21, experience: "3 Years",  status: "Rising Star"  },
        { id: 5, name: "Pierre Dupont",     country: "France",         wins: 44, experience: "7 Years",  status: "Professional" },
        { id: 6, name: "Tom Bradley",       country: "Australia",      wins: 58, experience: "12 Years", status: "Elite"        },
        { id: 7, name: "Carlos Mendez",     country: "Brazil",         wins: 15, experience: "2 Years",  status: "Rising Star"  },
        { id: 8, name: "Max Schneider",     country: "Germany",        wins: 29, experience: "4 Years",  status: "Professional" },
    ]);

    const statuses = ["All", "Elite", "Professional", "Rising Star", "Amateur"];

    const filtered = jockeys.filter((j) => {
        const matchSearch  = j.name.toLowerCase().includes(search.toLowerCase()) ||
                             j.country.toLowerCase().includes(search.toLowerCase());
        const matchStatus  = filterStatus === "All" || j.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalPages       = Math.ceil(filtered.length / itemsPerPage);
    const paginated        = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalWins        = jockeys.reduce((s, j) => s + j.wins, 0);
    const eliteCount       = jockeys.filter((j) => j.status === "Elite").length;
    const topJockey        = [...jockeys].sort((a, b) => b.wins - a.wins)[0];

    const handleCreateJockey = (jockey) => {
        setJockeys((prev) => [jockey, ...prev]);
        toast.success("Jockey created successfully!");
    };

    const handleUpdateJockey = (updated) => {
        setJockeys((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
        toast.success("Jockey updated successfully!");
    };

    const handleDeleteJockey = () => {
        setJockeys((prev) => prev.filter((j) => j.id !== selectedJockey.id));
        setOpenDelete(false);
        toast.success("Jockey deleted successfully!");
    };

    return (
        <div className="space-y-7">

            {/* ── HEADER ── */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-2">
                        Management
                    </p>
                    <h1 className="text-5xl font-black text-zinc-900">Jockeys</h1>
                    <p className="text-zinc-500 mt-2 text-base">
                        Professional jockey management and performance overview
                    </p>
                </div>
                <button
                    onClick={() => setOpenCreate(true)}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add Jockey
                </button>
            </div>

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Jockeys", value: jockeys.length,  icon: Users,      color: "bg-yellow-400",  iconColor: "text-yellow-900" },
                    { label: "Total Wins",    value: totalWins,        icon: Trophy,     color: "bg-emerald-400", iconColor: "text-emerald-900" },
                    { label: "Elite Jockeys", value: eliteCount,       icon: Star,       color: "bg-violet-400",  iconColor: "text-violet-900" },
                ].map(({ label, value, icon: Icon, color, iconColor }) => (
                    <div key={label} className="bg-white border border-zinc-200 rounded-2xl p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={20} className={iconColor} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-zinc-900">{value}</p>
                            <p className="text-xs text-zinc-400 font-medium">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── TOP JOCKEY BANNER ── */}
            {topJockey && (
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-6 flex items-center justify-between overflow-hidden relative">
                    <div className="absolute right-0 top-0 w-64 h-full opacity-5"
                        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    />
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-2xl font-black text-black">
                            {topJockey.name.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Medal size={14} className="text-yellow-400" />
                                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Top Performer</span>
                            </div>
                            <p className="text-white font-black text-xl">{topJockey.name}</p>
                            <p className="text-zinc-400 text-sm">{countryFlags[topJockey.country]} {topJockey.country} · {topJockey.experience}</p>
                        </div>
                    </div>
                    <div className="text-right relative z-10">
                        <p className="text-yellow-400 text-4xl font-black">{topJockey.wins}</p>
                        <p className="text-zinc-400 text-sm">Total Wins</p>
                    </div>
                </div>
            )}

            {/* ── FILTERS ── */}
            <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[240px]">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Search by name or country..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl outline-none text-sm focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {statuses.map((s) => (
                        <button
                            key={s}
                            onClick={() => { setFilterStatus(s); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                filterStatus === s
                                    ? "bg-zinc-900 text-white"
                                    : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Result count */}
            <p className="text-sm text-zinc-400 font-medium">
                Showing <span className="text-zinc-900 font-bold">{paginated.length}</span> of{" "}
                <span className="text-zinc-900 font-bold">{filtered.length}</span> jockeys
            </p>

            {/* ── GRID ── */}
            {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                        <Users size={28} className="text-zinc-400" />
                    </div>
                    <p className="font-bold text-zinc-700">No jockeys found</p>
                    <p className="text-zinc-400 text-sm mt-1">Try adjusting your search or filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {paginated.map((jockey, idx) => (
                        <JockeyCard
                            key={jockey.id ?? idx}
                            jockey={jockey}
                            index={idx}
                            onView={(j)   => { setSelectedJockey(j); setOpenDetails(true); }}
                            onEdit={(j)   => { setSelectedJockey(j); setOpenEdit(true);    }}
                            onDelete={(j) => { setSelectedJockey(j); setOpenDelete(true);  }}
                        />
                    ))}
                </div>
            )}

            {/* ── PAGINATION ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center disabled:opacity-40 hover:bg-zinc-100 transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                                currentPage === page
                                    ? "bg-yellow-400 text-black"
                                    : "border border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center disabled:opacity-40 hover:bg-zinc-100 transition-all"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            {/* ── MODALS ── */}
            <JockeyDetailsModal
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                jockey={selectedJockey}
            />
            <CreateJockeyModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreateJockey}
            />
            <EditJockeyModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                jockey={selectedJockey}
                onUpdate={handleUpdateJockey}
            />
            <ConfirmModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleDeleteJockey}
                title="Delete Jockey"
                message="Are you sure you want to delete this jockey?"
            />

        </div>
    );
}

export default Jockeys;