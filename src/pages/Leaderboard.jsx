import DashboardLayout from "../layouts/DashboardLayout";

function Leaderboard() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Leaderboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Track top horses and jockey rankings
          </p>
        </div>

      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Total Horses
          </h2>

          <p className="text-4xl font-bold mt-3">
            148
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Active Jockeys
          </h2>

          <p className="text-4xl font-bold mt-3">
            76
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Live Tournaments
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-400">
            3
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Total Prize Pool
          </h2>

          <p className="text-4xl font-bold mt-3">
            $5M
          </p>
        </div>

      </div>

      {/* Leaderboard Table */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-6 bg-black px-6 py-4 font-bold text-zinc-400">

          <div>Rank</div>
          <div>Horse</div>
          <div>Jockey</div>
          <div>Points</div>
          <div>Win Rate</div>
          <div>Status</div>

        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-6 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="text-yellow-400 font-bold text-xl">
            #1
          </div>

          <div className="font-semibold">
            Golden Thunder
          </div>

          <div>Alex Carter</div>

          <div>982</div>

          <div>92%</div>

          <div>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
              Champion
            </span>
          </div>

        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-6 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="text-zinc-300 font-bold text-xl">
            #2
          </div>

          <div className="font-semibold">
            Black Storm
          </div>

          <div>Ryan Cooper</div>

          <div>875</div>

          <div>84%</div>

          <div>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">
              Elite
            </span>
          </div>

        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-6 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="text-orange-400 font-bold text-xl">
            #3
          </div>

          <div className="font-semibold">
            Silver Arrow
          </div>

          <div>David Miller</div>

          <div>790</div>

          <div>78%</div>

          <div>
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
              Professional
            </span>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Leaderboard;