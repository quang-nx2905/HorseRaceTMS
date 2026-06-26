import { useState, useEffect } from "react";
import { User, Mail, ShieldAlert, Phone, Scale, Clock, Star, Trash2, ImageOff } from "lucide-react";
import Modal from "../common/Modal";

function EditUserModal({ open, onClose, onSave, user }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "User",
        status: "Active",
        phone: "",
        weight: "",
        experienceYear: "",
        expYears: "",
        totalPoints: "",
        removeAvatar: false,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                role: user.role === "User" ? "Spectator" : user.role,
                status: user.status || "Active",
                phone: user.phone || "",
                weight: user.weight || "",
                experienceYear: user.experienceYear || user.expYears || "",
                expYears: user.expYears || user.experienceYear || "",
                totalPoints: user.totalPoints || "",
                removeAvatar: false,
            });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...user,
            ...formData,
        });
        onClose();
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
                    <button type="submit" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-950 transition-all font-bold shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:-translate-y-0.5">Save Changes</button>
                </div>
            </form>
        </Modal>
    );
}

export default EditUserModal;
