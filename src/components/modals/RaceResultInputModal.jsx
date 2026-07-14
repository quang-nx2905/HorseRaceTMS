import { useState, useEffect } from "react";
import { X, Save, Clock, Trophy, AlertTriangle } from "lucide-react";
import raceApi from "../../api/raceApi";
import { toast } from "react-hot-toast";

function RaceResultInputModal({ open, onClose, race }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && race && race.participants) {
            // Initialize form state with participants
            const initialResults = race.participants.map(p => ({
                participantId: p.participantId,
                horseName: p.horseName,
                horseId: p.horseId,
                horseAvatar: p.horseAvatar,
                jockeyName: p.jockeyName,
                laneNumber: p.laneNumber,
                rankPosition: "",
                finishTime: "00:00:00", // HH:mm:ss format
                resultStatus: "Finished"
            }));
            setResults(initialResults);
        }
    }, [open, race]);

    if (!open || !race) return null;

    const handleResultChange = (id, field, value) => {
        setResults(prev => prev.map(r => r.participantId === id ? { ...r, [field]: value } : r));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            // Format payload
            const payload = {
                participantResults: results.map(r => ({
                    participantId: r.participantId,
                    rankPosition: r.rankPosition ? parseInt(r.rankPosition) : null,
                    finishTime: r.finishTime || null,
                    resultStatus: r.resultStatus
                }))
            };

            await raceApi.submitResults(race.raceId, payload);
            toast.success("Race results submitted successfully!");
            onClose();
        } catch (error) {
            console.error("Failed to submit results", error);
            toast.error(error.response?.data?.message || "Failed to submit results.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-8 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between flex-shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-black text-zinc-900">Input Race Results</h2>
                        </div>
                        <p className="text-zinc-500 font-medium">
                            {race.raceName} (Round {race.round})
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-100 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex gap-4">
                        <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700 font-medium">
                            Please verify the finish times and rank positions carefully. Once submitted, these results will be visible to all users. Finish time must be in HH:mm:ss format.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-zinc-200">
                            <div className="col-span-1 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Lane</div>
                            <div className="col-span-4 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Participant</div>
                            <div className="col-span-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Rank</div>
                            <div className="col-span-3 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Finish Time</div>
                            <div className="col-span-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Status</div>
                        </div>

                        {results.map((res) => (
                            <div key={res.participantId} className="grid grid-cols-12 gap-4 items-center bg-zinc-50 border border-zinc-200 rounded-2xl p-3">
                                
                                {/* Lane */}
                                <div className="col-span-1 flex justify-center">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-200 text-zinc-600 flex items-center justify-center text-sm font-black shadow-inner">
                                        {res.laneNumber}
                                    </div>
                                </div>

                                {/* Participant */}
                                <div className="col-span-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 overflow-hidden flex-shrink-0 border border-amber-200">
                                        <img src={res.horseAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${res.horseName}&backgroundColor=fef3c7`} alt={res.horseName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-zinc-900 truncate">{res.horseName}</p>
                                        <p className="text-[10px] text-zinc-500 font-semibold truncate">Jockey: {res.jockeyName}</p>
                                    </div>
                                </div>

                                {/* Rank */}
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Rank"
                                        value={res.rankPosition}
                                        onChange={(e) => handleResultChange(res.participantId, 'rankPosition', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-bold text-zinc-800"
                                        disabled={res.resultStatus !== 'Finished'}
                                    />
                                </div>

                                {/* Time */}
                                <div className="col-span-3 relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="time"
                                        step="1"
                                        value={res.finishTime}
                                        onChange={(e) => handleResultChange(res.participantId, 'finishTime', e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-bold text-zinc-800"
                                        disabled={res.resultStatus !== 'Finished'}
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-span-2">
                                    <select
                                        value={res.resultStatus}
                                        onChange={(e) => handleResultChange(res.participantId, 'resultStatus', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-bold text-zinc-800 cursor-pointer"
                                    >
                                        <option value="Finished">Finished</option>
                                        <option value="DNF">DNF (Did Not Finish)</option>
                                        <option value="DSQ">DSQ (Disqualified)</option>
                                    </select>
                                </div>

                            </div>
                        ))}
                    </div>

                </form>

                {/* Footer */}
                <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Results
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RaceResultInputModal;
