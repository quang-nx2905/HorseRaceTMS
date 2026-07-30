import { useState, useEffect } from "react";
import { Plus, Search, Trophy, Users, Star, Eye, Pencil, Trash2, MapPin, ChevronLeft, ChevronRight, Loader2, AlertTriangle, ClipboardEdit, Unlock } from "lucide-react";

import JockeyDetailsModal from "../components/jockeys/JockeyDetailsModal";
import EditJockeyModal from "../components/jockeys/EditJockeyModal";
import ReviewJockeyUpdateModal from "../components/jockeys/ReviewJockeyUpdateModal";
import PendingJockeysModal from "../components/jockeys/PendingJockeysModal";
import SendInviteModal from "../components/jockeys/SendInviteModal";
import ConfirmModal from "../components/common/ConfirmModal";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { jockeyApi } from "../api/jockeyApi";
import { userApi } from "../api/userApi";
import { invitationApi } from "../api/invitationApi";
import CreateUserModal from "../components/users/CreateUserModal";
import EditUserModal from "../components/users/EditUserModal";
import { getProfileAvatar } from "../utils/media";

// ── Config ──────────────────────────────────────────────
const statusConfig = {
    Elite: {
        style: "bg-yellow-100 text-yellow-800 ring-yellow-300",
        dot: "bg-yellow-500",
    },
    Professional: {
        style: "bg-blue-100 text-blue-700 ring-blue-300",
        dot: "bg-blue-500",
    },
    "Rising Star": {
        style: "bg-emerald-100 text-emerald-700 ring-emerald-300",
        dot: "bg-emerald-500",
    },
    Amateur: {
        style: "bg-zinc-100 text-zinc-600 ring-zinc-300",
        dot: "bg-zinc-400",
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
    "United States": "🇺🇸",
    Japan: "🇯🇵",
    Spain: "🇪🇸",
    France: "🇫🇷",
    Australia: "🇦🇺",
    Brazil: "🇧🇷",
    Germany: "🇩🇪",
    Vietnam: "🇻🇳",
};

const getJockeyStatus = (exp) => {
    if (!exp) return "Amateur";
    if (exp >= 8) return "Elite";
    if (exp >= 4) return "Professional";
    if (exp >= 1) return "Rising Star";
    return "Amateur";
};

// ── JockeyCard ───────────────────────────────────────────
function JockeyCard({ jockey, index, onView, onAdminEdit, onDelete, onReview, onSendInvite, currentUser }) {
    const jockeyName = jockey.user?.fullName || jockey.name || "Unknown";
    const statusVal = getJockeyStatus(jockey.experienceYear);
    const status = statusConfig[statusVal] || statusConfig.Amateur;
    const gradient = avatarColors[index % avatarColors.length];
    const avatar = getProfileAvatar(jockey);

    const countryName = jockey.user?.country || jockey.country || "Vietnam";
    const flag = countryFlags[countryName] || "🌐";

    const wins = jockey.wins || 0;
    const winPct = Math.max(0, Math.min(Number(jockey.winRate) || 0, 100));

    const isPending = jockey.updateStatus === "Pending";
    const isActive = jockey.user ? jockey.user.isActive : true;

    return (
        <div className={`group relative flex flex-col gap-5 overflow-hidden rounded-[28px] border p-5 transition-all duration-300 ${isActive ? 'border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]' : 'border-red-100 bg-red-50/30 opacity-90'}`}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950" />
            <div className="pointer-events-none absolute right-4 top-3 h-20 w-20 rounded-full border border-white/5" />
            {isPending && (
                <div className="absolute -top-2.5 right-4 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 shadow-sm">
                    Pending Approval
                </div>
            )}

            {/* Top row: avatar + status */}
            <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-zinc-100 shadow-lg">
                        {avatar ? (
                            <img src={avatar} alt={jockeyName} className="w-full h-full object-cover" />
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black`}>
                                {jockeyName.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className={`text-base font-black leading-tight ${isActive ? 'text-white' : 'text-zinc-300 line-through decoration-zinc-300'}`}>
                            {jockeyName}
                        </h3>
                        <div className="mt-1 flex items-center gap-1 text-xs text-zinc-300">
                            <MapPin size={11} />
                            <span>{flag} {countryName}</span>
                        </div>
                    </div>
                </div>

                <span className={`flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold shadow-sm ring-1 ${status.style}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {statusVal}
                </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3 text-center">
                    <p className="text-2xl font-black text-yellow-500">{wins}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 font-medium">Total Wins</p>
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3 text-center">
                    <p className="text-2xl font-black text-zinc-900">{jockey.experienceYear || 0}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 font-medium">Years Exp</p>
                </div>
            </div>

            {/* Additional details */}
            <div className="text-xs text-zinc-500 border-t border-zinc-100 pt-3 space-y-1">
                <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-semibold text-zinc-700">{jockey.phone || "Not set"}</span>
                </div>
            </div>

            {/* Win rate bar */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-zinc-400 font-medium">Win Rate</span>
                    <span className="text-xs font-bold text-zinc-700">{winPct.toFixed(1)}%</span>
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
                    <Eye size={13} /> View
                </button>
                {currentUser?.role === "HorseOwner" && (
                    <button
                        onClick={() => onSendInvite(jockey)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 transition-all text-xs font-bold"
                    >
                        Send Invite
                    </button>
                )}
                {currentUser?.role === "Admin" && isPending && (
                    <button
                        onClick={() => onReview(jockey)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-all text-xs font-bold"
                    >
                        <ClipboardEdit size={13} /> Review Edit
                    </button>
                )}
                {currentUser?.role === "Admin" && (
                    <button
                        onClick={() => onAdminEdit(jockey)}
                        className="w-10 flex items-center justify-center rounded-xl transition-all bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                        title="Edit Jockey"
                    >
                        <Pencil size={14} />
                    </button>
                )}
                {currentUser?.role === "Admin" && (
                    <button
                        onClick={() => onDelete(jockey)}
                        className={`w-10 flex items-center justify-center rounded-xl transition-all ${isActive ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100'
                            }`}
                        title={isActive ? "Deactivate Jockey" : "Reactivate Jockey"}
                    >
                        {isActive ? <Trash2 size={14} /> : <Unlock size={14} />}
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────
function Jockeys() {
    const { user } = useAuth();
    const [jockeys, setJockeys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Modals visibility
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openPending, setOpenPending] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openAdminEdit, setOpenAdminEdit] = useState(false);
    const [openSendInvite, setOpenSendInvite] = useState(false);

    const [selectedJockey, setSelectedJockey] = useState(null);
    const [jockeyToReview, setJockeyToReview] = useState(null);

    const itemsPerPage = 8;

    const fetchJockeys = async (isBackground = false) => {
        if (!isBackground) setIsLoading(true);
        try {
            const response = await jockeyApi.getJockeys();
            setJockeys(response.data || []);
        } catch (error) {
            console.error("Failed to load jockeys:", error);
            if (!isBackground) toast.error("Failed to load jockeys list.");
        } finally {
            if (!isBackground) setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJockeys();

        // Background polling every 15s to sync status updates
        const interval = setInterval(() => {
            fetchJockeys(true);
        }, 15_000);

        // Sync when user tabs back into the browser window
        const handleFocus = () => {
            fetchJockeys(true);
        };
        window.addEventListener("focus", handleFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    const statuses = ["All", "Elite", "Professional", "Rising Star", "Amateur"];

    const filtered = jockeys.filter((j) => {
        const nameStr = j.user?.fullName || j.name || "";
        const countryStr = j.user?.country || j.country || "Vietnam";
        const matchSearch = nameStr.toLowerCase().includes(search.toLowerCase()) ||
            countryStr.toLowerCase().includes(search.toLowerCase());
        const jockeyStatus = getJockeyStatus(j.experienceYear);
        const matchStatus = filterStatus === "All" || jockeyStatus === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalWins = jockeys.reduce((s, j) => s + (j.wins || 0), 0);
    const eliteCount = jockeys.filter((j) => getJockeyStatus(j.experienceYear) === "Elite").length;

    const sortedByWins = [...jockeys].sort((a, b) => (b.wins || 0) - (a.wins || 0));
    const topJockey = sortedByWins.length > 0 ? sortedByWins[0] : null;

    const handleCreateJockey = async (newUser) => {
        try {
            await userApi.createUser(newUser);
            toast.success("Jockey created successfully!");
            setOpenCreate(false);
            fetchJockeys();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create jockey");
            console.error(error);
            throw error;
        }
    };

    const handleUpdateJockey = async (formData) => {
        try {
            await jockeyApi.requestUpdateJockey(selectedJockey.userId, formData);
            toast.success("Profile update requested successfully! Pending Admin review.");
            setOpenEdit(false);
            fetchJockeys();
        } catch (error) {
            console.error("Failed to submit request:", error);
            toast.error("Failed to submit update request.");
        }
    };

    const handleReviewJockey = async (jockeyId, reviewData) => {
        try {
            const adminUserId = user?.id ? Number(user.id) : 0;
            await jockeyApi.reviewJockeyRequest(jockeyId, {
                ...reviewData,
                reviewedBy: adminUserId
            });

            toast.success(reviewData.isApproved ? "Approved profile update!" : "Rejected profile update.");

            setOpenReview(false);
            fetchJockeys();
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error("Failed to review request.");
        }
    };

    const handleDeleteJockey = async () => {
        if (!selectedJockey) return;

        const targetUserId = selectedJockey.user?.id || selectedJockey.userId || selectedJockey.id;
        if (!targetUserId) {
            toast.error("User ID not found for this jockey.");
            setOpenDelete(false);
            return;
        }

        try {
            await userApi.toggleUserStatus(targetUserId);
            const isNowActive = selectedJockey.user?.isActive === false;

            // Manually update local state for immediate feedback
            setJockeys((prev) =>
                prev.map((j) => {
                    const jUserId = j.user?.id || j.userId || j.id;
                    if (jUserId === targetUserId) {
                        return {
                            ...j,
                            user: {
                                ...j.user,
                                isActive: isNowActive
                            }
                        };
                    }
                    return j;
                })
            );

            toast.success(`Jockey account has been ${isNowActive ? "reactivated" : "deactivated"} successfully!`);

            // Optionally fetch in background to sync
            fetchJockeys(true);
        } catch {
            toast.error("Failed to update jockey status");
        } finally {
            setOpenDelete(false);
            setSelectedJockey(null);
        }
    };

    const handleSendInvite = async (inviteData) => {
        try {
            await invitationApi.sendInvitation(inviteData);
            toast.success("Invitation sent successfully!");
            setOpenSendInvite(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send invitation");
            console.error(error);
        }
    };

    const pendingJockeys = jockeys.filter((j) => j.updateStatus === "Pending");

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-yellow-500" />
            </div>
        );
    }

    return (
        <div className="space-y-7 animate-in fade-in duration-300">
            {/* ── HEADER ── */}
            <div className="relative overflow-hidden rounded-[32px] bg-zinc-950 px-7 py-8 text-white shadow-[0_20px_55px_rgba(0,0,0,0.16)] lg:px-10 lg:py-10">
                <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-full w-1/2 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle, #fbbf24 1px, transparent 1px)", backgroundSize: "22px 22px" }}
                />
                <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-400">
                            <span className="h-px w-8 bg-amber-400" /> Racing talent directory
                        </div>
                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Jockey roster</h1>
                        <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
                            Discover, manage and compare professional riders across the championship.
                        </p>
                    </div>

                <div className="flex flex-wrap items-center gap-3">
                    {topJockey && (
                        <div className="mr-2 hidden items-center gap-3 border-r border-white/10 pr-6 md:flex">
                            <div className="h-12 w-12 overflow-hidden rounded-xl border border-amber-400/60 bg-amber-400">
                                {getProfileAvatar(topJockey) ? <img src={getProfileAvatar(topJockey)} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center font-black text-zinc-950">{(topJockey.user?.fullName || "J").charAt(0)}</div>}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">Top performer</p>
                                <p className="font-bold text-white">{topJockey.user?.fullName || topJockey.name}</p>
                            </div>
                        </div>
                    )}
                    {user?.role === "Jockey" && (
                        <button
                            onClick={() => {
                                const myCard = jockeys.find((j) => Number(j.userId) === Number(user?.id));
                                if (myCard) {
                                    setSelectedJockey(myCard);
                                    setOpenEdit(true);
                                } else {
                                    toast.error("Your jockey profile could not be found.");
                                }
                            }}
                            className="flex items-center gap-2 rounded-2xl bg-amber-400 px-6 py-3.5 text-sm font-black text-zinc-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
                        >
                            <Pencil size={18} />
                            Edit My Profile
                        </button>
                    )}
                    {user?.role === "Admin" && (
                        <button
                            onClick={() => setOpenCreate(true)}
                            className="flex items-center gap-2 rounded-2xl bg-amber-400 px-6 py-3.5 text-sm font-black text-zinc-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
                        >
                            <Plus size={18} />
                            Add Jockey
                        </button>
                    )}
                </div>
                </div>
            </div>

            {/* ── ADMIN REVIEW BANNER ── */}
            {user?.role === "Admin" && pendingJockeys.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-bold text-amber-900">Pending Jockey Profile Updates</h3>
                            <p className="text-amber-700 text-sm mt-0.5">
                                There are {pendingJockeys.length} profile update requests waiting for approval.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpenPending(true)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-amber-500/20"
                    >
                        Review Applications
                    </button>
                </div>
            )}

            {/* ── SUMMARY STATS ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Total Jockeys", value: jockeys.length, icon: Users, color: "bg-yellow-400", iconColor: "text-yellow-900" },
                    { label: "Total Wins", value: totalWins, icon: Trophy, color: "bg-emerald-400", iconColor: "text-emerald-900" },
                    { label: "Elite Jockeys", value: eliteCount, icon: Star, color: "bg-violet-400", iconColor: "text-violet-900" },
                ].map(({ label, value, icon: Icon, color, iconColor }) => (
                    <div key={label} className="group flex items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${color} transition-transform group-hover:scale-105`}>
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
            <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm">
                <div className="relative flex-1 min-w-[240px]">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Search by name or country..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl outline-none text-sm focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {statuses.map((s) => (
                        <button
                            key={s}
                            onClick={() => { setFilterStatus(s); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterStatus === s
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
                            key={jockey.userId ?? idx}
                            jockey={jockey}
                            index={idx}
                            currentUser={user}
                            onView={(j) => { setSelectedJockey(j); setOpenDetails(true); }}
                            onEdit={(j) => { setSelectedJockey(j); setOpenEdit(true); }}
                            onAdminEdit={(j) => { setSelectedJockey(j); setOpenAdminEdit(true); }}
                            onDelete={(j) => { setSelectedJockey(j); setOpenDelete(true); }}
                            onReview={(j) => { setJockeyToReview(j); setOpenReview(true); }}
                            onSendInvite={(j) => { setSelectedJockey(j); setOpenSendInvite(true); }}
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
                            className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${currentPage === page
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
                title={selectedJockey?.user?.isActive === false ? "Reactivate Jockey Account" : "Deactivate Jockey Account"}
                message={
                    selectedJockey?.user?.isActive === false
                        ? `Are you sure you want to reactivate ${selectedJockey?.user?.fullName || selectedJockey?.name}? They will be able to log in again.`
                        : `Are you sure you want to deactivate ${selectedJockey?.user?.fullName || selectedJockey?.name}? They will no longer be able to log in.`
                }
                confirmLabel={selectedJockey?.user?.isActive === false ? "Restore Account" : "Deactivate"}
                confirmVariant={selectedJockey?.user?.isActive === false ? "success" : "danger"}
            />

            {/* Admin review modals */}
            <PendingJockeysModal
                open={openPending}
                onClose={() => setOpenPending(false)}
                jockeys={pendingJockeys}
                onReview={(j) => {
                    setJockeyToReview(j);
                    setOpenReview(true);
                }}
            />

            <ReviewJockeyUpdateModal
                open={openReview}
                onClose={() => setOpenReview(false)}
                jockey={jockeyToReview}
                onReview={handleReviewJockey}
            />

            <CreateUserModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreateJockey}
                initialRole="Jockey"
                fixedRole={true}
            />

            <EditUserModal
                open={openAdminEdit}
                onClose={() => setOpenAdminEdit(false)}
                user={selectedJockey ? {
                    id: selectedJockey.userId || selectedJockey.user?.id,
                    name: selectedJockey.user?.fullName || selectedJockey.name,
                    email: selectedJockey.user?.email,
                    role: "Jockey",
                    status: selectedJockey.user?.isActive === false ? "Inactive" : "Active",
                    phone: selectedJockey.phone,
                    experienceYear: selectedJockey.experienceYear,
                    avatar: selectedJockey.avatar
                } : null}
                onSave={async (updatedUser) => {
                    try {
                        await userApi.updateUser(updatedUser.id, {
                            fullName: updatedUser.name,
                            email: updatedUser.email,
                            role: updatedUser.role,
                            phone: updatedUser.phone,
                            experienceYear: updatedUser.experienceYear ? parseInt(updatedUser.experienceYear) : null,
                            expYears: updatedUser.expYears ? parseInt(updatedUser.expYears) : null,
                            totalPoints: updatedUser.totalPoints ? parseInt(updatedUser.totalPoints) : null,
                            removeAvatar: updatedUser.removeAvatar || false
                        });
                        toast.success("Jockey profile updated successfully!");
                        setOpenAdminEdit(false);
                        fetchJockeys();
                    } catch (error) {
                        toast.error(error.response?.data?.message || "Failed to update jockey");
                        console.error(error);
                    }
                }}
            />

            <SendInviteModal
                open={openSendInvite}
                onClose={() => setOpenSendInvite(false)}
                jockey={selectedJockey}
                onSubmit={handleSendInvite}
            />
        </div>
    );
}

export default Jockeys;
