function StatCard({
    title,
    value,
    subtitle,
}) {

    return (

        <div
            className="
        bg-white

        border
        border-zinc-200

        rounded-[32px]

        p-8

        hover:-translate-y-1

        transition-all
      "
        >

            {/* Title */}
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

            {/* Value */}
            <h2
                className="
          text-5xl
          font-bold

          mb-4
        "
            >
                {value}
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-500">
                {subtitle}
            </p>

        </div>

    );
}

export default StatCard;