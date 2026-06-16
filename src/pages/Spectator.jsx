import { useState } from "react";
import {
    Play,
    Eye,
    Users,
    Wifi,
    Star,
    MapPin,
    TrendingUp,
    Volume2,
    Maximize2,
    Radio,
    MessageSquare,
    Send,
    Flame,
    Clock,
    Trophy,
    ChevronRight,
    Signal,
} from "lucide-react";

const LIVE_RACES = [
    {
        race: "Golden Cup Final",
        viewers: "24.8K",
        track: "Tokyo Arena",
        status: "LIVE",
        laps: "6/8",
        leader: "Thunder Bolt",
        prize: "$250K",
    },
    {
        race: "Royal Derby",
        viewers: "18.2K",
        track: "London Track",
        status: "LIVE",
        laps: "3/10",
        leader: "Golden Sprint",
        prize: "$180K",
    },
];

const UPCOMING_RACES = [
    { race: "Night Sprint", track: "New York Stadium", time: "20:30 JST", prize: "$120K" },
    { race: "Dubai Masters", track: "Dubai Racing Club", time: "22:00 JST", prize: "$500K" },
    { race: "Singapore Open", track: "Singapore Racecourse", time: "23:15 JST", prize: "$210K" },
];

const FAN_REACTIONS = [
    { user: "RaceKing99", text: "Thunder Bolt is unstoppable! 🔥", time: "2s ago", hot: true },
    { user: "JockeyFan88", text: "Best race of the entire season! 🏆", time: "5s ago", hot: false },
    { user: "TokyoRacer", text: "What an incredible lead! ⚡", time: "11s ago", hot: true },
    { user: "DerbyLover", text: "Golden Sprint catching up fast!", time: "18s ago", hot: false },
    { user: "SpeedFreak", text: "100K viewers peaked just now 🎉", time: "25s ago", hot: false },
];

