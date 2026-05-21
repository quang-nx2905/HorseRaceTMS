import DashboardLayout from "../layouts/DashboardLayout";

function Horses() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Horses Management
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage racing horses and performance information
          </p>
        </div>

        <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold hover:opacity-90 transition">
          + Add Horse
        </button>

      </div>

      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search horses..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-6 bg-black px-6 py-4 font-bold text-zinc-400">

          <div>Horse Name</div>
          <div>Breed</div>
          <div>Age</div>
          <div>Status</div>
          <div>Owner</div>
          <div>Actions</div>

        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-6 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="font-semibold">
            Golden Thunder
          </div>

          <div>Arabian</div>

          <div>5</div>

          <div>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
              Active
            </span>
          </div>

          <div>Nguyen Racing Club</div>

          <div className="flex gap-3">

            <button className="bg-blue-500 px-3 py-2 rounded-lg text-sm">
              Edit
            </button>

            <button className="bg-red-500 px-3 py-2 rounded-lg text-sm">
              Delete
            </button>

          </div>

        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-6 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="font-semibold">
            Black Storm
          </div>

          <div>Thoroughbred</div>

          <div>4</div>

          <div>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">
              Pending
            </span>
          </div>

          <div>Royal Horse Team</div>

          <div className="flex gap-3">

            <button className="bg-blue-500 px-3 py-2 rounded-lg text-sm">
              Edit
            </button>

            <button className="bg-red-500 px-3 py-2 rounded-lg text-sm">
              Delete
            </button>

          </div>

        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-6 px-6 py-5 border-t border-zinc-800 items-center">

          <div className="font-semibold">
            Silver Arrow
          </div>

          <div>Mustang</div>

          <div>6</div>

          <div>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
              Active
            </span>
          </div>

          <div>Elite Stable</div>

          <div className="flex gap-3">

            <button className="bg-blue-500 px-3 py-2 rounded-lg text-sm">
              Edit
            </button>

            <button className="bg-red-500 px-3 py-2 rounded-lg text-sm">
              Delete
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Horses;