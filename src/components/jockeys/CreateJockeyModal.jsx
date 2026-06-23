import { useState } from "react";
import { User, Flag, Trophy, Briefcase, Award } from "lucide-react";
import Modal from "../common/Modal";

function CreateJockeyModal({
    open,
    onClose,
    onCreate,
}) {
    const [formData, setFormData] = useState({
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
            wins: Number(formData.wins),
            experience: Number(formData.experience),
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
            title="Register New Jockey"
            width="w-[700px]"
        >
            <p className="text-zinc-500 mb-8 -mt-6">
                Add a new jockey to the racing roster.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="col-span-2">
                        <label className="block mb-2 font-semibold text-zinc-700">Jockey Name</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter jockey name"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Country / Nationality</label>
                        <div className="relative">
                            <Flag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                required
                                type="text"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                placeholder="e.g. USA, UK"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Status Level</label>
                        <div className="relative">
                            <Award size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium appearance-none"
                            >
                                <option value="Elite">Elite</option>
                                <option value="Professional">Professional</option>
                                <option value="Rising Star">Rising Star</option>
                            </select>
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Experience (years)</label>
                        <div className="relative">
                            <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                required
                                type="number"
                                min="0"
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                placeholder="Years of experience"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Wins */}
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Total Wins</label>
                        <div className="relative">
                            <Trophy size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                required
                                type="number"
                                min="0"
                                value={formData.wins}
                                onChange={(e) => setFormData({ ...formData, wins: e.target.value })}
                                placeholder="Total wins"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-950 transition-all font-bold shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:-translate-y-0.5"
                    >
                        Register Jockey
                    </button>
                </div>

            </form>
        </Modal>
    );
}

export default CreateJockeyModal;