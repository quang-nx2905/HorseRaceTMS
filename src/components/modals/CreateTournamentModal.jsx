import { X } from "lucide-react";

function CreateTournamentModal({
    open,
    onClose,
}) {

    if (!open) return null;

    return (

        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >

            {/* MODAL */}
            <div
                className="w-[700px] bg-white rounded-3xl border border-zinc-200 p-8 animate-in fade-in zoom-in-95 duration-200"
            >

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h2 className="text-3xl font-black">
                            Create Tournament
                        </h2>

                        <p className="text-zinc-500 mt-2">
                            Add a new horse racing tournament.
                        </p>

                    </div>

                    <button
                        onClick={onClose}

                        className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* FORM */}
                <div className="grid grid-cols-2 gap-5">

                    <div>

                        <label className="block mb-2 font-semibold">
                            Tournament Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter tournament name"

                            className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="Enter location"

                            className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">
                            Date
                        </label>

                        <input
                            type="date"

                            className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">
                            Prize Pool
                        </label>

                        <input
                            type="text"
                            placeholder="$100,000"

                            className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
                        />

                    </div>

                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-4 mt-10">

                    <button
                        onClick={onClose}

                        className="px-6 py-3 rounded-2xl bg-zinc-100 font-semibold"
                    >
                        Cancel
                    </button>

                    <button
                        className="px-6 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 transition-all font-semibold"
                    >
                        Create Tournament
                    </button>

                </div>

            </div>

        </div>

    );
}

export default CreateTournamentModal;