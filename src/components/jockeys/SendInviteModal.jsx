import { useState, useEffect } from "react";
import { X, Loader2, Send } from "lucide-react";
import { getAllHorses } from "../../api/horseApi";
import tournamentApi from "../../api/tournamentApi";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function SendInviteModal({ open, onClose, jockey, onSubmit }) {
    const { user } = useAuth();
    const [horses, setHorses] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedHorse, setSelectedHorse] = useState("");
    const [selectedTour, setSelectedTour] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (open) {
            fetchOptions();
            setSelectedHorse("");
            setSelectedTour("");
            setMessage("");
        }
    }, [open]);

    const fetchOptions = async () => {
        setIsLoading(true);
        try {
            const [horsesRes, tourRes] = await Promise.all([
                getAllHorses(),
                tournamentApi.getAll()
            ]);
            
            // Filter horses belonging to the current owner and that are approved
            const myHorses = (horsesRes || []).filter(h => 
                h.ownerId === Number(user?.id) && h.status === "Approved"
            );
            setHorses(myHorses);
            setTournaments(tourRes.data || []);
        } catch (error) {
            console.error("Failed to fetch options", error);
            toast.error("Failed to load horses and tournaments");
        } finally {
            setIsLoading(false);
        }
    };

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedHorse || !selectedTour) {
            toast.error("Please select both a horse and a tournament.");
            return;
        }

        onSubmit({
            jockeyId: jockey?.userId || jockey?.user?.id || jockey?.id,
            horseId: Number(selectedHorse),
            tourId: Number(selectedTour),
            message
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                    <div>
                        <h2 className="text-xl font-black text-zinc-900">Send Invitation</h2>
                        <p className="text-zinc-500 text-sm mt-1">
                            Invite <span className="font-bold text-zinc-800">{jockey?.user?.fullName || jockey?.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 size={32} className="animate-spin text-yellow-500 mb-4" />
                            <p className="text-zinc-500 text-sm font-medium">Loading your horses...</p>
                        </div>
                    ) : (
                        <form id="invite-form" onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Horse Selection */}
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-1.5">
                                    Select Horse <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedHorse}
                                    onChange={(e) => setSelectedHorse(e.target.value)}
                                    required
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400 outline-none transition-all"
                                >
                                    <option value="" disabled>Choose a horse</option>
                                    {horses.map(h => (
                                        <option key={h.horseId || h.id} value={h.horseId || h.id}>
                                            {h.horseName || h.name} ({h.breed || "Unknown Breed"})
                                        </option>
                                    ))}
                                </select>
                                {horses.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">You have no approved horses available.</p>
                                )}
                            </div>

                            {/* Tournament Selection */}
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-1.5">
                                    Select Tournament <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedTour}
                                    onChange={(e) => setSelectedTour(e.target.value)}
                                    required
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400 outline-none transition-all"
                                >
                                    <option value="" disabled>Choose a tournament</option>
                                    {tournaments.map(t => (
                                        <option key={t.tourId || t.id} value={t.tourId || t.id}>
                                            {t.tourName || t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-1.5">
                                    Message (Optional)
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Add a personal message to the jockey..."
                                    rows={3}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-yellow-400/10 focus:border-yellow-400 outline-none transition-all resize-none"
                                />
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="invite-form"
                        disabled={isLoading || horses.length === 0 || !selectedHorse || !selectedTour}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        <Send size={16} />
                        Send Invite
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SendInviteModal;
