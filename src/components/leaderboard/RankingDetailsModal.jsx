import Modal from "../common/Modal";
import { Trophy } from "lucide-react";

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
                <div className="relative rounded-3xl p-8 overflow-hidden bg-zinc-950 text-white shadow-2xl mb-6 border border-zinc-800">
                    <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                        {/* Horse Avatar */}
                        {ranking.imageUrl ? (
                            <img src={ranking.imageUrl} alt={ranking.horse} className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-2xl border-2 border-zinc-700/50" />
                        ) : (
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-zinc-800 flex items-center justify-center font-black text-5xl border-2 border-zinc-700/50 shadow-2xl text-white">
                                {ranking.horse?.split(" ").map(w => w[0]).join("").toUpperCase()}
                            </div>
                        )}

                        <div className="text-center sm:text-left sm:pt-4 flex flex-col justify-center h-full">
                            <div>
                                <span className="inline-block px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold uppercase tracking-widest mb-3 border border-zinc-700">
                                    {ranking.breed}
                                </span>
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight text-white">
                                {ranking.horse}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* STATS DECK */}
                <div className="grid grid-cols-1 mb-6">
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
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
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
