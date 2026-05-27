function Dashboard() {

  return (

    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="page-title">
          Dashboard
        </h1>

        <p className="page-subtitle">
          Welcome back to the Horse Race
          Tournament Management System.
        </p>

      </div>

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

        {/* CARD */}
        <div
          className="
            card
            p-8
          "
        >

          <p className="text-zinc-400 uppercase text-sm">
            Total Horses
          </p>

          <h2
            className="
              text-5xl
              font-bold
              mt-5
            "
          >
            2,450
          </h2>

          <p className="text-yellow-500 mt-4">
            +12% this month
          </p>

        </div>

        {/* CARD */}
        <div className="card p-8">

          <p className="text-zinc-400 uppercase text-sm">
            Active Races
          </p>

          <h2
            className="
              text-5xl
              font-bold
              mt-5
            "
          >
            18
          </h2>

          <p className="text-zinc-500 mt-4">
            Currently ongoing
          </p>

        </div>

        {/* CARD */}
        <div className="card p-8">

          <p className="text-zinc-400 uppercase text-sm">
            Predictions
          </p>

          <h2
            className="
              text-5xl
              font-bold
              mt-5
            "
          >
            12.4k
          </h2>

          <p className="text-zinc-500 mt-4">
            AI generated insights
          </p>

        </div>

        {/* CARD */}
        <div className="card p-8">

          <p className="text-zinc-400 uppercase text-sm">
            Win Accuracy
          </p>

          <h2
            className="
              text-5xl
              font-bold
              mt-5
            "
          >
            86%
          </h2>

          <p className="text-zinc-500 mt-4">
            Prediction engine
          </p>

        </div>

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

        {/* LEFT */}
        <div
          className="
            card
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

          {/* FAKE CHART */}
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

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* RECENT RACES */}
          <div className="card p-6">

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

              <button
                className="
                  bg-yellow-400
                  px-4
                  py-2
                  rounded-xl
                  font-semibold
                "
              >
                View
              </button>

            </div>

            <div className="space-y-4">

              {/* ITEM */}
              <div
                className="
                  border
                  border-zinc-200
                  rounded-2xl
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >

                  <h3 className="font-bold text-xl">
                    Golden Cup Final
                  </h3>

                  <span
                    className="
                      bg-red-100
                      text-red-500
                      text-sm
                      px-3
                      py-1
                      rounded-full
                    "
                  >
                    Live
                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-zinc-500
                  "
                >

                  <p>Tokyo Arena</p>

                  <p>$120,000</p>

                </div>

              </div>

              {/* ITEM */}
              <div
                className="
                  border
                  border-zinc-200
                  rounded-2xl
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >

                  <h3 className="font-bold text-xl">
                    Thunder Derby
                  </h3>

                  <span
                    className="
                      bg-green-100
                      text-green-600
                      text-sm
                      px-3
                      py-1
                      rounded-full
                    "
                  >
                    Completed
                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-zinc-500
                  "
                >

                  <p>Royal Track</p>

                  <p>$95,000</p>

                </div>

              </div>

            </div>

          </div>

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

            <button
              className="
                bg-black
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
              "
            >
              Upgrade Now
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;