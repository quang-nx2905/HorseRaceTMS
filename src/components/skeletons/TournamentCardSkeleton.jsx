function TournamentCardSkeleton() {

    return (

        <div
            className="
        bg-white
        dark:bg-zinc-900

        border
        border-zinc-200
        dark:border-zinc-800

        rounded-3xl

        p-6

        animate-pulse
      "
        >

            {/* TITLE */}
            <div className="h-7 w-[70%] bg-zinc-200 dark:bg-zinc-700 rounded-xl"></div>

            {/* LOCATION */}
            <div className="h-5 w-[40%] bg-zinc-200 dark:bg-zinc-700 rounded-xl mt-4"></div>

            {/* INFO */}
            <div className="space-y-4 mt-8">

                <div className="h-5 w-[50%] bg-zinc-200 dark:bg-zinc-700 rounded-xl"></div>

                <div className="h-5 w-[60%] bg-zinc-200 dark:bg-zinc-700 rounded-xl"></div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">

                <div className="flex-1 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-700"></div>

                <div className="flex-1 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-700"></div>

            </div>

        </div>

    );
}

export default TournamentCardSkeleton;