import { useState } from "react";

import TournamentCard from "../components/tournaments/TournamentCard";

import TournamentModal from "../components/tournaments/TournamentModal";

function Tournaments() {

  const tournaments = [

    {
      title: "Golden Cup 2026",
      location: "Tokyo Arena",
      races: 12,
      prize: "$500,000",
      status: "Active",
    },

    {
      title: "Royal Derby",
      location: "London Track",
      races: 8,
      prize: "$320,000",
      status: "Upcoming",
    },

    {
      title: "Night Sprint League",
      location: "New York Stadium",
      races: 15,
      prize: "$750,000",
      status: "Completed",
    },

  ];

  const [selectedTournament, setSelectedTournament]
    = useState(null);

  return (

    <>
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

          <h1
            className="
              text-6xl
              font-bold
              mb-4
            "
          >
            Tournaments
          </h1>

          <p className="text-zinc-500 text-xl">
            Manage horse racing tournaments
            and schedules.
          </p>

        </div>

        <button
          className="
            px-8
            py-4

            rounded-2xl

            bg-yellow-400

            font-semibold
          "
        >
          + Create Tournament
        </button>

      </div>

      {/* Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3

          gap-6
        "
      >

        {tournaments.map((item, index) => (

          <div
            key={index}
            onClick={() =>
              setSelectedTournament(item)
            }
          >

            <TournamentCard
              title={item.title}
              location={item.location}
              races={item.races}
              prize={item.prize}
              status={item.status}
            />

          </div>

        ))}

      </div>

      {/* Modal */}
      <TournamentModal
        open={selectedTournament !== null}
        tournament={selectedTournament}
        onClose={() =>
          setSelectedTournament(null)
        }
      />

    </>
  );
}

export default Tournaments;