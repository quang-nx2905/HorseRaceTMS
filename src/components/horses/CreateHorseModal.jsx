import { useState } from "react";
import Modal from "../common/Modal";

function CreateHorseModal({
    open,
    onClose,
    onCreate,
}) {

    const [form, setForm] =
        useState({
            name: "",
            breed: "",
            age: "",
            health: "Excellent",
            wins: 0,
        });

    const handleSubmit = () => {

        onCreate({
            id: Date.now(),
            ...form,
        });

        setForm({
            name: "",
            breed: "",
            age: "",
            health: "Excellent",
            wins: 0,
        });

        onClose();
    };

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Create Horse"
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
                    type="number"
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
                    Create Horse
                </button>

            </div>

        </Modal>

    );
}

export default CreateHorseModal;