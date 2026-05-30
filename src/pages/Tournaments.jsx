import {
  Search,
  Plus,
  CalendarDays,
  MapPin,
  Trophy,
} from "lucide-react";

function Tournaments() {

  const tournaments = [

    {
      id: 1,
      name: "Golden Derby Championship",
      location: "Tokyo Arena",
      date: "12 Jun 2026",
      prize: "$250,000",
      status: "Live",
    },

    {
      id: 2,
      name: "Royal Horse Cup",
      location: "London Stadium",
      date: "20 Jun 2026",
      prize: "$180,000",
      status: "Upcoming",
    },

    {
      id: 3,
      name: "Thunder Racing League",
      location: "New York Track",
      date: "02 Jul 2026",
      prize: "$320,000",
      status: "Completed",
    },

    {
      id: 4,
      name: "Equine Masters",
      location: "Dubai Racing Club",
      date: "18 Jul 2026",
      prize: "$500,000",
      status: "Upcoming",
    },

  ];

  return (

    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-5xl font-black dark:text-white">
            Tournaments
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mt-3">
            Manage all racing tournaments and competitions.
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

            flex
            items-center
            gap-3
          "
        >

          <Plus size={20} />

          Create Tournament

        </button>

      </div>

      {/* SEARCH */}
      <div
        className="
          bg-white
          dark:bg-zinc-900

          border
          border-zinc-200
          dark:border-zinc-800

          rounded-3xl

          p-5

          mb-8
        "
      >

        <div className="relative">

          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2

              text-zinc-400
            "
          />

          <input
            type="text"
            placeholder="Search tournaments..."
            className="
              w-full

              bg-zinc-100
              dark:bg-zinc-800

              dark:text-white

              rounded-2xl

              pl-12
              pr-5
              py-4

              outline-none
            "
          />

        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-6">

        {tournaments.map((tournament) => (

          <div
            key={tournament.id}

            className="
              bg-white
              dark:bg-zinc-900

              border
              border-zinc-200
              dark:border-zinc-800

              rounded-3xl

              p-6

              hover:scale-[1.02]

              transition-all
              duration-300
            "
          >

            {/* TOP */}
            <div className="flex items-start justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  {tournament.name}
                </h2>

                <div className="flex items-center gap-2 mt-3 text-zinc-500">

                  <MapPin size={16} />

                  <span>
                    {tournament.location}
                  </span>

                </div>

              </div>

              {/* STATUS */}
              <div
                className={`
                  px-4
                  py-2

                  rounded-full

                  text-sm
                  font-semibold

                  ${tournament.status === "Live"
                    ? "bg-red-100 text-red-500"
                    : tournament.status === "Upcoming"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }
                `}
              >

                {tournament.status}

              </div>

            </div>

            {/* INFO */}
            <div className="space-y-4">

              <div className="flex items-center gap-3 text-zinc-500">

                <CalendarDays size={18} />

                <span>
                  {tournament.date}
                </span>

              </div>

              <div className="flex items-center gap-3 text-zinc-500">

                <Trophy size={18} />

                <span>
                  Prize Pool: {tournament.prize}
                </span>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">

              <button
                className="
                  flex-1

                  bg-yellow-400
                  hover:bg-yellow-500

                  py-3

                  rounded-2xl

                  font-semibold

                  transition-all
                "
              >
                View Details
              </button>

              <button
                className="
                  flex-1

                  bg-zinc-100
                  dark:bg-zinc-800

                  dark:text-white

                  py-3

                  rounded-2xl

                  font-semibold

                  transition-all
                "
              >
                Edit
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Tournaments;