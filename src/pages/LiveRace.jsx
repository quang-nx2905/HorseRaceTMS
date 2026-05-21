import DashboardLayout from "../layouts/DashboardLayout";

function LiveRace() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Live Race Tracking
          </h1>

          <p className="text-zinc-400 mt-2">
            Real-time race monitoring and horse tracking
          </p>
        </div>

        <div className="bg-red-500 px-5 py-3 rounded-xl font-bold animate-pulse">
          LIVE NOW
        </div>

      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Active Races
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-400">
            3
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Total Spectators
          </h2>

          <p className="text-4xl font-bold mt-3">
            12,480
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Current Speed
          </h2>

          <p className="text-4xl font-bold mt-3">
            68 km/h
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Race Duration
          </h2>

          <p className="text-4xl font-bold mt-3">
            12:24
          </p>
        </div>

      </div>

      {/* Race Progress */}
      <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Race Progress
          </h2>

          <span className="text-yellow-400 font-bold">
            Final Lap
          </span>
        </div>

        <div className="w-full h-5 bg-zinc-800 rounded-full overflow-hidden">

          <div className="h-full w-[78%] bg-yellow-400 rounded-full"></div>

        </div>

      </div>

      {/* Live Ranking */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden mb-8">

        <div className="px-6 py-5 bg-black">
          <h2 className="text-2xl font-bold">
            Live Rankings
          </h2>
        </div>

        {/* Horse 1 */}
        <div className="grid grid-cols-5 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="text-yellow-400 font-bold text-2xl">
            #1
          </div>

          <div className="font-semibold text-lg">
            Golden Thunder
          </div>

          <div>Alex Carter</div>

          <div>68 km/h</div>

          <div className="text-green-400 font-bold">
            Leading
          </div>

        </div>

        {/* Horse 2 */}
        <div className="grid grid-cols-5 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="text-zinc-300 font-bold text-2xl">
            #2
          </div>

          <div className="font-semibold text-lg">
            Black Storm
          </div>

          <div>Ryan Cooper</div>

          <div>65 km/h</div>

          <div className="text-yellow-400 font-bold">
            Chasing
          </div>

        </div>

        {/* Horse 3 */}
        <div className="grid grid-cols-5 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="text-orange-400 font-bold text-2xl">
            #3
          </div>

          <div className="font-semibold text-lg">
            Silver Arrow
          </div>

          <div>David Miller</div>

          <div>63 km/h</div>

          <div className="text-zinc-400 font-bold">
            Stable
          </div>

        </div>

      </div>

      {/* Live Events */}
      <div className="bg-zinc-900 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Live Race Events
        </h2>

        <div className="space-y-4">

          <div className="bg-zinc-800 rounded-xl p-4">
            🏇 Golden Thunder overtook Black Storm at checkpoint #4
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            ⚡ Speed boost detected from Silver Arrow
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            🚨 Final lap has started
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default LiveRace;