function Referee() {

    const races = [

        {
            race: "Golden Cup Final",
            track: "Tokyo Arena",
            status: "Live",
            horses: 12,
        },

        {
            race: "Royal Derby",
            track: "London Track",
            status: "Pending",
            horses: 10,
        },

        {
            race: "Night Sprint",
            track: "New York Stadium",
            status: "Completed",
            horses: 14,
        },

    ];

    return (

        <div>

            {/* HEADER */}
            <div
                className="
          flex
          items-center
          justify-between
          mb-10
        "
            >

                <div>

                    <h1 className="page-title">
                        Referee Panel
                    </h1>

                    <p className="page-subtitle">
                        Monitor and control race
                        activities in real-time.
                    </p>

                </div>

                <button
                    className="
            bg-red-500
            hover:bg-red-600

            text-white

            px-6
            py-4

            rounded-2xl

            font-semibold

            transition-all
          "
                >
                    Emergency Stop
                </button>

            </div>

            {/* LIVE STATUS */}
            <div
                className="
          grid
          grid-cols-1
          md:grid-cols-3

          gap-6

          mb-8
        "
            >

                {/* CARD */}
                <div className="card p-8">

                    <p className="text-zinc-500 mb-4">
                        Active Races
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        3
                    </h2>

                </div>

                {/* CARD */}
                <div className="card p-8">

                    <p className="text-zinc-500 mb-4">
                        Referees Online
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        14
                    </h2>

                </div>

                {/* CARD */}
                <div className="card p-8">

                    <p className="text-zinc-500 mb-4">
                        Incident Reports
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        2
                    </h2>

                </div>

            </div>

            {/* RACE CONTROL */}
            <div className="space-y-6">

                {races.map((item, index) => (

                    <div
                        key={index}
                        className="
              card
              p-8
            "
                    >

                        <div
                            className="
                flex
                items-center
                justify-between
                mb-6
              "
                        >

                            <div>

                                <h2
                                    className="
                    text-3xl
                    font-bold
                    mb-2
                  "
                                >
                                    {item.race}
                                </h2>

                                <p className="text-zinc-500">
                                    {item.track}
                                </p>

                            </div>

                            {/* STATUS */}
                            <span
                                className={`
                  px-4
                  py-2

                  rounded-full

                  text-sm
                  font-semibold

                  ${item.status === "Live"
                                        ? "bg-red-100 text-red-500"
                                        : item.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-600"
                                    }
                `}
                            >
                                {item.status}
                            </span>

                        </div>

                        {/* STATS */}
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
                                    Participating Horses
                                </p>

                                <h3
                                    className="
                    text-3xl
                    font-black
                  "
                                >
                                    {item.horses}
                                </h3>

                            </div>

                            <div
                                className="
                  flex
                  gap-4
                "
                            >

                                <button
                                    className="
                    bg-yellow-400
                    hover:bg-yellow-500

                    px-5
                    py-3

                    rounded-2xl

                    font-semibold

                    transition-all
                  "
                                >
                                    Monitor
                                </button>

                                <button
                                    className="
                    bg-zinc-900
                    hover:bg-black

                    text-white

                    px-5
                    py-3

                    rounded-2xl

                    font-semibold

                    transition-all
                  "
                                >
                                    Open Control
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Referee;