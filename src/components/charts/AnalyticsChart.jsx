import React, { useState, useEffect } from 'react';
import api from '../../api/axiosClient';

function AnalyticsChart() {
    const [chartType, setChartType] = useState('races');
    const [chartRange, setChartRange] = useState('W');
    const [data, setData] = useState([
        { label: "Mon", value: 0 },
        { label: "Tue", value: 0 },
        { label: "Wed", value: 0 },
        { label: "Thu", value: 0 },
        { label: "Fri", value: 0 },
        { label: "Sat", value: 0 },
        { label: "Sun", value: 0 },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchChartData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/dashboard/chart?type=${chartType}&range=${chartRange}`);
                if (response.data && response.data.length > 0) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch chart data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, [chartType, chartRange]);

    const max = Math.max(...data.map((d) => d.value), 10); // Minimum max of 10 to provide scale even if all are 0
    const ticks = [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0];

    const tabs = [
        { id: 'races', label: 'Races' },
        { id: 'predictions', label: 'Predictions' },
        { id: 'participants', label: 'Participants' }
    ];

    const rangeTabs = [
        { id: 'D', label: 'D' },
        { id: 'W', label: 'W' },
        { id: 'M', label: 'M' },
        { id: 'Y', label: 'Y' }
    ];

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 h-[420px] flex flex-col">

            {/* HEADER */}
            <div className="flex items-start justify-between flex-shrink-0 mb-6">
                <div>
                    <h2 className="text-xl font-black text-zinc-900">
                        Weekly Analytics
                    </h2>
                    <div className="flex gap-2 mt-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setChartType(tab.id)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${chartType === tab.id ? "bg-zinc-900 text-white" : "text-zinc-500 bg-zinc-100 hover:bg-zinc-200"}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 bg-zinc-50 p-1 rounded-xl border border-zinc-100">
                    {rangeTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setChartRange(tab.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${chartRange === tab.id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* CHART */}
            <div className="flex-1 flex flex-col relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {/* Y LABELS */}
                <div className="flex items-end gap-3 flex-1">

                    {/* Y axis */}
                    <div className="flex flex-col justify-between h-full text-xs text-zinc-400 text-right w-8 flex-shrink-0 pb-6">
                        {ticks.map((tick, index) => (
                            <span key={index}>{tick}</span>
                        ))}
                    </div>

                    {/* BARS */}
                    <div className="flex-1 flex flex-col">
                        {/* Grid lines */}
                        <div className="relative flex-1">
                            {[0, 25, 50, 75, 100].map((line) => (
                                <div
                                    key={line}
                                    className="absolute w-full border-t border-zinc-100"
                                    style={{ bottom: `${line}%` }}
                                />
                            ))}

                            {/* Bars */}
                            <div className="absolute inset-0 flex items-end gap-3 px-1">
                                {data.map((d, i) => {
                                    const heightPercentage = max > 0 ? (d.value / max) * 100 : 0;
                                    return (
                                        <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                                            <div
                                                className="w-full rounded-t-xl bg-gradient-to-t from-yellow-500 to-yellow-300 hover:from-yellow-400 hover:to-yellow-200 transition-all duration-300 cursor-pointer relative group shadow-sm shadow-yellow-500/20"
                                                style={{ height: `${heightPercentage}%`, minHeight: heightPercentage > 0 ? '4px' : '0px' }}
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all whitespace-nowrap shadow-xl">
                                                    {d.value}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* X LABELS */}
                        <div className="flex gap-3 mt-2 px-1">
                            {data.map((d, i) => (
                                <div key={i} className="flex-1 text-center text-xs text-zinc-400 font-medium">
                                    {d.label}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default AnalyticsChart;