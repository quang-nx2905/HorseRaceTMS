import { useState } from "react";
import {
    Eye,
    Pencil,
    Trash2,
    Plus,
    Search,
    GanttChartSquare,
    Trophy,
    Activity,
    Filter,
} from "lucide-react";

import HorseDetailsModal from "../components/horses/HorseDetailsModal";
import CreateHorseModal from "../components/horses/CreateHorseModal";
import EditHorseModal from "../components/horses/EditHorseModal";
import ConfirmModal from "../components/common/ConfirmModal";
import toast from "react-hot-toast";

const healthConfig = {
    Excellent: { color: "bg-emerald-100 text-emerald-700 ring-emerald-200",  dot: "bg-emerald-500" },
    Good:      { color: "bg-blue-100 text-blue-700 ring-blue-200",           dot: "bg-blue-500"    },
    Fair:      { color: "bg-yellow-100 text-yellow-700 ring-yellow-200",     dot: "bg-yellow-500"  },
    Poor:      { color: "bg-red-100 text-red-600 ring-red-200",              dot: "bg-red-500"     },
};

const breedColors = {
    Arabian:      "from-amber-400 to-orange-500",
    Thoroughbred: "from-blue-400 to-indigo-500",
    Mustang:      "from-violet-400 to-purple-500",
    Quarter:      "from-emerald-400 to-teal-500",
    Appaloosa:    "from-rose-400 to-pink-500",
};

