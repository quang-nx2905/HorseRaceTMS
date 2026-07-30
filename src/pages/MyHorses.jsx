import { useState, useEffect } from "react";
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
    CheckCircle,
    User,
    ChevronDown
} from "lucide-react";
import { useRef } from "react";

import HorseDetailsModal from "../components/horses/HorseDetailsModal";
import CreateHorseModal from "../components/horses/CreateHorseModal";
import EditHorseModal from "../components/horses/EditHorseModal";
import ConfirmModal from "../components/common/ConfirmModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { userApi } from "../api/userApi";

const healthConfig = {
    Excellent: { color: "bg-emerald-100 text-emerald-700 ring-emerald-200",  dot: "bg-emerald-500" },
    Good:      { color: "bg-blue-100 text-blue-700 ring-blue-200",           dot: "bg-blue-500"    },
    Fair:      { color: "bg-yellow-100 text-yellow-700 ring-yellow-200",     dot: "bg-yellow-500"  },
    Poor:      { color: "bg-red-100 text-red-600 ring-red-200",              dot: "bg-red-500"     },
};

const statusConfig = {
    Pending:  { color: "bg-orange-100 text-orange-700 ring-orange-200", icon: "🕒" },
    Approved: { color: "bg-emerald-100 text-emerald-700 ring-emerald-200", icon: "✅" },
    Rejected: { color: "bg-red-100 text-red-600 ring-red-200", icon: "❌" },
    Suspended: { color: "bg-zinc-100 text-zinc-700 ring-zinc-300", icon: "🚫" },
    Retired: { color: "bg-slate-100 text-slate-600 ring-slate-300", icon: "💤" },
};

const breedColors = {
    Arabian:      "from-amber-400 to-orange-500",
    Thoroughbred: "from-blue-400 to-indigo-500",
    Mustang:      "from-violet-400 to-purple-500",
    Quarter:      "from-emerald-400 to-teal-500",
    Appaloosa:    "from-rose-400 to-pink-500",
};

