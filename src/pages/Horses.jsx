import { useState } from "react";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import PageHeader from "../components/ui/PageHeader";

import Table from "../components/ui/Table";

import StatusBadge from "../components/ui/StatusBadge";

import SearchInput from "../components/ui/SearchInput";

import Pagination from "../components/ui/Pagination";

function Horses() {

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const horses = [

        {
            name: "Thunder Bolt",
            breed: "Arabian",
            age: 4,
            health: "Excellent",
            wins: 18,
        },

        {
            name: "Golden Sprint",
            breed: "Thoroughbred",
            age: 5,
            health: "Good",
            wins: 12,
        },

        {
            name: "Night Fury",
            breed: "Mustang",
            age: 6,
            health: "Poor",
            wins: 8,
        },

        {
            name: "Silver Arrow",
            breed: "Arabian",
            age: 3,
            health: "Excellent",
            wins: 22,
        },

        {
            name: "Storm Racer",
            breed: "Quarter Horse",
            age: 5,
            health: "Good",
            wins: 15,
        },

    ];

    const filteredHorses =
        horses.filter((horse) =>
            horse.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    // PAGINATION
    const itemsPerPage = 3;

    const totalPages =
        Math.ceil(
            filteredHorses.length / itemsPerPage
        );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentHorses =
        filteredHorses.slice(
            startIndex,
            startIndex + itemsPerPage
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

                <PageHeader
                    title="Horses"

                    subtitle="
            Manage race horses and
            performance information.
          "
                />

                <SearchInput
                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    placeholder="Search horse..."
                />

            </div>

            {/* TABLE */}
            <Table
                headers={[
                    "Horse",
                    "Breed",
                    "Age",
                    "Health",
                    "Wins",
                    "Actions",
                ]}
            >

                {currentHorses.map((horse, index) => (

                    <div
                        key={index}

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

                        <h3 className="font-bold dark:text-white">
                            {horse.name}
                        </h3>

                        <p className="dark:text-zinc-300">
                            {horse.breed}
                        </p>

                        <p className="dark:text-zinc-300">
                            {horse.age} yrs
                        </p>

                        <StatusBadge
                            status={horse.health}
                        />

                        <p className="font-bold dark:text-white">
                            {horse.wins}
                        </p>

                        {/* ACTIONS */}
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

                    </div>

                ))}

            </Table>

            {/* PAGINATION */}
            <Pagination
                currentPage={currentPage}

                totalPages={totalPages}

                onPageChange={setCurrentPage}
            />

        </div>

    );
}

export default Horses;