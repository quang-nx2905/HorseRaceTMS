import { useState } from "react";
import DataTable from "../components/common/DataTable";
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

  const columns = [
    {
      key: "name",
      title: "Horse",
    },
    {
      key: "breed",
      title: "Breed",
    },
    {
      key: "age",
      title: "Age",
      render: (horse) => (
        <span>
          {horse.age} yrs
        </span>
      ),
    },
    {
      key: "health",
      title: "Health",
      render: (horse) => (
        <span
          className={
            horse.health === "Excellent"
              ? "px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-600"
              : horse.health === "Good"
                ? "px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700"
                : "px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-500"
          }
        >
          {horse.health}
        </span>
      ),
    },
    {
      key: "wins",
      title: "Wins",
    },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <div className="flex gap-3">

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
      ),
    },
  ];

  return (

    <div>

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

        <div className="flex gap-4">

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

      <DataTable
        columns={columns}
        data={filteredHorses}
      />

    </div>

  );
}

export default Horses;