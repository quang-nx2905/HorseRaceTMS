import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-bold text-yellow-400 mb-10">
          HorseRaceTMS
        </h1>

        {/* Navigation */}
        <nav className="space-y-5">

          <Link
            to="/"
            className="block hover:text-yellow-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/tournaments"
            className="block hover:text-yellow-400 transition"
          >
            Tournaments
          </Link>

          <Link
            to="/horses"
            className="block hover:text-yellow-400 transition"
          >
            Horses
          </Link>

          <Link
            to="/live-races"
            className="block hover:text-yellow-400 transition"
          >
            Live Races
          </Link>

          <Link
            to="/leaderboard"
            className="block hover:text-yellow-400 transition"
          >
            Leaderboard
          </Link>

          <Link
            to="/predictions"
            className="block hover:text-yellow-400 transition"
          >
            Predictions
          </Link>

        </nav>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;