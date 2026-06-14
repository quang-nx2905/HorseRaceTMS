import { useState } from "react";
import RankingDetailsModal from "../components/leaderboard/RankingDetailsModal";

function Leaderboard() {

  const [search, setSearch] =
    useState("");

  const [openDetails, setOpenDetails] =
    useState(false);

  const [selectedRanking, setSelectedRanking] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 3;

  const rankings = [

    {
      rank: 1,
      horse: "Thunder Bolt",
      jockey: "Akira Sato",
      wins: 48,
      points: 1240,
    },

    {
      rank: 2,
      horse: "Golden Sprint",
      jockey: "James Carter",
      wins: 41,
      points: 1130,
    },

    {
      rank: 3,
      horse: "Night Fury",
      jockey: "Ryan Cooper",
      wins: 36,
      points: 980,
    },

    {
      rank: 4,
      horse: "Silver Storm",
      jockey: "Lucas Fernandez",
      wins: 24,
      points: 760,
    },

  ];

  const filteredRankings =
    rankings.filter(
      (item) =>
        item.horse
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.jockey
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalPages =
    Math.ceil(
      filteredRankings.length /
      itemsPerPage
    );

  const paginatedRankings =
    filteredRankings.slice(
      (currentPage - 1) *
      itemsPerPage,
      currentPage *
      itemsPerPage
    );

  const totalPoints =
    rankings.reduce(
      (sum, item) =>
        sum + item.points,
      0
    );

  const totalWins =
    rankings.reduce(
      (sum, item) =>
        sum + item.wins,
      0
    );

  const topHorse =
    rankings[0]?.horse;

  const topJockey =
    rankings[0]?.jockey;

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
            Leaderboard
          </h1>

          <p className="page-subtitle">
            Global horse racing rankings
            and championship standings.
          </p>

        </div>

        <input
          type="text"
          placeholder="Search horse or jockey..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
      px-4
      py-3

      border
      border-zinc-200

      rounded-2xl

      outline-none
    "
        />

      </div>

      {/* STATS */}
      <div
        className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-4
    gap-6
    mb-10
  "
      >

        <div className="card p-6">

          <p className="text-zinc-500 mb-2">
            Total Points
          </p>

          <h2
            className="
        text-4xl
        font-black
      "
          >
            {totalPoints}
          </h2>

        </div>

        <div className="card p-6">

          <p className="text-zinc-500 mb-2">
            Total Wins
          </p>

          <h2
            className="
        text-4xl
        font-black
      "
          >
            {totalWins}
          </h2>

        </div>

        <div className="card p-6">

          <p className="text-zinc-500 mb-2">
            Top Horse
          </p>

          <h2
            className="
        text-2xl
        font-black
      "
          >
            {topHorse}
          </h2>

        </div>

        <div className="card p-6">

          <p className="text-zinc-500 mb-2">
            Top Jockey
          </p>

          <h2
            className="
        text-2xl
        font-black
      "
          >
            {topJockey}
          </h2>

        </div>

      </div>

      {/* TOP 3 */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3

          gap-6

          mb-10
        "
      >

        {/* SECOND */}
        <div
          className="
            card
            p-8

            flex
            flex-col
            items-center
            justify-center

            mt-10
          "
        >

          <div
            className="
              w-24
              h-24

              rounded-full

              bg-zinc-200

              flex
              items-center
              justify-center

              text-4xl
              font-black

              mb-6
            "
          >
            2
          </div>

          <h2 className="text-3xl font-bold mb-2">
            Golden Sprint
          </h2>

          <p className="text-zinc-500 mb-6">
            James Carter
          </p>

          <h3 className="text-5xl font-black">
            1130
          </h3>

          <p className="text-zinc-500 mt-2">
            Points
          </p>

        </div>

        {/* FIRST */}
        <div
          className="
            card
            p-8

            flex
            flex-col
            items-center
            justify-center

            border-4
            border-yellow-400
          "
        >

          <div
            className="
              w-28
              h-28

              rounded-full

              bg-yellow-400

              flex
              items-center
              justify-center

              text-5xl
              font-black

              mb-6
            "
          >
            1
          </div>

          <h2 className="text-4xl font-black mb-2">
            Thunder Bolt
          </h2>

          <p className="text-zinc-500 mb-6">
            Akira Sato
          </p>

          <h3 className="text-6xl font-black">
            1240
          </h3>

          <p className="text-zinc-500 mt-2">
            Points
          </p>

        </div>

        {/* THIRD */}
        <div
          className="
            card
            p-8

            flex
            flex-col
            items-center
            justify-center

            mt-16
          "
        >

          <div
            className="
              w-24
              h-24

              rounded-full

              bg-orange-200

              flex
              items-center
              justify-center

              text-4xl
              font-black

              mb-6
            "
          >
            3
          </div>

          <h2 className="text-3xl font-bold mb-2">
            Night Fury
          </h2>

          <p className="text-zinc-500 mb-6">
            Ryan Cooper
          </p>

          <h3 className="text-5xl font-black">
            980
          </h3>

          <p className="text-zinc-500 mt-2">
            Points
          </p>

        </div>

      </div>

      {/* TABLE */}
      <div className="card overflow-hidden">

        {/* HEADER */}
        <div
          className="
            grid
            grid-cols-5

            px-8
            py-6

            border-b
            border-zinc-200

            text-sm
            uppercase
            tracking-wider

            text-zinc-500
            font-semibold
          "
        >

          <p>Rank</p>

          <p>Horse</p>

          <p>Jockey</p>

          <p>Wins</p>

          <p>Points</p>

        </div>

        <div
          className="
    flex
    justify-center
    gap-3
    mt-8
  "
        >

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="
      px-4
      py-2
      rounded-xl
      border
      disabled:opacity-50
    "
          >
            Previous
          </button>

          <span
            className="
      flex
      items-center
      font-semibold
    "
          >
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="
      px-4
      py-2
      rounded-xl
      border
      disabled:opacity-50
    "
          >
            Next
          </button>

        </div>

        {/* ROWS */}
        <div>

          {paginatedRankings.map((item, index) => (

            <div
              key={index}
              className="
                grid
                grid-cols-5

                px-8
                py-6

                border-b
                border-zinc-100

                hover:bg-zinc-50

                transition-all
              "
            >

              <p className="font-black text-xl">
                #{item.rank}
              </p>

              <p className="font-bold">
                {item.horse}
              </p>

              <p className="text-zinc-600">
                {item.jockey}
              </p>

              <p>{item.wins}</p>

              <div
                className="
    flex
    items-center
    justify-between
  "
              >

                <p className="font-black">
                  {item.points}
                </p>

                <button
                  onClick={() => {

                    setSelectedRanking(
                      item
                    );

                    setOpenDetails(true);

                  }}
                  className="
      px-3
      py-1

      bg-yellow-400
      hover:bg-yellow-500

      rounded-xl

      text-sm
      font-semibold
    "
                >
                  View
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <RankingDetailsModal
        open={openDetails}
        onClose={() =>
          setOpenDetails(false)
        }
        ranking={selectedRanking}
      />
    </div>

  );
}

export default Leaderboard;