import { useState, useEffect } from "react";
import { Phone, Briefcase, AlertTriangle } from "lucide-react";
import Modal from "../common/Modal";
import ImageUpload from "../common/ImageUpload";

function EditJockeyModal({
    open,
    onClose,
    jockey,
    onUpdate,
}) {
    const [formData, setFormData] = useState({
        phone: "",
        avatar: "",
        experienceYear: "",
    });

    useEffect(() => {
        if (jockey) {
            setFormData({
                phone: jockey.phone || "",
                avatar: jockey.avatar || "",
                experienceYear: jockey.experienceYear || "",
            });
        }
    }, [jockey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({
            phone: formData.phone || null,
            avatar: formData.avatar || null,
            experienceYear: formData.experienceYear !== "" ? Number(formData.experienceYear) : null,
        });
    };

    if (!jockey) return null;

    const isPending = jockey.updateStatus === "Pending";

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Edit Jockey Profile"
            width="w-[600px]"
        >
            <p className="text-zinc-500 mb-6 -mt-6">
                Update your jockey information. Changes will be submitted for Admin review before they are officially applied.
            </p>

            {isPending && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                    <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">Pending Request Active</p>
                        <p className="text-xs text-amber-700 mt-0.5">
                            You already have an active profile update request. Submitting this form will replace your pending request.
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Read-only Jockey Summary */}
                <div className="bg-zinc-50 rounded-2xl p-4 flex items-center gap-4 border border-zinc-200/60 mb-2">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-zinc-200">
                        {formData.avatar || jockey.avatar ? (
                            <img src={formData.avatar || jockey.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-amber-950 text-xl font-black">
                                {(jockey.user?.fullName || jockey.name || "J").charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm">{jockey.user?.fullName || jockey.name}</h4>
                        <p className="text-xs text-zinc-400 font-medium">{jockey.user?.email || "No Email"}</p>
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            maxLength={20}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Enter phone number"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                {/* Avatar Image Upload */}
                <div>
                    <label className="block mb-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Avatar Image</label>
                    <ImageUpload 
                        value={formData.avatar}
                        onChange={(url) => setFormData({ ...formData, avatar: url || "" })}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">

                    {/* Experience Year */}
                    <div>
                        <label className="block mb-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Experience (years)</label>
                        <div className="relative">
                            <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                required
                                type="number"
                                min={0}
                                max={60}
                                value={formData.experienceYear}
                                onChange={(e) => setFormData({ ...formData, experienceYear: e.target.value })}
                                placeholder="Years of experience"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all font-bold text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-950 font-bold transition-all text-sm shadow-sm hover:shadow hover:shadow-yellow-400/20"
                    >
                        Submit Request
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default EditJockeyModal;