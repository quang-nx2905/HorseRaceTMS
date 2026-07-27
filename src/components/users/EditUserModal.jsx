import { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, ShieldAlert, Phone, Clock, Star, Trash2, ImageOff } from "lucide-react";
import Modal from "../common/Modal";

function EditUserModal({ open, onClose, onSave, user }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "User",
        status: "Active",
        phone: "",
        experienceYear: "",
        expYears: "",
        totalPoints: "",
        removeAvatar: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                role: user.role === "User" ? "Spectator" : user.role,
                status: user.status || "Active",
                phone: user.phone || "",
                experienceYear: user.experienceYear || user.expYears || "",
                expYears: user.expYears || user.experienceYear || "",
                totalPoints: user.totalPoints || "",
                removeAvatar: false,
            });
            setError("");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (user && user.role === "HorseOwner" && formData.role !== "HorseOwner") {
            try {
                const response = await axios.get(`https://localhost:7179/api/horses/owner/${user.id}`);
                const horses = response.data?.data || [];
                if (horses.length > 0) {
                    setError("Cannot change role. This user currently has registered horses.");
                    return;
                }
            } catch (err) {
                console.error("Failed to check owner's horses:", err);
            }
        }

        setIsSubmitting(true);
        try {
            await onSave({
                ...user,
                ...formData,
            });
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to save changes.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} title="Edit User" width="w-[600px]">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Full Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Email Address</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
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

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Phone</label>
                        <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium" />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Avatar</label>
                        {user?.avatar ? (
                            <div className="flex gap-3">
                                <div className={`h-[58px] w-[58px] rounded-2xl overflow-hidden border border-zinc-200 flex-shrink-0 bg-zinc-50 transition-all ${formData.removeAvatar ? 'opacity-30 grayscale border-red-200 ring-2 ring-red-100 ring-offset-1' : ''}`}>
                                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, removeAvatar: !formData.removeAvatar })}
                                    className={`flex-1 flex items-center justify-center gap-2 border rounded-2xl font-bold transition-all ${formData.removeAvatar ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'}`}
                                >
                                    {formData.removeAvatar ? <ImageOff size={18} /> : <Trash2 size={18} />}
                                    {formData.removeAvatar ? "Removed" : "Remove"}
                                </button>
                            </div>
                        ) : (
                            <div className="w-full h-[58px] flex items-center justify-center gap-2 border rounded-2xl font-bold bg-zinc-50 text-zinc-400 border-zinc-200 cursor-not-allowed">
                                <ImageOff size={18} />
                                No Avatar
                            </div>
                        )}
                    </div>
                </div>

                {formData.role === "Jockey" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
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
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium mt-4">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" disabled={isSubmitting} onClick={onClose} className="px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all font-bold disabled:opacity-50">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-50">
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default EditUserModal;
