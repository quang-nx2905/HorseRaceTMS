import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <DashboardLayout>

      <h1 className="text-5xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-8 border border-zinc-200">

          <p className="text-zinc-500">
            Total Tournaments
          </p>

          <h2 className="text-5xl font-bold mt-5">
            124
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-8 border border-zinc-200">

          <p className="text-zinc-500">
            Active Races
          </p>

          <h2 className="text-5xl font-bold mt-5">
            18
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-8 border border-zinc-200">

          <p className="text-zinc-500">
            Total Horses
          </p>

          <h2 className="text-5xl font-bold mt-5">
            2450
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-8 border border-yellow-300">

          <p className="text-zinc-500">
            Win Rate
          </p>

          <h2 className="text-5xl font-bold mt-5 text-yellow-500">
            68%
          </h2>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default App;