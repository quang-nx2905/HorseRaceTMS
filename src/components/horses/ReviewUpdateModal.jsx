import { X, CheckCircle, XCircle } from "lucide-react";

function ReviewUpdateModal({ open, onClose, horse, onApprove, onReject }) {
    if (!open || !horse) return null;

    // The backend should pass the parsed JSON update data inside the horse object.
    // If we map it in Horses.jsx, it will be `horse.pendingUpdate`
    const updateData = horse.pendingUpdate;

    if (!updateData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 lg:p-8 border-b border-zinc-100">
                    <div>
                        <h2 className="text-2xl font-black text-zinc-900">Review Horse Update</h2>
                        <p className="text-zinc-500 mt-1 text-sm">Compare the requested changes with the current information.</p>
                    </div>
                    <button onClick={onClose} className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body / Comparison */}
                <div className="p-6 lg:p-8 flex-1 overflow-y-auto bg-zinc-50/50">
                    <div className="grid grid-cols-2 gap-8">
                        {/* Current Data */}
                        <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                            <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4 mb-4">Current Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Image</p>
                                    <div className="w-full h-40 bg-zinc-100 rounded-xl mt-1 overflow-hidden">
                                        {horse.imageUrl ? <img src={horse.imageUrl} alt="Current" className="w-full h-full object-cover" /> : <div className="p-4 text-sm text-zinc-400">No Image</div>}
                                    </div>
                                </div>
                                <div><p className="text-xs text-zinc-400 font-bold uppercase">Name</p><p className="font-semibold text-zinc-900">{horse.name || "-"}</p></div>
                                <div><p className="text-xs text-zinc-400 font-bold uppercase">Breed</p><p className="font-semibold text-zinc-900">{horse.breed || "-"}</p></div>
                                <div><p className="text-xs text-zinc-400 font-bold uppercase">Age</p><p className="font-semibold text-zinc-900">{horse.age || "-"}</p></div>
                                <div><p className="text-xs text-zinc-400 font-bold uppercase">Weight</p><p className="font-semibold text-zinc-900">{horse.weight || "-"}</p></div>
                                <div><p className="text-xs text-zinc-400 font-bold uppercase">Gender</p><p className="font-semibold text-zinc-900">{horse.gender || "-"}</p></div>
                                <div><p className="text-xs text-zinc-400 font-bold uppercase">Health Status</p><p className="font-semibold text-zinc-900">{horse.health || "-"}</p></div>
                                <div><p className="text-xs text-zinc-400 font-bold uppercase">Status</p><p className="font-semibold text-zinc-900">{horse.status || "-"}</p></div>
                            </div>
                        </div>

                        {/* Requested Data */}
                        <div className="bg-white rounded-2xl p-6 border border-yellow-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-700 px-4 py-1 rounded-bl-xl font-bold text-xs uppercase">Requested</div>
                            <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4 mb-4">Proposed Changes</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Image</p>
                                    <div className="w-full h-40 bg-zinc-100 rounded-xl mt-1 overflow-hidden">
                                        {updateData.ImageUrl ? <img src={updateData.ImageUrl} alt="Requested" className="w-full h-full object-cover" /> : <div className="p-4 text-sm text-zinc-400">No Image</div>}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Name</p>
                                    <p className={`font-semibold ${updateData.HorseName !== horse.name ? "text-yellow-600 font-bold" : "text-zinc-900"}`}>{updateData.HorseName || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Breed</p>
                                    <p className={`font-semibold ${updateData.Breed !== horse.breed ? "text-yellow-600 font-bold" : "text-zinc-900"}`}>{updateData.Breed || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Age</p>
                                    <p className={`font-semibold ${updateData.Age !== horse.age ? "text-yellow-600 font-bold" : "text-zinc-900"}`}>{updateData.Age || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Weight</p>
                                    <p className={`font-semibold ${updateData.Weight !== horse.weight ? "text-yellow-600 font-bold" : "text-zinc-900"}`}>{updateData.Weight || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Gender</p>
                                    <p className={`font-semibold ${updateData.Gender !== horse.gender ? "text-yellow-600 font-bold" : "text-zinc-900"}`}>{updateData.Gender || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Health Status</p>
                                    <p className={`font-semibold ${updateData.HealthStatus && updateData.HealthStatus !== horse.health ? "text-yellow-600 font-bold" : "text-zinc-900"}`}>{updateData.HealthStatus || horse.health || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase">Status</p>
                                    <p className={`font-semibold ${updateData.Status && updateData.Status !== horse.status ? "text-yellow-600 font-bold" : "text-zinc-900"}`}>{updateData.Status || horse.status || "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 lg:p-8 border-t border-zinc-100 flex items-center justify-end gap-3 bg-white">
                    <button
                        onClick={() => onReject(horse)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                        <XCircle size={18} />
                        Reject Update
                    </button>
                    <button
                        onClick={() => onApprove(horse)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-sm hover:shadow-lg hover:shadow-emerald-500/20"
                    >
                        <CheckCircle size={18} />
                        Approve Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewUpdateModal;
