import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Trophy, Zap, Shield, TrendingUp,
  Clock, Users, Star, ChevronRight, Activity,
  BarChart2, CheckCircle
} from "lucide-react";

// --- Animated Counter Hook ---
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// --- Stats Card ---
function StatCard({ value, suffix = "", label, icon: Icon, color, started }) {
  const count = useCountUp(value, 2200, started);
  return (
    <div className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${color} blur-2xl -z-10 scale-150`} />
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color} bg-opacity-10`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-4xl font-black text-zinc-900 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-zinc-500 font-semibold mt-1 text-sm">{label}</p>
    </div>
  );
}

// --- Fun Facts Data ---
const FUN_FACTS = [
  {
    emoji: "🐎",
    title: "Nearly 360° Vision",
    desc: "A horse's eyes are positioned on the sides of its head, giving it an almost full-circle field of view — with only a tiny blind spot directly behind its tail.",
  },
  {
    emoji: "⚡",
    title: "Top Speed: 88 km/h",
    desc: "Thoroughbred racehorses can reach a top speed of 88 km/h — faster than most motorcycles on city roads!",
  },
  {
    emoji: "🏆",
    title: "A 400-Year-Old Record",
    desc: "The Epsom Derby in England has been held since 1780 — making it older than the United States itself!",
  },
  {
    emoji: "❤️",
    title: "Heart Weighing Up to 5 kg",
    desc: "An elite racehorse's heart can weigh over 5 kg and beat up to 240 times per minute during a full sprint.",
  },
  {
    emoji: "🔢",
    title: "Every Horse Shares One Birthday",
    desc: "All thoroughbreds worldwide share an official birthday of January 1st each year — no matter when they were actually born!",
  },
  {
    emoji: "🌙",
    title: "They Sleep Standing Up",
    desc: "Horses can sleep while standing thanks to a special locking mechanism in their legs. They only lie down when they need deep REM sleep.",
  },
];

// --- Activity Feed Data ---
const ACTIVITIES = [
  { icon: "🏁", text: "Race #42 at Hanoi Track has just finished", time: "2 min ago" },
  { icon: "🐎", text: "Thunder Storm registered for the Summer 2026 Championship", time: "5 min ago" },
  { icon: "🏆", text: "Vietnam Grand Prix official results are now live", time: "12 min ago" },
  { icon: "👤", text: "Jockey Alex Nguyen just updated their profile", time: "18 min ago" },
  { icon: "⚡", text: "AI prediction for Race #43 has been refreshed", time: "25 min ago" },
  { icon: "🎯", text: "Spring Cup 2026 is now open for team registration", time: "30 min ago" },
];

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
    desc: "Watch live results, live leaderboards, and continuously updated AI predictions.",
    icon: Activity,
    color: "from-rose-400 to-pink-500",
  },
];

function Home() {
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [activeFact, setActiveFact] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);

  // IntersectionObserver to trigger stat counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle fun facts
  useEffect(() => {
    const id = setInterval(() => setActiveFact((f) => (f + 1) % FUN_FACTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  // Auto-cycle activity feed
  useEffect(() => {
    const id = setInterval(() => setActivityIndex((i) => (i + 1) % ACTIVITIES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden relative">

      {/* ───────────── Navbar ───────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-zinc-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center shadow-inner shadow-white/40 transition-transform group-hover:scale-110 duration-300">
              <Trophy className="w-5 h-5 text-white" />
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
          {/* Live Activity Ticker */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-md text-xs font-semibold text-zinc-600 transition-all duration-500 max-w-md">
              <span className="shrink-0 flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="truncate transition-all duration-500">
                {ACTIVITIES[activityIndex].icon} {ACTIVITIES[activityIndex].text}
              </span>
              <span className="shrink-0 text-zinc-400">{ACTIVITIES[activityIndex].time}</span>
            </div>
          </div>

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

      {/* ───────────── Animated Stats ───────────── */}
      <section ref={statsRef} className="py-16 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-bold text-zinc-400 uppercase tracking-widest mb-10">The numbers speak for themselves</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value={1240} suffix="+" label="Tournaments Organized" icon={Trophy} color="bg-amber-400/20 text-amber-600" started={statsStarted} />
            <StatCard value={8500} suffix="+" label="Races Recorded" icon={Activity} color="bg-orange-400/20 text-orange-600" started={statsStarted} />
            <StatCard value={340} suffix="+" label="Registered Jockeys" icon={Users} color="bg-rose-400/20 text-rose-600" started={statsStarted} />
            <StatCard value={97} suffix="%" label="AI Prediction Accuracy" icon={TrendingUp} color="bg-emerald-400/20 text-emerald-600" started={statsStarted} />
          </div>
        </div>
      </section>

      {/* ───────────── Did You Know ───────────── */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4">Explore</span>
            <h2 className="text-4xl font-black text-white">Did You Know? 🤔</h2>
            <p className="text-zinc-400 mt-3 font-medium">Fascinating facts from the world of horse racing</p>
          </div>

          {/* Main Fact Display */}
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center mb-8 min-h-[180px] flex flex-col items-center justify-center transition-all duration-500">
            <div className="text-5xl mb-4">{FUN_FACTS[activeFact].emoji}</div>
            <h3 className="text-2xl font-black text-white mb-3">{FUN_FACTS[activeFact].title}</h3>
            <p className="text-zinc-300 font-medium max-w-2xl leading-relaxed">{FUN_FACTS[activeFact].desc}</p>
          </div>

          {/* Fact Selector Dots + Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {FUN_FACTS.map((fact, i) => (
              <button
                key={i}
                onClick={() => setActiveFact(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  i === activeFact
                    ? "bg-amber-400 text-zinc-900 shadow-lg shadow-amber-400/30 scale-105"
                    : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                }`}
              >
                <span>{fact.emoji}</span>
                <span className="hidden sm:inline">{fact.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── How It Works ───────────── */}
      <section className="py-24 px-6 bg-zinc-50">
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
                <div className="mt-6 flex items-center gap-1 text-sm font-bold text-amber-600 group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
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
                title: "Smart AI Predictions",
                desc: "Our AI models analyze race history, track conditions, and horse form to deliver highly accurate outcome forecasts.",
                badge: "New 🔥",
                badgeColor: "bg-red-100 text-red-600"
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
                  <div className="mt-6 flex items-center gap-1 text-sm font-bold text-zinc-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
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

      {/* ───────────── Footer ───────────── */}
      <footer className="py-10 px-6 bg-zinc-900 text-center border-t border-zinc-800">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white">HorseRace<span className="text-amber-400">TMS</span></span>
        </div>
        <p className="text-zinc-500 font-medium text-sm">&copy; {new Date().getFullYear()} HorseRaceTMS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
