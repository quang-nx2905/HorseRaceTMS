import { useEffect, useState } from "react";
import Modal from "../common/Modal";

function EditHorseModal({
    open,
    onClose,
    horse,
    onSave,
}) {

    const [form, setForm] =
        useState({
            name: "",
            breed: "",
            age: "",
            health: "",
            wins: "",
        });

    useEffect(() => {

        if (horse) {

            setForm({
                name: horse.name,
                breed: horse.breed,
                age: horse.age,
                health: horse.health,
                wins: horse.wins,
            });

        }

    }, [horse]);

    const handleSubmit = () => {

        onSave({
            ...horse,
            ...form,
        });

        onClose();

    };

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Edit Horse"
        >

            <div className="space-y-4">

                <input
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                    placeholder="Horse Name"
                    className="w-full border rounded-2xl p-4"
                />

                <input
                    value={form.breed}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            breed: e.target.value,
                        })
                    }
                    placeholder="Breed"
                    className="w-full border rounded-2xl p-4"
                />

                <input
                    value={form.age}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            age: e.target.value,
                        })
                    }
                    placeholder="Age"
                    className="w-full border rounded-2xl p-4"
                />

                <input
                    value={form.wins}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            wins: e.target.value,
                        })
                    }
                    placeholder="Wins"
                    className="w-full border rounded-2xl p-4"
                />

                <button
                    onClick={handleSubmit}
                    className="
            w-full
            bg-yellow-400
            py-4
            rounded-2xl
            font-bold
          "
                >
                    Save Changes
                </button>

            </div>

        </Modal>

    );
}

export default EditHorseModal;