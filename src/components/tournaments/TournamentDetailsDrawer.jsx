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
    Flag,
    ChevronDown,
    ChevronUp,
    FileWarning,
    MonitorPlay
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tournamentApi from "../../api/tournamentApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import raceApi from "../../api/raceApi";
import RaceViewResultsModal from "../modals/RaceViewResultsModal";
import RaceBetModal from "../modals/RaceBetModal";
import predictionApi from "../../api/predictionApi";
import RaceRegistrationPanel from "../races/RaceRegistrationPanel";
import fallbackTournamentBanner from "../../assets/hero.png";
import ConfirmModal from "../common/ConfirmModal";
import RaceIncidentsModal from "../modals/RaceIncidentsModal";

const STATUS_CONFIG = {
    Live: {
        badge: "bg-red-500/15 text-red-500 border border-red-500/25",
        icon: Flame,
        glow: "from-red-600/30 to-rose-600/20",
        pulse: true,
    },
    Started: {
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
    const navigate = useNavigate();
    const { user } = useAuth();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expandedRace, setExpandedRace] = useState(null);

    // Modals state
    const [showViewModal, setShowViewModal] = useState(false);
    const [showBetModal, setShowBetModal] = useState(false);
    const [selectedRaceForModal, setSelectedRaceForModal] = useState(null);
    const [raceToAward, setRaceToAward] = useState(null);
    const [showIncidentsModal, setShowIncidentsModal] = useState(false);
    const [myBets, setMyBets] = useState([]);
    const isSpectator = user?.role?.toLowerCase() === "spectator";

    const handleAwardPrizes = async (raceId) => {
        try {
            await raceApi.awardPrizes(raceId);
            toast.success("Prizes awarded successfully!");
            setRaceToAward(null);
            fetchDetail(); // Refresh data
        } catch (error) {
            console.error("Failed to award prizes", error);
            toast.error(error.response?.data?.message || "Failed to award prizes.");
        }
    };

    useEffect(() => {
        if (open && tournament) {
            fetchDetail();
            if (isSpectator) {
                fetchMyBets();
            }
        } else {
            setDetail(null);
            setExpandedRace(null);
            setMyBets([]);
        }
    }, [open, tournament, user]);

    const fetchMyBets = async () => {
        try {
            const res = await predictionApi.getMyBets();
            setMyBets(res.data?.data || res.data || []);
        } catch (error) {
            console.error("Failed to fetch my bets:", error);
        }
    };

    const fetchDetail = async () => {
        try {
            setLoading(true);
            const res = await tournamentApi.getById(tournament.id);
            // res.data.data is where the tournament object is according to standard controller response
            setDetail(res.data?.data || res.data || res);
        } catch (error) {
            console.error("Failed to fetch tournament detail:", error);
        } finally {
            setLoading(false);
        }
    };


    if (!open || !tournament) return null;

    const cfg = STATUS_CONFIG[tournament.status] || STATUS_CONFIG.Upcoming;
    const Icon = cfg.icon;
    const displayedBannerUrl = detail?.bannerUrl || tournament.bannerUrl || fallbackTournamentBanner;

    // A RaceParticipant is only created after the horse and jockey have both
    // completed the approval flow, so this is the confirmed pair count.
    const participantCount = detail?.participantCount
        ?? detail?.races?.reduce((total, race) => total + (race.participants?.length || 0), 0)
        ?? 0;
    
    const uniqueHorses = new Set();
    detail?.races?.forEach(r => r.participants?.forEach(p => uniqueHorses.add(p.horseId)));
    const totalHorses = uniqueHorses.size;

    const uniqueReferees = new Set();
    detail?.races?.forEach(r => r.referees?.forEach(ref => uniqueReferees.add(ref.refereeId)));
    const totalReferees = uniqueReferees.size;

    return (
        <>
            <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* DRAWER PANEL */}
            <div
                className="relative w-full max-w-[720px] h-screen bg-white shadow-2xl overflow-y-auto border-l border-zinc-200"
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
                <div className="relative overflow-hidden bg-zinc-950 p-8 pb-10 border-b border-zinc-200">
                    <div className="absolute inset-0 z-0">
                        <img src={displayedBannerUrl} alt="Tournament Banner" onError={(event) => { if (event.currentTarget.src !== fallbackTournamentBanner) event.currentTarget.src = fallbackTournamentBanner; }} className="w-full h-full object-cover opacity-75" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/20 pointer-events-none z-0" />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none z-0" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${tournament.status === "Live" || tournament.status === "Started"
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
                                {tournament.status === "Live" || tournament.status === "Started" ? "Live Now" : tournament.status}
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
                            <p className="text-3xl font-black text-zinc-900">{participantCount}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">Approved horse-jockey pairs</p>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-center hover:bg-zinc-100/70 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center mx-auto mb-3">
                                <Zap className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Horses</p>
                            <p className="text-3xl font-black text-zinc-900">{totalHorses}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">Registered horses</p>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-center hover:bg-zinc-100/70 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                                <Activity className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Referees</p>
                            <p className="text-3xl font-black text-zinc-900">{totalReferees}</p>
                            <p className="text-[10px] text-emerald-500 mt-0.5 font-bold">Assigned to races</p>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 text-center hover:bg-zinc-100/70 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
                                <Flag className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Total Races</p>
                            <p className="text-3xl font-black text-zinc-900">{detail?.races?.length || 0}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">Rounds scheduled</p>
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
                            value={`${totalHorses} Horses registered`}
                            accent="bg-violet-500/10 text-violet-500"
                        />
                        <InfoRow
                            icon={Globe}
                            label="Broadcast"
                            value="International Live Stream"
                            accent="bg-emerald-500/10 text-emerald-500"
                        />
                    </div>

                </div>

                {/* RACES LIST */}
                {loading ? (
                    <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div></div>
                ) : (
                    <div className="mb-8 px-8">
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="font-bold text-zinc-800 text-lg">Races ({detail?.races?.length || 0})</h3>
                        </div>

                        <div className="space-y-4">
                            {detail?.races?.map((race) => (
                                <div key={race.raceId} className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden">
                                    <div
                                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-100 transition-colors"
                                        onClick={() => setExpandedRace(expandedRace === race.raceId ? null : race.raceId)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {user?.role === "Admin" && race.incidentsCount > 0 && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedRaceForModal(race); setShowIncidentsModal(true); }}
                                                    className="flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 transition-colors hover:bg-orange-100"
                                                >
                                                    <FileWarning className="h-3.5 w-3.5" />
                                                    View Incidents ({race.incidentsCount})
                                                </button>
                                            )}
                                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                                                <Flag className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-zinc-800">{race.raceName} (Round {race.round})</h4>
                                                <p className="text-xs text-zinc-500 font-medium">
                                                    {new Date(race.raceDateTime).toLocaleString()} • {race.distance}m • Reward: x{race.rewardRatio || 2.0} • <span className="font-bold text-amber-600">{race.status}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate('/spectator', { state: { targetRace: race } }); }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-bold transition-colors shadow-sm"
                                            >
                                                <MonitorPlay className="w-3.5 h-3.5" />
                                                Watch
                                            </button>
                                            {(race.status === "Completed" || race.status === "Awarded") && race.hasResults && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedRaceForModal(race); setShowViewModal(true); }}
                                                    className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-xs font-bold transition-colors shadow-sm"
                                                >
                                                    View Results
                                                </button>
                                            )}
                                            {race.status === "Completed" && user?.role === "Admin" && race.hasResults && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setRaceToAward(race); }}
                                                    className="px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-xs font-bold transition-colors shadow-sm"
                                                >
                                                    Award Prizes
                                                </button>
                                            )}
                                            {race.status === "Completed" && user?.role === "Admin" && !race.hasResults && (
                                                <span className="px-3 py-1.5 bg-zinc-100 text-zinc-500 rounded-lg text-xs font-bold border border-zinc-200">
                                                    Awaiting Referee Results
                                                </span>
                                            )}
                                            {isSpectator && (() => {
                                                const activeBetsCount = myBets.filter(b => b.raceId === race.raceId && b.status === "Active").length;
                                                return (
                                                    <div className="flex items-center gap-2">
                                                        {activeBetsCount > 0 && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setSelectedRaceForModal(race); setShowViewModal(true); }}
                                                                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
                                                            >
                                                                My Bets ({activeBetsCount})
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                            {expandedRace === race.raceId ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                        </div>
                                    </div>

                                    {expandedRace === race.raceId && (
                                        <div className="p-4 pt-0 border-t border-zinc-100 mt-2">
                                            {isSpectator && race.status === "Open Registration" && (
                                                <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                                                    <div>
                                                        <p className="text-sm font-black text-amber-900">BET is Open</p>
                                                        <p className="text-xs font-medium text-amber-700">Choose one of the confirmed horse–jockey participants before registration closes.</p>
                                                    </div>
                                                    <button disabled={!race.participants?.length} onClick={() => { setSelectedRaceForModal(race); setShowBetModal(true); }} className="shrink-0 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-black text-white shadow-sm hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50">
                                                        Place Bet
                                                    </button>
                                                </div>
                                            )}
                                            <RaceRegistrationPanel race={race} user={user} onUpdated={fetchDetail} />
                                            <div className="mt-4">
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Referees ({race.referees?.length || 0})</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {race.referees?.map(ref => (
                                                        <span key={ref.assignId} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-xs font-semibold text-zinc-700">
                                                            <div className="w-5 h-5 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
                                                                <img src={ref.refereeAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${ref.refereeName || ref.refereeId}&backgroundColor=f3f4f6`} alt={ref.refereeName} className="w-full h-full object-cover" />
                                                            </div>
                                                            {ref.refereeName || `Ref #${ref.refereeId}`}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Participants ({race.participants?.length || 0})</p>
                                                <div className="space-y-2">
                                                    {race.participants?.map(p => (
                                                        <div key={p.participantId} className="flex items-center justify-between bg-white p-3 rounded-xl border border-zinc-200">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center text-sm font-black shadow-inner flex-shrink-0">
                                                                    {p.laneNumber}
                                                                </div>
                                                                <div className="w-10 h-10 rounded-full bg-amber-100 overflow-hidden flex-shrink-0 border border-amber-200 shadow-sm">
                                                                    <img src={p.horseAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${p.horseName || p.horseId}&backgroundColor=fef3c7`} alt={p.horseName} className={`w-full h-full object-cover ${p.horseAvatar ? '' : 'p-1'}`} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-zinc-800">{p.horseName || `Horse #${p.horseId}`}</p>
                                                                    <div className="flex items-center gap-1.5 mt-1">
                                                                        <div className="w-4 h-4 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
                                                                            <img src={p.jockeyAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.jockeyName || p.jockeyId}&backgroundColor=f3f4f6`} alt={p.jockeyName} className="w-full h-full object-cover" />
                                                                        </div>
                                                                        <p className="text-[10px] text-zinc-500 font-semibold">{p.jockeyName || `Jockey #${p.jockeyId}`}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className="text-[10px] font-bold uppercase px-2 py-1 bg-zinc-100 text-zinc-500 rounded-md">
                                                                {p.participationStatus}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {detail?.races?.length === 0 && (
                                <div className="text-center p-6 bg-zinc-50 rounded-2xl border border-zinc-100 border-dashed text-zinc-500 text-sm font-medium">
                                    No races found for this tournament.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col gap-2 p-8">
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl font-bold text-sm transition-all shadow-md"
                    >
                        Close Panel
                    </button>
                </div>
            </div>
        </div>
        {/* Modals */}
            <RaceViewResultsModal
                open={showViewModal}
                onClose={() => setShowViewModal(false)}
                race={selectedRaceForModal}
                onSuccess={() => fetchMyBets()}
            />

            <RaceBetModal
                open={showBetModal}
                onClose={() => setShowBetModal(false)}
                race={selectedRaceForModal}
                onSuccess={() => {
                    fetchMyBets();
                }}
            />
            <RaceIncidentsModal
                open={showIncidentsModal}
                onClose={() => setShowIncidentsModal(false)}
                race={selectedRaceForModal}
            />
            <ConfirmModal
                open={Boolean(raceToAward)}
                onClose={() => setRaceToAward(null)}
                onConfirm={() => handleAwardPrizes(raceToAward.raceId)}
                title="Confirm Prize Distribution"
                message={`Confirm that you have reviewed the final results for ${raceToAward?.raceName || "this race"}. This action will settle every active bet and cannot be repeated.`}
                confirmLabel="Confirm & Award Prizes"
                confirmVariant="success"
            />
        </>
    );
}

export default TournamentDetailsDrawer;
