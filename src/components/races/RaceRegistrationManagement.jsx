import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, XCircle, Clock, AlertCircle, User } from "lucide-react";
import raceApi from "../../api/raceApi";
import toast from "react-hot-toast";

function RaceRegistrationManagement({ raceId, onStatusChange }) {
  const [registrations, setRegistrations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectNote, setRejectNote] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regRes, partRes] = await Promise.allSettled([
        raceApi.getRegistrations(raceId),
        raceApi.getParticipants(raceId),
      ]);
      if (regRes.status === "fulfilled") {
        setRegistrations(regRes.value.data?.data || []);
      }
      if (partRes.status === "fulfilled") {
        setParticipants(partRes.value.data?.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (raceId) {
      fetchData();
    }
  }, [raceId]);

  const handleApproveHorse = async (id) => {
    setProcessingId(id);
    try {
      await raceApi.approveRegistration(raceId, id);
      toast.success("Horse registration approved!");
      fetchData();
      onStatusChange?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve registration.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectingId) return;

    setProcessingId(rejectingId);
    try {
      await raceApi.rejectRegistration(raceId, rejectingId, rejectNote);
      toast.success("Registration rejected.");
      setRejectingId(null);
      setRejectNote("");
      fetchData();
      onStatusChange?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject registration.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleApproveJockey = async (participantId) => {
    setProcessingId(`jockey-${participantId}`);
    try {
      await raceApi.approveJockey(participantId);
      toast.success("Jockey approved successfully!");
      fetchData();
      onStatusChange?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve jockey.");
    } finally {
      setProcessingId(null);
    }
  };

  // Participants waiting for jockey approval (status = "Confirmed" means jockey accepted)
  const pendingJockeyApproval = participants.filter(
    (p) => p.participationStatus === "Confirmed" || p.participationStatus === "confirmed"
  );

  if (loading && registrations.length === 0 && participants.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
        <span className="ml-2 text-zinc-500 text-sm font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {/* ── Section 1: Horse Registrations ── */}
      <div>
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-3">
          <h4 className="font-bold text-zinc-800 text-sm">
            🐴 Horse Registrations ({registrations.length})
          </h4>
          <button
            onClick={fetchData}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center p-5 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 text-zinc-500 text-sm font-medium">
            No horses registered yet.
          </div>
        ) : (
          <div className="space-y-3">
            {registrations.map((reg) => {
              const isPending = reg.status === "Pending";
              const isApproved = reg.status === "Approved";
              const isRejected = reg.status === "Rejected";

              return (
                <div
                  key={reg.registrationId}
                  className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-3 hover:border-zinc-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-50 overflow-hidden flex-shrink-0 border border-amber-100 flex items-center justify-center font-bold text-amber-800 text-sm">
                        {reg.horseImageUrl ? (
                          <img src={reg.horseImageUrl} alt={reg.horseName} className="w-full h-full object-cover" />
                        ) : (
                          reg.horseName?.[0] || "H"
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-800 text-sm">{reg.horseName}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                          Owner: <span className="text-zinc-600">{reg.ownerName}</span>
                        </p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
                      isApproved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : isRejected
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {isApproved && <CheckCircle2 className="w-3 h-3" />}
                      {isRejected && <XCircle className="w-3 h-3" />}
                      {isPending && <Clock className="w-3 h-3" />}
                      {reg.status}
                    </span>
                  </div>

                  {isRejected && reg.reviewNote && (
                    <div className="flex items-start gap-2 p-2.5 bg-red-50/50 rounded-lg border border-red-100/50 text-xs text-red-700 font-medium">
                      <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                      <p>Reason: {reg.reviewNote}</p>
                    </div>
                  )}

                  {isPending && (
                    <div className="flex items-center justify-end gap-2 border-t border-zinc-50 pt-3">
                      {rejectingId === reg.registrationId ? (
                        <form onSubmit={handleRejectSubmit} className="w-full flex flex-col gap-2 mt-1">
                          <textarea
                            placeholder="Provide a rejection reason (optional)..."
                            value={rejectNote}
                            onChange={(e) => setRejectNote(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-zinc-400"
                            rows={2}
                            maxLength={500}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => { setRejectingId(null); setRejectNote(""); }}
                              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={processingId === reg.registrationId}
                              className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                            >
                              Confirm Reject
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <button
                            onClick={() => setRejectingId(reg.registrationId)}
                            disabled={processingId !== null}
                            className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApproveHorse(reg.registrationId)}
                            disabled={processingId !== null}
                            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                          >
                            Approve Horse
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Section 2: Jockey Approval ── */}
      <div>
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-3">
          <h4 className="font-bold text-zinc-800 text-sm">
            🏇 Pending Jockey Approvals ({pendingJockeyApproval.length})
          </h4>
        </div>

        {pendingJockeyApproval.length === 0 ? (
          <div className="text-center p-5 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 text-zinc-500 text-sm font-medium">
            No jockeys awaiting approval. Jockeys must accept their invitation first.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingJockeyApproval.map((p) => (
              <div
                key={p.participantId}
                className="bg-white border border-blue-100 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <User size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-800 text-sm">
                      {p.jockeyName || `Jockey #${p.jockeyId}`}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                      Horse: <span className="text-zinc-600">{p.horseName || `Horse #${p.horseId}`}</span>
                      &nbsp;·&nbsp; Lane: <span className="text-zinc-600">{p.laneNumber}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-[10px] font-bold uppercase">
                    Jockey Accepted
                  </span>
                  <button
                    onClick={() => handleApproveJockey(p.participantId)}
                    disabled={processingId === `jockey-${p.participantId}`}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50 flex items-center gap-1"
                  >
                    {processingId === `jockey-${p.participantId}` ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={12} />
                    )}
                    Approve Jockey
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RaceRegistrationManagement;
