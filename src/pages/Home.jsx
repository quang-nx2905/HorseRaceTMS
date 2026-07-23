import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { getAllHorses } from "../api/horseApi";
import tournamentApi from "../api/tournamentApi";
import DragCarousel from "../components/common/DragCarousel";
import {
  ArrowRight, Trophy, Zap, Shield, 
  Users, ChevronRight, Activity,
  BarChart2, CheckCircle, Crosshair,
  Loader2
} from "lucide-react";

// --- Steps Data ---
const STEPS = [
  {
    step: "01",
    title: "Create a Free Account",
    desc: "Sign up in under 60 seconds. No credit card required, no hidden fees.",
    icon: Users,
    color: "from-amber-400 to-orange-500",
  },
  {
    step: "02",
    title: "Set Up Your Tournament",
    desc: "Create events, add horses and jockeys, and schedule races in just a few clicks.",
    icon: BarChart2,
    color: "from-orange-400 to-rose-500",
  },
  {
    step: "03",
    title: "Track Everything Live",
    desc: "Watch live results, live leaderboards, and monitor race statuses in real-time.",
    icon: Activity,
    color: "from-rose-400 to-pink-500",
  },
];

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [horses, setHorses] = useState([]);
  const [loadingHorses, setLoadingHorses] = useState(true);

  useEffect(() => {
    const fetchFeaturedHorses = async () => {
      try {
        const data = await getAllHorses();
        // Assuming API returns array directly or { data: [...] }
        const items = data?.data || data || [];
        const activeHorses = items.filter(h => h.status !== "Banned" && h.status !== "Retired");
        setHorses(activeHorses);
      } catch (error) {
        console.error("Failed to fetch featured horses:", error);
      } finally {
        setLoadingHorses(false);
      }
    };
    fetchFeaturedHorses();
  }, []);

  const [tournaments, setTournaments] = useState([]);
  const [loadingTournaments, setLoadingTournaments] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await tournamentApi.getAll({ page: 1, pageSize: 100 });
        const items = res.data?.items || res.items || (res.data && res.data.data && res.data.data.items) || res.data || [];
        const itemsArray = Array.isArray(items) ? items : [];
        const sorted = [...itemsArray].sort((a, b) => {
          const aId = a.tourId || a.id;
          const bId = b.tourId || b.id;
          return bId - aId;
        });
        setTournaments(sorted);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoadingTournaments(false);
      }
    };
    fetchTournaments();
  }, []);

  const handleQuickBet = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/tournaments');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden relative">

      {/* ───────────── Navbar ───────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-zinc-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-12 h-12 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <img src="/src/assets/logo.png" alt="Horse Racing Logo" className="w-full h-full object-cover rounded-xl shadow-sm" />
            </div>
            <span className="font-black text-xl tracking-tight text-zinc-900">
              HorseRace<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">TMS</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ───────────── Hero ───────────── */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 -z-20 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-80" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full -z-10 pointer-events-none mix-blend-multiply opacity-90">
          <div className="absolute top-[0%] left-[10%] w-[500px] h-[500px] bg-amber-300/40 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-rose-300/40 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[40%] left-[25%] w-[600px] h-[600px] bg-orange-300/40 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="animate-float">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-sm font-semibold text-zinc-700">
              Next-Generation Tournament Engine
            </div>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-zinc-900 drop-shadow-sm">
            Manage Horse Races <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 animate-gradient-x">
              Like a Pro.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-600 font-medium max-w-3xl mx-auto leading-relaxed">
            The all-in-one horse racing management platform — schedule, track, analyze, and predict, all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <Link to="/dashboard" className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_60px_-15px_rgba(245,158,11,0.8)] hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Go to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ───────────── Featured Horses (Dynamic) ───────────── */}
      {(!loadingHorses && horses.length > 0) && (
        <section className="py-24 px-6 bg-zinc-50 relative overflow-hidden border-t border-zinc-100">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">Top Contenders</span>
                    <h2 className="text-4xl font-black text-zinc-900">Featured Champions</h2>
                    <p className="text-zinc-500 mt-3 font-medium max-w-xl mx-auto">Witness the finest horses in the league. Place your bets and join the thrill of the race.</p>
                </div>

                <DragCarousel 
                    items={horses}
                    renderItem={(horse, isActive) => {
                        const hId = horse.horseId || horse.id;
                        const hName = horse.horseName || horse.name || `Horse #${hId}`;
                        const hImage = horse.avatarUrl || horse.imageUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${hName}&backgroundColor=fef3c7`;
                        const ownerName = horse.ownerName || horse.owner?.fullName || "Unknown Owner";

                        return (
                        <div className={`group w-full h-full rounded-3xl bg-white border border-zinc-200 overflow-hidden transition-all duration-500 flex flex-col select-none ${isActive ? "scale-100 opacity-100 z-10 shadow-2xl" : "scale-[0.85] opacity-50 z-0 shadow-sm"}`}>
                            <div className="relative h-64 overflow-hidden bg-amber-50 pointer-events-none">
                                <img src={hImage} alt={hName} draggable="false" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-white">{hName}</h3>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                                        {horse.status || "Active"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-b border-zinc-100 pb-5">
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Breed</p>
                                        <p className="font-semibold text-sm text-zinc-900 truncate">{horse.breed || "Thoroughbred"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Owner</p>
                                        <p className="font-semibold text-sm text-zinc-900 truncate">{ownerName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Age / Gender</p>
                                        <p className="font-semibold text-sm text-zinc-900">{horse.age || "3"} yrs • {horse.gender || "Stallion"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Weight / Health</p>
                                        <p className="font-semibold text-sm text-zinc-900">{horse.weight || "450"} kg • {horse.health || "Good"}</p>
                                    </div>
                                </div>
                                <button onClick={handleQuickBet} className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-amber-500 transition-colors shadow-sm">
                                    <Crosshair size={18} />
                                    Quick Bet
                                </button>
                            </div>
                        </div>
                        );
                    }}
                    itemClassName="w-[340px]"
                />
            </div>
        </section>
      )}

      {/* ───────────── Featured Tournaments (Dynamic) ───────────── */}
      {(!loadingTournaments && tournaments.length > 0) && (
        <section className="py-24 px-6 bg-white relative overflow-hidden border-t border-zinc-100">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">Latest Events</span>
                    <h2 className="text-4xl font-black text-zinc-900">Featured Tournaments</h2>
                    <p className="text-zinc-500 mt-3 font-medium max-w-xl mx-auto">Explore the most recent tournaments. Join the action or track the leaderboards live.</p>
                </div>

                <DragCarousel 
                    items={tournaments}
                    renderItem={(tour, isActive) => {
                        const tId = tour.tourId || tour.id;
                        const tName = tour.tourName || tour.name || `Tournament #${tId}`;
                        const tImage = tour.bannerUrl || tour.thumbnailUrl || tour.imageUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${tName}&backgroundColor=e5e7eb`;
                        const dateText = tour.startDate ? new Date(tour.startDate).toLocaleDateString() : "TBA";

                        return (
                        <div className={`group w-full h-full rounded-3xl bg-zinc-50 border border-zinc-200 overflow-hidden transition-all duration-500 flex flex-col select-none ${isActive ? "scale-100 opacity-100 z-10 shadow-2xl bg-white" : "scale-[0.85] opacity-50 z-0 shadow-sm"}`}>
                            <div className="relative h-48 overflow-hidden bg-zinc-200 pointer-events-none">
                                <img src={tImage} alt={tName} draggable="false" className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                                        {tour.status || "Upcoming"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-black text-zinc-900 mb-4 line-clamp-2 leading-tight">{tName}</h3>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                                          <Trophy className="w-4 h-4 text-emerald-500" />
                                          <span className="text-zinc-400">Prize Pool:</span> 
                                          <span className="text-zinc-900">{tour.prizePool ? `$${tour.prizePool.toLocaleString()}` : "TBA"}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                                          <Activity className="w-4 h-4 text-blue-500" />
                                          <span className="text-zinc-400">Date:</span> 
                                          <span className="text-zinc-900">{dateText}</span>
                                      </div>
                                    </div>
                                </div>
                                <button onClick={() => navigate(`/tournaments`, { state: { openTournamentId: tId } })} className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors shadow-sm">
                                    <ArrowRight size={18} />
                                    View Event
                                </button>
                            </div>
                        </div>
                        );
                    }}
                    itemClassName="w-[340px] h-full flex"
                />
            </div>
        </section>
      )}

      {/* ───────────── How It Works ───────────── */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">Simple — Fast — Effective</span>
            <h2 className="text-4xl font-black text-zinc-900">Get Started in 3 Steps</h2>
            <p className="text-zinc-500 mt-3 font-medium max-w-xl mx-auto">No complex setup needed. Up and running in under 5 minutes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-amber-300 to-orange-300 -z-0" />
            <div className="hidden md:block absolute top-16 left-2/3 w-1/6 h-0.5 bg-gradient-to-r from-orange-300 to-rose-300 -z-0" />

            {STEPS.map((step, i) => (
              <div key={i} className="group relative bg-white border border-zinc-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-6xl font-black text-zinc-100 absolute top-6 right-8 select-none">{step.step}</div>
                <h3 className="text-xl font-black text-zinc-900 mb-3 relative z-10">{step.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Feature Cards ───────────── */}
      <section className="py-24 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">Key Features</span>
            <h2 className="text-4xl font-black text-zinc-900">Everything You Need to Run the Show</h2>
            <p className="text-zinc-500 mt-3 font-medium">Built for tournament organizers, horse owners, and racing enthusiasts alike.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap, color: "bg-amber-100 text-amber-600",
                title: "Detailed Horse Profiles",
                desc: "Access comprehensive records of every horse, including their win rates, past performances, and owner history.",
                badge: "Insights 📊",
                badgeColor: "bg-blue-100 text-blue-600"
              },
              {
                icon: Trophy, color: "bg-emerald-100 text-emerald-600",
                title: "Tournament Hub",
                desc: "Organize full tournaments, schedule race brackets, and maintain live leaderboards — all in one seamless place.",
                badge: "Popular ⭐",
                badgeColor: "bg-amber-100 text-amber-700"
              },
              {
                icon: Shield, color: "bg-blue-100 text-blue-600",
                title: "Transparent & Fair",
                desc: "Referee tools and comprehensive permission management ensure every result is clear and fair for all parties.",
                badge: "Trusted ✓",
                badgeColor: "bg-blue-100 text-blue-600"
              },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <f.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${f.badgeColor}`}>{f.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{f.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed">{f.desc}</p>
                  {/* Action link removed */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA Banner ───────────── */}
      <section className="py-24 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 drop-shadow">
            Ready to Elevate Your Tournament?
          </h2>
          <p className="text-white/90 text-xl font-medium mb-10 max-w-2xl mx-auto">
            Hundreds of organizers already trust HorseRaceTMS. Now it's your turn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="group flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-black text-lg hover:-translate-y-1 transition-all shadow-2xl hover:shadow-white/30">
              Sign Up for Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-white/90 font-semibold">
              <CheckCircle className="w-5 h-5" /> No credit card required
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
