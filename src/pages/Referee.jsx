import Button from "../components/ui/Button";

const incidents = [
    {
        horse: "Thunderbolt",
        issue: "Lane Violation",
        severity: "Medium",
        time: "2 mins ago",
    },

    {
        horse: "Golden Arrow",
        issue: "Speed Regulation",
        severity: "Low",
        time: "10 mins ago",
    },

    {
        horse: "Black Phantom",
        issue: "Unsafe Overtake",
        severity: "High",
        time: "18 mins ago",
    },
];

function Referee() {
    return (
        <>

            {/* Header */}
            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-6xl font-bold">
                        Referee Center
                    </h1>

                    <p className="text-zinc-500 mt-3 text-lg">
                        Monitor race incidents, violations, and official decisions.
                    </p>

                </div>

                <Button>
                    Generate Report
                </Button>

            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-6 mb-10">

                <StatCard
                    title="Active Incidents"
                    value="12"
                />

                <StatCard
                    title="Pending Reviews"
                    value="4"
                />

                <StatCard
                    title="Resolved Cases"
                    value="28"
                />

                <StatCard
                    title="Live Monitoring"
                    value="3"
                />

            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-6">

                {/* Incident Monitoring */}
                <div className="col-span-2 bg-white border border-zinc-200 rounded-[32px] p-10">

                    <div className="flex justify-between items-center mb-10">

                        <div>

                            <h2 className="text-4xl font-bold">
                                Incident Monitoring
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                Track race violations and referee decisions
                            </p>

                        </div>

                    </div>

                    {/* Incidents */}
                    <div className="space-y-6">

                        {incidents.map((incident, index) => (

                            <div
                                key={index}
                                className="border border-zinc-100 rounded-[28px] p-8"
                            >

                                {/* Top */}
                                <div className="flex justify-between items-center mb-6">

                                    <div>

                                        <h3 className="text-3xl font-bold">
                                            {incident.horse}
                                        </h3>

                                        <p className="text-zinc-500 mt-2">
                                            {incident.issue}
                                        </p>

                                    </div>

                                    <SeverityBadge
                                        severity={incident.severity}
                                    />

                                </div>

                                {/* Bottom */}
                                <div className="flex justify-between items-center">

                                    <p className="text-zinc-400">
                                        Reported {incident.time}
                                    </p>

                                    <div className="flex gap-3">

                                        <Button variant="secondary">
                                            Review
                                        </Button>

                                        <Button>
                                            Resolve
                                        </Button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Right Panel */}
                <div className="space-y-6">

                    {/* Live Monitoring */}
                    <div className="bg-white border border-zinc-200 rounded-[32px] p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Live Monitoring
                        </h2>

                        <div className="space-y-5">

                            <LiveItem
                                title="Royal Ascot Finals"
                                status="Under Review"
                            />

                            <LiveItem
                                title="Derby Championship"
                                status="Stable"
                            />

                            <LiveItem
                                title="Tokyo Racing Cup"
                                status="Monitoring"
                            />

                        </div>

                    </div>

                    {/* AI Referee */}
                    <div className="bg-black rounded-[32px] p-8 text-white">

                        <p className="text-yellow-400 font-semibold mb-4">
                            AI REFEREE SYSTEM
                        </p>

                        <h2 className="text-4xl font-bold leading-tight">

                            Smart violation
                            detection enabled

                        </h2>

                        <p className="text-zinc-400 mt-5 leading-relaxed">

                            AI-assisted monitoring helps
                            referees detect race anomalies
                            in real-time.

                        </p>

                    </div>

                </div>

            </div>

        </>
    );
}

/* Stats */
function StatCard({
    title,
    value,
}) {
    return (
        <div className="bg-white border border-zinc-200 rounded-[28px] p-8">

            <p className="text-zinc-500">
                {title}
            </p>

            <h2 className="text-5xl font-bold mt-5">
                {value}
            </h2>

        </div>
    );
}

/* Severity Badge */
function SeverityBadge({
    severity,
}) {
    const styles = {
        Low:
            "bg-green-100 text-green-600",

        Medium:
            "bg-yellow-100 text-yellow-600",

        High:
            "bg-red-100 text-red-500",
    };

    return (
        <span
            className={`px-5 py-3 rounded-2xl font-semibold
      ${styles[severity]}`}
        >
            {severity}
        </span>
    );
}

/* Live Item */
function LiveItem({
    title,
    status,
}) {
    return (
        <div className="border-b border-zinc-100 pb-4">

            <p className="font-semibold">
                {title}
            </p>

            <p className="text-zinc-400 mt-2">
                {status}
            </p>

        </div>
    );
}

export default Referee;