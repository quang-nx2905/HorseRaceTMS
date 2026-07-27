import { useEffect, useMemo, useState } from "react";
import { Activity, BarChart3, Database, RefreshCw } from "lucide-react";
import api from "../../api/axiosClient";

const TABS = [
    { id: "races", label: "Races" },
    { id: "predictions", label: "Predictions" },
    { id: "participants", label: "Participants" },
];

const RANGES = [
    { id: "D", label: "5D" },
    { id: "W", label: "7D" },
    { id: "M", label: "4W" },
    { id: "Y", label: "12M" },
];

function AnalyticsChart({ refreshKey = 0 }) {
    const [chartType, setChartType] = useState("races");
    const [chartRange, setChartRange] = useState("W");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        const fetchChartData = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await api.get(
                    `/dashboard/chart?type=${chartType}&range=${chartRange}`,
                );
                if (active) setData(Array.isArray(response.data) ? response.data : []);
            } catch (requestError) {
                console.error("Failed to fetch chart data:", requestError);
                if (active) {
                    setData([]);
                    setError("Analytics data is unavailable.");
                }
            } finally {
                if (active) setIsLoading(false);
            }
        };

        fetchChartData();
        return () => {
            active = false;
        };
    }, [chartType, chartRange, refreshKey]);

    const total = useMemo(
        () => data.reduce((sum, point) => sum + Number(point.value || 0), 0),
        [data],
    );
    const highest = useMemo(
        () => Math.max(0, ...data.map((point) => Number(point.value || 0))),
        [data],
    );
    const hasActivity = data.some((point) => Number(point.value) > 0);

    return (
        <article className="flex min-h-[470px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
            <header className="flex flex-col justify-between gap-5 border-b border-zinc-100 px-6 py-6 sm:flex-row sm:items-start lg:px-7">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-600">
                        <Activity size={14} />
                        Real platform activity
                    </div>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-zinc-950">
                        Performance analytics
                    </h2>
                    <p className="mt-1 text-xs text-zinc-400">Data returned by the dashboard analytics API.</p>
                </div>
                <div className="flex rounded-xl border border-zinc-200 bg-zinc-50 p-1">
                    {RANGES.map((range) => (
                        <button
                            key={range.id}
                            type="button"
                            onClick={() => setChartRange(range.id)}
                            className={`min-w-10 rounded-lg px-2.5 py-2 text-[10px] font-black transition ${
                                chartRange === range.id
                                    ? "bg-zinc-950 text-white shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-700"
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex flex-wrap items-center justify-between gap-4 px-6 pt-5 lg:px-7">
                <div className="flex gap-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setChartType(tab.id)}
                            className={`rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-wide transition ${
                                chartType === tab.id
                                    ? "bg-amber-400 text-zinc-950"
                                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {!isLoading && !error && (
                    <div className="flex items-center gap-5 text-right">
                        <div>
                            <span className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400">Total</span>
                            <strong className="text-xl font-black text-zinc-950">{total.toLocaleString()}</strong>
                        </div>
                        <div className="h-8 w-px bg-zinc-200" />
                        <div>
                            <span className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400">Peak</span>
                            <strong className="text-xl font-black text-zinc-950">{highest.toLocaleString()}</strong>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative flex flex-1 px-6 pb-6 pt-5 lg:px-7">
                {isLoading ? (
                    <div className="flex w-full items-center justify-center rounded-2xl bg-zinc-50">
                        <RefreshCw className="animate-spin text-amber-500" size={24} />
                    </div>
                ) : error ? (
                    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/50 text-center">
                        <Database size={24} className="text-red-300" />
                        <p className="mt-3 text-sm font-bold text-red-700">{error}</p>
                        <p className="mt-1 text-xs text-red-500">No substitute data is displayed.</p>
                    </div>
                ) : !data.length || !hasActivity ? (
                    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/70 text-center">
                        <BarChart3 size={26} className="text-zinc-300" />
                        <p className="mt-3 text-sm font-bold text-zinc-600">No activity recorded</p>
                        <p className="mt-1 text-xs text-zinc-400">There are no {chartType} in this period.</p>
                    </div>
                ) : (
                    <div className="flex w-full items-end gap-3 border-b border-zinc-200 bg-[linear-gradient(to_bottom,transparent_24%,#f4f4f5_25%,transparent_25%,transparent_49%,#f4f4f5_50%,transparent_50%,transparent_74%,#f4f4f5_75%,transparent_75%)] px-2 pt-5">
                        {data.map((point, index) => {
                            const value = Number(point.value || 0);
                            const height = highest ? Math.max((value / highest) * 82, value > 0 ? 5 : 0) : 0;
                            return (
                                <div key={`${point.label}-${index}`} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                                    <span className="mb-2 translate-y-2 rounded-lg bg-zinc-950 px-2 py-1 text-[10px] font-black text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                                        {value}
                                    </span>
                                    <div
                                        className="w-full max-w-14 rounded-t-xl bg-gradient-to-t from-amber-500 to-amber-300 shadow-[0_8px_24px_rgba(245,158,11,0.18)] transition group-hover:brightness-105"
                                        style={{ height: `${height}%` }}
                                    />
                                    <span className="my-3 max-w-full truncate text-[10px] font-bold text-zinc-400">{point.label}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </article>
    );
}

export default AnalyticsChart;
