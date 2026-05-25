import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

function AnalyticsChart() {

    const data = [

        {
            day: "Mon",
            races: 12,
        },

        {
            day: "Tue",
            races: 18,
        },

        {
            day: "Wed",
            races: 15,
        },

        {
            day: "Thu",
            races: 24,
        },

        {
            day: "Fri",
            races: 30,
        },

        {
            day: "Sat",
            races: 21,
        },

        {
            day: "Sun",
            races: 35,
        },

    ];

    return (

        <div
            className="
        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-[32px]

        p-8
      "
        >

            {/* HEADER */}
            <div className="mb-10">

                <h2
                    className="
            text-3xl
            font-bold
            dark:text-white
            mb-2
          "
                >
                    Weekly Race Analytics
                </h2>

                <p className="text-zinc-500">
                    Performance metrics across all
                    active tournaments.
                </p>

            </div>

            {/* CHART */}
            <div className="h-[350px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272a"
                            opacity={0.1}
                        />

                        <XAxis
                            dataKey="day"
                            tick={{
                                fill: "#71717a",
                            }}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="races"
                            stroke="#facc15"
                            strokeWidth={4}
                            dot={{
                                r: 6,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}

export default AnalyticsChart;