function Spectator() {
    const [chatMsg, setChatMsg] = useState("");
    const [reactions, setReactions] = useState(FAN_REACTIONS);
    const [selectedStream, setSelectedStream] = useState(LIVE_RACES[0]);

    const handleSend = () => {
        if (!chatMsg.trim()) return;
        setReactions([
            { user: "You", text: chatMsg, time: "now", hot: false },
            ...reactions,
        ]);
        setChatMsg("");
    };

    return (
        <div className="pb-12">
            {/* ═══════ HERO HEADER ═══════ */}
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-900 rounded-3xl p-8 mb-10 border border-zinc-800/60 shadow-xl">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-64 bg-blue-500/5 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            Broadcasting Live
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                            Spectator <span className="text-amber-400">Arena</span>
                        </h1>
                        <p className="text-zinc-400 text-base max-w-md">
                            Watch live race broadcasts, follow real-time standings, and engage with the global racing community.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 min-w-[270px]">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Live Viewers</p>
                            <p className="text-2xl font-black text-white">42K</p>
                            <p className="text-[9px] text-emerald-400 font-bold mt-0.5">+12%</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Streams</p>
                            <p className="text-2xl font-black text-white">8</p>
                            <p className="text-[9px] text-zinc-500 font-bold mt-0.5">Active</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Rating</p>
                            <p className="text-2xl font-black text-amber-400">4.9</p>
                            <p className="text-[9px] text-zinc-500 font-bold mt-0.5">★★★★★</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════ MAIN CONTENT GRID ═══════ */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* ── LEFT: Main stream + live races list ── */}
                <div className="xl:col-span-2 space-y-6">
                    {/* VIDEO PLAYER */}
                    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                        {/* Video area */}
                        <div className="relative bg-zinc-950 h-[380px] flex items-center justify-center overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
                            <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl" />

                            {/* Center play area */}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <button className="group w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center mb-5 transition-all hover:scale-110">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </button>
                                <p className="text-white font-black text-2xl mb-1">{selectedStream.race}</p>
                                <p className="text-zinc-400 text-sm flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {selectedStream.track}
                                </p>
                            </div>

                            {/* LIVE badge overlay */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-red-600/90 backdrop-blur-sm rounded-full">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                <span className="text-xs text-white font-black tracking-widest">LIVE</span>
                            </div>

                            {/* Viewer count overlay */}
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full">
                                <Users className="w-3.5 h-3.5 text-zinc-300" />
                                <span className="text-xs text-white font-bold">{selectedStream.viewers}</span>
                            </div>

                            {/* Controls overlay */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl text-white transition-colors">
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl text-white transition-colors">
                                        <Signal className="w-4 h-4" />
                                    </button>
                                </div>
                                <button className="p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl text-white transition-colors">
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Stream info bar */}
                        <div className="p-5 flex items-center justify-between border-b border-zinc-100">
                            <div>
                                <h3 className="font-black text-zinc-900 text-lg">{selectedStream.race}</h3>
                                <p className="text-zinc-500 text-sm mt-0.5">
                                    {selectedStream.track} · Lap {selectedStream.laps} · Leader: <strong className="text-zinc-700">{selectedStream.leader}</strong>
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-bold">
                                    <Trophy className="w-3 h-3 inline mr-1" />
                                    {selectedStream.prize}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* LIVE RACE SWITCHER */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                            <Flame className="w-5 h-5 text-red-500" />
                            Live Events
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {LIVE_RACES.map((r) => (
                                <button
                                    key={r.race}
                                    onClick={() => setSelectedStream(r)}
                                    className={`text-left p-4 rounded-2xl border transition-all ${
                                        selectedStream.race === r.race
                                            ? "bg-zinc-950 border-zinc-800 text-white shadow-lg"
                                            : "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-bold text-sm">{r.race}</p>
                                        <span className="flex items-center gap-1 text-[10px] font-black text-red-500">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                                            </span>
                                            LIVE
                                        </span>
                                    </div>
                                    <p className={`text-xs mb-2 ${selectedStream.race === r.race ? "text-zinc-400" : "text-zinc-500"}`}>{r.track}</p>
                                    <div className="flex items-center gap-3 text-xs font-bold">
                                        <span className={`flex items-center gap-1 ${selectedStream.race === r.race ? "text-zinc-300" : "text-zinc-500"}`}>
                                            <Users className="w-3 h-3" /> {r.viewers}
                                        </span>
                                        <span className={`flex items-center gap-1 ${selectedStream.race === r.race ? "text-amber-400" : "text-amber-600"}`}>
                                            <Trophy className="w-3 h-3" /> {r.prize}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* UPCOMING SCHEDULE */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-zinc-500" />
                            Upcoming Races
                        </h3>
                        <div className="space-y-3">
                            {UPCOMING_RACES.map((r) => (
                                <div key={r.race} className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-100 rounded-2xl hover:bg-zinc-100 transition-colors cursor-pointer group">
                                    <div>
                                        <p className="font-bold text-zinc-900 text-sm group-hover:text-amber-600 transition-colors">{r.race}</p>
                                        <p className="text-zinc-500 text-xs mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{r.track}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-right">
                                        <div>
                                            <p className="text-xs font-bold text-zinc-500">{r.time}</p>
                                            <p className="text-xs font-black text-amber-600">{r.prize}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Fan chat ── */}
                <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm flex flex-col overflow-hidden" style={{ maxHeight: "720px" }}>
                    <div className="p-5 border-b border-zinc-100 flex-shrink-0">
                        <h3 className="font-black text-zinc-900 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-violet-500" />
                            Fan Reactions
                        </h3>
                        <p className="text-zinc-500 text-xs mt-0.5">{reactions.length} messages · Live feed</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-3">
                        {reactions.map((r, i) => (
                            <div key={i} className={`flex gap-3 ${r.user === "You" ? "flex-row-reverse" : ""}`}>
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs ${
                                    r.user === "You"
                                        ? "bg-amber-400 text-zinc-950"
                                        : "bg-zinc-200 text-zinc-600"
                                }`}>
                                    {r.user[0]}
                                </div>
                                <div className={r.user === "You" ? "text-right" : ""}>
                                    <div className={`flex items-center gap-2 mb-1 ${r.user === "You" ? "justify-end" : ""}`}>
                                        <span className="text-[10px] text-zinc-400 font-bold">{r.user}</span>
                                        {r.hot && <Flame className="w-3 h-3 text-red-400" />}
                                        <span className="text-[10px] text-zinc-300">{r.time}</span>
                                    </div>
                                    <div className={`inline-block px-3.5 py-2 rounded-2xl text-sm font-medium ${
                                        r.user === "You"
                                            ? "bg-amber-400 text-zinc-950 rounded-tr-sm"
                                            : "bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-tl-sm"
                                    }`}>
                                        {r.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat input */}
                    <div className="p-4 border-t border-zinc-100 flex-shrink-0">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Join the conversation..."
                                value={chatMsg}
                                onChange={(e) => setChatMsg(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 rounded-2xl outline-none text-sm transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="w-11 h-11 rounded-2xl bg-amber-400 hover:bg-amber-500 text-zinc-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Spectator;