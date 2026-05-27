function Tournaments() {

  const tournaments = [

    {
      title: "Golden Cup 2026",
      location: "Tokyo Arena",
      prize: "$500,000",
      races: 12,
      status: "Active",
    },

    {
      title: "Royal Derby",
      location: "London Track",
      prize: "$320,000",
      races: 8,
      status: "Upcoming",
    },

    {
      title: "Night Sprint League",
      location: "New York Stadium",
      prize: "$750,000",
      races: 15,
      status: "Completed",
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
            Tournaments
          </h1>

          <p className="page-subtitle">
            Manage racing tournaments
            and championship events.
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
          + Create Tournament
        </button>

      </div>

      {/* GRID */}
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
            className="
              card
              p-7

              hover:shadow-xl
              hover:-translate-y-1

              transition-all
              duration-300
            "
          >

            {/* STATUS */}
            <div className="mb-6">

              <span
                className={`
                  px-4
                  py-2

                  rounded-full

                  text-sm
                  font-semibold

                  ${item.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : item.status === "Upcoming"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-zinc-200 text-zinc-700"
                  }
                `}
              >
                {item.status}
              </span>

            </div>

            {/* TITLE */}
            <h2
              className="
                text-3xl
                font-bold
                mb-3
              "
            >
              {item.title}
            </h2>

            {/* LOCATION */}
            <p
              className="
                text-zinc-500
                mb-8
              "
            >
              {item.location}
            </p>

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
                  Prize Pool
                </p>

                <h3
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {item.prize}
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
                  {item.races}
                </h3>

              </div>

            </div>

            {/* BUTTON */}
            <button
              className="
                w-full

                bg-zinc-900
                hover:bg-black

                text-white

                py-4

                rounded-2xl

                font-semibold

                transition-all
              "
            >
              View Tournament
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Tournaments;