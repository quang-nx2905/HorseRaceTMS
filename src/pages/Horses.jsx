import { useState } from "react";

import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

function Horses() {

  const [search, setSearch] =
    useState("");

  const [horses] =
    useState([
      {
        id: 1,
        name: "Thunder Bolt",
        breed: "Arabian",
        age: 4,
        health: "Excellent",
        wins: 18,
      },

      {
        id: 2,
        name: "Golden Sprint",
        breed: "Thoroughbred",
        age: 5,
        health: "Good",
        wins: 12,
      },

      {
        id: 3,
        name: "Night Fury",
        breed: "Mustang",
        age: 6,
        health: "Poor",
        wins: 8,
      },
    ]);

  const filteredHorses =
    horses.filter((horse) =>
      horse.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div>

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-black
              dark:text-white
            "
          >
            Horses
          </h1>

          <p
            className="
              text-zinc-500
              dark:text-zinc-400
              mt-3
            "
          >
            Manage horse information
          </p>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">

          {/* SEARCH */}
          <input
            type="text"

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            placeholder="Search horse..."

            className="
              bg-white
              dark:bg-zinc-900

              border
              border-zinc-200
              dark:border-zinc-800

              rounded-2xl

              px-5
              py-4

              outline-none

              dark:text-white
            "
          />

          {/* BUTTON */}
          <button
            className="
              flex
              items-center
              gap-2

              bg-yellow-400
              hover:bg-yellow-500

              px-5
              py-4

              rounded-2xl

              font-semibold
            "
          >
            <Plus size={18} />

            Add Horse
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div
        className="
          bg-white
          dark:bg-zinc-900

          border
          border-zinc-200
          dark:border-zinc-800

          rounded-3xl

          overflow-hidden
        "
      >

        {/* TABLE HEADER */}
        <div
          className="
            grid
            grid-cols-6

            px-8
            py-6

            border-b
            border-zinc-200
            dark:border-zinc-800

            text-sm
            uppercase

            tracking-wider

            text-zinc-500
            font-semibold
          "
        >

          <p>Horse</p>

          <p>Breed</p>

          <p>Age</p>

          <p>Health</p>

          <p>Wins</p>

          <p>Actions</p>

        </div>

        {/* ROWS */}
        {filteredHorses.map((horse) => (

          <div
            key={horse.id}

            className="
              grid
              grid-cols-6

              px-8
              py-6

              border-b
              border-zinc-100
              dark:border-zinc-800

              hover:bg-zinc-50
              dark:hover:bg-zinc-800

              transition-all
            "
          >

            {/* NAME */}
            <h3
              className="
                font-bold
                dark:text-white
              "
            >
              {horse.name}
            </h3>

            {/* BREED */}
            <p className="dark:text-zinc-300">
              {horse.breed}
            </p>

            {/* AGE */}
            <p className="dark:text-zinc-300">
              {horse.age} yrs
            </p>

            {/* HEALTH */}
            <div>

              <span
                className={
                  horse.health === "Excellent"
                    ? "px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-600"
                    : horse.health === "Good"
                      ? "px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700"
                      : "px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-500"
                }
              >
                {horse.health}
              </span>

            </div>

            {/* WINS */}
            <p
              className="
                font-bold
                dark:text-white
              "
            >
              {horse.wins}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3">

              {/* EDIT */}
              <button
                className="
                  w-10
                  h-10

                  rounded-xl

                  bg-zinc-100
                  dark:bg-zinc-700

                  flex
                  items-center
                  justify-center
                "
              >
                <Pencil size={16} />
              </button>

              {/* DELETE */}
              <button
                className="
                  w-10
                  h-10

                  rounded-xl

                  bg-red-100

                  text-red-500

                  flex
                  items-center
                  justify-center
                "
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Horses;

