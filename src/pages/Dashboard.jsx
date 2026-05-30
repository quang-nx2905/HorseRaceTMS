import StatCard from "../components/ui/StatCard";
import AnalyticsChart from "../components/charts/AnalyticsChart";
import RecentRaces from "../components/dashboard/RecentRaces";

function Dashboard() {
  return (
    <div>

      <h1 className="text-6xl font-black dark:text-white">
        Dashboard
      </h1>

      <p className="text-zinc-500 dark:text-zinc-400 mt-5 text-xl">
        Welcome back to the Horse Race Tournament Management System.
      </p>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-6 mt-10">

        <StatCard
          title="Total Horses"
          value="2,450"
          subtitle="+12% this month"
        />

        <StatCard
          title="Active Races"
          value="18"
          subtitle="Currently ongoing"
        />

        <StatCard
          title="Predictions"
          value="12.4k"
          subtitle="AI generated insights"
        />

        <StatCard
          title="Win Accuracy"
          value="86%"
          subtitle="Prediction engine"
        />

      </div>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="col-span-2">
          <AnalyticsChart />
        </div>

        <RecentRaces />

      </div>

    </div>
  );
}

export default Dashboard;