import { useState, useMemo, useEffect } from "react";
import predictionApi from "../api/predictionApi";
import {
    BrainCircuit,
    Sparkles,
    Search,
    Zap,
    TrendingUp,
    Target,
    FlaskConical,
    Eye,
    ChevronRight,
    ArrowUpRight,
    BarChart3,
    Cpu,
    AlertCircle,
    CheckCircle2,
    Clock,
} from "lucide-react";
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
        <div className="pb-12">
            {/* ═══════ HERO HEADER ═══════ */}
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900 rounded-3xl p-8 md:p-12 mb-10 border border-violet-800/40 shadow-xl">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-16 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-400/8 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-0 w-40 h-40 bg-pink-500/6 rounded-full blur-2xl" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/20 border border-violet-400/30 text-violet-300 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                            <BrainCircuit className="w-3.5 h-3.5" />
                            Algorithmic Engine
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                            Race <span className="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">Predictions</span>
                        </h1>
                        <p className="text-violet-300/70 text-base max-w-md">
                            Algorithmic predictions powered by race conditions, real-time data, and mathematical models.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 min-w-[280px]">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-xs text-violet-300/60 font-bold uppercase tracking-wider mb-1">Avg Confidence</p>
                            <p className="text-2xl font-black text-white">{avgConfidence}%</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-xs text-violet-300/60 font-bold uppercase tracking-wider mb-1">Upcoming Races</p>
                            <p className="text-2xl font-black text-white">{new Set(predictionsData.map(p => p.race)).size}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-xs text-violet-300/60 font-bold uppercase tracking-wider mb-1">Predictions</p>
                            <p className="text-2xl font-black text-white">{predictionsData.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════ ACCURACY STAT + SEARCH/FILTER ═══════ */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Accuracy card */}
                <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm">
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-2">Avg. Confidence</p>
                    <p className="text-4xl font-black text-zinc-900 mb-3">{avgConfidence}%</p>
                    <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-700"
                            style={{ width: `${avgConfidence}%` }}
                        />
                    </div>
                    <p className="text-xs text-zinc-400 mt-2 font-medium">{predictionsData.length} active predictions</p>
                </div>

                {/* Search + filters */}
                <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-zinc-200 shadow-sm flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search horse or race name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/15 rounded-2xl outline-none text-sm transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["All", "High Chance", "Moderate", "Risky"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilterStatus(f)}
                                className={`px-3 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
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
                </div>
            </div>

            {/* ═══════ PREDICTION CARDS ═══════ */}
            <div className="space-y-5">
                {isLoading ? (
                    <div className="text-center py-20 text-zinc-400 font-medium bg-white rounded-3xl border border-zinc-200">
                        Loading AI Predictions...
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
                            className="group bg-white border border-zinc-200 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                        >
                            {/* Top gradient stripe */}
                            <div className={`h-1 w-full bg-gradient-to-r ${item.gradient}`} />

                            <div className="p-7">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Horse avatar + info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        {item.imageUrl ? (
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.horse} 
                                                className="w-14 h-14 rounded-2xl object-cover shadow-sm flex-shrink-0"
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
                                    <div className="flex-1 max-w-[180px]">
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
                                            className="flex items-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-violet-600/20 hover:shadow-violet-500/30 group-hover:scale-105"
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