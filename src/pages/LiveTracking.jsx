import DashboardLayout from "../layouts/DashboardLayout";

const liveRaces = [
    {
        horse: "Thunderbolt",
        jockey: "Alex Carter",
        speed: "68 km/h",
        lap: "Final Lap",
        progress: "92%",
        status: "Leading",
    },

    {
        horse: "Golden Arrow",
        jockey: "Michael Reeves",
        speed: "64 km/h",
        lap: "Lap 5",
        progress: "78%",
        status: "Chasing",
    },

    {
        horse: "Black Phantom",
        jockey: "Daniel Foster",
        speed: "59 km/h",
        lap: "Lap 4",
        progress: "66%",
        status: "Stable",
    },
];

function LiveTracking() {
    return (
        <DashboardLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-6xl font-bold">
                        Live Tracking
                    </h1>

                    <p className="text-zinc-500 mt-3 text-lg">
                        Monitor live race telemetry and real-time horse performance.
                    </p>

                </div>

                <div className="bg-green-100 text-green-600 px-6 py-4 rounded-2xl font-semibold">

                    ● LIVE NOW

                </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mb-10">

                <StatCard
                    title="Active Races"
                    value="3"
                />

                <StatCard
                    title="Live Spectators"
                    value="12.4K"
                />

                <StatCard
                    title="Avg Speed"
                    value="64 km/h"
                />

                <StatCard
                    title="Race Completion"
                    value="78%"
                />

            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-6">

                {/* Live Telemetry */}
                <div className="col-span-2 bg-white border border-zinc-200 rounded-[32px] p-10">

                    <div className="flex justify-between items-center mb-10">

                        <div>

                            <h2 className="text-4xl font-bold">
                                Live Race Telemetry
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Real-time performance tracking
                            </p>

                        </div>

                    </div>

                    {/* Race Cards */}
                    <div className="space-y-6">

                        {liveRaces.map((race, index) => (

                            <div
                                key={index}
                                className="border border-zinc-100 rounded-[28px] p-8"
                            >

                                {/* Top */}
                                <div className="flex justify-between items-center mb-6">

                                    <div>

                                        <h3 className="text-3xl font-bold">
                                            {race.horse}
                                        </h3>

                                        <p className="text-zinc-500 mt-2">
                                            {race.jockey}
                                        </p>

                                    </div>

                                    <span className="bg-yellow-100 text-yellow-600 px-5 py-3 rounded-2xl font-semibold">

                                        {race.status}

                                    </span>

                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-3 gap-6 mb-6">

                                    <Metric
                                        label="Speed"
                                        value={race.speed}
                                    />

                                    <Metric
                                        label="Current Lap"
                                        value={race.lap}
                                    />

                                    <Metric
                                        label="Progress"
                                        value={race.progress}
                                    />

                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-[14px] bg-zinc-100 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-yellow-400 rounded-full"
                                        style={{
                                            width: race.progress,
                                        }}
                                    ></div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Right Panel */}
                <div className="space-y-6">

                    {/* Live Feed */}
                    <div className="bg-white border border-zinc-200 rounded-[32px] p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Live Feed
                        </h2>

                        <div className="space-y-5">

                            <FeedItem
                                text="Thunderbolt overtook Golden Arrow"
                                time="2 sec ago"
                            />

                            <FeedItem
                                text="Lap 5 completed"
                                time="1 min ago"
                            />

                            <FeedItem
                                text="New speed record detected"
                                time="4 mins ago"
                            />

                            <FeedItem
                                text="AI prediction updated"
                                time="8 mins ago"
                            />

                        </div>

                    </div>

                    {/* AI Insights */}
                    <div className="bg-black rounded-[32px] p-8 text-white">

                        <p className="text-yellow-400 font-semibold mb-4">
                            AI LIVE INSIGHT
                        </p>

                        <h2 className="text-4xl font-bold leading-tight">

                            Thunderbolt has
                            92% win probability

                        </h2>

                        <p className="text-zinc-400 mt-5 leading-relaxed">

                            Current telemetry indicates
                            exceptional acceleration and
                            stamina performance.

                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

/* Stat Card */
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

/* Metric */
function Metric({
    label,
    value,
}) {
    return (
        <div className="bg-zinc-50 rounded-2xl p-5">

            <p className="text-zinc-500 mb-3">
                {label}
            </p>

            <h3 className="text-2xl font-bold">
                {value}
            </h3>

        </div>
    );
}

/* Feed Item */
function FeedItem({
    text,
    time,
}) {
    return (
        <div className="border-b border-zinc-100 pb-4">

            <p className="font-semibold">
                {text}
            </p>

            <p className="text-zinc-400 mt-2 text-sm">
                {time}
            </p>

        </div>
    );
}

export default LiveTracking;