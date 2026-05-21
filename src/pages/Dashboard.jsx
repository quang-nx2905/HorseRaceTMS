import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-zinc-400">
            Total Tournaments
          </h2>

          <p className="text-3xl font-bold mt-3">
            12
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-zinc-400">
            Total Horses
          </h2>

          <p className="text-3xl font-bold mt-3">
            148
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-zinc-400">
            Live Races
          </h2>

          <p className="text-3xl font-bold mt-3">
            3
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-zinc-400">
            Predictions
          </h2>

          <p className="text-3xl font-bold mt-3">
            982
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;