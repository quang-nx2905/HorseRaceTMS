function AnalyticsChart() {

    const bars = [40, 65, 45, 78, 70, 92];

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 h-[420px]">

            <h2 className="text-4xl font-black">
                Weekly Analytics
            </h2>

            <p className="text-zinc-500 mt-2">
                Tournament performance overview
            </p>

            <div className="flex items-end gap-4 h-[280px] mt-12">

                {bars.map((bar, index) => (
                    <div
                        key={index}
                        className="flex-1 bg-yellow-400 rounded-t-3xl transition-all hover:opacity-80"
                        style={{
                            height: `${bar}%`,
                        }}
                    />
                ))}

            </div>

        </div>
    );
}

export default AnalyticsChart;