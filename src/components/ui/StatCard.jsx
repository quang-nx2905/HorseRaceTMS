import {
    TrendingUp,
    Horse,
    Zap,
    Target,
    ArrowUpRight,
} from "lucide-react";

const stats = [
    {
        title: "Total Horses",
        value: "2,450",
        subtitle: "+12% this month",
        icon: Horse,
        accent: "bg-yellow-400",
        iconColor: "text-yellow-900",
        trend: "+12%",
        trendUp: true,
    },
    {
        title: "Active Races",
        value: "18",
        subtitle: "Currently ongoing",
        icon: Zap,
        accent: "bg-emerald-400",
        iconColor: "text-emerald-900",
        trend: "+3",
        trendUp: true,
    },
    {
        title: "Predictions",
        value: "12.4k",
        subtitle: "AI generated insights",
        icon: TrendingUp,
        accent: "bg-blue-400",
        iconColor: "text-blue-900",
        trend: "+8.2%",
        trendUp: true,
    },
    {
        title: "Win Accuracy",
        value: "86%",
        subtitle: "Prediction engine",
        icon: Target,
        accent: "bg-violet-400",
        iconColor: "text-violet-900",
        trend: "+1.4%",
        trendUp: true,
    },
];

function StatCard({ title, value, subtitle, icon: Icon, accent, iconColor, trend, trendUp }) {
    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl ${accent} flex items-center justify-center`}>
                    <Icon size={22} className={iconColor} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                    <ArrowUpRight size={12} className={trendUp ? "" : "rotate-180"} />
                    {trend}
                </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mt-5">
                {title}
            </p>

            <h2 className="text-4xl font-black mt-1.5 text-zinc-900">
                {value}
            </h2>

            <p className="text-zinc-500 text-sm mt-2">
                {subtitle}
            </p>
        </div>
    );
}

export { StatCard, stats };
export default StatCard;