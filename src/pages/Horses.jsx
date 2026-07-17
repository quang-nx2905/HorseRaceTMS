import { useState, useEffect } from "react";
import api from "../api/axios";
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
    ClipboardList,
    Ban,
    CheckCircle,
    FileEdit
} from "lucide-react";

import HorseDetailsModal from "../components/horses/HorseDetailsModal";
import PendingHorsesModal from "../components/horses/PendingHorsesModal";
import ReviewUpdateModal from "../components/horses/ReviewUpdateModal";
import EditHorseModal from "../components/horses/EditHorseModal";
import ConfirmModal from "../components/common/ConfirmModal";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const healthConfig = {
    Excellent: { color: "bg-emerald-100 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
    Good: { color: "bg-blue-100 text-blue-700 ring-blue-200", dot: "bg-blue-500" },
    Fair: { color: "bg-yellow-100 text-yellow-700 ring-yellow-200", dot: "bg-yellow-500" },
    Poor: { color: "bg-red-100 text-red-600 ring-red-200", dot: "bg-red-500" },
};

const statusConfig = {
    Pending:  { color: "bg-orange-100 text-orange-700 ring-orange-200", icon: "🕒" },
    Approved: { color: "bg-emerald-100 text-emerald-700 ring-emerald-200", icon: "✅" },
    Rejected: { color: "bg-red-100 text-red-600 ring-red-200", icon: "❌" },
    Suspended: { color: "bg-zinc-100 text-zinc-700 ring-zinc-300", icon: "🚫" },
    Retired: { color: "bg-slate-100 text-slate-600 ring-slate-300", icon: "💤" },
};

const breedColors = {
    Arabian: "from-amber-400 to-orange-500",
    Thoroughbred: "from-blue-400 to-indigo-500",
    Mustang: "from-violet-400 to-purple-500",
    Quarter: "from-emerald-400 to-teal-500",
    Appaloosa: "from-rose-400 to-pink-500",
};

function HorseCard({ horse, onView, onEdit, onDelete, onSuspend, onReinstate, isAdmin }) {
    const health = healthConfig[horse.health] || healthConfig.Fair;
    const gradient = breedColors[horse.breed] || "from-zinc-400 to-zinc-600";
    const status = statusConfig[horse.status] || statusConfig.Pending;

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

            {/* Card top banner */}
            <div className={`relative h-48 ${!horse.imageUrl ? "bg-gradient-to-br " + gradient : "bg-zinc-100"}`}>
                {horse.imageUrl ? (
                    <img src={horse.imageUrl} alt={horse.name} className="w-full h-full object-cover" />
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                        />
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
                        <p className="text-zinc-400 text-sm mt-0.5">{horse.breed} • {horse.ownerName || "Unknown Owner"}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 items-end">
                        {isAdmin && (
                            <span className={`flex items-center justify-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md ring-1 ${status.color}`}>
                                {status.icon} {horse.status || "Pending"}
                            </span>
                        )}
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${health.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${health.dot}`} />
                            {horse.health}
                        </span>
                    </div>
                </div>

                {/* Stats row */}
                <div className="flex gap-4 my-4 py-4 border-t border-b border-zinc-100">
                    <div className="flex-1 text-center">
                        <p className="text-2xl font-black text-zinc-900">#{horse.id}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">ID</p>
                    </div>
                    <div className="w-px bg-zinc-100" />
                    <div className="flex-1 text-center">
                        <p className="text-2xl font-black text-zinc-900">{horse.age}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Age (yrs)</p>
                    </div>
                    <div className="w-px bg-zinc-100" />
                    <div className="flex-1 text-center">
                        <p className="text-2xl font-black text-yellow-500">{horse.wins}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Total Wins</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onView(horse)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all text-sm font-semibold"
                    >
                        <Eye size={14} /> View
                    </button>
                    {isAdmin && horse.status === "Approved" && (
                        <>
                            <button
                                onClick={() => onEdit(horse)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-all text-xs font-semibold"
                            >
                                <Pencil size={14} /> Edit
                            </button>
                            <button
                                onClick={() => onSuspend(horse)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all text-xs font-semibold"
                            >
                                <Ban size={14} /> Suspend
                            </button>
                            <button
                                onClick={() => onDelete(horse)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all text-xs font-semibold"
                            >
                                <Trash2 size={14} /> Retire
                            </button>
                        </>
                    )}
                    {isAdmin && horse.status === "Suspended" && (
                        <>
                            <button
                                onClick={() => onReinstate(horse)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all text-xs font-semibold"
                            >
                                <CheckCircle size={14} /> Reinstate
                            </button>
                            <button
                                onClick={() => onDelete(horse)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all text-xs font-semibold"
                            >
                                <Trash2 size={14} /> Retire
                            </button>
                        </>
                    )}
                    {isAdmin && horse.status === "Retired" && (
                        <button
                            onClick={() => onReinstate(horse)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all text-xs font-semibold"
                        >
                            <CheckCircle size={14} /> Reinstate to Approved
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}

function Horses() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'Admin';
    const [search, setSearch] = useState("");
    const [filterHealth, setFilterHealth] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [openDetails, setOpenDetails] = useState(false);
    const [openPending, setOpenPending] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedHorse, setSelectedHorse] = useState(null);

    const [openPendingUpdates, setOpenPendingUpdates] = useState(false);
    const [openReviewUpdate, setOpenReviewUpdate] = useState(false);
    const [horseToReviewUpdate, setHorseToReviewUpdate] = useState(null);

    const [openSuspend, setOpenSuspend] = useState(false);
    const [horseToSuspend, setHorseToSuspend] = useState(null);

    const [openReinstate, setOpenReinstate] = useState(false);
    const [horseToReinstate, setHorseToReinstate] = useState(null);

    const [horses, setHorses] = useState([]);

    const fetchHorses = async () => {
        try {
            const response = await api.get("/horses");
            if (response.data && response.data.data) {
                const mappedHorses = response.data.data.map(h => {
                    const latestVer = h.horseVerifications && h.horseVerifications.length > 0
                        ? h.horseVerifications[h.horseVerifications.length - 1]
                        : null;
                    
                    let pendingUpdate = null;
                    if (latestVer && latestVer.result === "Update_Pending" && latestVer.notes) {
                        try {
                            pendingUpdate = JSON.parse(latestVer.notes);
                        } catch (e) { console.error("Error parsing update notes:", e); }
                    }

                    return {
                        id: h.horseId,
                        name: h.horseName,
                        breed: h.breed || "Unknown",
                        ownerName: h.ownerName,
                        age: h.age || 0,
                        weight: h.weight,
                        gender: h.gender,
                        health: h.healthStatus || "Fair",
                        wins: 0,
                        status: h.status || "Pending",
                        imageUrl: h.imageUrl,
                        inspectionUrl: latestVer ? latestVer.inspectionUrl : "",
                        healthCertUrl: latestVer ? latestVer.healthCertUrl : "",
                        pendingUpdate: pendingUpdate
                    };
                });
                setHorses(mappedHorses);
            }
        } catch (error) {
            console.error("Error fetching horses:", error);
            toast.error("Failed to load horses from server.");
        }
    };

    useEffect(() => {
        fetchHorses();
    }, []);

    const healthFilters = ["All", "Excellent", "Good", "Fair", "Poor"];

    const pendingHorses = horses.filter((h) => h.status === "Pending");
    const pendingUpdatesHorses = horses.filter((h) => h.pendingUpdate != null);
    const approvedHorses = isAdmin
        ? horses.filter((h) => h.status !== "Pending")
        : horses.filter((h) => h.status === "Approved");

    const filtered = approvedHorses.filter((h) => {
        const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
            h.breed.toLowerCase().includes(search.toLowerCase());
        const matchHealth = filterHealth === "All" || h.health === filterHealth;
        const matchStatus = isAdmin ? (filterStatus === "All" || h.status === filterStatus) : true;
        return matchSearch && matchHealth && matchStatus;
    });

    const totalWins = approvedHorses.reduce((s, h) => s + h.wins, 0);
    const excellentCount = approvedHorses.filter((h) => h.health === "Excellent").length;

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
            // Since there is no direct PUT /api/horses/{id} endpoint, 
            // Admin updates by submitting a request and auto-approving it.
            await api.post(`/horses/${updated.id}/update-request`, payload);
            await api.put(`/horses/${updated.id}/approve-update`, {
                status: "Update_Approved",
                notes: "Auto-approved by admin",
                verifiedBy: user?.id ? parseInt(user.id) : 0
            });
            setHorses((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
            toast.success("Horse updated successfully!");
        } catch (error) {
            console.error("Failed to update horse:", error);
            toast.error("Failed to update horse.");
        }
    };

    const handleDeleteHorse = (id) => {
        setHorses((prev) => prev.filter((h) => h.id !== id));
        toast.success("Horse deleted successfully!");
    };

    const handleConfirmDelete = async () => {
        if (!selectedHorse) return;
        try {
            await api.delete(`/horses/${selectedHorse.id}`);
            setHorses((prev) => prev.map((h) => h.id === selectedHorse.id ? { ...h, status: "Retired" } : h));
            toast.success("Horse retired successfully!");
        } catch (error) {
            console.error("Error retiring horse:", error);
            toast.error("Failed to retire horse");
        } finally {
            setOpenDelete(false);
            setSelectedHorse(null);
        }
    };

    const handleConfirmSuspend = async () => {
        if (!horseToSuspend) return;
        try {
            await api.put(`/horses/${horseToSuspend.id}/suspend`);
            setHorses((prev) => prev.map((h) => h.id === horseToSuspend.id ? { ...h, status: "Suspended" } : h));
            toast.success("Horse suspended successfully!");
        } catch (error) {
            console.error("Error suspending horse:", error);
            toast.error("Failed to suspend horse");
        } finally {
            setOpenSuspend(false);
            setHorseToSuspend(null);
        }
    };

    const handleConfirmReinstate = async () => {
        if (!horseToReinstate) return;
        try {
            await api.put(`/horses/${horseToReinstate.id}/reinstate`);
            setHorses((prev) => prev.map((h) => h.id === horseToReinstate.id ? { ...h, status: "Approved" } : h));
            toast.success("Horse reinstated successfully!");
        } catch (error) {
            console.error("Error reinstating horse:", error);
            toast.error("Failed to reinstate horse");
        } finally {
            setOpenReinstate(false);
            setHorseToReinstate(null);
        }
    };

    const handleVerifyHorse = async (horse, newStatus) => {
        console.log("verify payload:", {
            status: newStatus,
            notes: `Verified by Admin`,
            verifiedBy: user?.id ? parseInt(user.id) : 0
        });
        try {
            const response = await api.put(`/horses/${horse.id}/verify`, {
                status: newStatus,
                notes: `Verified by Admin`,
                verifiedBy: user?.id ? parseInt(user.id) : 0
            });
            if (response.data && response.data.data) {
                // Update local state immediately
                setHorses(prev => prev.map(h => h.id === horse.id ? { ...h, status: newStatus } : h));
                toast.success(`Horse ${newStatus === "Approved" ? "approved" : "rejected"} successfully!`);
                // Close both the details modal and the pending list modal
                setOpenDetails(false);
                setOpenPending(false);
                // Re-fetch to get accurate data from server
                fetchHorses();
            } else {
                // Response succeeded but no data returned - still treat as success
                setHorses(prev => prev.map(h => h.id === horse.id ? { ...h, status: newStatus } : h));
                toast.success(`Horse ${newStatus === "Approved" ? "approved" : "rejected"} successfully!`);
                setOpenDetails(false);
                setOpenPending(false);
                fetchHorses();
            }
        } catch (error) {
            const status = error?.response?.status;
            const msg = error?.response?.data?.message || error?.response?.data?.error || error?.message;
            console.error(`[VerifyHorse] HTTP ${status}:`, error?.response?.data || error);
            toast.error(`Lỗi ${status ?? ""}: ${msg ?? "Failed to verify horse."}`);
        }
    };

    const handleApproveUpdate = async (horse) => {
        try {
            await api.put(`/horses/${horse.id}/approve-update`, {
                status: "Update_Approved",
                notes: "Approved by admin",
                verifiedBy: user?.id ? parseInt(user.id) : 0
            });
            toast.success("Horse update approved!");
            setOpenReviewUpdate(false);
            fetchHorses();
        } catch (error) {
            console.error("Error approving update:", error);
            toast.error("Failed to approve update.");
        }
    };

    const handleRejectUpdate = async (horse) => {
        try {
            await api.put(`/horses/${horse.id}/reject-update`, {
                status: "Update_Rejected",
                notes: "Rejected by admin",
                verifiedBy: user?.id ? parseInt(user.id) : 0
            });
            toast.success("Horse update rejected!");
            setOpenReviewUpdate(false);
            fetchHorses();
        } catch (error) {
            console.error("Error rejecting update:", error);
            toast.error("Failed to reject update.");
        }
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

                {isAdmin && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setOpenPendingUpdates(true)}
                            className="relative flex items-center gap-2 bg-yellow-50 text-yellow-600 border border-yellow-200 hover:bg-yellow-100 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-yellow-100/50 hover:-translate-y-0.5"
                        >
                            <FileEdit size={18} />
                            Pending Updates
                            {pendingUpdatesHorses.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                    {pendingUpdatesHorses.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setOpenPending(true)}
                            className="relative flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5"
                        >
                            <ClipboardList size={18} />
                            Review Applications
                            {pendingHorses.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                    {pendingHorses.length}
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Approved", value: approvedHorses.length, icon: GanttChartSquare, color: "bg-yellow-400", iconColor: "text-yellow-900" },
                    { label: "Total Wins", value: totalWins, icon: Trophy, color: "bg-emerald-400", iconColor: "text-emerald-900" },
                    { label: "Top Health", value: excellentCount, icon: Activity, color: "bg-blue-400", iconColor: "text-blue-900" },
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
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterHealth === f
                                    ? "bg-zinc-900 text-white"
                                    : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Status filter chips (Admin only) */}
                {isAdmin && (
                    <div className="flex items-center gap-2 border-l border-zinc-200 pl-4 ml-1">
                        {["All", "Approved", "Rejected", "Suspended", "Retired"].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterStatus === s
                                        ? "bg-zinc-900 text-white"
                                        : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── COUNT ── */}
            <p className="text-sm text-zinc-400 font-medium">
                Showing <span className="text-zinc-900 font-bold">{filtered.length}</span> of{" "}
                <span className="text-zinc-900 font-bold">{approvedHorses.length}</span> horses
            </p>

            {/* ── HORSE GRID ── */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 border-dashed">
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
                            isAdmin={isAdmin}
                            onView={(h) => { setSelectedHorse(h); setOpenDetails(true); }}
                            onEdit={(h) => { setSelectedHorse(h); setOpenEdit(true); }}
                            onDelete={(h) => { setSelectedHorse(h); setOpenDelete(true); }}
                            onSuspend={(h) => { setHorseToSuspend(h); setOpenSuspend(true); }}
                            onReinstate={(h) => { setHorseToReinstate(h); setOpenReinstate(true); }}
                        />
                    ))}
                </div>
            )}

            {/* ── MODALS ── */}
            <PendingHorsesModal
                open={openPending}
                onClose={() => setOpenPending(false)}
                horses={pendingHorses}
                onReview={(h) => {
                    setSelectedHorse(h);
                    setOpenDetails(true);
                }}
                title="Pending Registrations"
                subtitle="Review and approve new horse registration applications."
            />
            <PendingHorsesModal
                open={openPendingUpdates}
                onClose={() => setOpenPendingUpdates(false)}
                horses={pendingUpdatesHorses}
                title="Pending Updates"
                subtitle="Review and approve changes requested by horse owners."
                onReview={(h) => {
                    setHorseToReviewUpdate(h);
                    setOpenReviewUpdate(true);
                }}
            />
            <ReviewUpdateModal
                open={openReviewUpdate}
                onClose={() => setOpenReviewUpdate(false)}
                horse={horseToReviewUpdate}
                onApprove={handleApproveUpdate}
                onReject={handleRejectUpdate}
            />
            <HorseDetailsModal
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                horse={selectedHorse}
                onVerify={handleVerifyHorse}
            />
            <EditHorseModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                horse={selectedHorse}
                onSave={handleUpdateHorse}
                isAdmin={isAdmin}
            />
            <ConfirmModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
                title="Retire Horse"
                message="Are you sure you want to retire this horse? This action cannot be undone."
                confirmLabel="Retire"
            />
            <ConfirmModal
                open={openSuspend}
                onClose={() => setOpenSuspend(false)}
                onConfirm={handleConfirmSuspend}
                title="Suspend Horse"
                message="Are you sure you want to suspend this horse from racing?"
                confirmLabel="Suspend"
                confirmVariant="danger"
            />
            <ConfirmModal
                open={openReinstate}
                onClose={() => setOpenReinstate(false)}
                onConfirm={handleConfirmReinstate}
                title="Reinstate Horse"
                message="Are you sure you want to reinstate this horse to active duty?"
                confirmLabel="Reinstate"
                confirmVariant="success"
            />

        </div>
    );
}

export default Horses;