import Modal from "../common/Modal";
import { Trophy, Zap, Star, Activity } from "lucide-react";

function RankingDetailsModal({
    open,
    onClose,
    ranking,
}) {
    if (!ranking) return null;

    const isFirst = ranking.rank === 1;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title=""
        >
            <div className="-mt-6">
                {/* MODAL HERO BANNER */}
                <div className={`relative rounded-2xl p-6 overflow-hidden bg-gradient-to-br ${ranking.avatarBg} text-white shadow-lg mb-6`}>
                    <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                        {/* Rank Badge */}
                        <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
                            <span className="text-[10px] uppercase font-bold text-white/70 leading-none">Rank</span>
                            <span className="text-2xl font-black leading-none mt-1">
                                {isFirst ? "🏆" : `#${ranking.rank}`}
                            </span>
                        </div>

                        <div>
                            <span className="inline-block px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1">
                                {ranking.breed}
                            </span>
                            <h3 className="text-2xl font-black leading-tight tracking-tight">
                                {ranking.horse}
                            </h3>
                            <p className="text-white/80 text-xs font-medium">
                                Jockey: <strong className="text-white">{ranking.jockey}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* STATS DECK */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Championship Pts</p>
                            <h4 className="text-xl font-black text-zinc-800">{ranking.points.toLocaleString()}</h4>
                        </div>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Races Won</p>
                            <h4 className="text-xl font-black text-zinc-800">{ranking.wins} Wins</h4>
                        </div>
                    </div>
                </div>

                {/* PERFORMANCE PROFILE */}
                <div className="space-y-5 border-t border-zinc-100 pt-5">
                    {/* Win Rate Progress Bar */}
                    <div>
                        <div className="flex items-center justify-between text-xs font-bold text-zinc-500 mb-2">
                            <span>ESTIMATED WIN RATE</span>
                            <span className="text-zinc-800">{ranking.winRate || 50}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${ranking.avatarBg} rounded-full transition-all duration-500`}
                                style={{ width: `${ranking.winRate || 50}%` }}
                            />
                        </div>
                    </div>

                    {/* Recent Race Results Form */}
                    {ranking.form && (
                        <div>
                            <p className="text-xs font-bold text-zinc-500 mb-2">RECENT FORM (LAST 5 RACES)</p>
                            <div className="flex items-center gap-2">
                                {ranking.form.map((f, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 py-2 rounded-lg border text-center font-black text-xs ${
                                            f === "W"
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                                                : "bg-red-500/10 border-red-500/20 text-red-500"
                                        }`}
                                    >
                                        {f === "W" ? "WIN" : "LOSS"}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Summary Badges */}
                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400 font-semibold">Breed Lineage:</span>
                            <span className="font-bold text-zinc-700">{ranking.breed} Purebred</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400 font-semibold">Championship Tier:</span>
                            <span className="font-bold text-zinc-700 flex items-center gap-1">
                                {ranking.rank <= 3 ? (
                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ) : (
                                    <Activity className="w-3.5 h-3.5 text-zinc-400" />
                                )}
                                {ranking.rank <= 3 ? "Elite Podium Status" : "Active Division Pro"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                        Close Profile
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default RankingDetailsModal;
