import DashboardLayout from "../layouts/DashboardLayout";

function Predictions() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Prediction System
          </h1>

          <p className="text-zinc-400 mt-2">
            Predict race winners and earn rewards
          </p>
        </div>

        <div className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
          2,450 Points
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Total Predictions
          </h2>

          <p className="text-4xl font-bold mt-3">
            982
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Accuracy Rate
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-400">
            84%
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Rewards Earned
          </h2>

          <p className="text-4xl font-bold mt-3">
            12
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Live Predictions
          </h2>

          <p className="text-4xl font-bold mt-3 text-yellow-400">
            5
          </p>
        </div>

      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        {/* Card 1 */}
        <div className="bg-zinc-900 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">
              Golden Thunder
            </h2>

            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
              HOT PICK
            </span>

          </div>

          <p className="text-zinc-400 mb-6">
            Current favorite horse for Royal Derby 2026.
          </p>

          <div className="space-y-4 mb-6">

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Winning Odds
              </span>

              <span>1.45x</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Prediction Votes
              </span>

              <span>4,582</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Current Rank
              </span>

              <span>#1</span>
            </div>

          </div>

          <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:opacity-90 transition">
            Predict Winner
          </button>

        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">
              Black Storm
            </h2>

            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">
              TRENDING
            </span>

          </div>

          <p className="text-zinc-400 mb-6">
            Strong comeback horse with elite performance.
          </p>

          <div className="space-y-4 mb-6">

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Winning Odds
              </span>

              <span>2.10x</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Prediction Votes
              </span>

              <span>3,120</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Current Rank
              </span>

              <span>#2</span>
            </div>

          </div>

          <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:opacity-90 transition">
            Predict Winner
          </button>

        </div>

        {/* Card 3 */}
        <div className="bg-zinc-900 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">
              Silver Arrow
            </h2>

            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
              RISING
            </span>

          </div>

          <p className="text-zinc-400 mb-6">
            Young horse with aggressive racing style.
          </p>

          <div className="space-y-4 mb-6">

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Winning Odds
              </span>

              <span>3.45x</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Prediction Votes
              </span>

              <span>1,824</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Current Rank
              </span>

              <span>#3</span>
            </div>

          </div>

          <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:opacity-90 transition">
            Predict Winner
          </button>

        </div>

      </div>

      {/* Prediction History */}
      <div className="bg-zinc-900 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Prediction History
        </h2>

        <div className="space-y-4">

          <div className="bg-zinc-800 rounded-xl p-4 flex justify-between">

            <span>
              Royal Derby 2026 - Golden Thunder
            </span>

            <span className="text-green-400 font-bold">
              WIN
            </span>

          </div>

          <div className="bg-zinc-800 rounded-xl p-4 flex justify-between">

            <span>
              Autumn Horse Cup - Black Storm
            </span>

            <span className="text-red-400 font-bold">
              LOST
            </span>

          </div>

          <div className="bg-zinc-800 rounded-xl p-4 flex justify-between">

            <span>
              Golden Sprint Finals - Silver Arrow
            </span>

            <span className="text-green-400 font-bold">
              WIN
            </span>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Predictions;