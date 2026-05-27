import PageHeader from "../components/ui/PageHeader";

import Button from "../components/ui/Button";

import Card from "../components/ui/Card";

import StatCard from "../components/dashboard/StatCard";

import RecentRaceCard from "../components/dashboard/RecentRaceCard";

function Dashboard() {

  return (

    <div>

      {/* HEADER */}
      <PageHeader
        title="Dashboard"

        subtitle="
          Welcome back to the Horse Race
          Tournament Management System.
        "

        action={
          <Button>
            + New Race
          </Button>
        }
      />

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4

          gap-6

          mb-8
        "
      >

        <StatCard
          title="Total Horses"
          value="2,450"
          subtitle="+12% this month"
        />

        <StatCard
          title="Active Races"
          value="18"
          subtitle="Currently ongoing"
        />

        <StatCard
          title="Predictions"
          value="12.4k"
          subtitle="AI generated insights"
        />

        <StatCard
          title="Win Accuracy"
          value="86%"
          subtitle="Prediction engine"
        />

      </div>

      {/* MAIN GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3

          gap-6
        "
      >

        {/* ANALYTICS */}
        <Card
          className="
            p-8
            xl:col-span-2
          "
        >

          <div className="mb-10">

            <h2 className="text-4xl font-bold">
              Weekly Analytics
            </h2>

            <p className="text-zinc-500 mt-2">
              Tournament performance overview
            </p>

          </div>

          {/* CHART */}
          <div
            className="
              h-[320px]

              flex
              items-end

              gap-5
            "
          >

            <div className="bg-yellow-300 w-full h-[120px] rounded-t-3xl"></div>

            <div className="bg-yellow-400 w-full h-[180px] rounded-t-3xl"></div>

            <div className="bg-yellow-300 w-full h-[140px] rounded-t-3xl"></div>

            <div className="bg-yellow-400 w-full h-[220px] rounded-t-3xl"></div>

            <div className="bg-yellow-300 w-full h-[180px] rounded-t-3xl"></div>

            <div className="bg-yellow-400 w-full h-[280px] rounded-t-3xl"></div>

          </div>

        </Card>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* RECENT */}
          <Card className="p-6">

            <div
              className="
                flex
                items-center
                justify-between

                mb-6
              "
            >

              <div>

                <h2 className="text-3xl font-bold">
                  Recent Races
                </h2>

                <p className="text-zinc-500 mt-1">
                  Latest activities
                </p>

              </div>

              <Button>
                View
              </Button>

            </div>

            <div className="space-y-4">

              <RecentRaceCard
                title="Golden Cup Final"
                location="Tokyo Arena"
                prize="$120,000"
                status="Live"
              />

              <RecentRaceCard
                title="Thunder Derby"
                location="Royal Track"
                prize="$95,000"
                status="Completed"
              />

              <RecentRaceCard
                title="Night Sprint"
                location="Equinox Stadium"
                prize="$150,000"
                status="Upcoming"
              />

            </div>

          </Card>

          {/* PREMIUM */}
          <div
            className="
              rounded-3xl

              bg-gradient-to-br
              from-yellow-400
              to-yellow-500

              p-8
            "
          >

            <p className="font-semibold mb-3">
              PREMIUM INSIGHTS
            </p>

            <h2
              className="
                text-4xl
                font-black

                mb-5
              "
            >
              AI Race Predictions
            </h2>

            <p
              className="
                leading-7
                mb-8
              "
            >
              Unlock machine-learning powered
              tournament predictions and
              advanced analytics.
            </p>

            <Button variant="dark">
              Upgrade Now
            </Button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;