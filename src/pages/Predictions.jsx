import { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    CircleDollarSign,
    Clock3,
    Coins,
    Loader2,
    Search,
    ShieldCheck,
    TrendingDown,
    TrendingUp,
    Trophy,
    Users,
} from "lucide-react";
import predictionApi from "../api/predictionApi";

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const formatPoints = (value) => `${numberFormatter.format(Number(value) || 0)} pts`;

const formatDate = (value) => {
    if (!value) return "Time unavailable";
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
};

const getInitials = (name = "") =>
    name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "HR";

function Predictions() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPredictions = async () => {
            try {
                const response = await predictionApi.getAnonymousFeed();
                setPredictions(response.data?.data ?? response.data ?? []);
            } catch (loadError) {
                console.error("Failed to load anonymous predictions", loadError);
                setError("We could not load the betting activity. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        loadPredictions();
    }, []);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return predictions.filter((prediction) => {
            const matchesTournament = !query ||
                prediction.tournamentName?.toLowerCase().includes(query);
            const matchesStatus =
                statusFilter === "All" ||
                (statusFilter === "Settled" && prediction.profitLoss !== null) ||
                (statusFilter === "Pending" && prediction.profitLoss === null);
            return matchesTournament && matchesStatus;
        });
    }, [predictions, search, statusFilter]);

    const totalWagered = predictions.reduce((total, prediction) => total + (prediction.betPoints || 0), 0);
    const settledCount = predictions.filter((prediction) => prediction.profitLoss !== null).length;
    const uniqueBettors = new Set(predictions.map((prediction) => prediction.bettorAlias)).size;

    return (
        <div className="w-full space-y-6 pb-12">
            <section className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-7 text-white shadow-xl shadow-zinc-300/40 md:p-10">
                <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-400">
                            <ShieldCheck size={15} />
                            Anonymous betting activity
                        </div>
                        <h1 className="mb-3 text-3xl font-black tracking-tight md:text-4xl">
                            Community Bets
                        </h1>
                        <p className="max-w-xl text-sm leading-6 text-zinc-400 md:text-base">
                            Follow the latest tournament bets while every bettor&apos;s identity stays protected.
                            Results and net returns appear after a tournament is completed.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: "Bettors", value: uniqueBettors, icon: Users },
                            { label: "Wagered", value: numberFormatter.format(totalWagered), icon: Coins },
                            { label: "Settled", value: settledCount, icon: Trophy },
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className="min-w-[94px] rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                                <Icon className="mb-3 text-amber-400" size={17} />
                                <p className="text-xl font-black">{value}</p>
                                <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-zinc-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="rounded-[1.75rem] border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <label className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={17} />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by tournament name..."
                            aria-label="Search by tournament name"
                            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                        />
                    </label>
                    <div className="flex gap-2" aria-label="Filter betting activity">
                        {["All", "Pending", "Settled"].map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setStatusFilter(filter)}
                                className={`rounded-xl border px-4 py-3 text-xs font-bold transition ${
                                    statusFilter === filter
                                        ? "border-zinc-900 bg-zinc-900 text-white"
                                        : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
                <div className="flex flex-col gap-2 border-b border-zinc-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-black text-zinc-900">Latest bets</h2>
                        <p className="mt-1 text-xs text-zinc-500">Newest activity is shown first</p>
                    </div>
                    <span className="text-xs font-bold text-zinc-400">{filtered.length} records</span>
                </div>

                {isLoading ? (
                    <div className="flex min-h-72 flex-col items-center justify-center text-zinc-400">
                        <Loader2 className="mb-3 animate-spin text-amber-500" size={28} />
                        <p className="text-sm font-bold">Loading betting activity...</p>
                    </div>
                ) : error ? (
                    <div className="flex min-h-72 items-center justify-center px-6 text-center text-sm font-medium text-red-500">
                        {error}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                        <Search className="mb-3 text-zinc-300" size={30} />
                        <p className="font-bold text-zinc-700">No bets found</p>
                        <p className="mt-1 text-sm text-zinc-400">Try another tournament name or filter.</p>
                    </div>
                ) : (
                    <div>
                        <div className="hidden grid-cols-12 items-center gap-4 border-b border-zinc-100 bg-zinc-50/80 px-6 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-400 lg:grid">
                            <span className="col-span-3">Bettor</span>
                            <span className="col-span-3">Tournament & race</span>
                            <span className="col-span-2">Selected horse</span>
                            <span className="col-span-1">Odds</span>
                            <span className="col-span-1">Stake</span>
                            <span className="col-span-2 text-right">Net result</span>
                        </div>
                        <div className="divide-y divide-zinc-100">
                        {filtered.map((prediction) => {
                            const isSettled = prediction.profitLoss !== null;
                            const isProfit = isSettled && prediction.profitLoss >= 0;
                            return (
                                <article
                                    key={prediction.predictionId}
                                    className="group grid gap-5 px-6 py-5 transition hover:bg-amber-50/40 md:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-4 lg:py-4"
                                >
                                    <div className="flex min-w-0 items-center gap-3 lg:col-span-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-xs font-black text-amber-400">
                                            {prediction.bettorAlias?.slice(-2)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-black text-zinc-900">{prediction.bettorAlias}</p>
                                            <p className="mt-1 flex items-center gap-1.5 truncate text-[11px] text-zinc-400">
                                                <Clock3 size={12} /> {formatDate(prediction.betPlacedAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="min-w-0 lg:col-span-3">
                                        <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-zinc-400 lg:hidden">Tournament</p>
                                        <p className="truncate text-sm font-bold text-zinc-800">{prediction.tournamentName}</p>
                                        <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-zinc-400">
                                            <CalendarDays size={12} /> {prediction.raceName}
                                        </p>
                                    </div>

                                    <div className="flex min-w-0 items-center gap-3 lg:col-span-2">
                                        {prediction.horseAvatar ? (
                                            <img src={prediction.horseAvatar} alt="" className="h-9 w-9 shrink-0 rounded-xl object-cover ring-1 ring-zinc-200" />
                                        ) : (
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xs font-black text-amber-700">
                                                {getInitials(prediction.horseName)}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-black text-zinc-900">{prediction.horseName}</p>
                                            <p className="mt-0.5 text-[10px] font-bold uppercase text-zinc-400 lg:hidden">Selected horse</p>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-1">
                                        <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400 lg:hidden">Odds</p>
                                        <p className="mt-1 text-sm font-black text-amber-600 lg:mt-0">
                                            {numberFormatter.format(prediction.odds)}x
                                        </p>
                                    </div>

                                    <div className="lg:col-span-1">
                                        <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400 lg:hidden">Stake</p>
                                        <p className="mt-1 flex items-center gap-1 text-sm font-black text-zinc-900 lg:mt-0">
                                            <CircleDollarSign size={15} className="text-amber-500" />
                                            <span className="truncate">{formatPoints(prediction.betPoints)}</span>
                                        </p>
                                    </div>

                                    <div className="lg:col-span-2 lg:text-right">
                                        <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400 lg:hidden">Net result</p>
                                        {isSettled ? (
                                            <p className={`mt-1 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-black lg:mt-0 ${isProfit ? "text-emerald-600" : "text-red-500"}`}>
                                                {isProfit ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                                {isProfit ? "+" : ""}{formatPoints(prediction.profitLoss)}
                                            </p>
                                        ) : (
                                            <span className="mt-1 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-500 lg:mt-0">
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Predictions;
