import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 48 },
  { day: "Wed", value: 42 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 58 },
  { day: "Sat", value: 45 },
  { day: "Sun", value: 82 },
];

function AnalyticsChart() {
  return (
    <div className="h-[420px] mt-6">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a" }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#eab308"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#eab308",
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;