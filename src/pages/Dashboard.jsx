import DashboardLayout from "../layouts/DashboardLayout";

import StatsCard from "../components/ui/StatsCard";
import AnalyticsChart from "../components/ui/AnalyticsChart";
import TournamentOverview from "../components/ui/TournamentOverview";
import UpcomingRaces from "../components/ui/UpcomingRaces";

function Dashboard() {
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

      {/* Main Analytics */}
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

          </div>

          <AnalyticsChart />

        </div>

        {/* Right Panel */}
        <div className="space-y-6">

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

        </div>

      </div>

      <TournamentOverview />

      <UpcomingRaces />

    </DashboardLayout>
  );
}

export default Dashboard;