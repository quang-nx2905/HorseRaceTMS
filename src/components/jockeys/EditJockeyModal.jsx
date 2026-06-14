import { useState, useEffect } from "react";
import Modal from "../common/Modal";

function EditJockeyModal({
    open,
    onClose,
    jockey,
    onUpdate,
}) {

    const [formData, setFormData] =
        useState({
            name: "",
            country: "",
            wins: "",
            experience: "",
            status: "",
        });

    useEffect(() => {

        if (jockey) {

            setFormData(jockey);

        }

    }, [jockey]);

    const handleSubmit = (e) => {

        e.preventDefault();

        onUpdate(formData);

        onClose();

    };

    if (!jockey) return null;

    return (

        <Modal
            open={open}
            onClose={onClose}
            title="Edit Jockey"
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
                    value={formData.country}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            country: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                />

                <input
                    type="number"
                    value={formData.wins}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            wins: e.target.value,
                        })
                    }
                    className="w-full border rounded-xl p-3"
                />

                <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            experience: e.target.value,
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
                    <option>Elite</option>
                    <option>Professional</option>
                    <option>Rising Star</option>
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
                    Update
                </button>

            </form>

        </Modal>

    );
}

export default EditJockeyModal;