import { Trophy, MapPin, Calendar, DollarSign } from "lucide-react";
import Modal from "../common/Modal";

function CreateTournamentModal({
    open,
    onClose,
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create Tournament"
            width="w-[700px]"
        >
            <p className="text-zinc-500 mb-8 -mt-6">
                Add a new horse racing tournament.
            </p>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">
                        Tournament Name
                    </label>
                    <div className="relative">
                        <Trophy size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Enter tournament name"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">
                        Location
                    </label>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Enter location"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">
                        Date
                    </label>
                    <div className="relative">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="date"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-zinc-700"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-zinc-700">
                        Prize Pool
                    </label>
                    <div className="relative">
                        <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="100,000"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-10">
                <button
                    onClick={onClose}
                    className="px-6 py-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all font-bold"
                >
                    Cancel
                </button>
                <button
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-950 transition-all font-bold shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:-translate-y-0.5"
                >
                    Create Tournament
                </button>
            </div>
        </Modal>
    );
}

export default CreateTournamentModal;