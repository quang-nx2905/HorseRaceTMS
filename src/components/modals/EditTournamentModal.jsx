import { useEffect, useState } from "react";
import Modal from "../common/Modal";

function EditTournamentModal({
    open,
    onClose,
    tournament,
    onUpdate,
}) {

    const [formData, setFormData] =
        useState({
            id: "",
            name: "",
            location: "",
            date: "",
            prize: "",
            status: "Upcoming",
        });

    useEffect(() => {

        if (tournament) {

            setFormData(tournament);

        }

    }, [tournament]);

    const handleSubmit = (e) => {

        e.preventDefault();

        onUpdate(formData);

        onClose();

    };

    if (!tournament) return null;

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Edit Tournament"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                />

                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            location: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                />

                <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            date: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                />

                <input
                    type="text"
                    value={formData.prize}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            prize: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
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
                    <option>Live</option>
                    <option>Upcoming</option>
                    <option>Completed</option>
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
                    Update Tournament
                </button>

            </form>

        </Modal>

    );
}

export default EditTournamentModal;