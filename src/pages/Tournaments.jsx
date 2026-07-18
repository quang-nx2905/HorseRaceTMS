import {
  Search,
  Plus,
  CalendarDays,
  MapPin,
  Trophy,
  Flame,
  Clock,
  CheckCircle2,
  DollarSign,
  Users,
  TrendingUp,
  Zap,
  Eye,
  EyeOff,
  Pencil,
  Filter,
  Globe,
  Star,
  Activity,
  BarChart3,
} from "lucide-react";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";

import CreateTournamentModal from "../components/modals/CreateTournamentModal";
import tournamentApi from "../api/tournamentApi";
import TournamentDetailsDrawer from "../components/tournaments/TournamentDetailsDrawer";
import TournamentCardSkeleton from "../components/skeletons/TournamentCardSkeleton";
import Pagination from "../components/common/Pagination";
import usePagination from "../hooks/usePagination";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";
import EditTournamentModal from "../components/modals/EditTournamentModal";

const STATUS_CONFIG = {
  Live: {
    label: "Live Now",
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-500 border border-red-500/20",
    glow: "from-red-500/20 to-red-500/5",
    icon: Flame,
    pulse: true,
  },
  Upcoming: {
    label: "Upcoming",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
    glow: "from-amber-500/15 to-amber-500/5",
    icon: Clock,
    pulse: false,
  },
  Completed: {
    label: "Completed",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    glow: "from-emerald-500/15 to-emerald-500/5",
    icon: CheckCircle2,
    pulse: false,
  },
};

const CARD_ACCENTS = [
  "from-violet-600 to-purple-700",
  "from-sky-500 to-blue-700",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-700",
  "from-rose-500 to-pink-700",
  "from-indigo-500 to-violet-700",
  "from-cyan-500 to-blue-600",
  "from-orange-500 to-red-600",
];

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Upcoming;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${cfg.badge}`}>
      {cfg.pulse ? (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cfg.dot}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dot}`} />
        </span>
      ) : (
        <Icon className="w-3 h-3" />
      )}
      {cfg.label}
    </span>
  );
}

