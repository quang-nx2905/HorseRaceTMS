import Modal from "../common/Modal";
import { useAuth } from "../../context/AuthContext";

function HorseDetailsModal({ open, onClose, horse, onVerify }) {
    const { user } = useAuth();
    if (!horse) return null;

    const isPending = horse.status === "Pending";
    const isAdmin = user?.role === "Admin";

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isPending ? "Application Form (Pending Review)" : "Horse Profile"}
        >
            <div className="space-y-6">
                
                {/* Basic Info - Always shown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                    <div>
                        <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Horse Name</p>
                        <h3 className="text-base font-bold text-zinc-900">{horse.name}</h3>
                    </div>
                    <div>
                        <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Breed</p>
                        <h3 className="text-base font-semibold text-zinc-900">{horse.breed}</h3>
                    </div>
                    <div>
                        <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Age</p>
                        <h3 className="text-base font-semibold text-zinc-900">{horse.age} Years</h3>
                    </div>
                    <div>
                        <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Health</p>
                        <h3 className="text-base font-semibold text-zinc-900">{horse.health}</h3>
                    </div>
                </div>

                {isPending ? (
                    <>
                        {/* APPLICATION FORM VIEW (Images) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm font-bold text-zinc-900 mb-3">Inspection Certificate</p>
                            {horse.inspectionUrl ? (
                                <a href={horse.inspectionUrl} target="_blank" rel="noreferrer" className="block hover:opacity-90 transition-opacity">
                                    <img src={horse.inspectionUrl} alt="Inspection" className="w-full h-56 object-cover rounded-xl border border-zinc-200 shadow-sm" />
                                </a>
                            ) : (
                                <div className="w-full h-56 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 text-sm border border-dashed border-zinc-300">
                                    No Image Provided
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-zinc-900 mb-3">Health Certificate</p>
                            {horse.healthCertUrl ? (
                                <a href={horse.healthCertUrl} target="_blank" rel="noreferrer" className="block hover:opacity-90 transition-opacity">
                                    <img src={horse.healthCertUrl} alt="Health Cert" className="w-full h-56 object-cover rounded-xl border border-zinc-200 shadow-sm" />
                                </a>
                            ) : (
                                <div className="w-full h-56 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 text-sm border border-dashed border-zinc-300">
                                    No Image Provided
                                </div>
                            )}
                        </div>
                    </div>
                    {isPending && isAdmin && (
                        <div className="flex gap-4 pt-4 border-t border-zinc-100">
                            <button 
                                onClick={() => onVerify?.(horse, "Approved")}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                            >
                                Approve Application
                            </button>
                            <button 
                                onClick={() => onVerify?.(horse, "Rejected")}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-500/20"
                            >
                                Reject Application
                            </button>
                        </div>
                    )}
                    </>
                ) : (
                    /* STANDARD PROFILE VIEW (Stats) */
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-6 bg-white border border-zinc-200 rounded-2xl p-6">
                            <div>
                                <p className="text-zinc-500 text-sm font-medium mb-1">Total Wins</p>
                                <h3 className="font-black text-yellow-500 text-3xl">{horse.wins}</h3>
                            </div>
                            <div>
                                <p className="text-zinc-500 text-sm font-medium mb-1">Weight</p>
                                <h3 className="font-black text-zinc-900 text-3xl">{horse.weight || 0} <span className="text-lg text-zinc-400 font-medium">kg</span></h3>
                            </div>
                            <div>
                                <p className="text-zinc-500 text-sm font-medium mb-1">Gender</p>
                                <h3 className="font-black text-zinc-900 text-2xl">{horse.gender || "Unknown"}</h3>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Modal>
    );
}

export default HorseDetailsModal;