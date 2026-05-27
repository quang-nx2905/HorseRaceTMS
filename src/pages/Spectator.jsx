function Spectator() {

    const liveRaces = [

        {
            race: "Golden Cup Final",
            viewers: "24.8k",
            track: "Tokyo Arena",
            status: "LIVE",
        },

        {
            race: "Royal Derby",
            viewers: "18.2k",
            track: "London Track",
            status: "LIVE",
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
                        Spectator Arena
                    </h1>

                    <p className="page-subtitle">
                        Live race streaming and
                        audience engagement dashboard.
                    </p>

                </div>

                <button
                    className="
            bg-yellow-400
            hover:bg-yellow-500

            transition-all

            px-6
            py-4

            rounded-2xl

            font-semibold
          "
                >
                    Watch Live
                </button>

            </div>

            {/* LIVE STATS */}
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
                        Live Viewers
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        42k
                    </h2>

                </div>

                {/* CARD */}
                <div className="card p-8">

                    <p className="text-zinc-500 mb-4">
                        Active Streams
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        8
                    </h2>

                </div>

                {/* CARD */}
                <div className="card p-8">

                    <p className="text-zinc-500 mb-4">
                        Audience Rating
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        4.9
                    </h2>

                </div>

            </div>

            {/* STREAM SECTION */}
            <div
                className="
          grid
          grid-cols-1
          xl:grid-cols-3

          gap-6
        "
            >

                {/* MAIN STREAM */}
                <div
                    className="
            card
            p-6

            xl:col-span-2
          "
                >

                    {/* VIDEO PLACEHOLDER */}
                    <div
                        className="
              bg-black

              rounded-3xl

              h-[420px]

              flex
              items-center
              justify-center

              mb-6
            "
                    >

                        <div className="text-center text-white">

                            <div className="text-7xl mb-5">
                                ▶
                            </div>

                            <h2 className="text-3xl font-bold">
                                Live Race Streaming
                            </h2>

                            <p className="text-zinc-400 mt-3">
                                Ultra HD Tournament Broadcast
                            </p>

                        </div>

                    </div>

                    {/* STREAM INFO */}
                    <div
                        className="
              flex
              items-center
              justify-between
            "
                    >

                        <div>

                            <h2 className="text-3xl font-bold">
                                Golden Cup Final
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Tokyo Arena • Live Now
                            </p>

                        </div>

                        <span
                            className="
                bg-red-100
                text-red-500

                px-4
                py-2

                rounded-full

                font-semibold
              "
                        >
                            LIVE
                        </span>

                    </div>

                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">

                    {/* LIVE RACES */}
                    <div className="card p-6">

                        <h2
                            className="
                text-3xl
                font-bold
                mb-6
              "
                        >
                            Live Events
                        </h2>

                        <div className="space-y-4">

                            {liveRaces.map((item, index) => (

                                <div
                                    key={index}
                                    className="
                    border
                    border-zinc-200

                    rounded-2xl

                    p-5
                  "
                                >

                                    <div
                                        className="
                      flex
                      items-center
                      justify-between

                      mb-4
                    "
                                    >

                                        <h3 className="font-bold text-xl">
                                            {item.race}
                                        </h3>

                                        <span
                                            className="
                        bg-red-100
                        text-red-500

                        text-xs
                        font-bold

                        px-3
                        py-1

                        rounded-full
                      "
                                        >
                                            {item.status}
                                        </span>

                                    </div>

                                    <p className="text-zinc-500 mb-4">
                                        {item.track}
                                    </p>

                                    <div
                                        className="
                      flex
                      items-center
                      justify-between
                    "
                                    >

                                        <p className="text-sm text-zinc-500">
                                            Viewers
                                        </p>

                                        <p className="font-bold">
                                            {item.viewers}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* FAN CHAT */}
                    <div className="card p-6">

                        <h2
                            className="
                text-3xl
                font-bold
                mb-6
              "
                        >
                            Fan Reactions
                        </h2>

                        <div className="space-y-4">

                            <div className="bg-zinc-100 rounded-2xl p-4">
                                🔥 Thunder Bolt is unstoppable!
                            </div>

                            <div className="bg-zinc-100 rounded-2xl p-4">
                                🏆 Best race of the season!
                            </div>

                            <div className="bg-zinc-100 rounded-2xl p-4">
                                ⚡ What an incredible finish!
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Spectator;