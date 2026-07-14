import { useState, useEffect } from "react";
import { X, Trophy, Clock, Medal } from "lucide-react";
import raceApi from "../../api/raceApi";

function RaceViewResultsModal({ open, onClose, race }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (open && race) {
            fetchResults();
        } else {
            setResults([]);
            setError(null);
        }
    }, [open, race]);

    const fetchResults = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await raceApi.getResults(race.raceId);
            setResults(res.data?.data || res.data || []);
        } catch (err) {
            console.error("Failed to fetch results", err);
            setError("Failed to load results. They might not be available yet.");
        } finally {
            setLoading(false);
        }
    };

    if (!open || !race) return null;

    const getRankStyle = (rank) => {
        if (rank === 1) return "bg-yellow-400 text-yellow-900 border-yellow-500 shadow-yellow-400/50 shadow-lg";
        if (rank === 2) return "bg-zinc-300 text-zinc-800 border-zinc-400 shadow-zinc-400/50 shadow-md";
        if (rank === 3) return "bg-amber-600 text-amber-100 border-amber-700 shadow-amber-600/50 shadow-md";
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-3xl bg-zinc-950 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-zinc-800">
                
                {/* Header */}
                <div className="p-8 border-b border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-between flex-shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-500 flex items-center justify-center">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Official Results</h2>
                        </div>
                        <p className="text-zinc-400 font-medium">
                            {race.raceName} (Round {race.round})
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="relative z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center p-10">
                            <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-center p-10 bg-zinc-900 rounded-2xl border border-zinc-800 border-dashed">
                            <p className="text-zinc-400">{error}</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center p-10 bg-zinc-900 rounded-2xl border border-zinc-800 border-dashed">
                            <p className="text-zinc-400">No results have been published for this race yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {results.map((res, index) => {
                                const rankDisplay = res.resultStatus === 'Finished' ? res.rankPosition : res.resultStatus;
                                const isTop3 = res.resultStatus === 'Finished' && res.rankPosition <= 3;

                                return (
                                    <div 
                                        key={res.participantId} 
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                            isTop3 
                                            ? 'bg-gradient-to-r from-zinc-900 to-zinc-800 border-zinc-700/50 hover:border-amber-500/50' 
                                            : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                                        }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            {/* Rank Badge */}
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border ${
                                                res.resultStatus === 'Finished' ? getRankStyle(res.rankPosition) : 'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                                {res.resultStatus === 'Finished' ? (
                                                    res.rankPosition === 1 ? <Medal className="w-6 h-6" /> : res.rankPosition
                                                ) : (
                                                    <span className="text-sm">{res.resultStatus}</span>
                                                )}
                                            </div>

                                            {/* Horse & Jockey */}
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-700 flex-shrink-0 bg-white">
                                                    <img src={res.horseAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${res.horseName}&backgroundColor=fef3c7`} alt={res.horseName} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white leading-tight">{res.horseName}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-medium text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-md">Lane {res.laneNumber}</span>
                                                        <span className="text-xs font-semibold text-zinc-400">Jockey: {res.jockeyName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Time */}
                                        <div className="text-right pl-4 border-l border-zinc-800">
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Finish Time</p>
                                            <div className="flex items-center gap-1.5 text-zinc-300 font-mono font-medium bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
                                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                                                {res.finishTime || '--:--:--'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-center flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white hover:bg-zinc-200 text-black rounded-xl font-bold transition-all shadow-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RaceViewResultsModal;