function HorseCard({ horse, onView, onEdit, onDelete }) {
    const health  = healthConfig[horse.health]  || healthConfig.Fair;
    const gradient = breedColors[horse.breed]   || "from-zinc-400 to-zinc-600";

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

            {/* Card top banner */}
            <div className={`h-24 bg-gradient-to-br ${gradient} relative`}>
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                />
                {/* Avatar */}
                <div className="absolute -bottom-7 left-6 w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center border-2 border-white">
                    <GanttChartSquare size={24} className="text-zinc-700" />
                </div>
            </div>

            {/* Card body */}
            <div className="pt-10 px-6 pb-5">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="font-black text-zinc-900 text-lg leading-tight">
                            {horse.name}
                        </h3>
                        <p className="text-zinc-400 text-sm mt-0.5">{horse.breed}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${health.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${health.dot}`} />
                        {horse.health}
                    </span>
                </div>

                {/* Stats row */}
                <div className="flex gap-4 my-4 py-4 border-t border-b border-zinc-100">
                    <div className="flex-1 text-center">
                        <p className="text-2xl font-black text-zinc-900">{horse.age}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Age (yrs)</p>
                    </div>
                    <div className="w-px bg-zinc-100" />
                    <div className="flex-1 text-center">
                        <p className="text-2xl font-black text-yellow-500">{horse.wins}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Total Wins</p>
                    </div>
                    <div className="w-px bg-zinc-100" />
                    <div className="flex-1 text-center">
                        <p className="text-2xl font-black text-zinc-900">#{horse.id}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">ID</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onView(horse)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all text-sm font-semibold"
                    >
                        <Eye size={14} /> View
                    </button>
                    <button
                        onClick={() => onEdit(horse)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-all text-sm font-semibold"
                    >
                        <Pencil size={14} /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(horse)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all text-sm font-semibold"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            </div>

        </div>
    );
}

function Horses() {
    const [search,      setSearch]      = useState("");
    const [filterHealth, setFilterHealth] = useState("All");
    const [openDetails, setOpenDetails] = useState(false);
    const [openCreate,  setOpenCreate]  = useState(false);
    const [openEdit,    setOpenEdit]    = useState(false);
    const [openDelete,  setOpenDelete]  = useState(false);
    const [selectedHorse, setSelectedHorse] = useState(null);

    const [horses, setHorses] = useState([
        { id: 1, name: "Thunder Bolt",   breed: "Arabian",      age: 4, health: "Excellent", wins: 18 },
        { id: 2, name: "Golden Sprint",  breed: "Thoroughbred", age: 5, health: "Good",      wins: 12 },
        { id: 3, name: "Night Fury",     breed: "Mustang",      age: 6, health: "Poor",      wins: 8  },
        { id: 4, name: "Silver Arrow",   breed: "Arabian",      age: 3, health: "Excellent", wins: 22 },
        { id: 5, name: "Storm Chaser",   breed: "Quarter",      age: 7, health: "Fair",      wins: 5  },
        { id: 6, name: "Blaze Runner",   breed: "Thoroughbred", age: 4, health: "Good",      wins: 15 },
    ]);

    const healthFilters = ["All", "Excellent", "Good", "Fair", "Poor"];

    const filtered = horses.filter((h) => {
        const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
                            h.breed.toLowerCase().includes(search.toLowerCase());
        const matchHealth = filterHealth === "All" || h.health === filterHealth;
        return matchSearch && matchHealth;
    });

    // Summary stats
    const totalWins     = horses.reduce((s, h) => s + h.wins, 0);
    const excellentCount = horses.filter((h) => h.health === "Excellent").length;

    const handleCreateHorse = (horse) => {
        setHorses((prev) => [horse, ...prev]);
        toast.success("Horse created successfully!");
    };

    const handleUpdateHorse = (updated) => {
        setHorses((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
        toast.success("Horse updated successfully!");
    };

    const handleDeleteHorse = (id) => {
        setHorses((prev) => prev.filter((h) => h.id !== id));
        toast.success("Horse deleted successfully!");
    };

    const handleConfirmDelete = () => {
        if (!selectedHorse) return;
        handleDeleteHorse(selectedHorse.id);
        setOpenDelete(false);
        setSelectedHorse(null);
    };

    return (
        <div className="space-y-7">

            {/* ── HEADER ── */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-2">
                        Management
                    </p>
                    <h1 className="text-5xl font-black text-zinc-900">Horses</h1>
                    <p className="text-zinc-500 mt-2 text-base">
                        Manage and track all registered racing horses
                    </p>
                </div>

                <button
                    onClick={() => setOpenCreate(true)}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add Horse
                </button>
            </div>

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Horses", value: horses.length, icon: GanttChartSquare, color: "bg-yellow-400", iconColor: "text-yellow-900" },
                    { label: "Total Wins",   value: totalWins,      icon: Trophy,           color: "bg-emerald-400", iconColor: "text-emerald-900" },
                    { label: "Top Health",   value: excellentCount, icon: Activity,         color: "bg-blue-400",   iconColor: "text-blue-900"    },
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

            {/* ── FILTERS ── */}
            <div className="flex items-center gap-4 flex-wrap">

                {/* Search */}
                <div className="relative flex-1 min-w-[240px]">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or breed..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl outline-none text-sm focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all"
                    />
                </div>

                {/* Health filter chips */}
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-zinc-400" />
                    {healthFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilterHealth(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                filterHealth === f
                                    ? "bg-zinc-900 text-white"
                                    : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── COUNT ── */}
            <p className="text-sm text-zinc-400 font-medium">
                Showing <span className="text-zinc-900 font-bold">{filtered.length}</span> of{" "}
                <span className="text-zinc-900 font-bold">{horses.length}</span> horses
            </p>

            {/* ── CARD GRID ── */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                        <GanttChartSquare size={28} className="text-zinc-400" />
                    </div>
                    <p className="font-bold text-zinc-700">No horses found</p>
                    <p className="text-zinc-400 text-sm mt-1">Try adjusting your search or filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((horse) => (
                        <HorseCard
                            key={horse.id}
                            horse={horse}
                            onView={(h) => { setSelectedHorse(h); setOpenDetails(true); }}
                            onEdit={(h) => { setSelectedHorse(h); setOpenEdit(true);    }}
                            onDelete={(h) => { setSelectedHorse(h); setOpenDelete(true); }}
                        />
                    ))}
                </div>
            )}

            {/* ── MODALS ── */}
            <HorseDetailsModal
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                horse={selectedHorse}
            />
            <CreateHorseModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreateHorse}
            />
            <EditHorseModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                horse={selectedHorse}
                onSave={handleUpdateHorse}
            />
            <ConfirmModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Horse"
                message="This action cannot be undone."
            />

        </div>
    );
}

export default Horses;