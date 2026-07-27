import { useState, useMemo, useEffect } from "react";
import {
    Shield,
    AlertTriangle,
    Activity,
    Flame,
    Clock,
    CheckCircle2,
    Search,
    FileWarning,
    MapPin,
    ChevronDown,
    Trophy,
    ClipboardPenLine,
    Eye,
    LockKeyhole
} from "lucide-react";
import RaceMonitorModal from "../components/referee/RaceMonitorModal";
import IncidentReportModal from "../components/referee/IncidentReportModal";
import RaceResultInputModal from "../components/modals/RaceResultInputModal";
import RaceViewResultsModal from "../components/modals/RaceViewResultsModal";
import axiosClient from "../api/axiosClient";
import raceApi from "../api/raceApi";
import raceRegistrationApi from "../api/raceRegistrationApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const STATUS_CFG = {
    LIVE: {
        badge: "bg-red-50 text-red-600 border border-red-200",
        icon: Flame,
        pulse: true,
    },
    Racing: {
        badge: "bg-red-50 text-red-600 border border-red-200",
        icon: Flame,
        pulse: true,
    },
    Pending: {
        badge: "bg-amber-50 text-amber-700 border border-amber-200",
        icon: Clock,
        pulse: false,
    },
    Completed: {
        badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
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
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [expandedTournaments, setExpandedTournaments] = useState({});
    const [openResultInput, setOpenResultInput] = useState(false);
    const [openResultView, setOpenResultView] = useState(false);
    const [loadingParticipants, setLoadingParticipants] = useState(null);
    const [viewMode, setViewMode] = useState("my");

    const fetchRaces = async () => {
        try {
            setLoading(true);
            setLoadError("");
            const endpoint = viewMode === "my" ? "/Races/referee-list" : "/Races";
            const res = await axiosClient.get(endpoint);
            const latestFirst = [...res.data].sort((a, b) => {
                const tournamentOrder =
                    Number(b.tournamentId || 0) - Number(a.tournamentId || 0);
                return tournamentOrder !== 0
                    ? tournamentOrder
                    : Number(b.raceId || 0) - Number(a.raceId || 0);
            });
            setRaces(latestFirst);
            const grouped = latestFirst.reduce((acc, r) => {
                if (!acc[r.tournamentName]) acc[r.tournamentName] = [];
                acc[r.tournamentName].push(r);
                return acc;
            }, {});
            setExpandedTournaments(prev => Object.keys(grouped).reduce((acc, t) => {
                acc[t] = prev[t] ?? false;
                return acc;
            }, {}));
        } catch (err) {
            console.error("Failed to fetch races for referee", err);
            setLoadError(err.response?.data?.message || "Failed to load races.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Promise.resolve().then(fetchRaces);
    }, [viewMode]);

    const openInputResults = async (race) => {
        try {
            setLoadingParticipants(race.raceId);
            const res = await axiosClient.get(`/Races/${race.raceId}/participants`);
            setSelectedRace({
                ...race,
                round: race.laps,
                participants: res.data
            });
            setOpenResultInput(true);
        } catch (err) {
            console.error("Failed to load race participants", err);
            toast.error("Failed to load race participants.");
        } finally {
            setLoadingParticipants(null);
        }
    };

    const markRaceCompleted = async (race) => {
        try {
            await raceApi.updateStatus(race.raceId, "Completed");
            toast.success("Race marked as completed. You can now input the official results.");
            await fetchRaces();
        } catch (err) {
            console.error("Failed to complete race", err);
            toast.error(err.response?.data?.message || "Failed to mark the race as completed.");
        }
    };

    const startRace = async (race) => {
        try {
            await raceRegistrationApi.start(race.raceId);
            toast.success("Race started successfully.");
            await fetchRaces();
        } catch (err) {
            console.error("Failed to start race", err);
            toast.error(err.response?.data?.message || "Failed to start the race.");
        }
    };

    const toggleTournament = (tName) => {
        setExpandedTournaments(prev => ({ ...prev, [tName]: !prev[tName] }));
    };

    const filtered = useMemo(() =>
        races.filter((r) =>
            r.raceName.toLowerCase().includes(search.toLowerCase()) ||
            r.track.toLowerCase().includes(search.toLowerCase()) ||
            r.tournamentName.toLowerCase().includes(search.toLowerCase())
        ), [search, races]);

    const liveCount = races.filter((r) => ["LIVE", "Live", "Started", "Ongoing", "Racing"].includes(r.status)).length;
    const pendingCount = races.filter((r) => ["Pending", "Upcoming", "Scheduled"].includes(r.status)).length;
    const totalIncidents = races.reduce((s, r) => s + (r.incidentsCount || 0), 0);
    const actionCount = races.filter(r =>
        ["Registration Closed", "Ready To Start"].includes(r.status)
        || (r.status === "Completed" && !r.hasResults)
    ).length;

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
        <div className="min-h-screen bg-[#f6f6f4] pb-16 text-zinc-900">
            <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
            {/* ═══════ COMPACT OPERATIONS HERO ═══════ */}
            <div className="relative mb-7 overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950 p-7 shadow-xl shadow-zinc-900/10 md:p-10">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-amber-500/20 blur-[90px]" />
                    <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-[80px]" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="flex-1">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">
                            <Shield className="h-3.5 w-3.5" />
                            Official Race Operations
                        </div>
                        <h1 className="mb-3 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
                            Race <span className="text-amber-400">Duties</span>
                        </h1>
                        <p className="max-w-xl text-sm font-medium leading-6 text-zinc-400 md:text-base">
                            {viewMode === "my"
                                ? "Manage your assigned races from start to official result submission."
                                : "Browse all races across every tournament. Operational actions remain available only in My Duties."}
                        </p>
                    </div>

                </div>

                {/* Status pills */}
                <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                        </span>
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Live Races</p>
                            <p className="text-lg font-black text-white leading-none">{liveCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
                        <Clock className="w-5 h-5 text-amber-400" />
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Pending</p>
                            <p className="text-lg font-black text-white leading-none">{pendingCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
                        <FileWarning className="w-5 h-5 text-orange-400" />
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Incidents</p>
                            <p className="text-lg font-black text-white leading-none">{totalIncidents}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 backdrop-blur-md">
                        <ClipboardPenLine className="h-5 w-5 text-amber-300" />
                        <div>
                            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200/70">Action Required</p>
                            <p className="text-lg font-black leading-none text-white">{actionCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="mb-4 inline-flex rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setViewMode("my")}
                        className={`rounded-xl px-5 py-2.5 text-sm font-black transition-all ${
                            viewMode === "my"
                                ? "bg-zinc-950 text-white shadow-md"
                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                        }`}
                    >
                        My Duties
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode("all")}
                        className={`rounded-xl px-5 py-2.5 text-sm font-black transition-all ${
                            viewMode === "all"
                                ? "bg-amber-400 text-zinc-950 shadow-md"
                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                        }`}
                    >
                        All Races
                    </button>
                </div>

                {/* ═══════ SEARCH BAR ═══════ */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by race, tournament, or venue..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-4 font-medium text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : loadError ? (
                    <div className="text-center py-20 bg-red-500/5 border border-red-500/20 rounded-3xl">
                        <AlertTriangle className="w-16 h-16 text-red-500/60 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Unable to Load Race Duties</h3>
                        <p className="text-red-300/80 mb-6">{loadError}</p>
                        <button onClick={fetchRaces} className="px-5 py-3 rounded-xl bg-red-500 text-white font-black hover:bg-red-600">
                            Try Again
                        </button>
                    </div>
                ) : Object.keys(groupedRaces).length === 0 ? (
                    <div className="rounded-3xl border border-zinc-200 bg-white py-20 text-center shadow-sm">
                        <Shield className="mx-auto mb-4 h-16 w-16 text-zinc-200" />
                        <h3 className="mb-2 text-xl font-bold text-zinc-900">No Races Found</h3>
                        <p className="text-zinc-500">
                            {viewMode === "my"
                                ? "You have no assigned races matching your criteria."
                                : "No races match your criteria."}
                        </p>
                    </div>
                ) : (
                    /* ═══════ RACE LIST BY TOURNAMENT ═══════ */
                    <div className="space-y-6">
                        {Object.entries(groupedRaces).map(([tournamentName, tournamentRaces]) => {
                            const isExpanded = expandedTournaments[tournamentName];
                            return (
                                <div key={tournamentName} className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/60">
                                    {/* Tournament Header with Banner */}
                                    <button
                                        onClick={() => toggleTournament(tournamentName)}
                                        className="group relative flex w-full items-center justify-between overflow-hidden p-5 text-left transition-colors md:p-6"
                                    >
                                        {/* Background Banner */}
                                        <div className="absolute inset-0 z-0 bg-zinc-950">
                                            {tournamentRaces[0]?.tournamentBanner ? (
                                                <>
                                                    <img 
                                                        src={tournamentRaces[0].tournamentBanner} 
                                                        alt="Tournament Banner" 
                                                        className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-500 group-hover:scale-105 group-hover:opacity-45"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/40"></div>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent hover:bg-white/[0.08]"></div>
                                            )}
                                        </div>

                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 shadow-lg shadow-amber-500/20">
                                                <Trophy className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <p className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-amber-300">
                                                    {viewMode === "my" ? "Assigned Tournament" : "Tournament"}
                                                </p>
                                                <h2 className="text-xl font-black tracking-tight text-white md:text-2xl">{tournamentName}</h2>
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
                                        <div className="space-y-3 bg-zinc-50/80 p-4 md:p-5">
                                            {tournamentRaces.map((item) => {
                                                const cfg = STATUS_CFG[item.status] || STATUS_CFG.Pending;
                                                const StatusIcon = cfg.icon;

                                                return (
                                                    <div
                                                        key={item.raceId}
                                                        className="group relative rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-amber-300 hover:shadow-md"
                                                    >
                                                        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                                                            
                                                            {/* Race Info */}
                                                            <div className="flex-1">
                                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                                    <h3 className="text-xl font-black text-zinc-900 transition-colors group-hover:text-amber-700">
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
                                                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange-600">
                                                                            <AlertTriangle className="w-3.5 h-3.5" />
                                                                            {item.incidentsCount} Incident{item.incidentsCount > 1 ? "s" : ""}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                                                                    <MapPin className="h-4 w-4 text-amber-500" /> {item.track}
                                                                </p>
                                                            </div>

                                                            {/* Stats */}
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <div className="min-w-[88px] rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5">
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Horses</p>
                                                                    <p className="text-lg font-black text-zinc-900">{item.horsesCount}</p>
                                                                </div>
                                                                <div className="min-w-[88px] rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5">
                                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Laps</p>
                                                                    <p className="text-lg font-black text-zinc-900">{item.laps}</p>
                                                                </div>
                                                            </div>

                                                            {/* Role-based actions */}
                                                            <div className="mt-2 flex w-full flex-wrap items-center gap-2 xl:mt-0 xl:w-auto xl:justify-end">
                                                                {viewMode === "my" && ["Registration Closed", "Ready To Start"].includes(item.status) && (
                                                                    <button
                                                                        onClick={() => startRace(item)}
                                                                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition-all hover:bg-emerald-700"
                                                                    >
                                                                        <Flame className="w-5 h-5" />
                                                                        Start Race
                                                                    </button>
                                                                )}
                                                                {viewMode === "my" && ["Started", "Live", "LIVE", "Racing", "Ongoing"].includes(item.status) && (
                                                                    <button
                                                                        onClick={() => markRaceCompleted(item)}
                                                                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition-all hover:bg-red-700"
                                                                    >
                                                                        <CheckCircle2 className="w-5 h-5" />
                                                                        Mark Completed
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => { setSelectedRace({...item, race: item.raceName, horses: item.horsesCount, incidents: item.incidentsCount}); setOpenMonitor(true); }}
                                                                    className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-black text-white transition-all hover:bg-zinc-800"
                                                                >
                                                                    <Activity className="w-5 h-5" />
                                                                    Monitor
                                                                </button>
                                                                {viewMode === "my" && user?.role === "Referee" && (
                                                                    <button
                                                                        onClick={() => { setSelectedRace({...item, race: item.raceName, horses: item.horsesCount, incidents: item.incidentsCount}); setOpenIncident(true); }}
                                                                        className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-black text-orange-700 transition-all hover:bg-orange-100"
                                                                    >
                                                                        <FileWarning className="w-5 h-5" />
                                                                        Report Incident
                                                                    </button>
                                                                )}
                                                                {viewMode === "my" && user?.role === "Referee" && item.status === "Completed" && !item.hasResults && (
                                                                    <button
                                                                        disabled={loadingParticipants === item.raceId}
                                                                        onClick={() => openInputResults(item)}
                                                                        className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-black text-zinc-950 shadow-sm transition-all hover:bg-amber-500 disabled:opacity-50"
                                                                    >
                                                                        <ClipboardPenLine className="w-5 h-5" />
                                                                        {loadingParticipants === item.raceId ? "Loading..." : "Input Results"}
                                                                    </button>
                                                                )}
                                                                {user?.role === "Referee" && item.hasResults && (
                                                                    <span className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-sm font-black text-zinc-500">
                                                                        <LockKeyhole className="w-5 h-5" />
                                                                        Results Locked
                                                                    </span>
                                                                )}
                                                                {item.hasResults && (
                                                                    <button
                                                                        onClick={() => { setSelectedRace(item); setOpenResultView(true); }}
                                                                        className="flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-black text-amber-700 transition-all hover:bg-amber-100"
                                                                    >
                                                                        <Eye className="w-5 h-5" />
                                                                        View Results
                                                                    </button>
                                                                )}
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
            <RaceResultInputModal
                open={openResultInput}
                onClose={() => { setOpenResultInput(false); fetchRaces(); }}
                race={selectedRace}
            />
            <RaceViewResultsModal
                open={openResultView}
                onClose={() => setOpenResultView(false)}
                race={selectedRace}
            />
        </div>
    );
}

export default Referee;
