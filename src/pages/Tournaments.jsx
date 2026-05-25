import DashboardLayout from "../layouts/DashboardLayout";

function Tournaments() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-6xl font-bold">
            Tournaments
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Manage elite horse racing competitions and schedules.
          </p>

        </div>

        <button className="bg-yellow-400 px-8 py-4 rounded-2xl font-semibold">

          + Create Tournament

        </button>

      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 mb-10">

        <button className="bg-black text-white px-6 py-3 rounded-2xl">
          All
        </button>

        <button className="bg-white border border-zinc-200 px-6 py-3 rounded-2xl">
          Live
        </button>

        <button className="bg-white border border-zinc-200 px-6 py-3 rounded-2xl">
          Upcoming
        </button>

        <button className="bg-white border border-zinc-200 px-6 py-3 rounded-2xl">
          Finished
        </button>

      </div>

      {/* Tournament Grid */}
      <div className="grid grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-white border border-zinc-200 rounded-[32px] p-8">

          {/* Top */}
          <div className="flex justify-between items-start mb-8">

            <div>

              <div className="w-[80px] h-[80px] bg-yellow-100 rounded-[24px] flex items-center justify-center text-4xl">

                🏆

              </div>

            </div>

            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl font-semibold">

              LIVE

            </span>

          </div>

          {/* Content */}
          <h2 className="text-3xl font-bold mb-3">
            Royal Ascot Invitational
          </h2>

          <p className="text-zinc-500 leading-relaxed mb-8">

            Premium international horse racing event
            featuring elite jockeys and world-class tracks.

          </p>

          {/* Stats */}
          <div className="space-y-4 mb-8">

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Participants
              </span>

              <span className="font-semibold">
                48 Horses
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Prize Pool
              </span>

              <span className="font-semibold">
                $2.5M
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Schedule
              </span>

              <span className="font-semibold">
                Apr 24 - Apr 28
              </span>

            </div>

          </div>

          {/* Footer */}
          <button className="w-full bg-black text-white py-4 rounded-2xl font-semibold">

            View Tournament

          </button>

        </div>

        {/* Card 2 */}
        <div className="bg-white border border-zinc-200 rounded-[32px] p-8">

          <div className="flex justify-between items-start mb-8">

            <div>

              <div className="w-[80px] h-[80px] bg-zinc-100 rounded-[24px] flex items-center justify-center text-4xl">

                ⭐

              </div>

            </div>

            <span className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-2xl font-semibold">

              UPCOMING

            </span>

          </div>

          <h2 className="text-3xl font-bold mb-3">
            Derby Championship
          </h2>

          <p className="text-zinc-500 leading-relaxed mb-8">

            International championship series
            with advanced analytics and AI predictions.

          </p>

          <div className="space-y-4 mb-8">

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Participants
              </span>

              <span className="font-semibold">
                32 Horses
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Prize Pool
              </span>

              <span className="font-semibold">
                $1.8M
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Schedule
              </span>

              <span className="font-semibold">
                May 01 - May 05
              </span>

            </div>

          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-semibold">

            View Tournament

          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Tournaments;