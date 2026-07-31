import { useEffect, useMemo, useState } from "react";
import {
    Activity,
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
    ChevronDown,
    ChevronUp,
    Sparkles,
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
    const [expandedGroups, setExpandedGroups] = useState({});

    const toggleGroup = (name) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

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

    const groupedBets = useMemo(() => {
        const groups = {};
        filtered.forEach(prediction => {
            const tournamentName = prediction.tournamentName || "Unknown Tournament";
            if (!groups[tournamentName]) {
                groups[tournamentName] = {
                    tournamentName,
                    predictions: [],
                    bannerUrl: prediction.tournamentBanner || null
                };
            }
            if (prediction.tournamentBanner && !groups[tournamentName].bannerUrl) {
                groups[tournamentName].bannerUrl = prediction.tournamentBanner;
            }
            groups[tournamentName].predictions.push(prediction);
        });
        return Object.values(groups).map((group) => ({
            ...group,
            totalWagered: group.predictions.reduce((sum, item) => sum + (item.betPoints || 0), 0),
            pendingCount: group.predictions.filter((item) => item.profitLoss === null).length,
            bettorCount: new Set(group.predictions.map((item) => item.bettorAlias)).size,
        }));
    }, [filtered]);

    return (
        <div className="relative w-full space-y-6 pb-12">
            <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 h-96 bg-[radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.13),transparent_35%),radial-gradient(circle_at_10%_60%,rgba(251,191,36,0.08),transparent_30%)]" />
            <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#090b10] p-7 text-white shadow-[0_28px_70px_-28px_rgba(9,11,16,0.65)] md:p-10 lg:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(245,158,11,0.06)_55%,rgba(245,158,11,0.18)_100%)]" />
                <div className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full border border-amber-300/10 bg-amber-400/10 blur-2xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-px w-1/2 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

                <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                            <ShieldCheck size={15} />
                            Anonymous & protected
                        </div>
                        <h1 className="mb-4 max-w-2xl text-4xl font-black tracking-[-0.04em] md:text-5xl">
                            The community&apos;s <span className="bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent">winning picks.</span>
                        </h1>
                        <p className="max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
                            Track the latest race-day momentum without revealing bettor identities.
                            Explore live stakes, popular picks and settled results in one feed.
                        </p>
                        <div className="mt-6 flex items-center gap-3 text-xs font-bold text-zinc-500">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </span>
                            Community feed is live
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-2 backdrop-blur-xl sm:gap-3">
                        {[
                            { label: "Bettors", value: uniqueBettors, icon: Users },
                            { label: "Wagered", value: numberFormatter.format(totalWagered), icon: Coins },
                            { label: "Settled", value: settledCount, icon: Trophy },
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className="min-w-[88px] rounded-[1.15rem] border border-white/[0.07] bg-white/[0.04] p-3.5 transition hover:-translate-y-0.5 hover:border-amber-400/20 hover:bg-white/[0.07] sm:min-w-[112px] sm:p-5">
                                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                                    <Icon size={16} />
                                </div>
                                <p className="text-lg font-black tracking-tight sm:text-2xl">{value}</p>
                                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.15em] text-zinc-500 sm:text-[9px]">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sticky top-3 z-20 rounded-[1.6rem] border border-zinc-200/80 bg-white/90 p-3 shadow-[0_14px_40px_-24px_rgba(24,24,27,0.5)] backdrop-blur-xl">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <label className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={17} />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by tournament name..."
                            aria-label="Search by tournament name"
                            className="w-full rounded-[1.15rem] border border-transparent bg-zinc-100/70 py-4 pl-11 pr-4 text-sm font-semibold outline-none transition placeholder:text-zinc-400 focus:border-amber-400/50 focus:bg-white focus:ring-4 focus:ring-amber-400/10"
                        />
                    </label>
                    <div className="flex gap-2" aria-label="Filter betting activity">
                        {["All", "Pending", "Settled"].map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setStatusFilter(filter)}
                                className={`rounded-[1rem] border px-4 py-3.5 text-xs font-black transition ${
                                    statusFilter === filter
                                        ? "border-zinc-950 bg-zinc-950 text-white shadow-lg shadow-zinc-900/15"
                                        : "border-transparent bg-white text-zinc-500 hover:bg-zinc-100"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-[#f8f8f9] shadow-[0_22px_55px_-38px_rgba(24,24,27,0.55)]">
                <div className="flex flex-col gap-3 border-b border-zinc-200/70 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                            <Activity size={19} />
                        </div>
                        <div>
                            <h2 className="font-black text-zinc-950">Betting activity</h2>
                            <p className="mt-0.5 text-xs text-zinc-500">Newest community picks appear first</p>
                        </div>
                    </div>
                    <span className="w-fit rounded-full bg-zinc-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-500">{filtered.length} records</span>
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
                    <div className="space-y-4 p-3 sm:p-5">
                        {groupedBets.map((group) => {
                            const isExpanded = expandedGroups[group.tournamentName];
                            return (
                                <div key={group.tournamentName} className={`overflow-hidden rounded-[1.5rem] border transition-all duration-300 ${isExpanded ? "border-amber-300/70 bg-white shadow-[0_18px_45px_-30px_rgba(217,119,6,0.55)]" : "border-zinc-200 bg-white shadow-sm hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg"}`}>
                                    {/* Accordion Header / Banner */}
                                    <button
                                        onClick={() => toggleGroup(group.tournamentName)}
                                        className="group/header relative flex w-full cursor-pointer items-center justify-between overflow-hidden bg-gradient-to-r from-white via-white to-amber-50/80 px-5 py-5 text-left transition-all hover:from-amber-50/60 hover:to-orange-50 sm:px-6"
                                    >
                                        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-amber-300 via-amber-500 to-orange-500" />
                                        {group.bannerUrl ? (
                                            <>
                                                <div 
                                                    className="absolute inset-y-0 right-0 w-[42%] bg-cover bg-center opacity-[0.09] transition-transform duration-500 group-hover/header:scale-105"
                                                    style={{ backgroundImage: `url(${group.bannerUrl})` }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-amber-50/70" />
                                            </>
                                        ) : (
                                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl transition-all group-hover/header:bg-amber-300/30" />
                                        )}
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 text-amber-600 shadow-sm shadow-amber-200/60 transition group-hover/header:scale-105">
                                                <Trophy size={20} />
                                            </div>
                                            <div>
                                                <p className="mb-1 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.17em] text-amber-600"><Sparkles size={10} /> Tournament pool</p>
                                                <h3 className="text-lg font-black tracking-tight text-zinc-950">{group.tournamentName}</h3>
                                            </div>
                                        </div>
                                        <div className="relative z-10 flex items-center gap-3">
                                            <div className="hidden items-center gap-2 md:flex">
                                                <div className="min-w-[105px] rounded-xl border border-amber-100 bg-white/80 px-3 py-2 shadow-sm">
                                                    <p className="text-right text-sm font-black text-zinc-900">{numberFormatter.format(group.totalWagered)}</p>
                                                    <p className="mt-0.5 text-right text-[8px] font-black uppercase tracking-wider text-zinc-400">Points wagered</p>
                                                </div>
                                                <div className="min-w-[74px] rounded-xl border border-zinc-200/80 bg-white/80 px-3 py-2 shadow-sm">
                                                    <p className="text-right text-sm font-black text-zinc-900">{group.bettorCount}</p>
                                                    <p className="mt-0.5 text-right text-[8px] font-black uppercase tracking-wider text-zinc-400">Bettors</p>
                                                </div>
                                                <span className="rounded-full border border-amber-200 bg-amber-100/80 px-3 py-1.5 text-[10px] font-black text-amber-700">
                                                    {group.pendingCount} pending
                                                </span>
                                            </div>
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all ${isExpanded ? "rotate-180 border-amber-500 bg-amber-500 text-white" : "border-zinc-200 bg-white text-zinc-500 group-hover/header:border-amber-300 group-hover/header:text-amber-600"}`}>
                                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Accordion Content */}
                                    {isExpanded && (
                                        <div className="bg-white">
                                            <div className="hidden grid-cols-12 items-center gap-4 border-b border-zinc-100 bg-zinc-50/80 px-6 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-400 lg:grid">
                                                <span className="col-span-3">Bettor</span>
                                                <span className="col-span-3">Tournament & race</span>
                                                <span className="col-span-2">Selected horse</span>
                                                <span className="col-span-1">Odds</span>
                                                <span className="col-span-1">Stake</span>
                                                <span className="col-span-2 text-right">Net result</span>
                                            </div>
                                            <div className="divide-y divide-zinc-100">
                                                {group.predictions.map((prediction) => {
                                                    const isSettled = prediction.profitLoss !== null;
                                                    const isProfit = isSettled && prediction.profitLoss >= 0;
                                                    return (
                                                        <article
                                                            key={prediction.predictionId}
                                                            className="group/bet grid gap-5 px-6 py-5 transition hover:bg-amber-50/40 md:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-4 lg:py-4"
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
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Predictions;
