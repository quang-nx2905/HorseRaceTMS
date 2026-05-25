import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

const jockeys = [
  {
    name: "Alex Carter",
    team: "Royal Derby Team",
    experience: "8 Years",
    status: "Active",
    winRate: "84%",
  },

  {
    name: "Michael Reeves",
    team: "Tokyo Elite Stable",
    experience: "5 Years",
    status: "Training",
    winRate: "71%",
  },

  {
    name: "Daniel Foster",
    team: "Elite Racing Club",
    experience: "10 Years",
    status: "Recovery",
    winRate: "90%",
  },
];

function Jockeys() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-6xl font-bold">
            Jockeys
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Manage jockey performance, schedules, and race participation.
          </p>

        </div>

        <Button>
          + Add Jockey
        </Button>

      </div>

      {/* Search */}
      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search jockeys..."
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

          <div>Jockey</div>

          <div>Team</div>

          <div>Experience</div>

          <div>Status</div>

          <div>Win Rate</div>

          <div>Actions</div>

        </div>

        {/* Rows */}
        {jockeys.map((jockey, index) => (

          <div
            key={index}
            className="grid grid-cols-6 px-8 py-6 border-b border-zinc-100 items-center"
          >

            {/* Name */}
            <div>

              <h3 className="font-bold text-lg">
                {jockey.name}
              </h3>

              <p className="text-zinc-400 mt-1">
                Professional Rider
              </p>

            </div>

            {/* Team */}
            <div>
              {jockey.team}
            </div>

            {/* Experience */}
            <div>
              {jockey.experience}
            </div>

            {/* Status */}
            <div>

              <StatusBadge
                status={jockey.status}
              />

            </div>

            {/* Win Rate */}
            <div className="font-semibold">

              {jockey.winRate}

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

export default Jockeys;