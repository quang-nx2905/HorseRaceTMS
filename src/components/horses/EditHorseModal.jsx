import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import ImageUpload from "../common/ImageUpload";

function EditHorseModal({ open, onClose, horse, onSave, isAdmin }) {
    const [form, setForm] = useState({ name: "", breed: "", age: "", health: "", wins: "", imageUrl: "" });

    useEffect(() => {
        if (horse) {
            setForm({
                name: horse.name || "",
                breed: horse.breed || "",
                age: horse.age || 0,
                health: horse.health || "Fair",
                wins: horse.wins || 0,
                imageUrl: horse.imageUrl || "",
            });
        }
    }, [horse]);

    const handleSubmit = () => {
        onSave({ ...horse, ...form });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="Edit Horse Profile">
            <div className="space-y-5 pb-2">
                <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Horse Name</label>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Secretariat"
                        className="w-full border border-zinc-200 bg-zinc-50/50 rounded-2xl px-4 py-3.5 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none transition-all font-medium text-zinc-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Breed</label>
                    <select
                        value={form.breed}
                        onChange={(e) => setForm({ ...form, breed: e.target.value })}
                        className="w-full border border-zinc-200 bg-zinc-50/50 rounded-2xl px-4 py-3.5 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none transition-all font-medium text-zinc-900"
                    >
                        <option value="" disabled>Select Breed</option>
                        <option value="Arabian">Arabian</option>
                        <option value="Thoroughbred">Thoroughbred</option>
                        <option value="Mustang">Mustang</option>
                        <option value="Quarter">Quarter</option>
                        <option value="Appaloosa">Appaloosa</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Age (Years)</label>
                        <input
                            type="number"
                            min="0"
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: e.target.value })}
                            className="w-full border border-zinc-200 bg-zinc-50/50 rounded-2xl px-4 py-3.5 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none transition-all font-medium text-zinc-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Total Wins</label>
                        <input
                            type="number"
                            min="0"
                            value={form.wins}
                            disabled={!isAdmin}
                            onChange={(e) => setForm({ ...form, wins: e.target.value })}
                            className={`w-full border border-zinc-200 bg-zinc-50/50 rounded-2xl px-4 py-3.5 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none transition-all font-medium text-zinc-900 ${!isAdmin ? "opacity-60 cursor-not-allowed" : ""}`}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-1.5 ml-1">Horse Photo</label>
                    <ImageUpload 
                        value={form.imageUrl} 
                        onChange={(url) => setForm({ ...form, imageUrl: url })} 
                        imageFit="contain"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold py-4 rounded-2xl transition-all shadow-sm hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5 mt-4"
                >
                    Save Changes
                </button>
            </div>
        </Modal>
    );
}

export default EditHorseModal;
