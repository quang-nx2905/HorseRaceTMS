import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

const horses = [
  {
    name: "Thunderbolt",
    stable: "Elite Racing Club",
    breed: "Arabian",
    age: "5 Years",
    status: "Active",
    winRate: "78%",
  },

  {
    name: "Golden Arrow",
    stable: "Royal Derby Team",
    breed: "Thoroughbred",
    age: "4 Years",
    status: "Recovery",
    winRate: "65%",
  },

  {
    name: "Black Phantom",
    stable: "Tokyo Elite Stable",
    breed: "Mustang",
    age: "6 Years",
    status: "Training",
    winRate: "82%",
  },
];

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

        <Button>
          + Add Horse
        </Button>

      </div>

      {/* Search */}
      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search horses..."
          className="flex-1 bg-white border border-zinc-200 rounded-2xl px-6 py-4 outline-none"
        />

        <Button variant="secondary">
          Active
        </Button>

        <Button variant="secondary">
          Recovery
        </Button>

        <Button variant="secondary">
          Training
        </Button>

      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-6 px-8 py-6 border-b border-zinc-100 bg-zinc-50 font-semibold text-zinc-500">

          <div>Horse</div>

          <div>Breed</div>

          <div>Age</div>

          <div>Status</div>

          <div>Win Rate</div>

          <div>Actions</div>

        </div>

        {/* Rows */}
        {horses.map((horse, index) => (

          <div
            key={index}
            className="grid grid-cols-6 px-8 py-6 border-b border-zinc-100 items-center"
          >

            {/* Horse */}
            <div>

              <h3 className="font-bold text-lg">
                {horse.name}
              </h3>

              <p className="text-zinc-400 mt-1">
                {horse.stable}
              </p>

            </div>

            {/* Breed */}
            <div>
              {horse.breed}
            </div>

            {/* Age */}
            <div>
              {horse.age}
            </div>

            {/* Status */}
            <div>

              <StatusBadge
                status={horse.status}
              />

            </div>

            {/* Win Rate */}
            <div className="font-semibold">

              {horse.winRate}

            </div>

            {/* Actions */}
            <div className="flex gap-3">

              <Button variant="secondary">
                Edit
              </Button>

              <Button variant="danger">
                Delete
              </Button>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Horses;