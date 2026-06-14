import { useState } from "react";

function Predictions() {

    const [search, setSearch] =
        useState("");

    const [predictions] = useState([

        {
            horse: "Thunder Bolt",
            race: "Golden Cup Final",
            confidence: "92%",
            odds: "1.8x",
            status: "High Chance",
        },

        {
            horse: "Night Fury",
            race: "Royal Derby",
            confidence: "76%",
            odds: "2.4x",
            status: "Moderate",
        },

        {
            horse: "Silver Storm",
            race: "Tokyo Sprint",
            confidence: "61%",
            odds: "3.1x",
            status: "Risky",
        },

    ]);

    const filteredPredictions =
        predictions.filter((item) =>
            item.horse
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

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
                        Predictions
                    </h1>

                    <p className="page-subtitle">
                        AI-powered race prediction
                        and analytics engine.
                    </p>

                </div>

                <div className="flex gap-4">

                    <input
                        type="text"
                        placeholder="Search horse..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="
            px-4
            py-3

            border
            border-zinc-200

            rounded-2xl
        "
                    />

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
                        Generate Prediction
                    </button>

                </div>

            </div>

            {/* TOP CARDS */}
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
                        Prediction Accuracy
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
              mb-4
            "
                    >
                        86%
                    </h2>

                    <div
                        className="
              h-3
              bg-zinc-100
              rounded-full
              overflow-hidden
            "
                    >

                        <div
                            className="
                h-full
                w-[86%]
                bg-yellow-400
              "
                        ></div>

                    </div>

                </div>

                {/* CARD */}
                <div className="card p-8">

                    <p className="text-zinc-500 mb-4">
                        Total AI Models
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        12
                    </h2>

                </div>

                {/* CARD */}
                <div className="card p-8">

                    <p className="text-zinc-500 mb-4">
                        Predictions Generated
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
            "
                    >
                        14.2k
                    </h2>

                </div>

            </div>

            {/* PREDICTION LIST */}
            <div className="space-y-6">

                {filteredPredictions.map((item, index) => (

                    <div
                        key={index}
                        className="
              card
              p-8

              hover:shadow-xl

              transition-all
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
                                    {item.horse}
                                </h2>

                                <p className="text-zinc-500">
                                    {item.race}
                                </p>

                            </div>

                            <span
                                className={`
                  px-4
                  py-2

                  rounded-full

                  text-sm
                  font-semibold

                  ${item.status === "High Chance"
                                        ? "bg-green-100 text-green-600"
                                        : item.status === "Moderate"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-500"
                                    }
                `}
                            >
                                {item.status}
                            </span>

                        </div>

                        <div className="mb-6">

                            <div
                                className="
            flex
            justify-between
            mb-2
        "
                            >

                                <span>
                                    Win Probability
                                </span>

                                <span>
                                    {item.confidence}
                                </span>

                            </div>

                            <div
                                className="
            h-3
            bg-zinc-100
            rounded-full
            overflow-hidden
        "
                            >

                                <div
                                    className="
                h-full
                bg-yellow-400
            "
                                    style={{
                                        width:
                                            item.confidence,
                                    }}
                                />

                            </div>

                        </div>

                        {/* STATS */}
                        <div
                            className="
                grid
                grid-cols-2
                gap-6
              "
                        >

                            {/* CONFIDENCE */}
                            <div
                                className="
                  bg-zinc-50
                  rounded-2xl
                  p-6
                "
                            >

                                <p className="text-zinc-500 mb-3">
                                    Confidence
                                </p>

                                <h3
                                    className="
                    text-4xl
                    font-black
                  "
                                >
                                    {item.confidence}
                                </h3>

                            </div>

                            {/* ODDS */}
                            <div
                                className="
                  bg-zinc-50
                  rounded-2xl
                  p-6
                "
                            >

                                <p className="text-zinc-500 mb-3">
                                    Betting Odds
                                </p>

                                <h3
                                    className="
                    text-4xl
                    font-black
                  "
                                >
                                    {item.odds}
                                </h3>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Predictions;