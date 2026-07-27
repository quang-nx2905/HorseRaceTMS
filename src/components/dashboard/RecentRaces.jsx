import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, RefreshCw, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tournamentApi from "../../api/tournamentApi";

const STATUS_STYLES = {
    Live: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Ongoing: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Completed: "bg-zinc-100 text-zinc-600 ring-zinc-200",
    Upcoming: "bg-blue-50 text-blue-700 ring-blue-200",
};

function RecentRaces({ refreshKey = 0 }) {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        const fetchTournaments = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await tournamentApi.getAll({ page: 1, pageSize: 5 });
                const items =
                    response.data?.items ||
                    response.items ||
                    response.data?.data?.items ||
                    [];
                if (active) setTournaments(Array.isArray(items) ? items : []);
            } catch (requestError) {
                console.error("Failed to fetch recent tournaments", requestError);
                if (active) {
                    setTournaments([]);
                    setError("Tournament data is unavailable.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchTournaments();
        return () => {
            active = false;
        };
    }, [refreshKey]);

    return (
        <article className="flex min-h-[470px] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white">
            <header className="flex items-center justify-between border-b border-zinc-100 px-6 py-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-600">
                        <Trophy size={14} />
                        Tournament feed
                    </div>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-zinc-950">Latest events</h2>
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/tournaments")}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
                    aria-label="View all tournaments"
                >
                    <ArrowUpRight size={17} />
                </button>
            </header>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
                {loading ? (
                    <div className="flex flex-1 items-center justify-center">
                        <RefreshCw className="animate-spin text-amber-500" size={23} />
                    </div>
                ) : error ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/50 text-center">
                        <p className="text-sm font-bold text-red-700">{error}</p>
                        <p className="mt-1 text-xs text-red-500">No substitute events are shown.</p>
                    </div>
                ) : tournaments.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 text-center">
                        <CalendarDays size={25} className="text-zinc-300" />
                        <p className="mt-3 text-sm font-bold text-zinc-600">No tournaments found</p>
                        <p className="mt-1 text-xs text-zinc-400">New events will appear here.</p>
                    </div>
                ) : (
                    tournaments.map((tournament, index) => {
                        const id = tournament.tourId || tournament.id;
                        const name = tournament.tourName || tournament.name;
                        const status = tournament.status;
                        const location = tournament.location;
                        const prize = tournament.prizePool;
                        const startDate = tournament.startDate
                            ? new Date(tournament.startDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })
                            : null;

                        return (
                            <button
                                type="button"
                                key={id || index}
                                onClick={() => navigate("/tournaments", { state: { openTournamentId: id } })}
                                className="group w-full rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 text-left transition hover:border-amber-300 hover:bg-amber-50/40"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-zinc-950 text-amber-400">
                                        <Trophy size={17} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="truncate text-sm font-black text-zinc-900">
                                                {name || `Tournament #${id}`}
                                            </p>
                                            {status && (
                                                <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-black ring-1 ${STATUS_STYLES[status] || "bg-zinc-100 text-zinc-600 ring-zinc-200"}`}>
                                                    {status}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium text-zinc-400">
                                            {location && <span className="flex items-center gap-1"><MapPin size={11} />{location}</span>}
                                            {startDate && <span className="flex items-center gap-1"><CalendarDays size={11} />{startDate}</span>}
                                            {prize != null && (
                                                <span className="font-black text-zinc-700">
                                                    {Number(prize).toLocaleString()} prize
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </article>
    );
}

export default RecentRaces;
