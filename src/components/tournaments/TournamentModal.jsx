function TournamentModal({
    open,
    onClose,
    tournament,
}) {

    if (!open) return null;

    return (

        <div
            className="
        fixed
        inset-0

        bg-black/40

        flex
        items-center
        justify-center

        z-50
      "
        >

            {/* Modal */}
            <div
                className="
          w-[700px]

          bg-white

          rounded-[40px]

          p-10

          relative
        "
            >

                {/* Close */}
                <button
                    onClick={onClose}
                    className="
            absolute
            top-6
            right-6

            text-3xl
          "
                >
                    ×
                </button>

                {/* Status */}
                <div className="mb-6">

                    <span
                        className={`
              px-4
              py-2

              rounded-full

              text-sm
              font-semibold

              ${tournament.status === "Active"
                                ? "bg-green-100 text-green-600"
                                : tournament.status === "Upcoming"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-zinc-200 text-zinc-700"
                            }
            `}
                    >
                        {tournament.status}
                    </span>

                </div>

                {/* Title */}
                <h1
                    className="
            text-5xl
            font-bold

            mb-4
          "
                >
                    {tournament.title}
                </h1>

                {/* Location */}
                <p
                    className="
            text-zinc-500
            text-xl

            mb-10
          "
                >
                    {tournament.location}
                </p>

                {/* Stats */}
                <div
                    className="
            grid
            grid-cols-2

            gap-6

            mb-10
          "
                >

                    <div
                        className="
              bg-zinc-100

              rounded-3xl

              p-8
            "
                    >

                        <p className="text-zinc-500 mb-3">
                            Prize Pool
                        </p>

                        <h2
                            className="
                text-4xl
                font-bold
              "
                        >
                            {tournament.prize}
                        </h2>

                    </div>

                    <div
                        className="
              bg-zinc-100

              rounded-3xl

              p-8
            "
                    >

                        <p className="text-zinc-500 mb-3">
                            Total Races
                        </p>

                        <h2
                            className="
                text-4xl
                font-bold
              "
                        >
                            {tournament.races}
                        </h2>

                    </div>

                </div>

                {/* Description */}
                <div
                    className="
            bg-zinc-50

            rounded-3xl

            p-8

            mb-10
          "
                >

                    <h3
                        className="
              text-2xl
              font-bold

              mb-4
            "
                    >
                        Tournament Overview
                    </h3>

                    <p className="text-zinc-600 leading-8">
                        This elite horse racing tournament
                        gathers the best jockeys and horses
                        from around the world to compete
                        in high-stakes championship races.
                    </p>

                </div>

                {/* Actions */}
                <div className="flex gap-4">

                    <button
                        className="
              flex-1

              py-4

              rounded-2xl

              bg-yellow-400

              font-semibold
            "
                    >
                        Manage Tournament
                    </button>

                    <button
                        onClick={onClose}
                        className="
              flex-1

              py-4

              rounded-2xl

              border
              border-zinc-300

              font-semibold
            "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );
}

export default TournamentModal;