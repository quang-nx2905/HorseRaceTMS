function Horses() {

    const horses = [

        {
            name: "Thunder Bolt",
            breed: "Arabian",
            age: "4",
            health: "Excellent",
            wins: 18,
        },

        {
            name: "Golden Sprint",
            breed: "Thoroughbred",
            age: "5",
            health: "Good",
            wins: 12,
        },

        {
            name: "Night Fury",
            breed: "Quarter Horse",
            age: "3",
            health: "Excellent",
            wins: 9,
        },

    ];

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
                        Horses
                    </h1>

                    <p className="text-zinc-500 text-xl">
                        Manage race horses and
                        performance information.
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
                    + Add Horse
                </button>

            </div>

            {/* Table */}
            <div
                className="
          bg-white

          border
          border-zinc-200

          rounded-[32px]

          overflow-hidden
        "
            >

                {/* Head */}
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

                    <p>Name</p>

                    <p>Breed</p>

                    <p>Age</p>

                    <p>Health</p>

                    <p>Wins</p>

                </div>

                {/* Rows */}
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

                transition-all
              "
                        >

                            <p className="font-semibold">
                                {horse.name}
                            </p>

                            <p>{horse.breed}</p>

                            <p>{horse.age}</p>

                            <p>

                                <span
                                    className="
                    px-4
                    py-2

                    rounded-full

                    bg-green-100
                    text-green-600

                    text-sm
                    font-semibold
                  "
                                >
                                    {horse.health}
                                </span>

                            </p>

                            <p>{horse.wins}</p>

                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}

export default Horses;