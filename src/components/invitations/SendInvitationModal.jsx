import { useState, useEffect } from "react";
import { Send, ChevronDown, Loader2 } from "lucide-react";
import Modal from "../common/Modal";
import { jockeyApi } from "../../api/jockeyApi";
import tournamentApi from "../../api/tournamentApi";
import api from "../../api/axiosClient";
import { invitationApi } from "../../api/invitationApi";
import toast from "react-hot-toast";

/**
 * SendInvitationModal
 *
 * Allows a HorseOwner to send an invitation to a Jockey for one of their horses.
 *
 * Props:
 *   open      {boolean}   – controls modal visibility
 *   onClose   {function}  – called when modal closes
 *   ownerId   {number}    – current owner's UserId (from JWT)
 *   onSuccess {function}  – called after successful invitation send (triggers list refresh)
 */
function SendInvitationModal({ open, onClose, ownerId, onSuccess }) {
    const [jockeys, setJockeys] = useState([]);
    const [horses, setHorses] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    const [form, setForm] = useState({
        jockeyId: "",
        horseId: "",
        tourId: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);

    // Load dropdown data when modal opens
    useEffect(() => {
        if (!open || !ownerId) return;

        const load = async () => {
            setLoadingData(true);
            try {
                const [jockeyRes, horsesRes, tourneyRes] = await Promise.all([
                    jockeyApi.getJockeys(),
                    api.get(`/horses/owner/${ownerId}`),
                    tournamentApi.getAll({}),
                ]);

                setJockeys(jockeyRes?.data || jockeyRes || []);
                setHorses(horsesRes?.data?.data || horsesRes?.data || []);
                
                // Extract items array from the paged tournament result structure
                const tourneyItems = tourneyRes?.data?.data?.items || 
                                     tourneyRes?.data?.items || 
                                     tourneyRes?.data || 
                                     [];
                setTournaments(tourneyItems);
            } catch (err) {
                console.error("Error loading invitation modal form data:", err);
                toast.error("Failed to load form data.");
            } finally {
                setLoadingData(false);
            }
        };

        load();
    }, [open, ownerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.jockeyId || !form.horseId || !form.tourId) {
            toast.error("Please select a jockey, horse and tournament.");
            return;
        }

        setSubmitting(true);
        try {
            await invitationApi.sendInvitation({
                jockeyId: parseInt(form.jockeyId),
                horseId: parseInt(form.horseId),
                tourId: parseInt(form.tourId),
                message: form.message || undefined,
            });

            toast.success("Invitation sent successfully!");
            setForm({ jockeyId: "", horseId: "", tourId: "", message: "" });
            onSuccess?.();
            onClose();
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to send invitation.";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const selectClass =
        "w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 appearance-none cursor-pointer";
    const labelClass = "block text-sm font-semibold text-zinc-700 mb-1.5";

    return (
        <Modal open={open} onClose={onClose} title="Send Invitation" width="w-[560px]">
            <p className="text-zinc-500 text-sm -mt-6 mb-6">
                Invite a jockey to ride your horse in a tournament.
            </p>

            {loadingData ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    <span className="ml-2 text-zinc-500 text-sm">Loading...</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Jockey */}
                    <div>
                        <label className={labelClass}>Jockey *</label>
                        <div className="relative">
                            <select
                                name="jockeyId"
                                value={form.jockeyId}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select a jockey...</option>
                                {jockeys.map((j) => (
                                    <option key={j.userId} value={j.userId}>
                                        {j.user?.fullName || j.fullName || `Jockey #${j.userId}`}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={14}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* Horse */}
                    <div>
                        <label className={labelClass}>Horse *</label>
                        <div className="relative">
                            <select
                                name="horseId"
                                value={form.horseId}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select a horse...</option>
                                {horses.map((h) => (
                                    <option key={h.horseId} value={h.horseId}>
                                        {h.horseName}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={14}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                            />
                        </div>
                        {horses.length === 0 && (
                            <p className="text-xs text-zinc-400 mt-1">
                                You have no registered horses. Please add a horse first.
                            </p>
                        )}
                    </div>

                    {/* Tournament */}
                    <div>
                        <label className={labelClass}>Tournament *</label>
                        <div className="relative">
                            <select
                                name="tourId"
                                value={form.tourId}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select a tournament...</option>
                                {tournaments.map((t) => (
                                    <option key={t.tourId} value={t.tourId}>
                                        {t.tourName}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={14}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className={labelClass}>Message (optional)</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={3}
                            maxLength={1000}
                            placeholder="Write a message to the jockey..."
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 placeholder:text-zinc-400"
                        />
                        <p className="text-xs text-zinc-400 mt-1 text-right">
                            {form.message.length}/1000
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 font-semibold text-sm hover:bg-zinc-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <Loader2 size={15} className="animate-spin" />
                            ) : (
                                <Send size={15} />
                            )}
                            {submitting ? "Sending..." : "Send Invitation"}
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
}

export default SendInvitationModal;
