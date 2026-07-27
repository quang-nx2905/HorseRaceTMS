import Modal from "../common/Modal";
import { Phone, Briefcase, Trophy, Mail } from "lucide-react";

function JockeyDetailsModal({
    open,
    onClose,
    jockey,
}) {
    if (!jockey) return null;

    const getJockeyStatus = (exp) => {
        if (!exp) return "Amateur";
        if (exp >= 8) return "Elite";
        if (exp >= 4) return "Professional";
        if (exp >= 1) return "Rising Star";
        return "Amateur";
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Jockey Profile"
            width="w-[500px]"
        >
            <div className="space-y-6 -mt-4">
                {/* Header profile details */}
                <div className="flex items-center gap-4 border-b border-zinc-100 pb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-3xl font-black shadow-md flex-shrink-0">
                        {(jockey.user?.fullName || jockey.name || "J").charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-zinc-900 leading-tight">
                            {jockey.user?.fullName || jockey.name}
                        </h2>
                        <p className="text-xs text-zinc-400 font-medium mt-1 flex items-center gap-1">
                            <Mail size={12} />
                            {jockey.user?.email || "No email"}
                        </p>
                    </div>
                </div>

                {/* Specific stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/50 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Total Wins</span>
                        <div className="flex items-end gap-1.5 mt-2">
                            <Trophy size={18} className="text-yellow-500" />
                            <span className="text-xl font-black text-zinc-900">{jockey.wins || 0}</span>
                        </div>
                    </div>
                    <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/50 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Status Level</span>
                        <div className="mt-2 font-bold text-sm text-zinc-800">
                            {getJockeyStatus(jockey.experienceYear)}
                        </div>
                    </div>
                </div>

                {/* Details list */}
                <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Phone size={13} /> Phone
                        </span>
                        <span className="text-sm font-semibold text-zinc-800">{jockey.phone || "Not set"}</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Briefcase size={13} /> Experience
                        </span>
                        <span className="text-sm font-semibold text-zinc-800">
                            {jockey.experienceYear !== undefined ? `${jockey.experienceYear} Years` : "Not set"}
                        </span>
                    </div>
                </div>

                {/* Pending Request Indicator */}
                {jockey.updateStatus === "Pending" && (
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-700 font-medium">
                        This profile has an active update request waiting for Admin review.
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default JockeyDetailsModal;