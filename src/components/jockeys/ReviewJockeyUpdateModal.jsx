import { useState } from "react";
import { X, CheckCircle, XCircle, Phone, Scale, Briefcase, Image } from "lucide-react";

function ReviewJockeyUpdateModal({ open, onClose, jockey, onReview }) {
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!open || !jockey) return null;

    const handleAction = async (isApproved) => {
        setIsSubmitting(true);
        try {
            await onReview(jockey.userId, {
                isApproved,
                notes: notes.trim() || null,
            });
            setNotes("");
            onClose();
        } catch (error) {
            console.error("Failed to submit review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={onClose}></div>

            {/* Content Container */}
            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 lg:p-8 border-b border-zinc-100 bg-white">
                    <div>
                        <h2 className="text-2xl font-black text-zinc-900">Review Jockey Profile Update</h2>
                        <p className="text-zinc-500 mt-1 text-sm">
                            Review and approve changes submitted by <span className="font-semibold text-zinc-800">{jockey.user?.fullName || jockey.name}</span>.
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body / Side-by-side comparison */}
                <div className="p-6 lg:p-8 flex-1 overflow-y-auto bg-zinc-50/50 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Current Info */}
                        <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-3 mb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                                Current Profile Details
                            </h3>

                            {/* Avatar */}
                            <div>
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">Avatar</label>
                                <div className="w-16 h-16 rounded-xl bg-zinc-100 overflow-hidden flex items-center justify-center border border-zinc-200">
                                    {jockey.avatar ? (
                                        <img src={jockey.avatar} alt="Current Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-black text-amber-950 text-xl">
                                            {(jockey.user?.fullName || jockey.name || "J").charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Phone Number</label>
                                <p className="font-semibold text-zinc-800 text-sm flex items-center gap-1.5">
                                    <Phone size={14} className="text-zinc-400" />
                                    {jockey.phone || "Not set"}
                                </p>
                            </div>

                            {/* Experience */}
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Experience</label>
                                <p className="font-semibold text-zinc-800 text-sm flex items-center gap-1.5">
                                    <Briefcase size={14} className="text-zinc-400" />
                                    {jockey.experienceYear !== undefined ? `${jockey.experienceYear} Years` : "Not set"}
                                </p>
                            </div>
                        </div>

                        {/* Proposed changes */}
                        <div className="bg-white rounded-2xl p-5 border border-yellow-200 shadow-md space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-700 px-3.5 py-1 rounded-bl-xl font-bold text-xs uppercase tracking-wide">
                                Pending Approval
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-100 pb-3 mb-2 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                Proposed Changes
                            </h3>

                            {/* Pending Avatar */}
                            <div>
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">Proposed Avatar</label>
                                <div className="w-16 h-16 rounded-xl bg-zinc-100 overflow-hidden flex items-center justify-center border border-zinc-200">
                                    {jockey.pendingAvatar ? (
                                        <img src={jockey.pendingAvatar} alt="Proposed Avatar" className="w-full h-full object-cover" />
                                    ) : jockey.avatar ? (
                                        <img src={jockey.avatar} alt="Existing Avatar" className="w-full h-full object-cover opacity-60" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-black text-amber-950 text-xl">
                                            {(jockey.user?.fullName || jockey.name || "J").charAt(0)}
                                        </div>
                                    )}
                                </div>
                                {jockey.pendingAvatar && jockey.pendingAvatar !== jockey.avatar && (
                                    <span className="text-[10px] text-yellow-600 font-bold mt-1 block">New avatar URL submitted</span>
                                )}
                            </div>

                            {/* Pending Phone */}
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Proposed Phone</label>
                                <p className={`font-semibold text-sm flex items-center gap-1.5 ${jockey.pendingPhone && jockey.pendingPhone !== jockey.phone ? "text-yellow-600 font-black" : "text-zinc-800"}`}>
                                    <Phone size={14} className={jockey.pendingPhone && jockey.pendingPhone !== jockey.phone ? "text-yellow-500" : "text-zinc-400"} />
                                    {jockey.pendingPhone || jockey.phone || "Not set"}
                                </p>
                            </div>

                            {/* Pending Experience */}
                            <div className="space-y-1">
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Proposed Experience</label>
                                <p className={`font-semibold text-sm flex items-center gap-1.5 ${jockey.pendingExperienceYear !== undefined && jockey.pendingExperienceYear !== jockey.experienceYear ? "text-yellow-600 font-black" : "text-zinc-800"}`}>
                                    <Briefcase size={14} className={jockey.pendingExperienceYear !== undefined && jockey.pendingExperienceYear !== jockey.experienceYear ? "text-yellow-500" : "text-zinc-400"} />
                                    {jockey.pendingExperienceYear !== null && jockey.pendingExperienceYear !== undefined
                                        ? `${jockey.pendingExperienceYear} Years` 
                                        : (jockey.experienceYear !== undefined ? `${jockey.experienceYear} Years` : "Not set")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Review Notes Input */}
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-2">
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                            Review Decision Notes
                        </label>
                        <textarea
                            disabled={isSubmitting}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={500}
                            placeholder="Write reason for rejection or special approval notes here (optional, max 500 characters)..."
                            rows={3}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-sm text-zinc-800 placeholder-zinc-400"
                        />
                    </div>
                </div>

                {/* Footer buttons */}
                <div className="p-6 lg:p-8 border-t border-zinc-100 flex items-center justify-end gap-3 bg-white">
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors font-bold text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleAction(false)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                        <XCircle size={16} />
                        Reject Request
                    </button>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleAction(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-sm hover:shadow-md hover:shadow-emerald-500/20 disabled:opacity-50"
                    >
                        <CheckCircle size={16} />
                        Approve Request
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewJockeyUpdateModal;
