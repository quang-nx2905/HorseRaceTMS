const TONES = {
    gold: {
        icon: "bg-amber-400 text-zinc-950",
        glow: "bg-amber-400/10",
        line: "bg-amber-400",
    },
    emerald: {
        icon: "bg-emerald-400 text-emerald-950",
        glow: "bg-emerald-400/10",
        line: "bg-emerald-400",
    },
    blue: {
        icon: "bg-blue-400 text-blue-950",
        glow: "bg-blue-400/10",
        line: "bg-blue-400",
    },
    violet: {
        icon: "bg-violet-400 text-violet-950",
        glow: "bg-violet-400/10",
        line: "bg-violet-400",
    },
};

function StatCard({ title, value, subtitle, icon: Icon, tone = "gold", index }) {
    const palette = TONES[tone] || TONES.gold;
    const formattedValue =
        typeof value === "number" ? value.toLocaleString() : value ?? "—";

    return (
        <article className="group relative min-h-[190px] overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_22px_55px_rgba(24,24,27,0.09)]">
            <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity ${palette.glow} opacity-50 group-hover:opacity-100`} />
            <div className="relative flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${palette.icon}`}>
                    <Icon size={21} strokeWidth={2.1} />
                </div>
                <span className="text-xs font-black tracking-[0.18em] text-zinc-200">0{index}</span>
            </div>
            <div className="relative mt-7">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">{title}</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                    <h2 className="text-4xl font-black tracking-[-0.05em] text-zinc-950">{formattedValue}</h2>
                    <span className={`mb-2 h-1 w-8 rounded-full ${palette.line}`} />
                </div>
                <p className="mt-2 text-xs font-medium text-zinc-500">{subtitle}</p>
            </div>
        </article>
    );
}

export default StatCard;
