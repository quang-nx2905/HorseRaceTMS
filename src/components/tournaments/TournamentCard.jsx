function TournamentCard({
    title,
    location,
    prize,
    status,
    races,
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
        hover:shadow-xl

        transition-all
      "
        >

            {/* Status */}
            <div className="mb-6">

                <span
                    className={`
            px-4
            py-2

            rounded-full

            text-sm
            font-semibold

            ${status === "Active"
                            ? "bg-green-100 text-green-600"
                            : status === "Upcoming"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-zinc-200 text-zinc-700"
                        }
          `}
                >
                    {status}
                </span>

            </div>

            {/* Title */}
            <h2
                className="
          text-3xl
          font-bold

          mb-3
        "
            >
                {title}
            </h2>

            {/* Location */}
            <p
                className="
          text-zinc-500

          mb-8
        "
            >
                {location}
            </p>

            {/* Stats */}
            <div
                className="
          flex
          items-center
          justify-between

          mb-8
        "
            >

                <div>

                    <p className="text-zinc-500 text-sm">
                        Prize Pool
                    </p>

                    <h3
                        className="
              text-2xl
              font-bold
            "
                    >
                        {prize}
                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 text-sm">
                        Races
                    </p>

                    <h3
                        className="
              text-2xl
              font-bold
            "
                    >
                        {races}
                    </h3>

                </div>

            </div>

            {/* Button */}
            <button
                className="
          w-full

          py-4

          rounded-2xl

          bg-yellow-400

          font-semibold

          hover:scale-[1.02]

          transition-all
        "
            >
                View Tournament
            </button>

        </div>

    );
}

export default TournamentCard;