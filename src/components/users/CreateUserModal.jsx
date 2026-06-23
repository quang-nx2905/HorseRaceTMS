import { useState } from "react";
import { User, Mail, ShieldAlert } from "lucide-react";
import Modal from "../common/Modal";

function CreateUserModal({ open, onClose, onCreate }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "User",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            ...formData,
            id: Date.now(),
            status: "Active",
            isDeleted: false,
        });
        setFormData({ name: "", email: "", role: "User" });
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
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Referee">Referee</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={onClose} className="px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all font-bold">Cancel</button>
                    <button type="submit" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-950 transition-all font-bold shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:-translate-y-0.5">Create User</button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateUserModal;
