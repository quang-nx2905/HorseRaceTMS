import React, { useEffect, useState } from "react";
import StatCard from "../components/ui/StatCard";
import AnalyticsChart from "../components/charts/AnalyticsChart";
import RecentRaces from "../components/dashboard/RecentRaces";
import api from "../api/axiosClient";
import {
    GanttChartSquare,
    Zap,
    TrendingUp,
    Target,
    ArrowUpRight,
    CalendarDays,
    Users,
} from "lucide-react";

function Dashboard() {
    const [stats, setStats] = useState([
        {
            title: "Total Horses",
            value: "...",
            subtitle: "Registered horses",
            icon: GanttChartSquare,
            accent: "bg-yellow-400",
            iconColor: "text-yellow-900",
            trend: "+0",
            trendUp: true,
        },
        {
            title: "Active Tournaments",
            value: "...",
            subtitle: "Currently ongoing",
            icon: Zap,
            accent: "bg-emerald-400",
            iconColor: "text-emerald-900",
            trend: "+0",
            trendUp: true,
        },
        {
            title: "Total Jockeys",
            value: "...",
            subtitle: "Professional riders",
            icon: Users,
            accent: "bg-blue-400",
            iconColor: "text-blue-900",
            trend: "+0",
            trendUp: true,
        },
        {
            title: "Completed Tournaments",
            value: "...",
            subtitle: "Successful events",
            icon: Target,
            accent: "bg-violet-400",
            iconColor: "text-violet-900",
            trend: "+0",
            trendUp: true,
        },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                const data = response.data;
                
                setStats([
                    {
                        title: "Total Horses",
                        value: data.totalHorses.toLocaleString(),
                        subtitle: "Registered horses",
                        icon: GanttChartSquare,
                        accent: "bg-yellow-400",
                        iconColor: "text-yellow-900",
                        trend: "Live",
                        trendUp: true,
                    },
                    {
                        title: "Active Tournaments",
                        value: data.activeTournaments.toLocaleString(),
                        subtitle: "Currently ongoing",
                        icon: Zap,
                        accent: "bg-emerald-400",
                        iconColor: "text-emerald-900",
                        trend: "Live",
                        trendUp: true,
                    },
                    {
                        title: "Total Jockeys",
                        value: data.totalJockeys.toLocaleString(),
                        subtitle: "Professional riders",
                        icon: Users,
                        accent: "bg-blue-400",
                        iconColor: "text-blue-900",
                        trend: "Live",
                        trendUp: true,
                    },
                    {
                        title: "Completed Tournaments",
                        value: data.completedTournaments.toLocaleString(),
                        subtitle: "Successful events",
                        icon: Target,
                        accent: "bg-violet-400",
                        iconColor: "text-violet-900",
                        trend: "Done",
                        trendUp: true,
                    },
                ]);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
        };

        fetchStats();
    }, []);

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