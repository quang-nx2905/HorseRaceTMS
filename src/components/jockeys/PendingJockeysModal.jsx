import { X, Clock, Eye } from "lucide-react";
import Modal from "../common/Modal";

function PendingJockeysModal({ open, onClose, jockeys, onReview }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Pending Jockey Updates"
            width="w-[700px]"
        >
            <p className="text-zinc-500 mb-6 -mt-6">
                Review and approve or reject profile update requests submitted by jockeys.
            </p>

            {jockeys.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                    <Clock size={32} className="text-zinc-400 mb-2" />
                    <p className="font-bold text-zinc-700">All caught up!</p>
                    <p className="text-zinc-400 text-sm mt-0.5">No pending updates to review.</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {jockeys.map((jockey) => (
                        <div
                            key={jockey.userId}
                            className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-4 flex items-center justify-between transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-amber-200">
                                    {jockey.avatar ? (
                                        <img src={jockey.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-black text-amber-950 text-sm">
                                            {(jockey.user?.fullName || jockey.name || "J").charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900 text-sm">
                                        {jockey.user?.fullName || jockey.name}
                                    </h4>
                                    <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1 font-medium">
                                        <Clock size={11} />
                                        Requested: {jockey.updateRequestedAt ? new Date(jockey.updateRequestedAt).toLocaleString() : "Recently"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => onReview(jockey)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-colors"
                            >
                                <Eye size={12} />
                                Review
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </Modal>
    );
}

export default PendingJockeysModal;