function HorseCard({ horse, onView, onEdit, onRetire, onReinstate }) {
    const health  = healthConfig[horse.health]  || healthConfig.Fair;
    const gradient = breedColors[horse.breed]   || "from-zinc-400 to-zinc-600";
    const status = statusConfig[horse.status] || statusConfig.Pending;

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

            {/* Card top banner */}
            <div className={`relative aspect-[3/2] overflow-hidden ${!horse.imageUrl ? "bg-gradient-to-br " + gradient : "bg-zinc-900"}`}>
                {horse.imageUrl ? (
                    <>
                        <img src={horse.imageUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl" />
                        <img src={horse.imageUrl} alt={horse.name} className="relative h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]" />
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <GanttChartSquare size={48} className="text-white/50" />
                        </div>
                    </>
                )}
            </div>

            {/* Card body */}
            <div className="pt-5 px-6 pb-5">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="font-black text-zinc-900 text-lg leading-tight">
                            {horse.name}
                        </h3>
                        <p className="text-zinc-400 text-sm mt-0.5">{horse.breed}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 items-end">
                        <span className={`flex items-center justify-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md ring-1 ${status.color}`}>
                            {status.icon} {horse.status || "Pending"}
                        </span>
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${health.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${health.dot}`} />
                            {horse.health}
                        </span>
                    </div>
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
                    {horse.status !== "Retired" && (
                        <button
                            onClick={() => onEdit(horse)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-all text-sm font-semibold"
                        >
                            <Pencil size={14} /> Edit
                        </button>
                    )}
                    {horse.status === "Approved" && (
                        <button
                            onClick={() => onRetire(horse)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all text-sm font-semibold"
                        >
                            <Trash2 size={14} /> Retire
                        </button>
                    )}
                    {horse.status === "Retired" && (
                        <button
                            onClick={() => onReinstate(horse)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all text-sm font-semibold"
                        >
                            <CheckCircle size={14} /> Ready
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}

function MyHorses() {
    const { user } = useAuth();
    const [search,      setSearch]      = useState("");
    const [filterHealth, setFilterHealth] = useState("All");
    const [openDetails, setOpenDetails] = useState(false);
    const [openCreate,  setOpenCreate]  = useState(false);
    const [openEdit,    setOpenEdit]    = useState(false);
    const [openDelete,  setOpenDelete]  = useState(false); // Retire
    const [openReinstate, setOpenReinstate] = useState(false);
    const [selectedHorse, setSelectedHorse] = useState(null);

    const isAdmin = user?.role === "Admin";
    const [owners, setOwners] = useState([]);
    const [selectedOwnerId, setSelectedOwnerId] = useState("");
    const [ownerSearch, setOwnerSearch] = useState("");
    const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const [horses, setHorses] = useState([]);

    // Fetch owners for Admin
    useEffect(() => {
        if (isAdmin) {
            const fetchOwners = async () => {
                try {
                    const data = await userApi.getUsers({ role: "HorseOwner", pageSize: 100 });
                    const items = data.items || [];
                    setOwners(items);
                    if (items.length > 0 && !selectedOwnerId) {
                        setSelectedOwnerId(items[0].id);
                    }
                } catch (error) {
                    console.error("Failed to fetch owners", error);
                }
            };
            fetchOwners();
        }
    }, [isAdmin]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOwnerDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchHorses = async () => {
            if (isAdmin && !selectedOwnerId) return;

            try {
                const ownerId = isAdmin ? selectedOwnerId : (user?.id || 4); // fallback to 4 since UserID 1 does not exist
                const response = await axios.get(`https://localhost:7179/api/horses/owner/${ownerId}`);
                if (response.data?.data) {
                    const mappedHorses = response.data.data.map(h => {
                        const latestVer = h.horseVerifications && h.horseVerifications.length > 0 
                            ? h.horseVerifications[h.horseVerifications.length - 1] 
                            : null;
                        
                        return {
                            id: h.horseId,
                            name: h.horseName,
                            breed: h.breed || "Unknown",
                            age: h.age || 0,
                            weight: h.weight,
                            gender: h.gender,
                            health: h.healthStatus || "Fair",
                            wins: 0,
                            status: h.status || "Pending",
                            imageUrl: h.imageUrl,
                            inspectionUrl: latestVer ? latestVer.inspectionUrl : "",
                            healthCertUrl: latestVer ? latestVer.healthCertUrl : ""
                        };
                    });
                    setHorses(mappedHorses);
                }
            } catch (error) {
                console.error("Failed to fetch horses:", error);
                toast.error("Failed to load your horses.");
            }
        };

        fetchHorses();
    }, [user, isAdmin, selectedOwnerId]);

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

    const handleCreateHorse = async (horse) => {
        try {
            const payload = {
                OwnerId: horse.ownerId || user?.id || 4, // fallback to 4 since UserID 1 does not exist in Owner_Profiles
                HorseName: horse.name,
                Breed: horse.breed,
                Age: horse.age,
                Weight: horse.weight || 450,
                Gender: horse.gender || "Stallion",
                HealthStatus: horse.health,
                ImageUrl: horse.imageUrl || "",
                InspectionUrl: horse.inspectionUrl || "",
                HealthCertUrl: horse.healthCertUrl || ""
            };
            
            const response = await axios.post("https://localhost:7179/api/horses/register", payload);
            
            if (response.data?.data) {
                const newHorse = {
                    ...horse,
                    id: response.data.data.horseId,
                    status: response.data.data.status || "Pending",
                    inspectionUrl: horse.inspectionUrl,
                    healthCertUrl: horse.healthCertUrl
                };
                setHorses((prev) => [newHorse, ...prev]);
                toast.success("Horse registered successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to register horse.");
        }
    };

    const handleUpdateHorse = async (updated) => {
        try {
            const payload = {
                HorseName: updated.name,
                Breed: updated.breed,
                Age: updated.age,
                Weight: updated.weight,
                Gender: updated.gender,
                HealthStatus: updated.health,
                ImageUrl: updated.imageUrl,
                Status: updated.status
            };
            
            if (isAdmin) {
                // Since there is no direct PUT /api/horses/{id} endpoint, 
                // Admin updates by submitting a request and auto-approving it.
                await axios.post(`https://localhost:7179/api/horses/${updated.id}/update-request`, payload);
                await axios.put(`https://localhost:7179/api/horses/${updated.id}/approve-update`, {
                    status: "Update_Approved",
                    notes: "Auto-approved by admin",
                    verifiedBy: user?.id ? parseInt(user.id) : 0
                });
                setHorses((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
                toast.success("Horse updated successfully!");
            } else {
                await axios.post(`https://localhost:7179/api/horses/${updated.id}/update-request`, payload);
                toast.success("Update requested! Pending admin approval.");
            }
        } catch (error) {
            console.error("Failed to request/update:", error);
            toast.error(isAdmin ? "Failed to update horse." : "Failed to submit update request.");
        }
    };

    const handleConfirmRetire = async () => {
        if (!selectedHorse) return;
        await handleUpdateHorse({ ...selectedHorse, status: "Retired" });
        setOpenDelete(false);
        setSelectedHorse(null);
    };

    const handleConfirmReinstate = async () => {
        if (!selectedHorse) return;
        await handleUpdateHorse({ ...selectedHorse, status: "Approved" });
        setOpenReinstate(false);
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
                    <h1 className="text-5xl font-black text-zinc-900">{isAdmin ? "Owner's Horses" : "My Horses"}</h1>
                    <p className="text-zinc-500 mt-2 text-base">
                        {isAdmin ? "Manage horses for the selected owner" : "Manage and track your registered horses"}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {isAdmin && (() => {
                        const filteredOwners = owners.filter(o => 
                            (o.name || o.fullName || "").toLowerCase().includes(ownerSearch.toLowerCase()) ||
                            (o.email || "").toLowerCase().includes(ownerSearch.toLowerCase())
                        );
                        const selectedOwner = owners.find(o => o.id == selectedOwnerId);

                        return (
                            <div className="relative min-w-[280px]" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setShowOwnerDropdown(!showOwnerDropdown)}
                                    className="w-full flex items-center justify-between bg-white border border-zinc-200 rounded-2xl pl-11 pr-5 py-3.5 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium hover:shadow-sm"
                                >
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <span className={`truncate text-left ${selectedOwner ? "text-zinc-800" : "text-zinc-400"}`}>
                                        {selectedOwner ? `${selectedOwner.name || selectedOwner.fullName || "No Name"} (${selectedOwner.email})` : "Select Owner"}
                                    </span>
                                    <ChevronDown size={18} className="text-zinc-400 flex-shrink-0" />
                                </button>

                                {/* Dropdown Menu */}
                                {showOwnerDropdown && (
                                    <div className="absolute z-50 w-full mt-2 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[300px]">
                                        <div className="p-3 border-b border-zinc-100 bg-white sticky top-0">
                                            <div className="relative">
                                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Search by name or email..." 
                                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-yellow-400 transition-all"
                                                    value={ownerSearch}
                                                    onChange={e => setOwnerSearch(e.target.value)}
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                        <div className="overflow-y-auto">
                                            {filteredOwners.length === 0 ? (
                                                <div className="p-4 text-center text-zinc-500 text-sm">No owners found.</div>
                                            ) : (
                                                filteredOwners.map(o => (
                                                    <div 
                                                        key={o.id}
                                                        onClick={() => {
                                                            setSelectedOwnerId(o.id);
                                                            setShowOwnerDropdown(false);
                                                            setOwnerSearch("");
                                                        }}
                                                        className={`px-4 py-3 cursor-pointer hover:bg-zinc-50 flex flex-col border-b border-zinc-50 last:border-0 ${selectedOwnerId == o.id ? 'bg-yellow-50/50' : ''}`}
                                                    >
                                                        <span className="font-semibold text-zinc-800 text-sm">{o.name || o.fullName || "No Name"}</span>
                                                        <span className="text-zinc-500 text-xs">{o.email}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    <button
                        onClick={() => setOpenCreate(true)}
                        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Add Horse
                    </button>
                </div>
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
                            onRetire={(h) => { setSelectedHorse(h); setOpenDelete(true); }}
                            onReinstate={(h) => { setSelectedHorse(h); setOpenReinstate(true); }}
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
                isAdmin={false}
            />
            <ConfirmModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmRetire}
                title="Retire Horse"
                message="Are you sure you want to retire this horse? It will no longer participate in races."
                confirmLabel="Retire"
            />
            <ConfirmModal
                open={openReinstate}
                onClose={() => setOpenReinstate(false)}
                onConfirm={handleConfirmReinstate}
                title="Ready Horse"
                message="Are you sure you want to change this horse's status back to Approved?"
                confirmLabel="Yes, it's ready!"
            />

        </div>
    );
}

export default MyHorses;
