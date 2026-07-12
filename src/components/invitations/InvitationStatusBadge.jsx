/**
 * InvitationStatusBadge
 *
 * Reusable badge component for rendering invitation status.
 *
 * Supported statuses:
 *   Pending       → amber
 *   Accepted      → emerald
 *   Rejected      → red
 *   Cancelled     → zinc
 *   AutoCancelled → purple
 */

const STATUS_CONFIG = {
    Pending: {
        label: "Pending",
        style: "bg-amber-100 text-amber-700 ring-1 ring-amber-300",
        dot: "bg-amber-500",
    },
    Accepted: {
        label: "Accepted",
        style: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300",
        dot: "bg-emerald-500",
    },
    Rejected: {
        label: "Rejected",
        style: "bg-red-100 text-red-600 ring-1 ring-red-300",
        dot: "bg-red-500",
    },
    Cancelled: {
        label: "Cancelled",
        style: "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-300",
        dot: "bg-zinc-400",
    },
    AutoCancelled: {
        label: "Auto-Cancelled",
        style: "bg-purple-100 text-purple-700 ring-1 ring-purple-300",
        dot: "bg-purple-500",
    },
};

function InvitationStatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || {
        label: status || "Unknown",
        style: "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200",
        dot: "bg-zinc-400",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.style}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
            {config.label}
        </span>
    );
}

export default InvitationStatusBadge;
