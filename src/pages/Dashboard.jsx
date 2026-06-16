import StatCard from "../components/ui/StatCard";
import AnalyticsChart from "../components/charts/AnalyticsChart";
import RecentRaces from "../components/dashboard/RecentRaces";
import {
    GanttChartSquare,
    Zap,
    TrendingUp,
    Target,
    ArrowUpRight,
    CalendarDays,
} from "lucide-react";

const stats = [
    {
        title: "Total Horses",
        value: "2,450",
        subtitle: "+12% this month",
        icon: GanttChartSquare,
        accent: "bg-yellow-400",
        iconColor: "text-yellow-900",
        trend: "+12%",
        trendUp: true,
    },
    {
        title: "Active Races",
        value: "18",
        subtitle: "Currently ongoing",
        icon: Zap,
        accent: "bg-emerald-400",
        iconColor: "text-emerald-900",
        trend: "+3",
        trendUp: true,
    },
    {
        title: "Predictions",
        value: "12.4k",
        subtitle: "AI generated insights",
        icon: TrendingUp,
        accent: "bg-blue-400",
        iconColor: "text-blue-900",
        trend: "+8.2%",
        trendUp: true,
    },
    {
        title: "Win Accuracy",
        value: "86%",
        subtitle: "Prediction engine",
        icon: Target,
        accent: "bg-violet-400",
        iconColor: "text-violet-900",
        trend: "+1.4%",
        trendUp: true,
    },
];

function Dashboard() {

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="space-y-8">

            {/* HERO HEADER */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-2">
                        Overview
                    </p>
                    <h1 className="text-5xl font-black text-zinc-900 leading-tight">
                        Dashboard
                    </h1>
                    <p className="text-zinc-500 mt-3 text-base">
                        Welcome back to the Horse Race Tournament Management System.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-white border border-zinc-200 px-5 py-3 rounded-2xl text-zinc-500 text-sm font-medium shadow-sm">
                    <CalendarDays size={16} className="text-yellow-500" />
                    {today}
                </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-4 gap-5">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        subtitle={stat.subtitle}
                        icon={stat.icon}
                        accent={stat.accent}
                        iconColor={stat.iconColor}
                        trend={stat.trend}
                        trendUp={stat.trendUp}
                    />
                ))}
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Schedule Race", color: "bg-yellow-400 hover:bg-yellow-500 text-black", icon: CalendarDays },
                    { label: "View Standings", color: "bg-zinc-900 hover:bg-zinc-700 text-white", icon: TrendingUp },
                    { label: "AI Predictions", color: "bg-blue-500 hover:bg-blue-600 text-white", icon: Zap },
                ].map(({ label, color, icon: Icon }) => (
                    <button
                        key={label}
                        className={`${color} flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md`}
                    >
                        <Icon size={18} />
                        {label}
                    </button>
                ))}
            </div>

            {/* CHARTS + RECENT RACES */}
            <div className="grid grid-cols-3 gap-5">

                <div className="col-span-2">
                    <AnalyticsChart />
                </div>

                <RecentRaces />

            </div>

        </div>
    );
}

export default Dashboard;