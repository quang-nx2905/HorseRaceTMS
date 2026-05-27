const leaderboard = [
  {
    rank: "#1",
    horse: "Thunderbolt",
    jockey: "Alex Carter",
    points: "2,450",
    winRate: "92%",
  },

  {
    rank: "#2",
    horse: "Golden Arrow",
    jockey: "Michael Reeves",
    points: "2,180",
    winRate: "84%",
  },

  {
    rank: "#3",
    horse: "Black Phantom",
    jockey: "Daniel Foster",
    points: "1,920",
    winRate: "79%",
  },

  {
    rank: "#4",
    horse: "Silver Blaze",
    jockey: "Ryan Cooper",
    points: "1,740",
    winRate: "73%",
  },
];

function Leaderboard() {
  return (
    <>

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-6xl font-bold">
            Leaderboard
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Track top-performing horses and elite jockey rankings.
          </p>

        </div>

        <button className="bg-yellow-400 px-8 py-4 rounded-2xl font-semibold">

          Export Report

        </button>

      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Top Win Rate"
          value="92%"
        />

        <StatCard
          title="Elite Horses"
          value="48"
        />

        <StatCard
          title="Total Races"
          value="124"
        />

        <StatCard
          title="Prize Pool"
          value="$5.8M"
        />

      </div>

      {/* Leaderboard Table */}
      <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-5 px-8 py-6 border-b border-zinc-100 bg-zinc-50 font-semibold text-zinc-500">

          <div>Rank</div>

          <div>Horse</div>

          <div>Jockey</div>

          <div>Points</div>

          <div>Win Rate</div>

        </div>

        {/* Rows */}
        {leaderboard.map((item, index) => (

          <div
            key={index}
            className="grid grid-cols-5 px-8 py-6 border-b border-zinc-100 items-center"
          >

            {/* Rank */}
            <div>

              <span
                className={`text-2xl font-bold
                ${
                  index === 0
                    ? "text-yellow-500"
                    : "text-zinc-800"
                }`}
              >

                {item.rank}

              </span>

            </div>

            {/* Horse */}
            <div>

              <h3 className="font-bold text-lg">
                {item.horse}
              </h3>

              <p className="text-zinc-400 mt-1">
                Elite Racing Division
              </p>

            </div>

            {/* Jockey */}
            <div>
              {item.jockey}
            </div>

            {/* Points */}
            <div className="font-semibold">
              {item.points}
            </div>

            {/* Win Rate */}
            <div>

              <div className="flex items-center gap-3">

                <div className="w-full h-[10px] bg-zinc-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{
                      width: item.winRate,
                    }}
                  ></div>

                </div>

                <span className="font-semibold">
                  {item.winRate}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Analytics */}
      <div className="grid grid-cols-2 gap-6 mt-8">

        {/* Card */}
        <div className="bg-white border border-zinc-200 rounded-[32px] p-8">

          <h2 className="text-3xl font-bold mb-6">
            Top Performing Stable
          </h2>

          <p className="text-zinc-500 leading-relaxed">

            Royal Derby Team currently leads
            the global tournament rankings
            with the highest race consistency.

          </p>

        </div>

        {/* Card */}
        <div className="bg-black rounded-[32px] p-8 text-white">

          <p className="text-yellow-400 font-semibold mb-4">
            ANALYTICS INSIGHT
          </p>

          <h2 className="text-4xl font-bold leading-tight">

            AI ranking predictions
            improved by 28%

          </h2>

          <p className="text-zinc-400 mt-5 leading-relaxed">

            Machine learning models now
            provide more accurate performance forecasting.

          </p>

        </div>

      </div>

    </>
  );
}

/* Stats Card */
function StatCard({
  title,
  value,
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-[28px] p-8">

      <p className="text-zinc-500">
        {title}
      </p>

      <h2 className="text-5xl font-bold mt-5">
        {value}
      </h2>

    </div>
  );
}

export default Leaderboard;