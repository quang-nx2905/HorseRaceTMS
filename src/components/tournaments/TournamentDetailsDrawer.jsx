import {
    X,
    CalendarDays,
    MapPin,
    Trophy,
    Users,
} from "lucide-react";

function TournamentDetailsDrawer({
    open,
    onClose,
    tournament,
}) {

    if (!open || !tournament)
        return null;

    return (

        <div
            className="
        fixed
        inset-0

        bg-black/40

        z-50

        flex
        justify-end
      "
        >

            {/* DRAWER */}
            <div
                className="
          w-[500px]
          h-screen

          bg-white
          dark:bg-zinc-900

          border-l
          border-zinc-200
          dark:border-zinc-800

          p-8

          overflow-y-auto

          animate-in
          slide-in-from-right
          duration-300
        "
            >

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h2 className="text-3xl font-black dark:text-white">
                            Tournament Details
                        </h2>

                        <p className="text-zinc-500 mt-2">
                            Detailed tournament information.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* CARD */}
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6">

                    <div className="flex items-center justify-between mb-5">

                        <h3 className="text-2xl font-bold dark:text-white">
                            {tournament.name}
                        </h3>

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

                    <div className="space-y-5">

                        <div className="flex items-center gap-3 text-zinc-500">

                            <MapPin size={18} />

                            <span>
                                {tournament.location}
                            </span>

                        </div>

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

                        <div className="flex items-center gap-3 text-zinc-500">

                            <Users size={18} />

                            <span>
                                Participants: 24 Horses
                            </span>

                        </div>

                    </div>

                </div>

                {/* ANALYTICS */}
                <div className="grid grid-cols-2 gap-5 mt-8">

                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5">

                        <p className="text-zinc-500">
                            Audience
                        </p>

                        <h2 className="text-4xl font-black mt-3 dark:text-white">
                            18.2K
                        </h2>

                    </div>

                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5">

                        <p className="text-zinc-500">
                            Revenue
                        </p>

                        <h2 className="text-4xl font-black mt-3 dark:text-white">
                            $1.4M
                        </h2>

                    </div>

                </div>

                {/* DESCRIPTION */}
                <div className="mt-8">

                    <h3 className="text-2xl font-bold dark:text-white mb-4">
                        Description
                    </h3>

                    <p className="text-zinc-500 leading-relaxed">
                        This tournament gathers elite horses and top jockeys from around the world to compete in a high-stakes championship racing event.
                    </p>

                </div>

            </div>

        </div>

    );
}

export default TournamentDetailsDrawer;