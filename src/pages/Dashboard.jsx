function Dashboard() {
  return (
    <div>

      <h1 className="page-title">
        Dashboard
      </h1>

      <p className="page-subtitle">
        Welcome back to the Horse Race Tournament Management System.
      </p>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="card p-8">
          <p className="text-zinc-400 uppercase text-sm">
            Total Horses
          </p>

          <h2 className="text-5xl font-bold mt-5">
            2,450
          </h2>
        </div>

        <div className="card p-8">
          <p className="text-zinc-400 uppercase text-sm">
            Active Races
          </p>

          <h2 className="text-5xl font-bold mt-5">
            18
          </h2>
        </div>

        <div className="card p-8">
          <p className="text-zinc-400 uppercase text-sm">
            Predictions
          </p>

          <h2 className="text-5xl font-bold mt-5">
            12.4k
          </h2>
        </div>

        <div className="card p-8">
          <p className="text-zinc-400 uppercase text-sm">
            Win Accuracy
          </p>

          <h2 className="text-5xl font-bold mt-5">
            86%
          </h2>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;