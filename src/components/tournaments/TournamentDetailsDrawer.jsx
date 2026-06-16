import {
    X,
    CalendarDays,
    MapPin,
    Trophy,
    Users,
    TrendingUp,
    DollarSign,
    Flame,
    Clock,
    CheckCircle2,
    Globe,
    Activity,
    BarChart3,
    Star,
    Zap,
} from "lucide-react";

const STATUS_CONFIG = {
    Live: {
        badge: "bg-red-500/15 text-red-500 border border-red-500/25",
        icon: Flame,
        glow: "from-red-600/30 to-rose-600/20",
        pulse: true,
    },
    Upcoming: {
        badge: "bg-amber-500/15 text-amber-600 border border-amber-500/25",
        icon: Clock,
        glow: "from-amber-500/25 to-orange-500/15",
        pulse: false,
    },
    Completed: {
        badge: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/25",
        icon: CheckCircle2,
        glow: "from-emerald-500/25 to-teal-500/15",
        pulse: false,
    },
};

function InfoRow({ icon: Icon, label, value, accent }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-zinc-100/70 transition-colors">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${accent || "bg-zinc-200 text-zinc-600"}`}>
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider leading-none mb-0.5">{label}</p>
                <p className="font-bold text-zinc-800 text-sm">{value}</p>
            </div>
        </div>
    );
}

function TournamentDetailsDrawer({ open, onClose, tournament }) {
    if (!open || !tournament) return null;

    const cfg = STATUS_CONFIG[tournament.status] || STATUS_CONFIG.Upcoming;
    const Icon = cfg.icon;

    return (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* DRAWER PANEL */}
            <div
                className="relative w-full max-w-[520px] h-screen bg-white shadow-2xl overflow-y-auto border-l border-zinc-200"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
                <style>{`
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `}</style>

                {/* ── HEADER HERO BANNER ── */}
                <div className={`relative overflow-hidden bg-gradient-to-br ${cfg.glow} bg-zinc-900 p-8 pb-10 border-b border-zinc-200`}>
                    <div className="absolute inset-0 bg-zinc-950/85 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                                tournament.status === "Live"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : tournament.status === "Upcoming"
                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            }`}>
                                {cfg.pulse ? (
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                    </span>
                                ) : (
                                    <Icon className="w-3 h-3" />
                                )}
                                {tournament.status === "Live" ? "Live Now" : tournament.status}
                            </div>

                            <button
                                id="close-drawer-btn"
                                onClick={onClose}
                                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-black text-white leading-tight mb-3">{tournament.name}</h2>

                        <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-sm">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-zinc-500" />
                                {tournament.location}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            <span className="flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4 text-zinc-500" />
                                {tournament.date}
                            </span>
                        </div>

                        {/* Prize highlight */}
                        <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-amber-500/15 border border-amber-500/25 rounded-2xl">
                            <Trophy className="w-5 h-5 text-amber-400" />
                            <div>
                                <p className="text-[10px] text-amber-400/70 font-bold uppercase tracking-wider leading-none">Prize Pool</p>
                                <p className="text-2xl font-black text-amber-400 leading-tight">{tournament.prize}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── STATS GRID ── */}
                <div className="p-8">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-center hover:bg-zinc-100/70 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-3">
                                <Users className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Participants</p>
                            <p className="text-3xl font-black text-zinc-900">{tournament.participants || 24}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">Registered Horses</p>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-center hover:bg-zinc-100/70 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Audience</p>
                            <p className="text-3xl font-black text-zinc-900">{tournament.audience || "18.2K"}</p>
                            <p className="text-[10px] text-emerald-500 mt-0.5 font-bold">+24% vs last event</p>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-center hover:bg-zinc-100/70 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center mx-auto mb-3">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Revenue</p>
                            <p className="text-3xl font-black text-zinc-900">{tournament.revenue || "$1.4M"}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">Projected Total</p>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-center hover:bg-zinc-100/70 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">AI Prediction</p>
                            <p className="text-3xl font-black text-zinc-900">91%</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">Accuracy Score</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-zinc-100" />
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Event Information</p>
                        <div className="flex-1 h-px bg-zinc-100" />
                    </div>

                    <div className="space-y-3 mb-8">
                        <InfoRow
                            icon={MapPin}
                            label="Venue"
                            value={tournament.location}
                            accent="bg-blue-500/10 text-blue-500"
                        />
                        <InfoRow
                            icon={CalendarDays}
                            label="Date"
                            value={tournament.date}
                            accent="bg-amber-500/10 text-amber-500"
                        />
                        <InfoRow
                            icon={Trophy}
                            label="Prize Pool"
                            value={tournament.prize}
                            accent="bg-yellow-500/10 text-yellow-600"
                        />
                        <InfoRow
                            icon={Users}
                            label="Total Entries"
                            value={`${tournament.participants || 24} Horses registered`}
                            accent="bg-violet-500/10 text-violet-500"
                        />
                        <InfoRow
                            icon={Globe}
                            label="Broadcast"
                            value="International Live Stream"
                            accent="bg-emerald-500/10 text-emerald-500"
                        />
                    </div>

                    {/* Description */}
                    <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 mb-8">
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-3">About This Tournament</p>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            This premier championship gathers elite thoroughbreds and world-class jockeys in a fierce competition for championship glory. The event features multiple race rounds, a spectacular prize ceremony, and exclusive VIP hospitality packages for sponsors and guests.
                        </p>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl font-bold text-sm transition-all shadow-md"
                    >
                        Close Panel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TournamentDetailsDrawer;