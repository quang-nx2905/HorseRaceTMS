function RecentRaces() {

    const races = [

        {
            name: "Golden Cup Final",
            track: "Tokyo Arena",
            status: "Live",
            prize: "$120,000",
        },

        {
            name: "Thunder Derby",
            track: "Royal Track",
            status: "Completed",
            prize: "$95,000",
        },

        {
            name: "Night Sprint",
            track: "Equinox Stadium",
            status: "Upcoming",
            prize: "$150,000",
        },

    ];

    return (

        <div
            className="
        bg-white

        border
        border-zinc-200

        rounded-[32px]

        p-10
      "
        >

            {/* Header */}
            <div
                className="
          flex
          items-center
          justify-between

          mb-10
        "
            >

                <div>

                    <h2
                        className="
              text-4xl
              font-bold
              mb-3
            "
                    >
                        Recent Races
                    </h2>

                    <p className="text-zinc-500">
                        Latest tournament activities
                    </p>

                </div>

                <button
                    className="
            px-6
            py-3

            rounded-2xl

            bg-yellow-400

            font-semibold
          "
                >
                    View All
                </button>

            </div>

            {/* List */}
            <div className="space-y-4">

                {races.map((race, index) => (

                    <div
                        key={index}
                        className="
              flex
              items-center
              justify-between

              p-6

              rounded-2xl

              border
              border-zinc-100

              hover:bg-zinc-50

              transition-all
            "
                    >

                        {/* Left */}
                        <div>

                            <h3
                                className="
                  text-2xl
                  font-bold
                  mb-2
                "
                            >
                                {race.name}
                            </h3>

                            <p className="text-zinc-500">
                                {race.track}
                            </p>

                        </div>

                        {/* Right */}
                        <div className="text-right">

                            <div
                                className={`
                  inline-flex

                  px-4
                  py-2

                  rounded-full

                  text-sm
                  font-semibold

                  mb-3

                  ${race.status === "Live"
                                        ? "bg-red-100 text-red-500"
                                        : race.status === "Completed"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-700"
                                    }
                `}
                            >
                                {race.status}
                            </div>

                            <p
                                className="
                  text-xl
                  font-bold
                "
                            >
                                {race.prize}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default RecentRaces;