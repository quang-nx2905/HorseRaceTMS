import PageHeader from "../components/ui/PageHeader";

import Button from "../components/ui/Button";

import Card from "../components/ui/Card";

import StatCard from "../components/dashboard/StatCard";

import RecentRaceCard from "../components/dashboard/RecentRaceCard";

import AnalyticsChart from "../components/dashboard/AnalyticsChart";

import {
  statsData,
  recentRaces,
} from "../data/dashboardData";

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

        {statsData.map((item, index) => (

          <StatCard
            key={index}

            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
          />

        ))}

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

          {/* REAL CHART */}
          <AnalyticsChart />

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

              {recentRaces.map((race, index) => (

                <RecentRaceCard
                  key={index}

                  title={race.title}
                  location={race.location}
                  prize={race.prize}
                  status={race.status}
                />

              ))}

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