function Tournaments() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [openToggleHide, setOpenToggleHide] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(true);



  const [tournaments, setTournaments] = useState([]);
  const [backendTotalPrize, setBackendTotalPrize] = useState(0);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const res = await tournamentApi.getAll({ page: 1, pageSize: 100 });
        const items = res.data?.items || res.items || (res.data && res.data.data && res.data.data.items) || [];
        
        const mapped = items.map(t => ({
          id: t.tourId,
          name: t.tourName,
          location: t.location || "Unknown",
          date: t.startDate ? new Date(t.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "TBA",
          endDate: t.endDate ? new Date(t.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "TBA",
          prize: t.prizePool ? `$${t.prizePool.toLocaleString()}` : "$0",
          rawPrize: t.prizePool || 0,
          status: t.status || "Upcoming",
          isHidden: t.isHidden || false,
          bannerUrl: t.bannerUrl || null,
          participants: 0,
          featured: false,
        }));
        
        setTournaments(mapped);
        if (res.data?.totalPrize !== undefined) {
          setBackendTotalPrize(res.data.totalPrize);
        } else if (res.totalPrize !== undefined) {
          setBackendTotalPrize(res.totalPrize);
        }
      } catch (err) {
        console.error("Failed to fetch tournaments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" ? true : item.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tournaments, search, filter]);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  } = usePagination(filteredTournaments, 4);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter, setCurrentPage]);

  const totalLive = useMemo(() => tournaments.filter((i) => i.status === "Live").length, [tournaments]);
  const totalUpcoming = useMemo(() => tournaments.filter((i) => i.status === "Upcoming").length, [tournaments]);
  const totalCompleted = useMemo(() => tournaments.filter((i) => i.status === "Completed").length, [tournaments]);
  const totalPrize = useMemo(() => {
    // FE calculation handles reactive updates (e.g. when toggling hidden status)
    const sum = tournaments.reduce((acc, t) => {
      if (t.isHidden) return acc;
      return acc + (t.rawPrize || 0);
    }, 0);
    
    // Fallback to backendTotalPrize if the local sum is 0 (e.g. pagination doesn't load all)
    const finalPrize = sum > 0 ? sum : (backendTotalPrize > 0 ? backendTotalPrize : 0);
    return finalPrize >= 1000 ? `$${(finalPrize / 1000).toFixed(0)}K` : `$${finalPrize}`;
  }, [tournaments, backendTotalPrize]);
  const featuredTournament = useMemo(() => tournaments.find((t) => t.featured && t.status === "Live") || tournaments.find((t) => t.status === "Live") || null, [tournaments]);

  const handleViewDetails = (tournament) => {
    setSelectedTournament(tournament);
    setOpenDrawer(true);
  };

  const handleToggleHideTournament = async () => {
    try {
      await tournamentApi.toggleHide(selectedTournament.id);
      setTournaments((prev) => 
        prev.map((item) => 
          item.id === selectedTournament.id 
            ? { ...item, isHidden: !item.isHidden } 
            : item
        )
      );
    } catch (err) {
      console.error("Failed to toggle tournament visibility", err);
    } finally {
      setOpenToggleHide(false);
    }
  };

  const handleUpdateTournament = (updatedTournament) => {
    setTournaments((prev) =>
      prev.map((item) => item.id === updatedTournament.id ? updatedTournament : item)
    );
  };

  return (
    <div className="pb-16">
      {/* ═══════════════════ HERO HEADER ═══════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 rounded-3xl mb-10 shadow-2xl border border-zinc-700/50">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-violet-500/6 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                <Zap className="w-3.5 h-3.5" />
                Race Event Management
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.05] mb-4">
                Tournaments <br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Championship
                </span>
              </h1>
              <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                Organize, manage, and track elite horse racing events from around the globe. Create competitions, monitor live standings, and explore prize pools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              {user?.role === "Admin" && (
                <button
                  onClick={() => setOpenModal(true)}
                  id="create-tournament-btn"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-zinc-950 rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-[1.02]"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Create Tournament
                </button>
              )}

              <div className="flex items-center gap-5 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-center">
                  <p className="text-xs text-zinc-500 font-semibold">Live</p>
                  <p className="text-xl font-black text-red-400">{totalLive}</p>
                </div>
                <div className="w-px h-8 bg-zinc-700" />
                <div className="text-center">
                  <p className="text-xs text-zinc-500 font-semibold">Upcoming</p>
                  <p className="text-xl font-black text-amber-400">{totalUpcoming}</p>
                </div>
                <div className="w-px h-8 bg-zinc-700" />
                <div className="text-center">
                  <p className="text-xs text-zinc-500 font-semibold">Done</p>
                  <p className="text-xl font-black text-emerald-400">{totalCompleted}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ STATS CARDS ═══════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide">Live Events</p>
            <h3 className="text-3xl font-black text-zinc-900">{totalLive}</h3>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide">Upcoming</p>
            <h3 className="text-3xl font-black text-zinc-900">{totalUpcoming}</h3>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide">Completed</p>
            <h3 className="text-3xl font-black text-zinc-900">{totalCompleted}</h3>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-600 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide">Total Prize</p>
            <h3 className="text-3xl font-black text-zinc-900">{totalPrize}</h3>
          </div>
        </div>
      </div>

      {/* ═══════════════════ FEATURED LIVE TOURNAMENT ═══════════════════ */}
      {!search && filter === "All" && featuredTournament && !loading && (
        <div className="relative overflow-hidden rounded-3xl mb-10 bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-amber-600/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Featured · Live Now</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{featuredTournament.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{featuredTournament.location}</span>
                <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{featuredTournament.date}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{featuredTournament.participants} Horses</span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="text-right">
                <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Prize Pool</p>
                <p className="text-4xl font-black text-amber-400">{featuredTournament.prize}</p>
              </div>
              <button
                onClick={() => handleViewDetails(featuredTournament)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded-xl text-sm font-bold transition-all"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════ SEARCH & FILTER BAR ═══════════════════ */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-4 mb-8 flex flex-col sm:flex-row gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            id="tournament-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-amber-400 rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all focus:ring-2 focus:ring-amber-400/20 text-sm font-medium placeholder-zinc-400"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["All", "Live", "Upcoming", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              id={`filter-${f.toLowerCase()}`}
              className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border ${
                filter === f
                  ? f === "Live"
                    ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20"
                    : f === "Upcoming"
                    ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20"
                    : f === "Completed"
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
                    : "bg-zinc-900 text-white border-zinc-900 shadow-md"
                  : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              {f === "All" ? "All Events" : STATUS_CONFIG[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      {/* Results hint */}
      {(search || filter !== "All") && !loading && (
        <p className="text-sm text-zinc-500 font-medium mb-6">
          Showing <strong className="text-zinc-800">{filteredTournaments.length}</strong> tournament{filteredTournaments.length !== 1 ? "s" : ""}
          {filter !== "All" && <span> · <strong className="text-zinc-800">{filter}</strong></span>}
          {search && <span> matching "<strong className="text-zinc-800">{search}</strong>"</span>}
        </p>
      )}

      {/* ═══════════════════ TOURNAMENT CARDS GRID ═══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => <TournamentCardSkeleton key={i} />)
        ) : paginatedData.length === 0 ? (
          <div className="col-span-2">
            <EmptyState
              title="No Tournaments Found"
              description="Try adjusting your search keyword or filter."
            />
          </div>
        ) : (
          paginatedData.map((tournament, index) => {
            const accentGradient = CARD_ACCENTS[index % CARD_ACCENTS.length];

            return (
              <div
                key={tournament.id}
                id={`tournament-card-${tournament.id}`}
                className={`group relative border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${tournament.isHidden ? 'bg-zinc-100 opacity-75' : 'bg-white hover:-translate-y-1'}`}
              >
                {/* Top accent stripe */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />

                {/* Banner Image */}
                {tournament.bannerUrl && (
                  <div className="w-full h-32 bg-zinc-100 overflow-hidden relative">
                    <img 
                      src={tournament.bannerUrl} 
                      alt={tournament.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent"></div>
                  </div>
                )}

                <div className="p-7">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5 gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-black text-zinc-900 leading-tight mb-2 group-hover:text-amber-600 transition-colors truncate pr-2">
                        {tournament.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate font-medium">{tournament.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      {tournament.isHidden && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-200 text-zinc-500 border border-zinc-300">
                          <EyeOff className="w-3 h-3" /> Hidden
                        </span>
                      )}
                      <StatusBadge status={tournament.status} />
                    </div>
                  </div>

                  {/* Info chips */}
                  <div className="flex flex-wrap gap-2.5 mb-5">
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-600">
                      <CalendarDays className="w-3.5 h-3.5 text-zinc-400" />
                      {tournament.date}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-semibold text-zinc-600">
                      <Users className="w-3.5 h-3.5 text-zinc-400" />
                      {tournament.participants} Participants
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-700">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      {tournament.prize}
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-zinc-50/80 rounded-2xl border border-zinc-100">
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Start Date</p>
                      <p className="text-sm font-bold text-zinc-800 truncate">
                        {tournament.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">End Date</p>
                      <p className="text-sm font-bold text-zinc-800 truncate">{tournament.endDate}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2.5">
                    <button
                      id={`view-tournament-${tournament.id}`}
                      onClick={() => handleViewDetails(tournament)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-sm font-bold transition-all shadow-sm hover:shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    {user?.role === "Admin" && (
                      <>
                        <button
                          id={`edit-tournament-${tournament.id}`}
                          onClick={() => {
                            setSelectedTournament(tournament);
                            setOpenEdit(true);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-2xl text-sm font-bold transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          id={`toggle-hide-tournament-${tournament.id}`}
                          onClick={() => {
                            setSelectedTournament(tournament);
                            setOpenToggleHide(true);
                          }}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all border ${tournament.isHidden ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-500 border-emerald-100 hover:border-emerald-200' : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-500 border-zinc-100 hover:border-zinc-200'}`}
                          title={tournament.isHidden ? "Restore Tournament" : "Hide Tournament"}
                        >
                          {tournament.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* ══ MODALS & DRAWER ══ */}
      <CreateTournamentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <TournamentDetailsDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        tournament={selectedTournament}
      />

      <ConfirmModal
        open={openToggleHide}
        onClose={() => setOpenToggleHide(false)}
        onConfirm={handleToggleHideTournament}
        title={selectedTournament?.isHidden ? "Restore Tournament" : "Hide Tournament"}
        message={selectedTournament?.isHidden ? "Are you sure you want to restore this tournament?" : "Are you sure you want to hide this tournament? It will no longer be visible to normal users."}
        confirmLabel={selectedTournament?.isHidden ? "Restore" : "Hide"}
        confirmVariant={selectedTournament?.isHidden ? "success" : "danger"}
      />

      <EditTournamentModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        tournament={selectedTournament}
        onUpdate={handleUpdateTournament}
      />
    </div>
  );
}

export default Tournaments;