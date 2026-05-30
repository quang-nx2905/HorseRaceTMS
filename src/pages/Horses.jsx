import { useState } from "react";

import toast from "react-hot-toast";

import PageHeader from "../components/ui/PageHeader";

import Button from "../components/ui/Button";

import Card from "../components/ui/Card";

import Modal from "../components/ui/Modal";

import Input from "../components/ui/Input";

function Horses() {

    const [isOpen, setIsOpen] =
        useState(false);

    const [horseName, setHorseName] =
        useState("");

    const [breed, setBreed] =
        useState("");

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

    ];

    const handleAddHorse = () => {

        if (!horseName || !breed) {

            toast.error(
                "Please fill all fields."
            );

            return;
        }

        toast.success(
            "Horse added successfully!"
        );

        setHorseName("");

        setBreed("");

        setIsOpen(false);
    };

    return (

        <div>

            {/* HEADER */}
            <PageHeader
                title="Horses"

                subtitle="
          Manage race horses and
          performance information.
        "

                action={
                    <Button
                        onClick={() =>
                            setIsOpen(true)
                        }
                    >
                        + Add Horse
                    </Button>
                }
            />

            {/* TABLE */}
            <Card className="overflow-hidden">

                {/* TABLE HEADER */}
                <div
                    className="
            grid
            grid-cols-5

            px-8
            py-6

            border-b
            border-zinc-200

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

                </div>

                {/* ROWS */}
                <div>

                    {horses.map((horse, index) => (

                        <div
                            key={index}

                            className="
                grid
                grid-cols-5

                px-8
                py-6

                border-b
                border-zinc-100

                hover:bg-zinc-50
                dark:hover:bg-zinc-800

                transition-all
              "
                        >

                            <h3 className="font-bold">
                                {horse.name}
                            </h3>

                            <p>{horse.breed}</p>

                            <p>{horse.age} yrs</p>

                            <p>{horse.health}</p>

                            <p className="font-bold">
                                {horse.wins}
                            </p>

                        </div>

                    ))}

                </div>

            </Card>

            {/* MODAL */}
            <Modal
                isOpen={isOpen}

                onClose={() =>
                    setIsOpen(false)
                }

                title="Add New Horse"
            >

                <div className="space-y-5">

                    <Input
                        label="Horse Name"

                        placeholder="Enter horse name"

                        value={horseName}

                        onChange={(e) =>
                            setHorseName(e.target.value)
                        }
                    />

                    <Input
                        label="Breed"

                        placeholder="Enter breed"

                        value={breed}

                        onChange={(e) =>
                            setBreed(e.target.value)
                        }
                    />

                    <Button
                        fullWidth

                        onClick={handleAddHorse}
                    >
                        Save Horse
                    </Button>

                </div>

            </Modal>

        </div>

    );
}

export default Horses;