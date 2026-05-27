function Horses() {

    const horses = [

        {
            name: "Thunder Bolt",
            breed: "Arabian",
            age: 4,
            health: "Excellent",
            wins: 18,
        },

        {
            name: "Golden Sprint",
            breed: "Thoroughbred",
            age: 5,
            health: "Good",
            wins: 12,
        },

        {
            name: "Night Fury",
            breed: "Quarter Horse",
            age: 3,
            health: "Excellent",
            wins: 9,
        },

        {
            name: "Silver Storm",
            breed: "Mustang",
            age: 6,
            health: "Average",
            wins: 5,
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
                        Horses
                    </h1>

                    <p className="page-subtitle">
                        Manage race horses and
                        performance information.
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
                    + Add Horse
                </button>

            </div>

            {/* SEARCH */}
            <div className="card p-5 mb-6">

                <input
                    type="text"
                    placeholder="Search horses..."
                    className="
            w-full

            bg-zinc-100
            dark:bg-zinc-800

            rounded-2xl

            px-5
            py-4

            outline-none
          "
                />

            </div>

            {/* TABLE */}
            <div
                className="
          card
          overflow-hidden
        "
            >

                {/* TABLE HEADER */}
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

                    <p>Horse</p>

                    <p>Breed</p>

                    <p>Age</p>

                    <p>Health</p>

                    <p>Wins</p>

                </div>

                {/* ROWS */}
                <div>

                    {horses.map((horse, index) => (

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
                dark:hover:bg-zinc-800

                transition-all
              "
                        >

                            {/* NAME */}
                            <div>

                                <h3 className="font-bold text-lg">
                                    {horse.name}
                                </h3>

                            </div>

                            {/* BREED */}
                            <p className="text-zinc-600 dark:text-zinc-300">
                                {horse.breed}
                            </p>

                            {/* AGE */}
                            <p className="text-zinc-600 dark:text-zinc-300">
                                {horse.age} yrs
                            </p>

                            {/* HEALTH */}
                            <div>

                                <span
                                    className={`
                    px-4
                    py-2

                    rounded-full

                    text-sm
                    font-semibold

                    ${horse.health === "Excellent"
                                            ? "bg-green-100 text-green-600"
                                            : horse.health === "Good"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-500"
                                        }
                  `}
                                >
                                    {horse.health}
                                </span>

                            </div>

                            {/* WINS */}
                            <p className="font-bold">
                                {horse.wins}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
}

export default Horses;