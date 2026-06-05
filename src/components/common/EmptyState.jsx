import { SearchX } from "lucide-react";

function EmptyState({
    title = "No Data Found",
    description = "There is nothing to display right now.",
}) {

    return (

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-16 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">

                <SearchX
                    size={36}
                    className="text-zinc-400"
                />

            </div>

            <h2 className="text-2xl font-bold mt-6 dark:text-white">
                {title}
            </h2>

            <p className="text-zinc-500 mt-3">
                {description}
            </p>

        </div>

    );
}

export default EmptyState;