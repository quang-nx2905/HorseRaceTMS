import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { X, FileWarning } from "lucide-react";
import { toast } from "react-hot-toast";

function IncidentReportModal({
    open,
    onClose,
    race,
}) {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        participantId: "",
        violationType: "Rule Violation",
        penalty: "Warning",
        description: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && race) {
            fetchParticipants();
            setFormData({
                participantId: "",
                violationType: "Rule Violation",
                penalty: "Warning",
                description: ""
            });
        }
    }, [open, race]);

    const fetchParticipants = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get(`/Races/${race.raceId}/participants`);
            setParticipants(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, participantId: res.data[0].participantId }));
            }
        } catch (err) {
            console.error("Failed to fetch participants", err);
            toast.error("Failed to fetch participants");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.participantId) {
            toast.error("Please select an offender.");
            return;
        }

        try {
            setSubmitting(true);
            await axiosClient.post(`/Races/${race.raceId}/incident`, formData);
            toast.success("Incident reported successfully");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit report");
        } finally {
            setSubmitting(false);
        }
    };

    if (!open || !race) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                            <FileWarning size={20} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            Incident Report
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Race Info */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Race</p>
                        <h3 className="font-bold text-white text-lg">{race.race}</h3>
                    </div>

                    {/* Offender Dropdown */}
                    <div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Offender</p>
                        {loading ? (
                            <div className="w-full h-[52px] border border-zinc-800 rounded-xl bg-zinc-900 animate-pulse" />
                        ) : (
                            <select
                                value={formData.participantId}
                                onChange={(e) => setFormData({...formData, participantId: e.target.value})}
                                className="w-full border border-zinc-800 bg-zinc-900 text-white rounded-xl p-4 outline-none focus:border-orange-500 transition-colors"
                                required
                            >
                                <option value="" disabled>Select Horse & Jockey</option>
                                {participants.map(p => (
                                    <option key={p.participantId} value={p.participantId}>
                                        {p.horseName} — Jockey: {p.jockeyName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Incident Type Dropdown */}
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Incident Type</p>
                            <select
                                value={formData.violationType}
                                onChange={(e) => setFormData({...formData, violationType: e.target.value})}
                                className="w-full border border-zinc-800 bg-zinc-900 text-white rounded-xl p-4 outline-none focus:border-orange-500 transition-colors"
                            >
                                <option>Rule Violation</option>
                                <option>Horse Injury</option>
                                <option>Jockey Misconduct</option>
                                <option>Track Problem</option>
                            </select>
                        </div>

                        {/* Penalty Dropdown */}
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Penalty</p>
                            <select
                                value={formData.penalty}
                                onChange={(e) => setFormData({...formData, penalty: e.target.value})}
                                className="w-full border border-zinc-800 bg-zinc-900 text-white rounded-xl p-4 outline-none focus:border-orange-500 transition-colors"
                            >
                                <option>Warning</option>
                                <option>Time Penalty</option>
                                <option>Yellow Card</option>
                                <option>Red Card</option>
                                <option>Disqualified</option>
                            </select>
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Description</p>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows="4"
                            className="w-full border border-zinc-800 bg-zinc-900 text-white rounded-xl p-4 outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700"
                            placeholder="Provide details about the incident..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting || loading}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Submitting..." : "Submit Report"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default IncidentReportModal;