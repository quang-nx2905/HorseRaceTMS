function EmptyState({
    title,
    description,
    buttonText,
}) {

    return (
        <div
            className="
        bg-white
        border
        border-zinc-200
        rounded-[32px]
        p-16
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
        >

            {/* Icon */}
            <div
                className="
          w-[120px]
          h-[120px]
          rounded-full
          bg-yellow-100
          flex
          items-center
          justify-center
          text-6xl
          mb-8
        "
            >
                🐎
            </div>

            {/* Title */}
            <h2
                className="
          text-4xl
          font-bold
          mb-4
        "
            >
                {title}
            </h2>

            {/* Description */}
            <p
                className="
          text-zinc-500
          max-w-[500px]
          leading-relaxed
          text-lg
          mb-8
        "
            >
                {description}
            </p>

            {/* Button */}
            <button
                className="
          bg-yellow-400
          px-8
          py-4
          rounded-2xl
          font-semibold
        "
            >
                {buttonText}
            </button>

        </div>
    );
}

export default EmptyState;