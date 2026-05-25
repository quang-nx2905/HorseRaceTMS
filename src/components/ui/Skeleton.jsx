function Skeleton({
    className = "",
}) {
    return (
        <div
            className={`
        bg-gradient-to-r
        from-zinc-100
        via-zinc-200
        to-zinc-100

        bg-[length:1000px_100%]

        animate-shimmer

        rounded-2xl

        ${className}
      `}
        ></div>
    );
}

export default Skeleton;