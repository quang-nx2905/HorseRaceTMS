function TournamentCardSkeleton() {
    return (
        <div className="relative bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm animate-pulse">
            {/* Top accent stripe */}
            <div className="h-1.5 w-full bg-zinc-200" />

            <div className="p-7">
                {/* Header row */}
                <div className="flex items-start justify-between mb-5 gap-3">
                    <div className="flex-1 space-y-2">
                        <div className="h-6 w-[75%] bg-zinc-200 rounded-xl" />
                        <div className="h-4 w-[45%] bg-zinc-100 rounded-xl" />
                    </div>
                    <div className="h-7 w-20 bg-zinc-200 rounded-full" />
                </div>

                {/* Chips row */}
                <div className="flex gap-2.5 mb-5">
                    <div className="h-8 w-28 bg-zinc-100 rounded-xl" />
                    <div className="h-8 w-24 bg-zinc-100 rounded-xl" />
                    <div className="h-8 w-20 bg-amber-100 rounded-xl" />
                </div>

                {/* Mini stats area */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-zinc-50 rounded-2xl">
                    <div className="space-y-1.5">
                        <div className="h-3 w-16 bg-zinc-200 rounded-lg" />
                        <div className="h-5 w-20 bg-zinc-200 rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-3 w-16 bg-zinc-200 rounded-lg" />
                        <div className="h-5 w-14 bg-zinc-200 rounded-lg" />
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2.5">
                    <div className="flex-1 h-12 bg-zinc-200 rounded-2xl" />
                    <div className="w-12 h-12 bg-zinc-100 rounded-2xl" />
                    <div className="w-12 h-12 bg-red-100 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

export default TournamentCardSkeleton;