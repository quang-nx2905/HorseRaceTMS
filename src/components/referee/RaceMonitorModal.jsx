import { X, Activity } from "lucide-react";

function RaceMonitorModal({
    open,
    onClose,
    race,
}) {
    if (!open || !race) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 w-full max-w-[500px] shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                            <Activity size={20} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            Race Monitor
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    
                    {/* Info Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                        
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Race Name</p>
                            <h3 className="font-bold text-white text-xl">{race.race}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Track Location</p>
                                <h3 className="font-bold text-zinc-300">{race.track}</h3>
                            </div>
                            
                            <div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Status</p>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
                                    <span className={`w-2 h-2 rounded-full ${
                                        race.status === "Live" ? "bg-red-500 animate-pulse" : 
                                        race.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"
                                    }`} />
                                    <h3 className="font-bold text-sm text-white">{race.status}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Participating Horses</p>
                            <div className="flex items-end gap-2">
                                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                    {race.horses}
                                </h3>
                                <span className="text-zinc-500 font-medium mb-1">Horses</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default RaceMonitorModal;