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

        border
        border-zinc-200

        rounded-[32px]

        p-10
      "
        >

            {/* HEADER */}
            <div className="mb-10">

                <h2
                    className="
            text-4xl
            font-bold
            mb-3
          "
                >
                    Weekly Analytics
                </h2>

                <p className="text-zinc-500">
                    Tournament performance overview
                </p>

            </div>

            {/* CHART */}
            <div className="h-[400px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.1}
                        />

                        <XAxis
                            dataKey="day"
                        />

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

    );
}

export default AnalyticsChart;