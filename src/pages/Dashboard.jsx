import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/ui/StatCard";

function Dashboard() {

  return (

    <DashboardLayout>

      <div className="space-y-10">

        {/* HEADER */}
        <div>

          <h1
            className="
              text-5xl
              font-bold
              dark:text-white
              mb-3
            "
          >
            Dashboard
          </h1>

          <p className="text-zinc-500 text-lg">
            Monitor tournaments,
            races, predictions,
            and analytics.
          </p>

        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          <StatCard
            title="Total Tournaments"
            value="124"
            subtitle="+12% this month"
          />

          <StatCard
            title="Active Races"
            value="18"
            subtitle="Currently running"
          />

          <StatCard
            title="Total Horses"
            value="2,450"
            subtitle="Elite race horses"
          />

          <StatCard
            title="Prediction Accuracy"
            value="68%"
            subtitle="AI prediction engine"
          />

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;