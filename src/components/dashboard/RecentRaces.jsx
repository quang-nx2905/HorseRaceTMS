import React, { useEffect, useState } from "react";
import { MapPin, Trophy, Clock } from "lucide-react";
import tournamentApi from "../../api/tournamentApi";

function RecentRaces() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const res = await tournamentApi.getAll({ page: 1, pageSize: 5 });
                const items = res.data?.items || res.items || (res.data && res.data.data && res.data.data.items) || [];
                
                const mapped = items.map(t => ({
                    id: t.tourId,
                    name: t.tourName,
                    location: t.location || "Unknown",
                    prize: t.prizePool ? `$${t.prizePool.toLocaleString()}` : "$0",
                    status: t.status || "Upcoming",
                }));
                setRaces(mapped);
            } catch (err) {
                console.error("Failed to fetch recent races", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRaces();
    }, []);

    const statusStyle = {
        Live: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300",
        Completed: "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-300",
        Upcoming: "bg-blue-100 text-blue-700 ring-1 ring-blue-300",
    };

    const statusDot = {
        Live: "bg-emerald-500 animate-pulse",
        Completed: "bg-zinc-400",
        Upcoming: "bg-blue-500",
    };

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 h-[420px] flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5 flex-shrink-0">
                <div>
                    <h2 className="text-xl font-black text-zinc-900">
                        Recent Races
                    </h2>
                    <p className="text-zinc-400 text-sm mt-0.5">
                        Latest tournament activities
                    </p>
                </div>

                <button className="bg-yellow-400 hover:bg-yellow-500 transition-all px-4 py-2 rounded-xl font-semibold text-sm text-black">
                    View All
                </button>
            </div>

            {/* LIST */}
            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-zinc-400 text-sm font-medium">Loading...</span>
                    </div>
                ) : races.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-zinc-400 text-sm font-medium">No recent tournaments found</span>
                    </div>
                ) : (
                    races.map((race, index) => (
                        <div
                            key={index}
                            className="group flex items-center justify-between p-4 rounded-2xl border border-zinc-100 hover:border-yellow-300 hover:bg-yellow-50/40 transition-all duration-200 cursor-pointer"
                        >
                            {/* LEFT */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                    <Trophy size={16} className="text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 text-sm leading-tight max-w-[150px] truncate">
                                        {race.name}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <MapPin size={11} className="text-zinc-400 flex-shrink-0" />
                                        <span className="text-zinc-400 text-xs truncate max-w-[130px]">
                                            {race.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex flex-col items-end gap-1.5">
                                <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold ${statusStyle[race.status] || statusStyle["Upcoming"]}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[race.status] || statusDot["Upcoming"]}`} />
                                    {race.status}
                                </span>
                                <p className="font-black text-sm text-zinc-900">
                                    {race.prize}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default RecentRaces;