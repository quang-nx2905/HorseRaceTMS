function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-bold text-yellow-400 mb-10">
          HorseRaceTMS
        </h1>

        <nav className="space-y-5">

          <p className="hover:text-yellow-400 cursor-pointer transition">
            Dashboard
          </p>

          <p className="hover:text-yellow-400 cursor-pointer transition">
            Tournaments
          </p>

          <p className="hover:text-yellow-400 cursor-pointer transition">
            Horses
          </p>

          <p className="hover:text-yellow-400 cursor-pointer transition">
            Jockeys
          </p>

          <p className="hover:text-yellow-400 cursor-pointer transition">
            Live Races
          </p>

          <p className="hover:text-yellow-400 cursor-pointer transition">
            Leaderboard
          </p>

          <p className="hover:text-yellow-400 cursor-pointer transition">
            Predictions
          </p>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;