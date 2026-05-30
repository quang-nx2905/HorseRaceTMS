function RecentRaces() {

    const races = [
        {
            name: "Golden Cup Final",
            location: "Tokyo Arena",
            prize: "$120,000",
            status: "Live",
        },
        {
            name: "Thunder Derby",
            location: "Royal Track",
            prize: "$95,000",
            status: "Completed",
        },
        {
            name: "Night Sprint",
            location: "Equinox Stadium",
            prize: "$150,000",
            status: "Upcoming",
        },
    ];

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 h-[420px]">

            <div className="flex items-center justify-between mb-8">

                <div>
                    <h2 className="text-4xl font-black dark:text-white">
                        Recent Races
                    </h2>

                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Latest tournament activities
                    </p>
                </div>

                <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-3 rounded-2xl font-semibold">
                    View All
                </button>

            </div>

            <div className="space-y-5">

                {races.map((race, index) => (
                    <div
                        key={index}
                        className="border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5"
                    >

                        <div className="flex items-start justify-between">

                            <div>
                                <h3 className="text-2xl font-bold dark:text-white">
                                    {race.name}
                                </h3>

                                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                                    {race.location}
                                </p>
                            </div>

                            <div className="text-right">

                                <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
                                    {race.status}
                                </span>

                                <p className="font-bold text-xl mt-4 dark:text-white">
                                    {race.prize}
                                </p>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default RecentRaces;