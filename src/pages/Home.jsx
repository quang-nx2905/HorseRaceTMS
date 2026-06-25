import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Zap, Shield } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-inner shadow-white/20">
              <Trophy className="w-5 h-5 text-zinc-900" />
            </div>
            <span className="font-black text-xl tracking-tight text-zinc-900">
              HorseRace<span className="text-amber-500">TMS</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 text-sm font-bold text-zinc-900 bg-amber-400 hover:bg-amber-500 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
          <div className="absolute top-40 right-1/4 w-[28rem] h-[28rem] bg-orange-300/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-semibold text-zinc-600 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Next-Gen Tournament Management
          </div>

          <h1 className="text-6xl sm:text-7xl font-black text-zinc-900 tracking-tight leading-[1.1]">
            Manage Horse Races <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Like a Pro.
            </span>
          </h1>

          <p className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
            The ultimate platform for scheduling races, tracking horse performance, managing jockeys, and analyzing predictive data with unparalleled ease.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-zinc-900/20 hover:-translate-y-1"
            >
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-full font-bold text-lg transition-all shadow-sm hover:shadow"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-zinc-900">Everything you need to run the show</h2>
            <p className="text-zinc-500 mt-4 font-medium">Built for tournament organizers, owners, and enthusiasts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">AI Predictions</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Leverage our advanced predictive models to forecast race outcomes based on historical performance and track conditions.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Tournament Hub</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Organize full tournaments, schedule race brackets, and maintain live leaderboards seamlessly in one place.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Secure & Fair</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Referee tools and comprehensive permission management ensure transparent and fair operations across all events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-zinc-200 text-zinc-500 font-medium text-sm">
        <p>&copy; {new Date().getFullYear()} HorseRaceTMS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
