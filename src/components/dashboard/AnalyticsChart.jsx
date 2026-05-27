import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
} from "recharts";

const data = [

    {
        name: "Mon",
        races: 12,
    },

    {
        name: "Tue",
        races: 18,
    },

    {
        name: "Wed",
        races: 9,
    },

    {
        name: "Thu",
        races: 22,
    },

    {
        name: "Fri",
        races: 15,
    },

    {
        name: "Sat",
        races: 28,
    },

    {
        name: "Sun",
        races: 20,
    },

];

function AnalyticsChart() {

    return (

        <div className="h-[320px]">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart data={data}>

                    <XAxis dataKey="name" />

                    <Tooltip />

                    <Bar
                        dataKey="races"
                        radius={[12, 12, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );
}

export default AnalyticsChart;