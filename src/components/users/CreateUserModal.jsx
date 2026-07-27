import { useState } from "react";
import { User, Mail, ShieldAlert, Phone, Clock, Star } from "lucide-react";
import Modal from "../common/Modal";

function CreateUserModal({ open, onClose, onCreate, initialRole = "Spectator", fixedRole = false }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: initialRole,
        phone: "",
        experienceYear: "",
        expYears: "",
        totalPoints: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const roleStyles = {
        Admin: { color: "purple", focus: "focus:border-purple-400 focus:ring-purple-400/10", button: "from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-purple-500/30" },
        Referee: { color: "blue", focus: "focus:border-blue-400 focus:ring-blue-400/10", button: "from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 shadow-blue-500/30" },
        HorseOwner: { color: "amber", focus: "focus:border-amber-400 focus:ring-amber-400/10", button: "from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-amber-500/30" },
        Jockey: { color: "rose", focus: "focus:border-rose-400 focus:ring-rose-400/10", button: "from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600 shadow-rose-500/30" },
        Spectator: { color: "zinc", focus: "focus:border-zinc-400 focus:ring-zinc-400/10", button: "from-zinc-700 to-zinc-900 hover:from-zinc-800 hover:to-black shadow-zinc-900/30" }
    };

    const currentStyle = roleStyles[formData.role] || roleStyles.Spectator;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim() || !formData.email.trim() || !formData.phone?.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Invalid email format.");
            return;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError("Invalid phone number (10-11 digits required).");
            return;
        }

        // Optional fields are allowed to be empty. Defaults to 0 will be applied below.

        setIsSubmitting(true);
        try {
            await onCreate({
                fullName: formData.name,
                email: formData.email,
                role: formData.role,
                phone: formData.phone || null,
                experienceYear: formData.experienceYear !== "" ? parseInt(formData.experienceYear) : 0,
                expYears: formData.expYears !== "" ? parseInt(formData.expYears) : 0,
                totalPoints: formData.totalPoints !== "" ? parseInt(formData.totalPoints) : 0,
            });
            setFormData({ name: "", email: "", role: initialRole, phone: "", experienceYear: "", expYears: "", totalPoints: "" });
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || error.message || "Failed to create user.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} title={fixedRole ? `Add ${initialRole}` : "Create New User"} width="w-[600px]">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Full Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input required disabled={isSubmitting} type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none transition-all font-medium ${currentStyle.focus}`} placeholder="Enter full name" />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Email Address</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input required disabled={isSubmitting} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none transition-all font-medium ${currentStyle.focus}`} placeholder="user@example.com" />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">Role</label>
                    <div className="relative">
                        <ShieldAlert size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 text-${currentStyle.color}-500`} />
                        <select disabled={isSubmitting || fixedRole} value={formData.role} onChange={(e) => { setFormData({ ...formData, role: e.target.value }); setError(""); }} className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none transition-all font-bold appearance-none text-${currentStyle.color}-700 ${currentStyle.focus} ${fixedRole ? "opacity-75 cursor-not-allowed" : ""}`}>
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
                        <input disabled={isSubmitting} type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none transition-all font-medium ${currentStyle.focus}`} />
                    </div>
                </div>

                {formData.role === "Jockey" && (
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Experience (Years)</label>
                        <div className="relative">
                            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input disabled={isSubmitting} type="number" value={formData.experienceYear} onChange={(e) => setFormData({ ...formData, experienceYear: e.target.value, expYears: e.target.value })} className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none transition-all font-medium ${currentStyle.focus}`} />
                        </div>
                    </div>
                )}

                {formData.role === "Referee" && (
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Experience (Years)</label>
                        <div className="relative">
                            <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input disabled={isSubmitting} type="number" value={formData.expYears} onChange={(e) => setFormData({ ...formData, expYears: e.target.value })} className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none transition-all font-medium ${currentStyle.focus}`} />
                        </div>
                    </div>
                )}

                {formData.role === "Spectator" && (
                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Total Points</label>
                        <div className="relative">
                            <Star size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input disabled={isSubmitting} type="number" value={formData.totalPoints} onChange={(e) => setFormData({ ...formData, totalPoints: e.target.value })} className={`w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none transition-all font-medium ${currentStyle.focus}`} />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" disabled={isSubmitting} onClick={onClose} className="px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all font-bold disabled:opacity-50">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className={`px-8 py-3.5 rounded-xl bg-gradient-to-r text-white transition-all font-bold shadow-lg hover:-translate-y-0.5 disabled:opacity-50 ${currentStyle.button}`}>
                        {isSubmitting ? (fixedRole ? "Adding..." : "Creating...") : (fixedRole ? `Add ${initialRole}` : "Create User")}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateUserModal;
