function RecentRaceCard({

    title,

    location,

    prize,

    status,

}) {

    return (

        <div
            className="
        border
        border-zinc-200

        rounded-2xl

        p-5
      "
        >

            <div
                className="
          flex
          items-center
          justify-between

          mb-4
        "
            >

                <h3 className="font-bold text-xl">
                    {title}
                </h3>

                <span
                    className={`
            px-3
            py-1

            rounded-full

            text-sm

            ${status === "Live"
                            ? "bg-red-100 text-red-500"
                            : status === "Completed"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-700"
                        }
          `}
                >
                    {status}
                </span>

            </div>

            <div
                className="
          flex
          justify-between

          text-zinc-500
        "
            >

                <p>{location}</p>

                <p>{prize}</p>

            </div>

        </div>

    );
}

export default RecentRaceCard;