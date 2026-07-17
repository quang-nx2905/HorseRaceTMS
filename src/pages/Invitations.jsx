import { useState, useEffect, useCallback } from "react";
import {
    Mail,
    Plus,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertTriangle,
    InboxIcon,
    CheckCircle2,
    XCircle,
    RefreshCw,
    Calendar,
    GanttChartSquare,
    User,
    Trophy,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { invitationApi } from "../api/invitationApi";
import InvitationStatusBadge from "../components/invitations/InvitationStatusBadge";
import SendInvitationModal from "../components/invitations/SendInvitationModal";

// ── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8;

const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "Accepted", value: "Accepted" },
    { label: "Rejected", value: "Rejected" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Auto-Cancelled", value: "AutoCancelled" },
];

// ── Helper ───────────────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// ── Empty State ──────────────────────────────────────────────────────────────

function EmptyInvitations({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                <InboxIcon size={28} className="text-zinc-400" />
            </div>
            <p className="font-bold text-zinc-700 text-lg">No invitations found</p>
            <p className="text-zinc-400 text-sm mt-1">{message}</p>
        </div>
    );
}

// ── HorseOwner: Sent Invitations Table ──────────────────────────────────────

function SentInvitationsTable({ invitations, onRefresh, onCancel, cancellingId }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-zinc-100">
                        <th className="text-left py-3 px-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Horse</th>
                        <th className="text-left py-3 px-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Jockey</th>
                        <th className="text-left py-3 px-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Tournament</th>
                        <th className="text-left py-3 px-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Sent At</th>
                        <th className="text-left py-3 px-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Message</th>
                        <th className="text-left py-3 px-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                    {invitations.map((inv) => (
                        <tr
                            key={inv.inviteId}
                            className="hover:bg-zinc-50/60 transition-colors group"
                        >
                            {/* Horse */}
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                                        <GanttChartSquare size={14} className="text-white" />
                                    </div>
                                    <span className="font-semibold text-zinc-900">{inv.horseName}</span>
                                </div>
                            </td>

                            {/* Jockey */}
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                        {(inv.jockeyName || "J").charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-zinc-700 font-medium">{inv.jockeyName}</span>
                                </div>
                            </td>

                            {/* Tournament */}
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-1.5 text-zinc-600">
                                    <Trophy size={13} className="text-zinc-400" />
                                    <span>{inv.tourName}</span>
                                </div>
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4">
                                <InvitationStatusBadge status={inv.status} />
                            </td>

                            {/* Sent At */}
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                    <Calendar size={12} />
                                    {formatDate(inv.sentAt)}
                                </div>
                            </td>

                            {/* Message */}
                            <td className="py-4 px-4 max-w-[200px]">
                                {inv.message ? (
                                    <p className="text-zinc-500 text-xs truncate" title={inv.message}>
                                        {inv.message}
                                    </p>
                                ) : (
                                    <span className="text-zinc-300 text-xs italic">No message</span>
                                )}
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4">
                                {inv.status === "Pending" ? (
                                    <button
                                        onClick={() => onCancel(inv.inviteId)}
                                        disabled={cancellingId === inv.inviteId}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {cancellingId === inv.inviteId ? (
                                            <Loader2 size={13} className="animate-spin" />
                                        ) : (
                                            <XCircle size={13} />
                                        )}
                                        Cancel
                                    </button>
                                ) : (
                                    <span className="text-zinc-300 text-xs italic">—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Jockey: Received Invitations Cards ──────────────────────────────────────

function ReceivedInvitationCard({ invitation, onRespond, responding }) {
    return (
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 hover:shadow-md hover:border-zinc-300 transition-all group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                        <GanttChartSquare size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-black text-zinc-900 text-base leading-tight">
                            {invitation.horseName}
                        </h3>
                        <div className="flex items-center gap-1 text-zinc-400 text-xs mt-0.5">
                            <Trophy size={11} />
                            <span>{invitation.tourName}</span>
                        </div>
                    </div>
                </div>
                <InvitationStatusBadge status={invitation.status} />
            </div>

            {/* Owner */}
            <div className="flex items-center gap-2 mb-3 text-sm text-zinc-600">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
                    {(invitation.ownerName || "O").charAt(0).toUpperCase()}
                </div>
                <span>
                    From <span className="font-semibold text-zinc-800">{invitation.ownerName}</span>
                </span>
            </div>

            {/* Message */}
            {invitation.message && (
                <div className="bg-zinc-50 rounded-xl px-3.5 py-2.5 mb-4 border border-zinc-100">
                    <p className="text-zinc-600 text-xs leading-relaxed italic">
                        &ldquo;{invitation.message}&rdquo;
                    </p>
                </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-4">
                <Calendar size={11} />
                <span>{formatDate(invitation.sentAt)}</span>
            </div>

            {/* Action buttons (only for Pending invitations) */}
            {invitation.status === "Pending" && (
                <div className="flex gap-2">
                    <button
                        onClick={() => onRespond(invitation.inviteId, false)}
                        disabled={responding === invitation.inviteId}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {responding === invitation.inviteId ? (
                            <Loader2 size={13} className="animate-spin" />
                        ) : (
                            <XCircle size={13} />
                        )}
                        Reject
                    </button>
                    <button
                        onClick={() => onRespond(invitation.inviteId, true)}
                        disabled={responding === invitation.inviteId}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {responding === invitation.inviteId ? (
                            <Loader2 size={13} className="animate-spin" />
                        ) : (
                            <CheckCircle2 size={13} />
                        )}
                        Accept
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────

function Invitations() {
    const { user } = useAuth();
    const isOwner = user?.role === "HorseOwner";
    const isJockey = user?.role === "Jockey";

    // ── State ────────────────────────────────────────────────────────────────
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sendModalOpen, setSendModalOpen] = useState(false);
    const [respondingId, setRespondingId] = useState(null);
    const [cancellingId, setCancellingId] = useState(null);

    const ownerId = parseInt(user?.id);

    // ── Load invitations ─────────────────────────────────────────────────────
    const fetchInvitations = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        setError(null);

        try {
            let res;
            if (isOwner) {
                res = await invitationApi.getSentInvitations(statusFilter || null);
            } else if (isJockey) {
                res = await invitationApi.getMyInvitations();
            }
            setInvitations(res?.data || []);
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to load invitations.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [user, isOwner, isJockey, statusFilter]);

    useEffect(() => {
        fetchInvitations();
    }, [fetchInvitations]);

    // Re-fetch when status filter changes, reset to page 1
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter]);

    // ── Respond handler (Jockey) ─────────────────────────────────────────────
    const handleRespond = async (inviteId, accept) => {
        setRespondingId(inviteId);
        try {
            const res = await invitationApi.respondToInvitation(inviteId, accept);
            toast.success(res?.message || (accept ? "Invitation accepted!" : "Invitation rejected."));
            fetchInvitations();
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to respond to invitation.";
            toast.error(msg);
        } finally {
            setRespondingId(null);
        }
    };

    // ── Cancel handler (HorseOwner) ──────────────────────────────────────────
    const handleCancel = async (inviteId) => {
        setCancellingId(inviteId);
        try {
            const res = await invitationApi.cancelInvitation(inviteId);
            toast.success(res?.message || "Invitation cancelled successfully.");
            fetchInvitations();
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to cancel invitation.";
            toast.error(msg);
        } finally {
            setCancellingId(null);
        }
    };

    // ── Derived: filter + paginate ───────────────────────────────────────────
    const filtered = invitations.filter((inv) => {
        const q = search.toLowerCase();
        return (
            inv.horseName?.toLowerCase().includes(q) ||
            inv.jockeyName?.toLowerCase().includes(q) ||
            inv.ownerName?.toLowerCase().includes(q) ||
            inv.tourName?.toLowerCase().includes(q)
        );
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    // ── Stats ────────────────────────────────────────────────────────────────
    const stats = {
        total: invitations.length,
        pending: invitations.filter((i) => i.status === "Pending").length,
        accepted: invitations.filter((i) => i.status === "Accepted").length,
        rejected: invitations.filter((i) => i.status === "Rejected").length,
    };

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="max-w-7xl mx-auto">

            {/* ── PAGE HEADER ── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
                            {isOwner ? "Invitations Sent" : "My Invitations"}
                        </h1>
                    </div>
                    <p className="text-zinc-500 text-sm ml-13 pl-[52px]">
                        {isOwner
                            ? "Manage invitations sent to jockeys for your horses."
                            : "Review and respond to race invitations from horse owners."}
                    </p>
                </div>

                {isOwner && (
                    <button
                        onClick={() => setSendModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        Send Invitation
                    </button>
                )}
            </div>

            {/* ── STATS CARDS ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                    { label: "Total", value: stats.total, color: "text-zinc-900", bg: "bg-zinc-100" },
                    { label: "Pending", value: stats.pending, color: "text-amber-700", bg: "bg-amber-50" },
                    { label: "Accepted", value: stats.accepted, color: "text-emerald-700", bg: "bg-emerald-50" },
                    { label: "Rejected", value: stats.rejected, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className={`${stat.bg} rounded-2xl px-5 py-4 border border-white`}
                    >
                        <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-1">
                            {stat.label}
                        </p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* ── FILTERS ── */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 mb-6 flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                        type="text"
                        placeholder="Search by horse, jockey, owner, tournament..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
                    />
                </div>

                {/* Status filter (owner only) */}
                {isOwner && (
                    <div className="flex gap-1.5 flex-wrap">
                        {STATUS_FILTERS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setStatusFilter(f.value)}
                                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                                    statusFilter === f.value
                                        ? "bg-amber-500 text-white"
                                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Refresh */}
                <button
                    onClick={fetchInvitations}
                    disabled={loading}
                    title="Refresh"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors disabled:opacity-50 flex-shrink-0"
                >
                    <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {/* ── CONTENT ── */}
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                        <p className="text-zinc-500 text-sm font-medium">Loading invitations...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        <p className="text-zinc-700 font-semibold">{error}</p>
                        <button
                            onClick={fetchInvitations}
                            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-sm transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : paginated.length === 0 ? (
                    <EmptyInvitations
                        message={
                            isOwner
                                ? "No invitations sent yet. Click 'Send Invitation' to get started."
                                : "You have no invitations yet. Horse owners will send you race invitations here."
                        }
                    />
                ) : isOwner ? (
                    /* ── HorseOwner: table view ── */
                    <SentInvitationsTable
                        invitations={paginated}
                        onRefresh={fetchInvitations}
                        onCancel={handleCancel}
                        cancellingId={cancellingId}
                    />
                ) : (
                    /* ── Jockey: card grid view ── */
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {paginated.map((inv) => (
                            <ReceivedInvitationCard
                                key={inv.inviteId}
                                invitation={inv}
                                onRespond={handleRespond}
                                responding={respondingId}
                            />
                        ))}
                    </div>
                )}

                {/* ── Pagination ── */}
                {totalPages > 1 && !loading && !error && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100">
                        <p className="text-xs text-zinc-400 font-medium">
                            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                            {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center disabled:opacity-40 hover:bg-zinc-200 transition-colors"
                            >
                                <ChevronLeft size={15} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((p) => Math.abs(p - currentPage) <= 2)
                                .map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                                            p === currentPage
                                                ? "bg-amber-500 text-white"
                                                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center disabled:opacity-40 hover:bg-zinc-200 transition-colors"
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── SEND INVITATION MODAL ── */}
            {isOwner && (
                <SendInvitationModal
                    open={sendModalOpen}
                    onClose={() => setSendModalOpen(false)}
                    ownerId={ownerId}
                    onSuccess={fetchInvitations}
                />
            )}
        </div>
    );
}

export default Invitations;
