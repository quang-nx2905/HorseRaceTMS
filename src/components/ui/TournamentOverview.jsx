function TournamentOverview() {
  return (
    <div className="bg-white rounded-[32px] border border-zinc-200 p-10 mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h2 className="text-4xl font-bold">
            Tournament Overview
          </h2>

          <p className="text-zinc-500 mt-2">
            2024 Elite Season Progress
          </p>

        </div>

        <button className="text-lg font-semibold">
          View All →
        </button>

      </div>

      {/* Tournament 1 */}
      <div className="flex items-center gap-6 mb-10">

        {/* Icon */}
        <div className="w-[90px] h-[90px] rounded-[24px] bg-zinc-100 flex items-center justify-center text-4xl">

          🏆

        </div>

        {/* Content */}
        <div className="flex-1">

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-3xl font-bold">
              Royal Ascot Invitational
            </h3>

            <span className="text-yellow-500 font-semibold text-lg">
              72% Completed
            </span>

          </div>

          <div className="h-[14px] bg-zinc-100 rounded-full overflow-hidden">

            <div className="h-full w-[72%] bg-yellow-400 rounded-full"></div>

          </div>

        </div>

      </div>

      {/* Tournament 2 */}
      <div className="flex items-center gap-6">

        {/* Icon */}
        <div className="w-[90px] h-[90px] rounded-[24px] bg-zinc-100 flex items-center justify-center text-4xl">

          ⭐

        </div>

        {/* Content */}
        <div className="flex-1">

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-3xl font-bold">
              Derby Championship Series
            </h3>

            <span className="text-yellow-500 font-semibold text-lg">
              45% Completed
            </span>

          </div>

          <div className="h-[14px] bg-zinc-100 rounded-full overflow-hidden">

            <div className="h-full w-[45%] bg-yellow-400 rounded-full"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TournamentOverview;