import DashboardLayout from "../layouts/DashboardLayout";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Mon", races: 4 },
  { name: "Tue", races: 6 },
  { name: "Wed", races: 3 },
  { name: "Thu", races: 8 },
  { name: "Fri", races: 5 },
  { name: "Sat", races: 9 },
  { name: "Sun", races: 7 },
];

function Dashboard() {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-yellow-400">
          Dashboard Overview
        </h1>

        <p className="text-zinc-400 mt-2">
          Real-time horse racing analytics and tournament management
        </p>

      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Total Tournaments
          </h2>

          <p className="text-4xl font-bold mt-3">
            12
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Active Horses
          </h2>

          <p className="text-4xl font-bold mt-3">
            148
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Live Races
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-400">
            3
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400">
            Prize Pool
          </h2>

          <p className="text-4xl font-bold mt-3">
            $5M
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        {/* Main Chart */}
        <div className="col-span-2 bg-zinc-900 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                Weekly Race Analytics
              </h2>

              <p className="text-zinc-400 mt-1">
                Race activity during this week
              </p>
            </div>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data}>

                <CartesianGrid stroke="#27272a" />

                <XAxis dataKey="name" stroke="#a1a1aa" />

                <YAxis stroke="#a1a1aa" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="races"
                  stroke="#facc15"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Side Analytics */}
        <div className="space-y-6">

          <div className="bg-zinc-900 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Top Horse
            </h2>

            <p className="text-3xl font-bold text-yellow-400">
              Golden Thunder
            </p>

            <p className="text-zinc-400 mt-2">
              92% win rate this season
            </p>

          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Top Jockey
            </h2>

            <p className="text-3xl font-bold text-green-400">
              Alex Carter
            </p>

            <p className="text-zinc-400 mt-2">
              15 consecutive victories
            </p>

          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Prediction Accuracy
            </h2>

            <p className="text-3xl font-bold text-blue-400">
              84%
            </p>

            <p className="text-zinc-400 mt-2">
              Community prediction performance
            </p>

          </div>

        </div>

      </div>

      {/* Recent Activities */}
      <div className="bg-zinc-900 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Activities
        </h2>

        <div className="space-y-4">

          <div className="bg-zinc-800 rounded-xl p-4">
            🏇 Golden Thunder won Royal Derby 2026
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            📈 Prediction activity increased by 24%
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            🏆 Alex Carter reached #1 leaderboard position
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;