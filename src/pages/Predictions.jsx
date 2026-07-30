import { useState, useMemo, useEffect } from "react";
import predictionApi from "../api/predictionApi";
import { BrainCircuit, Search, Eye, AlertCircle, CheckCircle2, Clock, Loader2, Sparkles } from "lucide-react";
import PredictionDetailsModal from "../components/predictions/PredictionDetailsModal";


const STATUS_CONFIG = {
    "High Chance": {
        badge: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/25",
        icon: CheckCircle2,
        bar: "from-emerald-400 to-teal-500",
    },
    "Moderate": {
        badge: "bg-amber-500/10 text-amber-700 border border-amber-500/25",
        icon: Clock,
        bar: "from-amber-400 to-orange-500",
    },
    "Risky": {
        badge: "bg-red-500/10 text-red-500 border border-red-500/25",
        icon: AlertCircle,
        bar: "from-red-400 to-rose-500",
    },
};

function Predictions() {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [predictionsData, setPredictionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await predictionApi.getAiInsights();
                if (response.data && response.data.data) {
                    setPredictionsData(response.data.data);
                } else if (response.data) {
                    setPredictionsData(response.data);
                }
            } catch (error) {
                console.error("Failed to load AI predictions", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPredictions();
    }, []);

    const filtered = useMemo(() => {
        return predictionsData.filter((item) => {
            const matchSearch =
                item.horse.toLowerCase().includes(search.toLowerCase()) ||
                item.race.toLowerCase().includes(search.toLowerCase());
            const matchStatus = filterStatus === "All" || item.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [search, filterStatus, predictionsData]);

    const avgConfidence = predictionsData.length > 0 ? Math.round(
        predictionsData.reduce((sum, p) => sum + p.confidence, 0) / predictionsData.length
    ) : 0;

    return (
        <div className="w-full space-y-6 pb-12">
            {/* ═══════ HERO HEADER ═══════ */}
            <section className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-7 text-white shadow-xl shadow-zinc-300/40 md:p-10">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -right-12 -top-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
                    <div className="absolute top-1/2 left-0 w-40 h-40 bg-pink-500/6 rounded-full blur-2xl" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-400">
                            <BrainCircuit className="w-3.5 h-3.5" />
                            AI analytics engine
                        </div>
                        <h1 className="mb-3 text-3xl font-black tracking-tight md:text-4xl">
                            Race Predictions
                        </h1>
                        <p className="text-violet-300/70 text-base max-w-md">
                            Algorithmic predictions powered by race conditions, real-time data, and mathematical models.
                        </p>
                    </div>
                    <div className="grid min-w-[300px] grid-cols-3 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur">
                            <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-zinc-500">Confidence</p>
                            <p className="text-2xl font-black text-white">{avgConfidence}%</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur">
                            <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-zinc-500">Races</p>
                            <p className="text-2xl font-black text-white">{new Set(predictionsData.map(p => p.race)).size}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center backdrop-blur">
                            <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-zinc-500">Insights</p>
                            <p className="text-2xl font-black text-white">{predictionsData.length}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ ACCURACY STAT + SEARCH/FILTER ═══════ */}
            <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search horse or race name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition-all hover:border-zinc-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-400/10"
                        />
                    </div>
                    <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:pb-0">
                        {["All", "High Chance", "Moderate", "Risky"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilterStatus(f)}
                                className={`whitespace-nowrap rounded-xl border px-4 py-3 text-xs font-bold transition-all ${
                                    filterStatus === f
                                        ? f === "High Chance"
                                            ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                                            : f === "Moderate"
                                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                                            : f === "Risky"
                                            ? "bg-red-500 text-white border-red-500 shadow-sm"
                                            : "bg-violet-600 text-white border-violet-600 shadow-sm"
                                        : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="hidden items-center gap-2 rounded-2xl bg-violet-50 px-4 py-3 text-xs font-bold text-violet-700 xl:flex">
                        <Sparkles size={15} /> Updated from live race data
                    </div>
                </div>
            </div>

            {/* ═══════ PREDICTION CARDS ═══════ */}
            <div className="space-y-5">
                {isLoading ? (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-[2rem] border border-zinc-200 bg-white text-zinc-400">
                        <Loader2 className="mb-3 animate-spin text-violet-500" size={28} />
                        <p className="font-bold">Analyzing race data...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-zinc-400 font-medium bg-white rounded-3xl border border-zinc-200">
                        No predictions match your search.
                    </div>
                ) : (
                filtered.map((item, index) => {
                    const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG["Moderate"];
                    const StatusIcon = cfg.icon;
                    return (
                        <div
                            key={`${item.race}-${item.horse}-${index}`}
                            className="group overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-xl hover:shadow-zinc-200/60"
                        >
                            {/* Top gradient stripe */}
                            <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.bar}`} />

                            <div className="p-7">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Horse avatar + info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        {item.imageUrl ? (
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.horse} 
                                                 className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover shadow-sm ring-1 ring-zinc-200"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0">
                                                {item.horse.split(" ").map(w => w[0]).join("").toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h2 className="text-lg font-black text-zinc-900 group-hover:text-violet-700 transition-colors">
                                                    {item.horse}
                                                </h2>
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.badge}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="text-zinc-500 text-sm font-medium">
                                                {item.race} · <span className="text-zinc-400">{item.track}</span>
                                            </p>
                                            <p className="text-zinc-400 text-xs mt-0.5">{item.jockey} · {item.breed} · {item.raceDate}</p>
                                        </div>
                                    </div>

                                    {/* Recent Form */}
                                    <div className="hidden lg:flex flex-col items-center gap-2">
                                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Recent Form</p>
                                        <div className="flex gap-1">
                                            {item.form.map((f, i) => (
                                                <span key={i} className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black border ${
                                                    f === "W"
                                                        ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                                        : "bg-red-50 border-red-200 text-red-500"
                                                }`}>{f}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Confidence bar */}
                                    <div className="w-full flex-1 md:max-w-[220px]">
                                        <div className="flex justify-between text-xs font-bold text-zinc-500 mb-2">
                                            <span>Win Probability</span>
                                            <span className="text-zinc-800">{item.confidence}%</span>
                                        </div>
                                        <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${cfg.bar} rounded-full transition-all duration-700`}
                                                style={{ width: `${item.confidence}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Odds + CTA */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Betting Odds</p>
                                            <p className="text-2xl font-black text-zinc-900">{item.odds}</p>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedPrediction(item); setOpenDetails(true); }}
                                            className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-violet-700 group-hover:scale-105"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }))}
            </div>

            <PredictionDetailsModal
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                prediction={selectedPrediction}
            />
        </div>
    );
}

export default Predictions;
