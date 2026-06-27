import { useState } from "react";
import { GanttChartSquare, Tag, Hash, Activity, Weight, Dna } from "lucide-react";
import Modal from "../common/Modal";
import ImageUpload from "../common/ImageUpload";

function CreateHorseModal({
    open,
    onClose,
    onCreate,
}) {
    const [form, setForm] = useState({
        name: "",
        breed: "",
        age: "",
        weight: "",
        gender: "Stallion",
        health: "Excellent",
        imageUrl: "",
        inspectionUrl: "",
        healthCertUrl: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            id: Date.now(),
            ...form,
            age: Number(form.age),
            weight: Number(form.weight),
        });

        setForm({
            name: "",
            breed: "",
            age: "",
            weight: "",
            gender: "Stallion",
            health: "Excellent",
            imageUrl: "",
            inspectionUrl: "",
            healthCertUrl: "",
        });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Register New Horse"
            width="w-[900px]"
        >
            <p className="text-zinc-500 mb-8 -mt-6">
                Fill in the details below to add a new horse to your stable.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Column: Images */}
                    <div className="col-span-1 space-y-6">
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Horse Photo</label>
                            <ImageUpload 
                                value={form.imageUrl} 
                                onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))} 
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Inspection Document</label>
                            <ImageUpload 
                                value={form.inspectionUrl} 
                                onChange={(url) => setForm(prev => ({ ...prev, inspectionUrl: url }))} 
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Health Certificate</label>
                            <ImageUpload 
                                value={form.healthCertUrl} 
                                onChange={(url) => setForm(prev => ({ ...prev, healthCertUrl: url }))} 
                            />
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="col-span-2 grid grid-cols-2 gap-5 h-min">
                        {/* Name */}
                        <div className="col-span-2">
                            <label className="block mb-2 font-semibold text-zinc-700">Horse Name</label>
                            <div className="relative">
                                <GanttChartSquare size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Enter horse name"
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Breed */}
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Breed</label>
                            <div className="relative">
                                <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <select
                                    required
                                    value={form.breed}
                                    onChange={(e) => setForm({ ...form, breed: e.target.value })}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium appearance-none"
                                >
                                    <option value="" disabled>Select Breed</option>
                                    <option value="Arabian">Arabian</option>
                                    <option value="Thoroughbred">Thoroughbred</option>
                                    <option value="Mustang">Mustang</option>
                                    <option value="Quarter">Quarter</option>
                                    <option value="Appaloosa">Appaloosa</option>
                                </select>
                            </div>
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Age (years)</label>
                            <div className="relative">
                                <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={form.age}
                                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                                    placeholder="Age"
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Gender</label>
                            <div className="relative">
                                <Dna size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <select
                                    required
                                    value={form.gender}
                                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium appearance-none"
                                >
                                    <option value="Stallion">Stallion (Male)</option>
                                    <option value="Mare">Mare (Female)</option>
                                    <option value="Gelding">Gelding</option>
                                </select>
                            </div>
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block mb-2 font-semibold text-zinc-700">Weight (kg)</label>
                            <div className="relative">
                                <Weight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={form.weight}
                                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                    placeholder="Weight"
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Health Status */}
                        <div className="col-span-2">
                            <label className="block mb-2 font-semibold text-zinc-700">Health Status</label>
                            <div className="relative">
                                <Activity size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <select
                                    value={form.health}
                                    onChange={(e) => setForm({ ...form, health: e.target.value })}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium appearance-none"
                                >
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-10 border-t border-zinc-100 pt-6">
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
                        Register Horse
                    </button>
                </div>

            </form>
        </Modal>
    );
}

export default CreateHorseModal;