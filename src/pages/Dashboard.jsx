import { useCallback, useEffect, useMemo, useState } from "react";
import StatCard from "../components/ui/StatCard";
import AnalyticsChart from "../components/charts/AnalyticsChart";
import RecentRaces from "../components/dashboard/RecentRaces";
import api from "../api/axiosClient";
import dashboardRaceHero from "../assets/dashboard-race-hero.png";
import {
    CalendarDays,
    Flag,
    GanttChartSquare,
    RefreshCw,
    Target,
    Trophy,
    Users,
    Zap,
} from "lucide-react";

const STAT_CONFIG = [
    {
        key: "totalHorses",
        title: "Total Horses",
        subtitle: "Registered in the system",
        icon: GanttChartSquare,
        tone: "gold",
    },
    {
        key: "activeTournaments",
        title: "Active Tournaments",
        subtitle: "Currently in progress",
        icon: Zap,
        tone: "emerald",
    },
    {
        key: "totalJockeys",
        title: "Total Jockeys",
        subtitle: "Verified racing profiles",
        icon: Users,
        tone: "blue",
    },
    {
        key: "completedTournaments",
        title: "Completed Events",
        subtitle: "Tournaments concluded",
        icon: Target,
        tone: "violet",
    },
];

function Dashboard() {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const fetchStats = useCallback(async () => {
        try {
            const response = await api.get("/dashboard/stats");
            setStatsData(response.data);
        } catch (requestError) {
            console.error("Failed to fetch dashboard stats", requestError);
            setStatsData(null);
            setError("Dashboard statistics could not be loaded.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const request = Promise.resolve().then(fetchStats);
        return () => {
            void request;
        };
    }, [fetchStats, refreshKey]);

    const stats = useMemo(
        () =>
            statsData
                ? STAT_CONFIG.map((item) => ({
                    ...item,
                    value: statsData[item.key],
                }))
                : [],
        [statsData],
    );

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const refreshDashboard = () => {
        setLoading(true);
        setError("");
        setRefreshKey((key) => key + 1);
    };

    return (
        <div className="w-full space-y-6">
            <section className="relative overflow-hidden rounded-[32px] bg-[#0a0c0e] px-7 py-8 text-white shadow-[0_24px_70px_rgba(9,11,13,0.16)] lg:px-10 lg:py-10">
                <img
                    src={dashboardRaceHero}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] object-cover object-center opacity-85"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080a0c]/90 via-[#080a0c]/55 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                <div className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
                <div className="pointer-events-none absolute right-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div>
                        <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                            <span className="h-px w-8 bg-amber-400" />
                            Race operations center
                        </div>
                        <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                            Your racing world,
                            <span className="block text-zinc-500">in one clear view.</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
                            Live system totals, tournament activity and performance data
                            retrieved directly from your platform.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-zinc-300 backdrop-blur">
                            <CalendarDays size={16} className="text-amber-400" />
                            {today}
                        </div>
                        <button
                            type="button"
                            onClick={refreshDashboard}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 text-xs font-black text-zinc-950 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-70"
                        >
                            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                            Refresh data
                        </button>
                    </div>
                </div>
            </section>

            {error && (
                <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    <span>{error} No placeholder values are being shown.</span>
                    <button type="button" onClick={refreshDashboard} className="font-bold underline">
                        Try again
                    </button>
                </div>
            )}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {loading
                    ? STAT_CONFIG.map((item) => (
                        <div key={item.key} className="h-[190px] animate-pulse rounded-[28px] border border-zinc-200 bg-white p-6">
                            <div className="h-11 w-11 rounded-xl bg-zinc-100" />
                            <div className="mt-8 h-3 w-28 rounded bg-zinc-100" />
                            <div className="mt-3 h-10 w-16 rounded bg-zinc-100" />
                        </div>
                    ))
                    : stats.map((stat, index) => (
                        <StatCard key={stat.key} {...stat} index={index + 1} />
                    ))}
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(350px,0.75fr)]">
                <AnalyticsChart refreshKey={refreshKey} />
                <RecentRaces refreshKey={refreshKey} />
            </section>

            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                    { icon: Flag, title: "Race activity", copy: "Built from scheduled races in the selected period." },
                    { icon: Trophy, title: "Tournament feed", copy: "Pulled from the latest tournament records." },
                    { icon: Users, title: "Participant data", copy: "Counted from actual race participation records." },
                ].map((item) => (
                    <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-amber-400">
                            <item.icon size={17} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-zinc-900">{item.title}</p>
                            <p className="mt-1 text-xs text-zinc-500">{item.copy}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Dashboard;
