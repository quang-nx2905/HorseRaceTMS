import DashboardLayout from "./layouts/DashboardLayout";
import StatsCard from "./components/ui/StatsCard";

function App() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-6xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-3 text-lg">
          Monitor tournaments, races, and performance analytics.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">

        <StatsCard
          title="Total Tournaments"
          value="124"
          highlight="+12%"
        />

        <StatsCard
          title="Active Races"
          value="18"
        />

        <StatsCard
          title="Total Horses"
          value="2,450"
          subtitle="Elite Breed"
        />

        <StatsCard
          title="Win Rate Analytics"
          value="68.4%"
          highlight="Premium"
        />

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">

        {/* Analytics */}
        <div className="col-span-2 bg-white rounded-[32px] border border-zinc-200 p-10">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h2 className="text-4xl font-bold">
                Weekly Race Analytics
              </h2>

              <p className="text-zinc-500 mt-2">
                Performance metrics across all active circuits
              </p>

            </div>

            <div className="bg-zinc-100 rounded-2xl flex p-2 gap-2">

              <button className="px-5 py-2 rounded-xl bg-white shadow-sm">
                7D
              </button>

              <button className="px-5 py-2 rounded-xl">
                30D
              </button>

              <button className="px-5 py-2 rounded-xl">
                ALL
              </button>

            </div>

          </div>

          {/* Fake Chart */}
          <div className="h-[420px] flex items-end gap-6">

            <div className="flex-1 bg-yellow-100 rounded-t-[24px] h-[40%]"></div>

            <div className="flex-1 bg-yellow-200 rounded-t-[24px] h-[55%]"></div>

            <div className="flex-1 bg-yellow-100 rounded-t-[24px] h-[48%]"></div>

            <div className="flex-1 bg-yellow-400 rounded-t-[24px] h-[78%]"></div>

            <div className="flex-1 bg-yellow-200 rounded-t-[24px] h-[60%]"></div>

            <div className="flex-1 bg-yellow-300 rounded-t-[24px] h-[85%]"></div>

            <div className="flex-1 bg-yellow-100 rounded-t-[24px] h-[70%]"></div>

          </div>

        </div>

        {/* Right Panel */}
        <div className="space-y-6">

          {/* Recent Activity */}
          <div className="bg-white rounded-[28px] border border-zinc-200 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <div>
                <p className="font-semibold">
                  Thunderbolt placed 1st
                </p>

                <p className="text-zinc-400 mt-1">
                  2 mins ago
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  New tournament registered
                </p>

                <p className="text-zinc-400 mt-1">
                  15 mins ago
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Prediction odds updated
                </p>

                <p className="text-zinc-400 mt-1">
                  1 hour ago
                </p>
              </div>

            </div>

          </div>

          {/* Promo */}
          <div className="bg-black rounded-[28px] p-8 text-white">

            <p className="text-yellow-400 font-semibold mb-5">
              EXCLUSIVE
            </p>

            <h2 className="text-4xl font-bold leading-tight">

              Master the Track
              with AI Analytics

            </h2>

            <p className="text-zinc-400 mt-5 leading-relaxed">

              New prediction model now
              available for Pro users.

            </p>

            <button className="bg-yellow-400 text-black mt-8 px-6 py-4 rounded-2xl font-semibold">

              Upgrade Now

            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default App;