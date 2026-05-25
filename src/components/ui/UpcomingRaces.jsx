function UpcomingRaces() {
  return (
    <div className="bg-white rounded-[32px] border border-zinc-200 p-10 mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h2 className="text-4xl font-bold">
            Upcoming Races
          </h2>

          <p className="text-zinc-500 mt-2">
            Live race schedule and tracking
          </p>

        </div>

        <button className="text-lg font-semibold">
          Full Schedule →
        </button>

      </div>

      {/* Race Item 1 */}
      <div className="flex items-center justify-between py-6 border-b border-zinc-100">

        <div className="flex items-center gap-5">

          {/* Time */}
          <div className="w-[80px] h-[80px] rounded-[24px] bg-yellow-100 flex flex-col items-center justify-center">

            <p className="text-sm text-zinc-500">
              APR
            </p>

            <h3 className="text-2xl font-bold">
              24
            </h3>

          </div>

          {/* Info */}
          <div>

            <h3 className="text-2xl font-bold">
              Royal Sprint Finals
            </h3>

            <p className="text-zinc-500 mt-2">
              Tokyo International Circuit
            </p>

          </div>

        </div>

        {/* Status */}
        <div className="bg-green-100 text-green-600 px-5 py-3 rounded-2xl font-semibold">

          LIVE

        </div>

      </div>

      {/* Race Item 2 */}
      <div className="flex items-center justify-between py-6 border-b border-zinc-100">

        <div className="flex items-center gap-5">

          <div className="w-[80px] h-[80px] rounded-[24px] bg-zinc-100 flex flex-col items-center justify-center">

            <p className="text-sm text-zinc-500">
              APR
            </p>

            <h3 className="text-2xl font-bold">
              26
            </h3>

          </div>

          <div>

            <h3 className="text-2xl font-bold">
              Derby Elite Cup
            </h3>

            <p className="text-zinc-500 mt-2">
              Dubai Racing Arena
            </p>

          </div>

        </div>

        <div className="bg-yellow-100 text-yellow-600 px-5 py-3 rounded-2xl font-semibold">

          UPCOMING

        </div>

      </div>

      {/* Race Item 3 */}
      <div className="flex items-center justify-between py-6">

        <div className="flex items-center gap-5">

          <div className="w-[80px] h-[80px] rounded-[24px] bg-zinc-100 flex flex-col items-center justify-center">

            <p className="text-sm text-zinc-500">
              APR
            </p>

            <h3 className="text-2xl font-bold">
              29
            </h3>

          </div>

          <div>

            <h3 className="text-2xl font-bold">
              Golden Horse Masters
            </h3>

            <p className="text-zinc-500 mt-2">
              Singapore Turf Club
            </p>

          </div>

        </div>

        <div className="bg-blue-100 text-blue-600 px-5 py-3 rounded-2xl font-semibold">

          REGISTERING

        </div>

      </div>

    </div>
  );
}

export default UpcomingRaces;