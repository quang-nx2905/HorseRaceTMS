import { useState, useMemo, useEffect } from "react";
import {
    Shield,
    AlertTriangle,
    Users,
    Activity,
    Flame,
    Clock,
    CheckCircle2,
    Search,
    FileWarning,
    Settings2,
    MapPin,
    RadioTower,
    OctagonAlert,
    ChevronDown,
    ChevronRight,
    Trophy
} from "lucide-react";
import RaceMonitorModal from "../components/referee/RaceMonitorModal";
import IncidentReportModal from "../components/referee/IncidentReportModal";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const STATUS_CFG = {
    LIVE: {
        badge: "bg-red-500/15 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
        icon: Flame,
        pulse: true,
    },
    Pending: {
        badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        icon: Clock,
        pulse: false,
    },
    Completed: {
        badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        icon: CheckCircle2,
        pulse: false,
    },
};

function Referee() {
    const { user } = useAuth();
    const [search, setSearch] = useState("");
    const [openMonitor, setOpenMonitor] = useState(false);
    const [selectedRace, setSelectedRace] = useState(null);
    const [openIncident, setOpenIncident] = useState(false);
    const [emergencyActive, setEmergencyActive] = useState(false);
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedTournaments, setExpandedTournaments] = useState({});

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const res = await axiosClient.get("/Races/referee-list");
                setRaces(res.data);
                // Expand all by default
                const grouped = res.data.reduce((acc, r) => {
                    if (!acc[r.tournamentName]) acc[r.tournamentName] = [];
                    acc[r.tournamentName].push(r);
                    return acc;
                }, {});
                const initialExpanded = Object.keys(grouped).reduce((acc, t) => {
                    acc[t] = false;
                    return acc;
                }, {});
                setExpandedTournaments(initialExpanded);
            } catch (err) {
                console.error("Failed to fetch races for referee", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRaces();
    }, []);

    const toggleTournament = (tName) => {
        setExpandedTournaments(prev => ({ ...prev, [tName]: !prev[tName] }));
    };

    const filtered = useMemo(() =>
        races.filter((r) =>
            r.raceName.toLowerCase().includes(search.toLowerCase()) ||
            r.track.toLowerCase().includes(search.toLowerCase()) ||
            r.tournamentName.toLowerCase().includes(search.toLowerCase())
        ), [search, races]);

    const liveCount = races.filter((r) => ["LIVE", "Live", "Started", "Ongoing"].includes(r.status)).length;
    const pendingCount = races.filter((r) => ["Pending", "Upcoming", "Scheduled"].includes(r.status)).length;
    const totalIncidents = races.reduce((s, r) => s + (r.incidentsCount || 0), 0);

    const groupedRaces = useMemo(() => {
        return filtered.reduce((acc, race) => {
            if (!acc[race.tournamentName]) {
                acc[race.tournamentName] = [];
            }
            acc[race.tournamentName].push(race);
            return acc;
        }, {});
    }, [filtered]);

    return (
        <div className="pb-12 bg-zinc-950 min-h-screen text-zinc-200">
            {/* ═══════ DARK HERO HEADER ═══════ */}
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-b-[40px] p-8 md:p-12 mb-10 border-b border-zinc-800/60 shadow-2xl">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/40 text-red-400 rounded-full text-xs font-black uppercase tracking-widest mb-5 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                            <RadioTower className="w-4 h-4 animate-pulse" />
                            Command & Control Center
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-tight mb-4">
                            Referee <span className="text-red-500">Panel</span>
                        </h1>
                        <p className="text-zinc-400 text-base md:text-lg max-w-xl font-medium leading-relaxed">
                            {user?.role === "Admin" ? "Global overview of all races." : "Manage and monitor your assigned races."} Real-time race monitoring, incident reporting, and emergency control.
                        </p>
                    </div>

                </div>

                {/* Status pills */}
                <div className="relative z-10 flex flex-wrap gap-4 mt-10">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                        </span>
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Live Races</p>
                            <p className="text-lg font-black text-white leading-none">{liveCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                        <Clock className="w-5 h-5 text-amber-400" />
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Pending</p>
                            <p className="text-lg font-black text-white leading-none">{pendingCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                        <FileWarning className="w-5 h-5 text-orange-400" />
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Incidents</p>
                            <p className="text-lg font-black text-white leading-none">{totalIncidents}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* ═══════ SEARCH BAR ═══════ */}
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by race, tournament, or venue..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-2xl text-white outline-none transition-all shadow-lg placeholder:text-zinc-600 font-medium"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : Object.keys(groupedRaces).length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
                        <Shield className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Races Found</h3>
                        <p className="text-zinc-500">You have no assigned races matching your criteria.</p>
                    </div>
                ) : (
                    /* ═══════ RACE LIST BY TOURNAMENT ═══════ */
                    <div className="space-y-6">
                        {Object.entries(groupedRaces).map(([tournamentName, tournamentRaces]) => {
                            const isExpanded = expandedTournaments[tournamentName];
                            return (
                                <div key={tournamentName} className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300">
                                    {/* Tournament Header with Banner */}
                                    <button
                                        onClick={() => toggleTournament(tournamentName)}
                                        className="relative w-full flex items-center justify-between p-8 transition-colors overflow-hidden group"
                                    >
                                        {/* Background Banner */}
                                        <div className="absolute inset-0 bg-zinc-900 z-0">
                                            {tournamentRaces[0]?.tournamentBanner ? (
                                                <>
                                                    <img 
                                                        src={tournamentRaces[0].tournamentBanner} 
                                                        alt="Tournament Banner" 
                                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent"></div>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent hover:bg-white/[0.08]"></div>
                                            )}
                                        </div>

                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                                <Trophy className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1 shadow-black drop-shadow-md">Tournament</p>
                                                <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-lg">{tournamentName}</h2>
                                            </div>
                                        </div>
                                        <div className="relative z-10 flex items-center gap-4">
                                            <span className="px-3 py-1 bg-black/60 text-zinc-300 rounded-full text-xs font-bold border border-white/10 backdrop-blur-md">
                                                {tournamentRaces.length} Race{tournamentRaces.length > 1 ? "s" : ""}
                                            </span>
                                            <div className={`p-2 rounded-xl bg-black/40 backdrop-blur-md transition-transform duration-300 border border-white/10 ${isExpanded ? "rotate-180" : ""}`}>
                                                <ChevronDown className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </button>

                                    {/* Races List */}
                                    <div className={`transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}>
                                        <div className="p-6 pt-2 space-y-4">
                                            {tournamentRaces.map((item) => {
                                                const cfg = STATUS_CFG[item.status] || STATUS_CFG.Pending;
                                                const StatusIcon = cfg.icon;

                                                return (
                                                    <div
                                                        key={item.raceId}
                                                        className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:-translate-y-1"
                                                    >
                                                        {/* Glow effect on hover */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                                                        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                                                            
                                                            {/* Race Info */}
                                                            <div className="flex-1">
                                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                                    <h3 className="text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                                                                        {item.raceName}
                                                                    </h3>
                                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${cfg.badge}`}>
                                                                        {cfg.pulse ? (
                                                                            <span className="relative flex h-2 w-2">
                                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                                                            </span>
                                                                        ) : (
                                                                            <StatusIcon className="w-3.5 h-3.5" />
                                                                        )}
                                                                        {item.status}
                                                                    </span>
                                                                    {item.incidentsCount > 0 && (
                                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                                                            <AlertTriangle className="w-3.5 h-3.5" />
                                                                            {item.incidentsCount} Incident{item.incidentsCount > 1 ? "s" : ""}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-zinc-500 text-sm font-medium flex items-center gap-2">
                                                                    <MapPin className="w-4 h-4 text-zinc-600" /> {item.track}
                                                                </p>
                                                            </div>

                                                            {/* Stats */}
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <div className="px-5 py-3 bg-black/40 border border-white/5 rounded-xl min-w-[100px] shadow-inner">
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Horses</p>
                                                                    <p className="text-xl font-black text-white">{item.horsesCount}</p>
                                                                </div>
                                                                <div className="px-5 py-3 bg-black/40 border border-white/5 rounded-xl min-w-[100px] shadow-inner">
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Laps</p>
                                                                    <p className="text-xl font-black text-white">{item.laps}</p>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
                                                                <button
                                                                    onClick={() => { setSelectedRace({...item, race: item.raceName, horses: item.horsesCount, incidents: item.incidentsCount}); setOpenMonitor(true); }}
                                                                    className="flex-1 xl:flex-none flex justify-center items-center gap-2 px-6 py-4 bg-white/90 hover:bg-white text-black rounded-xl text-sm font-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                                                >
                                                                    <Activity className="w-5 h-5" />
                                                                    Monitor
                                                                </button>
                                                                <button
                                                                    onClick={() => { setSelectedRace({...item, race: item.raceName, horses: item.horsesCount, incidents: item.incidentsCount}); setOpenIncident(true); }}
                                                                    className="flex-1 xl:flex-none flex justify-center items-center gap-2 px-6 py-4 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-xl text-sm font-black border border-orange-500/20 transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                                                                >
                                                                    <FileWarning className="w-5 h-5" />
                                                                    Report
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
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