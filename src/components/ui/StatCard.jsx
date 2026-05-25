function StatCard({
    title,
    value,
    subtitle,
}) {

    return (

        <div
            className="
        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-[32px]

        p-8

        shadow-sm

        transition-all
        hover:-translate-y-1
      "
        >

            {/* TITLE */}
            <p
                className="
          text-sm
          uppercase
          tracking-widest
          text-zinc-500
          mb-5
        "
            >
                {title}
            </p>

            {/* VALUE */}
            <h2
                className="
          text-5xl
          font-bold
          dark:text-white
          mb-4
        "
            >
                {value}
            </h2>

            {/* SUBTITLE */}
            <p
                className="
          text-zinc-500
        "
            >
                {subtitle}
            </p>

        </div>

    );
}

export default StatCard;