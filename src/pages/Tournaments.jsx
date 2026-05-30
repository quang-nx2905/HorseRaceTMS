import {
  Search,
  Plus,
  CalendarDays,
  MapPin,
  Trophy,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import CreateTournamentModal from "../components/modals/CreateTournamentModal";

import TournamentDetailsDrawer from "../components/tournaments/TournamentDetailsDrawer";

import TournamentCardSkeleton from "../components/skeletons/TournamentCardSkeleton";

function Tournaments() {

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [openModal, setOpenModal] =
    useState(false);

  const [openDrawer, setOpenDrawer] =
    useState(false);

  const [selectedTournament, setSelectedTournament] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

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

  const filteredTournaments =
    tournaments.filter((item) => {

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : item.status === filter;

      return matchesSearch && matchesFilter;

    });

  const totalLive =
    tournaments.filter(
      (item) => item.status === "Live"
    ).length;

  const totalUpcoming =
    tournaments.filter(
      (item) => item.status === "Upcoming"
    ).length;

  const totalCompleted =
    tournaments.filter(
      (item) => item.status === "Completed"
    ).length;

  const handleViewDetails = (tournament) => {

    setSelectedTournament(tournament);

    setOpenDrawer(true);

  };

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
          onClick={() => setOpenModal(true)}
          className="bg-yellow-400 hover:bg-yellow-500 transition-all px-6 py-4 rounded-2xl font-semibold flex items-center gap-3"
        >

          <Plus size={20} />

          Create Tournament

        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Live Tournaments
          </p>

          <h2 className="text-4xl font-black mt-3 text-red-500">
            {totalLive}
          </h2>

        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Upcoming
          </p>

          <h2 className="text-4xl font-black mt-3 text-yellow-500">
            {totalUpcoming}
          </h2>

        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Completed
          </p>

          <h2 className="text-4xl font-black mt-3 text-green-500">
            {totalCompleted}
          </h2>

        </div>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Total Revenue
              </p>

              <h2 className="text-4xl font-black mt-3 dark:text-white">
                $4.8M
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-500 flex items-center justify-center text-2xl">
              💰
            </div>

          </div>

        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Audience Reach
              </p>

              <h2 className="text-4xl font-black mt-3 dark:text-white">
                82K
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl">
              📈
            </div>

          </div>

        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Sponsors
              </p>

              <h2 className="text-4xl font-black mt-3 dark:text-white">
                34
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-500 flex items-center justify-center text-2xl">
              🤝
            </div>

          </div>

        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                AI Accuracy
              </p>

              <h2 className="text-4xl font-black mt-3 dark:text-white">
                91%
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-2xl">
              🧠
            </div>

          </div>

        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 mb-8 flex gap-4">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search tournaments..."
            className="w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-2xl pl-12 pr-5 py-4 outline-none"
          />

        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-2xl px-5 outline-none"
        >

          <option>All</option>
          <option>Live</option>
          <option>Upcoming</option>
          <option>Completed</option>

        </select>

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-2 gap-6">

        {loading ? (

          Array(4)
            .fill(0)
            .map((_, index) => (

              <TournamentCardSkeleton
                key={index}
              />

            ))

        ) : (

          filteredTournaments.map((tournament) => (

            <div
              key={tournament.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300"
            >

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

              <div className="flex gap-4 mt-8">

                <button
                  onClick={() =>
                    handleViewDetails(tournament)
                  }
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-2xl font-semibold transition-all"
                >
                  View Details
                </button>

                <button className="flex-1 bg-zinc-100 dark:bg-zinc-800 dark:text-white py-3 rounded-2xl font-semibold transition-all">
                  Edit
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      <CreateTournamentModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
      />

      <TournamentDetailsDrawer
        open={openDrawer}
        onClose={() =>
          setOpenDrawer(false)
        }
        tournament={selectedTournament}
      />

    </div>

  );
}

export default Tournaments;