import { useState } from "react";
import Modal from "../common/Modal";

function CreateJockeyModal({
    open,
    onClose,
    onCreate,
}) {

    const [formData, setFormData] =
        useState({
            name: "",
            country: "",
            wins: "",
            experience: "",
            status: "Professional",
        });

    const handleSubmit = (e) => {

        e.preventDefault();

        onCreate({
            ...formData,
            id: Date.now(),
        });

        setFormData({
            name: "",
            country: "",
            wins: "",
            experience: "",
            status: "Professional",
        });

        onClose();

    };

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Create Jockey"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                    required
                />

                <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            country: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                    required
                />

                <input
                    type="number"
                    placeholder="Wins"
                    value={formData.wins}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            wins: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                    required
                />

                <input
                    type="text"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            experience: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                    required
                />

                <select
                    value={formData.status}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            status: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                >

                    <option>
                        Elite
                    </option>

                    <option>
                        Professional
                    </option>

                    <option>
                        Rising Star
                    </option>

                </select>

                <button
                    type="submit"
                    className="
            w-full
            bg-yellow-400
            py-3
            rounded-xl
            font-semibold
          "
                >
                    Create
                </button>

            </form>

        </Modal>

    );
}

export default CreateJockeyModal;