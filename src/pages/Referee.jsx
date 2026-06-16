import { useState, useMemo } from "react";
import {
    Shield,
    AlertTriangle,
    Users,
    Activity,
    Flame,
    Clock,
    CheckCircle2,
    Search,
    Eye,
    FileWarning,
    Settings2,
    Zap,
    MapPin,
    RadioTower,
    OctagonAlert,
} from "lucide-react";
import RaceMonitorModal from "../components/referee/RaceMonitorModal";
import IncidentReportModal from "../components/referee/IncidentReportModal";

const RACES_DATA = [
    {
        race: "Golden Cup Final",
        track: "Tokyo Arena",
        status: "Live",
        horses: 12,
        laps: "6 / 8",
        leader: "Thunder Bolt",
        incidents: 0,
    },
    {
        race: "Royal Derby",
        track: "London Track",
        status: "Pending",
        horses: 10,
        laps: "0 / 10",
        leader: "—",
        incidents: 1,
    },
    {
        race: "Night Sprint",
        track: "New York Stadium",
        status: "Completed",
        horses: 14,
        laps: "8 / 8",
        leader: "Silver Storm",
        incidents: 2,
    },
    {
        race: "Dubai Grand Prix",
        track: "Dubai Racing Club",
        status: "Pending",
        horses: 16,
        laps: "0 / 12",
        leader: "—",
        incidents: 0,
    },
];

const STATUS_CFG = {
    Live: {
        badge: "bg-red-500/10 text-red-500 border border-red-500/25",
        icon: Flame,
        pulse: true,
    },
    Pending: {
        badge: "bg-amber-500/10 text-amber-600 border border-amber-500/25",
        icon: Clock,
        pulse: false,
    },
    Completed: {
        badge: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/25",
        icon: CheckCircle2,
        pulse: false,
    },
};

function Referee() {
    const [search, setSearch] = useState("");
    const [openMonitor, setOpenMonitor] = useState(false);
    const [selectedRace, setSelectedRace] = useState(null);
    const [openIncident, setOpenIncident] = useState(false);
    const [emergencyActive, setEmergencyActive] = useState(false);

    const filtered = useMemo(() =>
        RACES_DATA.filter((r) =>
            r.race.toLowerCase().includes(search.toLowerCase()) ||
            r.track.toLowerCase().includes(search.toLowerCase())
        ), [search]);

    const liveCount = RACES_DATA.filter((r) => r.status === "Live").length;
    const pendingCount = RACES_DATA.filter((r) => r.status === "Pending").length;
    const totalIncidents = RACES_DATA.reduce((s, r) => s + r.incidents, 0);

    return (
        <div className="pb-12">
            {/* ═══════ DARK HERO HEADER ═══════ */}
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 rounded-3xl p-8 md:p-12 mb-10 border border-zinc-800/60 shadow-xl">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                            <RadioTower className="w-3.5 h-3.5" />
                            Command & Control Center
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                            Referee <span className="text-red-400">Panel</span>
                        </h1>
                        <p className="text-zinc-400 text-base max-w-md">
                            Real-time race monitoring, incident reporting, and emergency race control for all live and pending events.
                        </p>
                    </div>

                    {/* Emergency Stop button */}
                    <button
                        onClick={() => setEmergencyActive(!emergencyActive)}
                        className={`
                            flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all shadow-lg
                            ${emergencyActive
                                ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/40 animate-pulse"
                                : "bg-red-500 hover:bg-red-600 text-white shadow-red-500/25 hover:shadow-red-500/40"
                            }
                        `}
                    >
                        <OctagonAlert className="w-5 h-5" />
                        {emergencyActive ? "⚠ EMERGENCY ACTIVE" : "Emergency Stop"}
                    </button>
                </div>

                {/* Status pills */}
                <div className="relative z-10 flex flex-wrap gap-4 mt-8">
                    <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                        </span>
                        <span className="text-sm font-bold text-white">{liveCount} Live Now</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-bold text-white">{pendingCount} Pending</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <FileWarning className="w-4 h-4 text-orange-400" />
                        <span className="text-sm font-bold text-white">{totalIncidents} Incidents</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-white">14 Referees Online</span>
                    </div>
                </div>
            </div>

            {/* ═══════ SEARCH BAR ═══════ */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-4 mb-8 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search race or venue..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/15 rounded-2xl outline-none text-sm transition-all"
                    />
                </div>
            </div>

            {/* ═══════ RACE MONITOR CARDS ═══════ */}
            <div className="space-y-5">
                {filtered.map((item) => {
                    const cfg = STATUS_CFG[item.status] || STATUS_CFG.Pending;
                    const StatusIcon = cfg.icon;

                    return (
                        <div
                            key={item.race}
                            className="group bg-white border border-zinc-200 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                        >
                            {/* Top status stripe */}
                            <div className={`h-1 w-full ${
                                item.status === "Live" ? "bg-gradient-to-r from-red-500 to-rose-500" :
                                item.status === "Pending" ? "bg-gradient-to-r from-amber-400 to-orange-400" :
                                "bg-gradient-to-r from-emerald-400 to-teal-500"
                            }`} />

                            <div className="p-7">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                    {/* Race info */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h2 className="text-xl font-black text-zinc-900 group-hover:text-red-600 transition-colors">
                                                {item.race}
                                            </h2>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.badge}`}>
                                                {cfg.pulse ? (
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                                                    </span>
                                                ) : (
                                                    <StatusIcon className="w-3 h-3" />
                                                )}
                                                {item.status}
                                            </span>
                                            {item.incidents > 0 && (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-200">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    {item.incidents} Incident{item.incidents > 1 ? "s" : ""}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-zinc-500 text-sm flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" /> {item.track}
                                        </p>
                                    </div>

                                    {/* Race stats row */}
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="text-center px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl">
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Horses</p>
                                            <p className="text-xl font-black text-zinc-900">{item.horses}</p>
                                        </div>
                                        <div className="text-center px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl">
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Laps</p>
                                            <p className="text-xl font-black text-zinc-900">{item.laps}</p>
                                        </div>
                                        <div className="text-center px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl">
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Leader</p>
                                            <p className="text-sm font-bold text-zinc-800 truncate max-w-[100px]">{item.leader}</p>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2.5">
                                        <button
                                            onClick={() => { setSelectedRace(item); setOpenMonitor(true); }}
                                            className="flex items-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold transition-all"
                                        >
                                            <Activity className="w-4 h-4" />
                                            Monitor
                                        </button>
                                        <button
                                            onClick={() => { setSelectedRace(item); setOpenIncident(true); }}
                                            className="flex items-center gap-2 px-4 py-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-2xl text-xs font-bold border border-orange-200 transition-all"
                                        >
                                            <FileWarning className="w-4 h-4" />
                                            Report
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 rounded-2xl text-xs font-bold border border-zinc-200 transition-all">
                                            <Settings2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <RaceMonitorModal
                open={openMonitor}
                onClose={() => setOpenMonitor(false)}
                race={selectedRace}
            />
            <IncidentReportModal
                open={openIncident}
                onClose={() => setOpenIncident(false)}
                race={selectedRace}
            />
        </div>
    );
}

export default Referee;