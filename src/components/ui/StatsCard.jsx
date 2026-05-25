function StatsCard({
  title,
  value,
  subtitle,
  highlight,
}) {
  return (
    <div className="bg-white rounded-[28px] border border-zinc-200 p-8">

      <p className="text-zinc-500 text-sm uppercase tracking-wide">
        {title}
      </p>

      <div className="flex items-end gap-2 mt-5">

        <h2 className="text-5xl font-bold">
          {value}
        </h2>

        {highlight && (
          <span className="text-yellow-500 font-semibold mb-2">
            {highlight}
          </span>
        )}

      </div>

      {subtitle && (
        <p className="text-zinc-400 mt-3">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default StatsCard;