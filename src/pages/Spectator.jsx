import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";

const races = [
  {
    title: "Royal Ascot Finals",
    location: "Tokyo International Circuit",
    viewers: "12.4K",
    status: "LIVE",
  },

  {
    title: "Golden Derby Cup",
    location: "Dubai Racing Arena",
    viewers: "8.1K",
    status: "UPCOMING",
  },

  {
    title: "Elite Horse Masters",
    location: "Singapore Turf Club",
    viewers: "5.8K",
    status: "REGISTERING",
  },
];

function Spectator() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-6xl font-bold">
            Spectator Arena
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Watch live races, follow schedules, and participate in predictions.
          </p>

        </div>

        <Button>
          View Rewards
        </Button>

      </div>

      {/* Hero Banner */}
      <div className="bg-black rounded-[36px] p-12 text-white mb-10">

        <p className="text-yellow-400 font-semibold mb-5">
          LIVE EVENT
        </p>

        <h2 className="text-6xl font-bold leading-tight max-w-[700px]">

          Experience elite
          horse racing in
          real-time

        </h2>

        <p className="text-zinc-400 mt-6 text-lg leading-relaxed max-w-[650px]">

          Join thousands of spectators worldwide
          and track live race analytics,
          predictions, and performance insights.

        </p>

        <div className="flex gap-4 mt-10">

          <Button>
            Watch Live
          </Button>

          <button className="border border-zinc-700 px-8 py-4 rounded-2xl font-semibold">

            Explore Schedule

          </button>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Live Viewers"
          value="26.8K"
        />

        <StatCard
          title="Live Races"
          value="3"
        />

        <StatCard
          title="Prediction Entries"
          value="12.4K"
        />

        <StatCard
          title="Rewards Claimed"
          value="4,280"
        />

      </div>

      {/* Race Cards */}
      <div className="grid grid-cols-3 gap-6">

        {races.map((race, index) => (

          <div
            key={index}
            className="bg-white border border-zinc-200 rounded-[32px] p-8"
          >

            {/* Top */}
            <div className="flex justify-between items-center mb-8">

              <div className="w-[72px] h-[72px] bg-yellow-100 rounded-[24px] flex items-center justify-center text-3xl">

                🏇

              </div>

              <StatusBadge
                status={race.status}
              />

            </div>

            {/* Content */}
            <h2 className="text-3xl font-bold mb-3">
              {race.title}
            </h2>

            <p className="text-zinc-500 mb-8">
              {race.location}
            </p>

            {/* Metrics */}
            <div className="space-y-5 mb-8">

              <div className="flex justify-between">

                <span className="text-zinc-500">
                  Live Audience
                </span>

                <span className="font-semibold">
                  {race.viewers}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-500">
                  AI Prediction
                </span>

                <span className="font-semibold text-yellow-500">
                  Active
                </span>

              </div>

            </div>

            {/* Action */}
            <Button>
              Join Event
            </Button>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

/* Stats */
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

/* Status */
function StatusBadge({
  status,
}) {
  const styles = {
    LIVE:
      "bg-green-100 text-green-600",

    UPCOMING:
      "bg-yellow-100 text-yellow-600",

    REGISTERING:
      "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`px-4 py-2 rounded-2xl font-semibold text-sm
      ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default Spectator;