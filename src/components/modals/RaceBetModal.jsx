import { useState, useEffect } from "react";
import { X, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import predictionApi from "../../api/predictionApi";

function RaceBetModal({ open, onClose, race, onSuccess }) {
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [betPoints, setBetPoints] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            setSelectedParticipant(null);
            setBetPoints("");
        }
    }, [open]);

    if (!open || !race) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedParticipant) {
            toast.error("Please select a horse to bet on.");
            return;
        }
        if (!betPoints || isNaN(betPoints) || Number(betPoints) <= 0) {
            toast.error("Please enter a valid bet amount.");
            return;
        }

        try {
            setLoading(true);
            await predictionApi.placeBet({
                raceId: race.raceId,
                participantId: selectedParticipant.participantId,
                betPoints: Number(betPoints)
            });
            toast.success("Bet placed successfully!");
            window.dispatchEvent(new Event("spectator-points-updated"));
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to place bet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
            <div 
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-200 animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                    <div>
                        <h2 className="text-xl font-black text-zinc-900 tracking-tight">Place Your Bet</h2>
                        <p className="text-sm text-zinc-500 font-medium mt-1">
                            {race.raceName} (Round {race.round})
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-zinc-800 mb-3">1. Select a Horse to Win</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                            {race.participants?.map(p => {
                                const isSelected = selectedParticipant?.participantId === p.participantId;
                                return (
                                    <div 
                                        key={p.participantId}
                                        onClick={() => setSelectedParticipant(p)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                                            isSelected 
                                                ? 'border-amber-500 bg-amber-50/50' 
                                                : 'border-zinc-100 hover:border-zinc-200 bg-white'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-zinc-300'
                                        }`}>
                                            {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-200 shadow-sm">
                                            <img src={p.horseAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${p.horseName || p.horseId}&backgroundColor=fef3c7`} alt={p.horseName} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className={`font-bold text-sm ${isSelected ? 'text-amber-900' : 'text-zinc-800'}`}>
                                                {p.horseName || `Horse #${p.horseId}`}
                                            </p>
                                            <p className="text-xs text-zinc-500 font-medium">Lane {p.laneNumber}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-zinc-800 mb-3">2. Enter Bet Amount (Points)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <DollarSign className="w-5 h-5 text-zinc-400" />
                            </div>
                            <input
                                type="number"
                                value={betPoints}
                                onChange={(e) => setBetPoints(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-bold text-zinc-800 text-lg placeholder:font-medium placeholder:text-zinc-400"
                                placeholder="0.00"
                                min="0"
                                step="0.1"
                                required
                            />
                        </div>
                        <div className="flex items-start gap-2 mt-3 text-amber-600 bg-amber-50 p-3 rounded-xl">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <p className="text-xs font-semibold">
                                You will receive {race.rewardRatio || 2.0}x your bet amount if your selected horse wins 1st place!
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !selectedParticipant || !betPoints}
                            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Place Bet"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RaceBetModal;
