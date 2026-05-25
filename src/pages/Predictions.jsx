import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";

const predictions = [
    {
        horse: "Thunderbolt",
        odds: "1.45x",
        confidence: "92%",
        reward: "+450 pts",
        status: "Hot Pick",
    },

    {
        horse: "Golden Arrow",
        odds: "2.10x",
        confidence: "78%",
        reward: "+320 pts",
        status: "Trending",
    },

    {
        horse: "Black Phantom",
        odds: "3.25x",
        confidence: "65%",
        reward: "+600 pts",
        status: "High Risk",
    },
];

function Predictions() {
    return (
        <DashboardLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-6xl font-bold">
                        Predictions
                    </h1>

                    <p className="text-zinc-500 mt-3 text-lg">
                        Analyze race predictions, rewards, and performance metrics.
                    </p>

                </div>

                <Button>
                    Prediction History
                </Button>

            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-6 mb-10">

                <StatCard
                    title="Prediction Accuracy"
                    value="84%"
                />

                <StatCard
                    title="Total Predictions"
                    value="12,450"
                />

                <StatCard
                    title="Rewards Earned"
                    value="4,820"
                />

                <StatCard
                    title="Live Predictions"
                    value="18"
                />

            </div>

            {/* Prediction Cards */}
            <div className="grid grid-cols-3 gap-6">

                {predictions.map((item, index) => (

                    <div
                        key={index}
                        className="bg-white border border-zinc-200 rounded-[32px] p-8"
                    >

                        {/* Badge */}
                        <div className="flex justify-between items-center mb-8">

                            <div className="w-[72px] h-[72px] bg-yellow-100 rounded-[24px] flex items-center justify-center text-3xl">

                                🏇

                            </div>

                            <span className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-2xl font-semibold text-sm">

                                {item.status}

                            </span>

                        </div>

                        {/* Horse */}
                        <h2 className="text-3xl font-bold mb-3">
                            {item.horse}
                        </h2>

                        <p className="text-zinc-500 leading-relaxed mb-8">

                            AI-powered race prediction
                            based on current performance analytics.

                        </p>

                        {/* Stats */}
                        <div className="space-y-5 mb-8">

                            <div className="flex justify-between">

                                <span className="text-zinc-500">
                                    Winning Odds
                                </span>

                                <span className="font-semibold">
                                    {item.odds}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-zinc-500">
                                    Confidence
                                </span>

                                <span className="font-semibold">
                                    {item.confidence}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-zinc-500">
                                    Potential Reward
                                </span>

                                <span className="font-semibold text-yellow-500">
                                    {item.reward}
                                </span>

                            </div>

                        </div>

                        {/* Action */}
                        <Button>
                            Predict Winner
                        </Button>

                    </div>

                ))}

            </div>

        </DashboardLayout>
    );
}

/* Stat Card */
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

export default Predictions;