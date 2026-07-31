import { useState, useMemo, useEffect } from "react";
import { Trophy, Crown, Search, TrendingUp, Zap, Star, Eye, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";
import leaderboardApi from "../api/leaderboardApi";
import RankingDetailsModal from "../components/leaderboard/RankingDetailsModal";
import leaderboardRaceHero from "../assets/leaderboard-race-hero.png";

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("points"); // "points" | "wins"
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedRanking, setSelectedRanking] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        leaderboardApi.getGlobalHorseLeaderboard()
            .then(res => setLeaderboardData(res.data.data))
            .catch(err => console.error("Error fetching leaderboard", err));
    }, []);

    // Dynamically sort items and attach ranks
    const sortedRankings = useMemo(() => {
        const sorted = [...leaderboardData].sort((a, b) => b[sortBy] - a[sortBy]);
        return sorted.map((item, index) => ({
            ...item,
            rank: index + 1,
        }));
    }, [sortBy, leaderboardData]);

    // Filter by search query
    const filteredRankings = useMemo(() => {
        return sortedRankings.filter(
            (item) =>
                item.horse.toLowerCase().includes(search.toLowerCase()) ||
                item.jockey.toLowerCase().includes(search.toLowerCase()) ||
                item.breed.toLowerCase().includes(search.toLowerCase())
        );
    }, [sortedRankings, search]);

    const totalPages = Math.ceil(filteredRankings.length / itemsPerPage);

    const paginatedRankings = useMemo(() => {
        return filteredRankings.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredRankings, currentPage]);

    // Stats calculations
    const totalPointsSum = useMemo(() => {
        return leaderboardData.reduce((sum, item) => sum + item.points, 0);
    }, [leaderboardData]);

    const totalWinsSum = useMemo(() => {
        return leaderboardData.reduce((sum, item) => sum + item.wins, 0);
    }, [leaderboardData]);

    const topLeader = sortedRankings[0];

    const podiumData = useMemo(() => {
        if (sortedRankings.length < 3) return [];
        // Layout order: 2nd place, 1st place, 3rd place
        return [sortedRankings[1], sortedRankings[0], sortedRankings[2]];
    }, [sortedRankings]);

    const handleSortToggle = (criteria) => {
        setSortBy(criteria);
        setCurrentPage(1);
    };

    return (
        <div className="pb-12">
            {/* HEADER HERO */}
            <div className="relative mb-8 min-h-[280px] overflow-hidden rounded-3xl border border-zinc-700/50 bg-zinc-950 p-8 shadow-xl md:h-[320px] md:min-h-0 md:p-10">
                <img src={leaderboardRaceHero} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-90" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/55 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 -mb-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                            <Sparkles className="w-3.5 h-3.5" />
                            Live Championship Standings
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">
                            Leaderboard
                        </h1>
                        <p className="text-zinc-400 text-base max-w-xl">
                            Real-time standings of global horse racing legends. Filter by points or total wins to see who leads the league.
                        </p>
                    </div>

                    <div className="relative min-w-[280px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search horse, jockey, breed..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-4 py-3.5 bg-zinc-800/80 border border-zinc-700 hover:border-zinc-600 focus:border-amber-500 rounded-2xl text-white placeholder-zinc-500 outline-none transition-all shadow-inner focus:ring-2 focus:ring-amber-500/20"
                        />
                    </div>
                </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Stat 1 */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-sm font-semibold mb-1">Total Points Accum.</p>
                        <h3 className="text-3xl font-black text-zinc-900">{totalPointsSum.toLocaleString()}</h3>
                        <p className="text-emerald-600 text-xs font-bold mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +12.4% vs last week
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                        <Zap className="w-6 h-6" />
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-sm font-semibold mb-1">Total Races Won</p>
                        <h3 className="text-3xl font-black text-zinc-900">{totalWinsSum}</h3>
                        <p className="text-zinc-500 text-xs mt-1">Average Win Rate: 55.2%</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                        <Trophy className="w-6 h-6" />
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-sm font-semibold mb-1">Current Leader</p>
                        <h3 className="text-xl font-bold text-zinc-950 truncate max-w-[150px]">
                            {topLeader ? topLeader.horse : "Loading..."}
                        </h3>
                        <p className="text-amber-600 text-xs font-semibold mt-1">
                            {topLeader ? `${topLeader.points} Pts (${topLeader.wins} wins)` : "0 Pts"}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Crown className="w-6 h-6" />
                    </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-sm font-semibold mb-1">MVP Jockey</p>
                        <h3 className="text-xl font-bold text-zinc-950 truncate max-w-[150px]">
                            {topLeader ? topLeader.jockey : "Loading..."}
                        </h3>
                        <p className="text-zinc-500 text-xs mt-1">Win Rate: {topLeader ? `${topLeader.winRate}%` : "0%"}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600">
                        <Star className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* TAB FILTER & CONTROLS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
                <div className="flex bg-zinc-200/60 p-1.5 rounded-2xl border border-zinc-300/40 self-start">
                    <button
                        onClick={() => handleSortToggle("points")}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            sortBy === "points"
                                ? "bg-white text-zinc-900 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-800"
                        }`}
                    >
                        Championship Points
                    </button>
                    <button
                        onClick={() => handleSortToggle("wins")}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            sortBy === "wins"
                                ? "bg-white text-zinc-900 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-800"
                        }`}
                    >
                        Total Wins Standings
                    </button>
                </div>

                {search && (
                    <span className="text-zinc-500 text-sm font-medium">
                        Found <strong className="text-zinc-800">{filteredRankings.length}</strong> matching entries
                    </span>
                )}
            </div>

            {/* DYNAMIC TOP 3 PODIUM - Show only when not searching */}
            {!search && podiumData.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
                    {/* 2nd Place: Silver */}
                    <div className="group relative bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 order-2 md:order-1 flex flex-col items-center pt-12 text-center md:h-[310px] justify-between">
                        <div className="absolute top-0 -translate-y-1/2 w-16 h-16 rounded-full bg-zinc-200 border-4 border-white flex items-center justify-center shadow-md text-zinc-500 font-extrabold text-2xl group-hover:scale-110 transition-transform">
                            2
                        </div>
                        {podiumData[0].imageUrl ? (
                            <img src={podiumData[0].imageUrl} alt={podiumData[0].horse} className="w-14 h-14 rounded-2xl object-cover mb-4 shadow-inner" />
                        ) : (
                            <div className={`w-14 h-14 bg-gradient-to-br ${podiumData[0].avatarBg || 'from-slate-300 to-slate-500'} text-white rounded-2xl flex items-center justify-center font-black text-xl mb-4 shadow-inner`}>
                                {podiumData[0].horse.split(" ").map(w => w[0]).join("").toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h3 className="font-extrabold text-zinc-900 text-lg group-hover:text-amber-500 transition-colors">
                                {podiumData[0].horse}
                            </h3>
                            <p className="text-zinc-500 text-xs font-semibold mb-2">Jockey: {podiumData[0].jockey}</p>
                            <span className="inline-block px-2.5 py-1 bg-zinc-100 rounded-lg text-zinc-600 text-xs font-bold border border-zinc-200">
                                {podiumData[0].breed}
                            </span>
                        </div>
                        <div className="mt-4 w-full">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl font-black text-zinc-800">
                                    {sortBy === "points" ? podiumData[0].points : podiumData[0].wins}
                                </span>
                                <span className="text-xs text-zinc-500 font-semibold">{sortBy === "points" ? "Pts" : "Wins"}</span>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedRanking(podiumData[0]);
                                    setOpenDetails(true);
                                }}
                                className="w-full mt-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                                <Eye className="w-3.5 h-3.5" /> Details
                            </button>
                        </div>
                    </div>

                    {/* 1st Place: Gold Crown */}
                    <div className="group relative bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 order-1 md:order-2 flex flex-col items-center pt-16 text-center md:h-[350px] justify-between">
                        {/* Glow and decoration background */}
                        <div className="absolute inset-0 bg-amber-500/10 rounded-3xl blur-xl pointer-events-none overflow-hidden" style={{ clipPath: 'inset(0 0 0 0 round 1.5rem)' }} />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute top-0 -translate-y-1/2 w-20 h-20 rounded-full bg-amber-400 border-4 border-zinc-950 flex items-center justify-center shadow-lg text-zinc-950 font-black text-3xl group-hover:scale-110 transition-transform z-10">
                            <Crown className="w-8 h-8 text-zinc-950 animate-bounce mt-[-3px]" />
                        </div>
                        
                        <div className="relative z-10">
                            {podiumData[1].imageUrl ? (
                                <img src={podiumData[1].imageUrl} alt={podiumData[1].horse} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4 shadow-lg border border-amber-300/30" />
                            ) : (
                                <div className={`w-16 h-16 bg-gradient-to-br ${podiumData[1].avatarBg || 'from-amber-400 to-amber-600'} text-zinc-950 rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-4 shadow-lg border border-amber-300/30`}>
                                    {podiumData[1].horse.split(" ").map(w => w[0]).join("").toUpperCase()}
                                </div>
                            )}
                            <h3 className="font-black text-white text-xl tracking-tight group-hover:text-amber-400 transition-colors">
                                {podiumData[1].horse}
                            </h3>
                            <p className="text-zinc-400 text-xs font-semibold mb-2">Jockey: {podiumData[1].jockey}</p>
                            <span className="inline-block px-2.5 py-1 bg-amber-500/10 rounded-lg text-amber-400 text-xs font-bold border border-amber-500/35">
                                {podiumData[1].breed}
                            </span>
                        </div>

                        <div className="mt-4 w-full relative z-10">
                            <div className="flex items-baseline justify-center gap-1 text-amber-400">
                                <span className="text-4xl font-black">
                                    {sortBy === "points" ? podiumData[1].points : podiumData[1].wins}
                                </span>
                                <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">{sortBy === "points" ? "Pts" : "Wins"}</span>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedRanking(podiumData[1]);
                                    setOpenDetails(true);
                                }}
                                className="w-full mt-3 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                            >
                                <Eye className="w-3.5 h-3.5" /> Details card
                            </button>
                        </div>
                    </div>

                    {/* 3rd Place: Bronze */}
                    <div className="group relative bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 order-3 md:order-3 flex flex-col items-center pt-12 text-center md:h-[290px] justify-between">
                        <div className="absolute top-0 -translate-y-1/2 w-16 h-16 rounded-full bg-orange-100 border-4 border-white flex items-center justify-center shadow-md text-orange-600 font-extrabold text-2xl group-hover:scale-110 transition-transform">
                            3
                        </div>
                        {podiumData[2].imageUrl ? (
                            <img src={podiumData[2].imageUrl} alt={podiumData[2].horse} className="w-14 h-14 rounded-2xl object-cover mb-4 shadow-inner" />
                        ) : (
                            <div className={`w-14 h-14 bg-gradient-to-br ${podiumData[2].avatarBg || 'from-orange-400 to-orange-600'} text-white rounded-2xl flex items-center justify-center font-black text-xl mb-4 shadow-inner`}>
                                {podiumData[2].horse.split(" ").map(w => w[0]).join("").toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h3 className="font-extrabold text-zinc-900 text-lg group-hover:text-amber-500 transition-colors">
                                {podiumData[2].horse}
                            </h3>
                            <p className="text-zinc-500 text-xs font-semibold mb-2">Jockey: {podiumData[2].jockey}</p>
                            <span className="inline-block px-2.5 py-1 bg-zinc-100 rounded-lg text-zinc-600 text-xs font-bold border border-zinc-200">
                                {podiumData[2].breed}
                            </span>
                        </div>
                        <div className="mt-4 w-full">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl font-black text-zinc-800">
                                    {sortBy === "points" ? podiumData[2].points : podiumData[2].wins}
                                </span>
                                <span className="text-xs text-zinc-500 font-semibold">{sortBy === "points" ? "Pts" : "Wins"}</span>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedRanking(podiumData[2]);
                                    setOpenDetails(true);
                                }}
                                className="w-full mt-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                                <Eye className="w-3.5 h-3.5" /> Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* LEADERBOARD STANDINGS LIST */}
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-md overflow-hidden">
                <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between">
                    <h2 className="text-lg font-black text-zinc-900">
                        {search ? "Championship Search Results" : "Rankings Standings"}
                    </h2>
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
                        Sorted by: {sortBy === "points" ? "Championship Points" : "Total Wins"}
                    </span>
                </div>

                {/* TABLE HEAD */}
                <div className="grid grid-cols-12 px-8 py-4 bg-zinc-50/50 text-xs uppercase tracking-wider text-zinc-500 font-bold border-b border-zinc-100">
                    <div className="col-span-2 md:col-span-1">Rank</div>
                    <div className="col-span-5 md:col-span-4">Horse Details</div>
                    <div className="col-span-3">Jockey</div>
                    <div className="hidden md:block col-span-2">Form</div>
                    <div className="col-span-2 md:col-span-2 text-right">Points / Wins</div>
                </div>

                {/* TABLE ROWS */}
                <div className="divide-y divide-zinc-100">
                    {paginatedRankings.length === 0 ? (
                        <div className="p-12 text-center text-zinc-500 font-medium">
                            No rankings match your search criteria. Try a different keyword!
                        </div>
                    ) : (
                        paginatedRankings.map((item) => {
                            const isFirst = item.rank === 1;
                            const isSecond = item.rank === 2;
                            const isThird = item.rank === 3;

                            return (
                                <div
                                    key={item.horse}
                                    onClick={() => {
                                        setSelectedRanking(item);
                                        setOpenDetails(true);
                                    }}
                                    className="grid grid-cols-12 px-8 py-5 items-center hover:bg-zinc-50/80 transition-all cursor-pointer group"
                                >
                                    {/* Rank column */}
                                    <div className="col-span-2 md:col-span-1 flex items-center">
                                        {isFirst ? (
                                            <div className="w-8 h-8 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-sm font-extrabold text-sm border border-amber-300">
                                                <Crown className="w-4.5 h-4.5" />
                                            </div>
                                        ) : isSecond ? (
                                            <div className="w-8 h-8 rounded-full bg-slate-200 text-zinc-700 flex items-center justify-center shadow-sm font-extrabold text-sm border border-slate-300">
                                                2
                                            </div>
                                        ) : isThird ? (
                                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center shadow-sm font-extrabold text-sm border border-orange-200">
                                                3
                                            </div>
                                        ) : (
                                            <span className="font-extrabold text-zinc-400 text-sm pl-2">
                                                #{item.rank}
                                            </span>
                                        )}
                                    </div>

                                    {/* Horse details column */}
                                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.horse}
                                                className="w-10 h-10 rounded-xl object-cover shadow-inner flex-shrink-0"
                                            />
                                        ) : (
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.avatarBg} text-white flex items-center justify-center font-black text-sm shadow-inner flex-shrink-0`}>
                                                {item.horse.split(" ").map(w => w[0]).join("").toUpperCase()}
                                            </div>
                                        )}
                                        <div className="truncate pr-2">
                                            <h4 className="font-bold text-zinc-900 group-hover:text-amber-500 transition-colors truncate">
                                                {item.horse}
                                            </h4>
                                            <p className="text-xs text-zinc-400 font-semibold truncate">
                                                {item.breed}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Jockey column */}
                                    <div className="col-span-3">
                                        <p className="font-bold text-zinc-700 truncate text-sm">
                                            {item.jockey}
                                        </p>
                                    </div>

                                    {/* Form history column */}
                                    <div className="hidden md:flex col-span-2 items-center gap-1">
                                        {item.form.map((f, i) => (
                                            <span
                                                key={i}
                                                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black border ${
                                                    f === "W"
                                                        ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-600"
                                                        : "bg-red-500/10 border-red-500/25 text-red-500"
                                                }`}
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Points/Wins column */}
                                    <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-3 text-right">
                                        <div>
                                            <p className="font-black text-zinc-900 text-sm">
                                                {sortBy === "points" ? `${item.points.toLocaleString()} pts` : `${item.wins} wins`}
                                            </p>
                                            <p className="text-xs text-zinc-400 font-semibold">
                                                {sortBy === "points" ? `${item.wins} wins` : `${item.points.toLocaleString()} pts`}
                                            </p>
                                        </div>
                                        <button className="p-1.5 bg-zinc-100 hover:bg-amber-500 hover:text-zinc-950 text-zinc-500 rounded-lg transition-colors group-hover:bg-zinc-200">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                    <div className="px-8 py-5 border-t border-zinc-100 bg-zinc-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs font-semibold text-zinc-500">
                            Showing page <strong className="text-zinc-800">{currentPage}</strong> of <strong className="text-zinc-800">{totalPages}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentPage(currentPage - 1);
                                }}
                                className="p-2 border border-zinc-200 rounded-xl bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white text-zinc-700 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentPage(i + 1);
                                    }}
                                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                                        currentPage === i + 1
                                            ? "bg-zinc-950 text-white shadow-md shadow-zinc-950/10"
                                            : "border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentPage(currentPage + 1);
                                }}
                                className="p-2 border border-zinc-200 rounded-xl bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:hover:bg-white text-zinc-700 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <RankingDetailsModal
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                ranking={selectedRanking}
            />
        </div>
    );
}

export default Leaderboard;
