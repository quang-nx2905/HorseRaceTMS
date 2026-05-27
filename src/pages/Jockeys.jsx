function Jockeys() {

  const jockeys = [

    {
      name: "James Carter",
      country: "United Kingdom",
      wins: 48,
      experience: "8 Years",
      status: "Elite",
    },

    {
      name: "Ryan Cooper",
      country: "United States",
      wins: 36,
      experience: "5 Years",
      status: "Professional",
    },

    {
      name: "Akira Sato",
      country: "Japan",
      wins: 52,
      experience: "10 Years",
      status: "Elite",
    },

    {
      name: "Lucas Fernandez",
      country: "Spain",
      wins: 21,
      experience: "3 Years",
      status: "Rising Star",
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
            Jockeys
          </h1>

          <p className="page-subtitle">
            Professional jockey management
            and performance overview.
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
          + Add Jockey
        </button>

      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4

          gap-6
        "
      >

        {jockeys.map((jockey, index) => (

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

            {/* AVATAR */}
            <div
              className="
                w-20
                h-20

                rounded-full

                bg-yellow-400

                flex
                items-center
                justify-center

                text-3xl
                font-black

                mb-6
              "
            >
              {jockey.name.charAt(0)}
            </div>

            {/* NAME */}
            <h2
              className="
                text-3xl
                font-bold
                mb-2
              "
            >
              {jockey.name}
            </h2>

            {/* COUNTRY */}
            <p
              className="
                text-zinc-500
                mb-8
              "
            >
              {jockey.country}
            </p>

            {/* STATS */}
            <div className="space-y-5 mb-8">

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <p className="text-zinc-500">
                  Wins
                </p>

                <p className="font-bold text-xl">
                  {jockey.wins}
                </p>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <p className="text-zinc-500">
                  Experience
                </p>

                <p className="font-bold">
                  {jockey.experience}
                </p>

              </div>

            </div>

            {/* STATUS */}
            <div className="mb-8">

              <span
                className={`
                  px-4
                  py-2

                  rounded-full

                  text-sm
                  font-semibold

                  ${jockey.status === "Elite"
                    ? "bg-green-100 text-green-600"
                    : jockey.status === "Professional"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-600"
                  }
                `}
              >
                {jockey.status}
              </span>

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
              View Profile
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Jockeys;