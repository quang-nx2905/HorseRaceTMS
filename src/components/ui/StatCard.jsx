function StatCard({
    title,
    value,
    subtitle,
}) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-7 transition-all hover:shadow-xl">

            <p className="text-sm uppercase tracking-wider text-zinc-400">
                {title}
            </p>

            <h2 className="text-5xl font-black mt-5 dark:text-white">
                {value}
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400 mt-4">
                {subtitle}
            </p>

        </div>
    );
}

export default StatCard;