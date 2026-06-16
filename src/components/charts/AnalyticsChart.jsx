function AnalyticsChart() {

    const data = [
        { label: "Mon", value: 40 },
        { label: "Tue", value: 65 },
        { label: "Wed", value: 45 },
        { label: "Thu", value: 78 },
        { label: "Fri", value: 70 },
        { label: "Sat", value: 92 },
        { label: "Sun", value: 58 },
    ];

    const max = Math.max(...data.map((d) => d.value));

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 h-[420px] flex flex-col">

            {/* HEADER */}
            <div className="flex items-start justify-between flex-shrink-0 mb-6">
                <div>
                    <h2 className="text-xl font-black text-zinc-900">
                        Weekly Analytics
                    </h2>
                    <p className="text-zinc-400 text-sm mt-0.5">
                        Tournament performance overview
                    </p>
                </div>

                <div className="flex gap-2">
                    {["W", "M", "Y"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${tab === "W" ? "bg-yellow-400 text-black" : "text-zinc-400 hover:bg-zinc-100"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* CHART */}
            <div className="flex-1 flex flex-col">
                {/* Y LABELS */}
                <div className="flex items-end gap-3 flex-1">

                    {/* Y axis */}
                    <div className="flex flex-col justify-between h-full text-xs text-zinc-400 text-right w-6 flex-shrink-0 pb-6">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span>0</span>
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
                                {data.map((d, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className="w-full rounded-t-2xl bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 cursor-pointer relative group"
                                            style={{ height: `${(d.value / max) * 100}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                                                {d.value}
                                            </div>
                                        </div>
                                    </div>
                                ))}
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