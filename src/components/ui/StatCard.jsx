function StatCard({
    title,
    value,
    subtitle,
}) {
    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-7 transition-all hover:shadow-xl">

            <p className="text-sm uppercase tracking-wider text-zinc-400">
                {title}
            </p>

            <h2 className="text-5xl font-black mt-5">
                {value}
            </h2>

            <p className="text-zinc-500 mt-4">
                {subtitle}
            </p>

        </div>
    );
}

export default StatCard;