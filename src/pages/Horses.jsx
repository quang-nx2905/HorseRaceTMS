import DashboardLayout from "../layouts/DashboardLayout";

function Horses() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-6xl font-bold">
            Horses
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Manage race horses, performance metrics, and health records.
          </p>

        </div>

        <button className="bg-yellow-400 px-8 py-4 rounded-2xl font-semibold">

          + Add Horse

        </button>

      </div>

      {/* Search + Filters */}
      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search horses..."
          className="flex-1 bg-white border border-zinc-200 rounded-2xl px-6 py-4 outline-none"
        />

        <button className="bg-white border border-zinc-200 px-6 py-4 rounded-2xl">
          Active
        </button>

        <button className="bg-white border border-zinc-200 px-6 py-4 rounded-2xl">
          Injured
        </button>

        <button className="bg-white border border-zinc-200 px-6 py-4 rounded-2xl">
          Retired
        </button>

      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-6 px-8 py-6 border-b border-zinc-100 bg-zinc-50 font-semibold text-zinc-500">

          <div>Horse</div>

          <div>Breed</div>

          <div>Age</div>

          <div>Status</div>

          <div>Win Rate</div>

          <div>Actions</div>

        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-6 px-8 py-6 border-b border-zinc-100 items-center">

          <div>

            <h3 className="font-bold text-lg">
              Thunderbolt
            </h3>

            <p className="text-zinc-400 mt-1">
              Elite Racing Club
            </p>

          </div>

          <div>Arabian</div>

          <div>5 Years</div>

          <div>

            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl text-sm font-semibold">

              Active

            </span>

          </div>

          <div className="font-semibold">
            78%
          </div>

          <div className="flex gap-3">

            <button className="bg-zinc-100 px-5 py-2 rounded-xl">
              Edit
            </button>

            <button className="bg-red-100 text-red-500 px-5 py-2 rounded-xl">
              Delete
            </button>

          </div>

        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-6 px-8 py-6 border-b border-zinc-100 items-center">

          <div>

            <h3 className="font-bold text-lg">
              Golden Arrow
            </h3>

            <p className="text-zinc-400 mt-1">
              Royal Derby Team
            </p>

          </div>

          <div>Thoroughbred</div>

          <div>4 Years</div>

          <div>

            <span className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-2xl text-sm font-semibold">

              Recovery

            </span>

          </div>

          <div className="font-semibold">
            65%
          </div>

          <div className="flex gap-3">

            <button className="bg-zinc-100 px-5 py-2 rounded-xl">
              Edit
            </button>

            <button className="bg-red-100 text-red-500 px-5 py-2 rounded-xl">
              Delete
            </button>

          </div>

        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-6 px-8 py-6 items-center">

          <div>

            <h3 className="font-bold text-lg">
              Black Phantom
            </h3>

            <p className="text-zinc-400 mt-1">
              Tokyo Elite Stable
            </p>

          </div>

          <div>Mustang</div>

          <div>6 Years</div>

          <div>

            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl text-sm font-semibold">

              Training

            </span>

          </div>

          <div className="font-semibold">
            82%
          </div>

          <div className="flex gap-3">

            <button className="bg-zinc-100 px-5 py-2 rounded-xl">
              Edit
            </button>

            <button className="bg-red-100 text-red-500 px-5 py-2 rounded-xl">
              Delete
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Horses;