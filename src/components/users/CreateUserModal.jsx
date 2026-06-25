import { useState } from "react";
import { User, Mail, ShieldAlert, Phone, Scale, Clock, Star } from "lucide-react";
import Modal from "../common/Modal";

function CreateUserModal({ open, onClose, onCreate }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "Spectator",
        phone: "",
        weight: "",
        experienceYear: "",
        expYears: "",
        totalPoints: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            ...formData,
            id: Date.now(),
            status: "Active",
            isDeleted: false,
        });
        setFormData({ name: "", email: "", role: "Spectator", phone: "", weight: "", experienceYear: "", expYears: "", totalPoints: "" });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="Create New User" width="w-[600px]">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Full Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" placeholder="Enter full name" />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Email Address</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" placeholder="user@example.com" />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Role</label>
                    <div className="relative">
                        <ShieldAlert size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium appearance-none">
                            <option value="Spectator">Spectator</option>
                            <option value="Admin">Admin</option>
                            <option value="Referee">Referee</option>
                            <option value="HorseOwner">HorseOwner</option>
                            <option value="Jockey">Jockey</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Phone</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
                    </div>
                </div>

                {formData.role === "Jockey" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Weight (kg)</label>
                            <div className="relative">
                                <Scale size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input type="number" step="0.1" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Experience (Years)</label>
                            <div className="relative">
                                <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input type="number" value={formData.experienceYear} onChange={(e) => setFormData({ ...formData, experienceYear: e.target.value, expYears: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
                            </div>
                        </div>
                    </div>
                )}

                {formData.role === "Referee" && (
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Experience (Years)</label>
                        <div className="relative">
                            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input type="number" value={formData.expYears} onChange={(e) => setFormData({ ...formData, expYears: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
                        </div>
                    </div>
                )}

                {formData.role === "Spectator" && (
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Total Points</label>
                        <div className="relative">
                            <Star size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input type="number" value={formData.totalPoints} onChange={(e) => setFormData({ ...formData, totalPoints: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
                        </div>
                    </div>
                )}
                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={onClose} className="px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all font-bold">Cancel</button>
                    <button type="submit" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-950 transition-all font-bold shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:-translate-y-0.5">Create User</button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateUserModal;
