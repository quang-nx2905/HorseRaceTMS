import DashboardLayout from "../layouts/DashboardLayout";

function Tournament() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Tournaments
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage all horse racing tournaments
          </p>
        </div>

        <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold hover:opacity-90 transition">
          + Create Tournament
        </button>

      </div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Royal Derby 2026
            </h2>

            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
              LIVE
            </span>
          </div>

          <p className="text-zinc-400 mb-6">
            International premium horse racing tournament.
          </p>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-zinc-500">Location</span>
              <span>Tokyo Race Track</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Prize Pool</span>
              <span>$2,000,000</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Participants</span>
              <span>48 Horses</span>
            </div>

          </div>

        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Autumn Horse Cup
            </h2>

            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">
              UPCOMING
            </span>
          </div>

          <p className="text-zinc-400 mb-6">
            Asia regional horse racing championship.
          </p>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-zinc-500">Location</span>
              <span>Singapore Arena</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Prize Pool</span>
              <span>$850,000</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Participants</span>
              <span>32 Horses</span>
            </div>

          </div>

        </div>

        {/* Card 3 */}
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Golden Sprint Finals
            </h2>

            <span className="bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg text-sm">
              FINISHED
            </span>
          </div>

          <p className="text-zinc-400 mb-6">
            Final sprint tournament for elite horses.
          </p>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-zinc-500">Location</span>
              <span>Dubai Track</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Prize Pool</span>
              <span>$1,500,000</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Participants</span>
              <span>40 Horses</span>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Tournament;