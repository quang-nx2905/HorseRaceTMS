import { X, Search, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";

function PendingHorsesModal({ open, onClose, horses, onReview, title = "Pending Registrations", subtitle = "Review and approve new horse registrations." }) {
    const [searchTerm, setSearchTerm] = useState("");

    if (!open) return null;

    const filteredHorses = horses.filter(h => 
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 lg:p-8 border-b border-zinc-100">
                    <div>
                        <h2 className="text-2xl font-black text-zinc-900">{title}</h2>
                        <p className="text-zinc-500 mt-1 text-sm">{subtitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body / List */}
                <div className="p-6 lg:p-8 flex-1 overflow-y-auto bg-zinc-50/50">
                    <div className="mb-6 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search pending horses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-zinc-200 text-zinc-900 text-sm rounded-2xl focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 block pl-12 pr-4 py-4 transition-all"
                        />
                    </div>

                    {filteredHorses.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-zinc-100 border-dashed">
                            <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900">No Pending Requests</h3>
                            <p className="text-zinc-500 text-sm mt-1">All applications have been reviewed.</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {filteredHorses.map(horse => (
                                <div key={horse.id} className="bg-white border border-zinc-200 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0">
                                            {horse.imageUrl ? (
                                                <img src={horse.imageUrl} alt={horse.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400">
                                                    <FileText size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 text-base">{horse.name}</h3>
                                            <p className="text-zinc-500 text-sm">{horse.breed} • Age: {horse.age}</p>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => onReview(horse)}
                                        className="flex items-center gap-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
                                    >
                                        Review
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PendingHorsesModal;
