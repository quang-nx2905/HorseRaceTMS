import { useEffect, useState } from "react";
import { AlertTriangle, FileWarning, Shield, UserRound, X } from "lucide-react";
import axiosClient from "../../api/axiosClient";

function RaceIncidentsModal({ open, onClose, race }) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open || !race) return;

        const loadIncidents = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await axiosClient.get(`/Races/${race.raceId}/incidents`);
                setIncidents(response.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load incident reports.");
            } finally {
                setLoading(false);
            }
        };

        loadIncidents();
    }, [open, race]);

    if (!open || !race) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm">
            <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-950 p-6 text-white md:p-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                            <FileWarning className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">Admin Review</p>
                            <h2 className="text-2xl font-black">Race Incidents</h2>
                            <p className="mt-1 text-sm font-medium text-zinc-400">{race.raceName} · {incidents.length} report{incidents.length === 1 ? "" : "s"}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-zinc-50 p-5 md:p-7">
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2].map(item => <div key={item} className="h-40 animate-pulse rounded-2xl border border-zinc-200 bg-white" />)}
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm font-bold text-red-700">{error}</div>
                    ) : incidents.length === 0 ? (
                        <div className="rounded-2xl border border-zinc-200 bg-white py-16 text-center">
                            <Shield className="mx-auto mb-3 h-12 w-12 text-zinc-200" />
                            <p className="font-black text-zinc-800">No incidents reported</p>
                            <p className="mt-1 text-sm text-zinc-500">This race currently has no referee reports.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {incidents.map((incident, index) => (
                                <article key={incident.violationId} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-sm font-black text-orange-600">#{incidents.length - index}</span>
                                            <div>
                                                <p className="font-black text-zinc-900">{incident.violationType}</p>
                                                <p className="text-xs font-semibold text-zinc-500">Participant #{incident.participantId}</p>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-black text-red-700">
                                            <AlertTriangle className="h-3.5 w-3.5" /> {incident.penalty}
                                        </span>
                                    </div>
                                    <div className="grid gap-4 p-5 md:grid-cols-2">
                                        <div className="rounded-xl bg-zinc-50 p-4">
                                            <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">Participant</p>
                                            <p className="font-black text-zinc-900">{incident.horseName}</p>
                                            <p className="mt-1 text-sm font-medium text-zinc-500">Jockey: {incident.jockeyName}</p>
                                        </div>
                                        <div className="rounded-xl bg-zinc-50 p-4">
                                            <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">Reported by</p>
                                            <p className="flex items-center gap-2 font-black text-zinc-900"><UserRound className="h-4 w-4 text-amber-500" /> {incident.refereeName}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">Description</p>
                                            <p className="whitespace-pre-wrap text-sm font-medium leading-6 text-zinc-600">{incident.description || "No additional description was provided."}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RaceIncidentsModal;
