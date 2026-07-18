import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import raceRegistrationApi from "../../api/raceRegistrationApi";
import RaceJockeyInviteModal from "./RaceJockeyInviteModal";
import { invitationApi } from "../../api/invitationApi";

function RaceRegistrationPanel({ race, user, onUpdated }) {
  const [summary, setSummary] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [horses, setHorses] = useState([]);
  const [horseId, setHorseId] = useState("");
  const [busy, setBusy] = useState(false);
  const [inviteRegistration, setInviteRegistration] = useState(null);

  const load = async () => {
    const requests = [raceRegistrationApi.getSummary(race.raceId), raceRegistrationApi.getRegistrations(race.raceId), user?.role === "HorseOwner" ? raceRegistrationApi.getAvailableHorses(race.raceId) : Promise.resolve(null)];
    const [summaryResult, registrationsResult, horsesResult] = await Promise.allSettled(requests);
    if (summaryResult.status === "fulfilled") setSummary(summaryResult.value.data?.data || summaryResult.value.data);
    if (registrationsResult.status === "fulfilled") {
      const data = registrationsResult.value.data?.data || registrationsResult.value.data || [];
      setRegistrations(user?.role === "HorseOwner" ? data.filter(r => Number(r.ownerId) === Number(user.id)) : data);
    }
    if (user?.role === "HorseOwner" && horsesResult.status === "fulfilled") setHorses(horsesResult.value.data?.data || horsesResult.value.data || []);
  };

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, [race.raceId, user?.id]);

  const run = async (action, message) => {
    setBusy(true);
    try { await action(); toast.success(message); setHorseId(""); await load(); onUpdated?.(); }
    catch (error) { toast.error(error.response?.data?.message || "Request failed."); }
    finally { setBusy(false); }
  };

  const registrationOpen = race.status === "Open Registration" || race.status === "Upcoming";
  const canRegister = user?.role === "HorseOwner" && registrationOpen;

  return <div className="mt-4 space-y-3">
    <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
      <div className="rounded-lg border bg-white p-2"><b>Status</b><br/>{summary?.raceStatus || race.status}</div>
      <div className="rounded-lg border bg-white p-2"><b>Approved</b><br/>{summary?.approvedCount || 0}/{summary?.maxParticipants || race.maxParticipants || 8}</div>
      <div className="rounded-lg border bg-white p-2"><b>Pending</b><br/>{summary?.pendingCount || 0}</div>
      <div className="rounded-lg border bg-white p-2"><b>Minimum</b><br/>{summary?.minParticipants || race.minParticipants || 2}</div>
    </div>

    {canRegister && <div className="space-y-1"><div className="flex gap-2"><select value={horseId} onChange={e => setHorseId(e.target.value)} className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm"><option value="">Select your horse</option>{horses.map(h => <option key={h.horseId} value={h.horseId}>{h.horseName}</option>)}</select><button disabled={!horseId || busy} onClick={() => run(() => raceRegistrationApi.registerHorse(race.raceId, Number(horseId)), "Horse registration submitted for admin approval.")} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">Register Horse</button></div>{horses.length === 0 && <p className="text-xs text-zinc-500">No approved, unassigned horses are available for this tournament.</p>}</div>}

    {user?.role === "Admin" && <div className="flex flex-wrap gap-2"><button disabled={busy || !["Draft", "Upcoming", "Registration Closed"].includes(race.status)} onClick={() => run(() => raceRegistrationApi.open(race.raceId), "Registration opened.")} className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700 disabled:opacity-50">Open Registration</button><button disabled={busy || !registrationOpen} onClick={() => run(() => raceRegistrationApi.close(race.raceId), "Registration closed.")} className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">Close Registration</button></div>}

    {(user?.role === "Admin" || user?.role === "HorseOwner") && <div className="space-y-2">{registrations.map(r => <div key={r.registrationId} className="flex items-center justify-between gap-2 rounded-lg border bg-white p-2 text-xs"><span><b>{r.horseName}</b> · {r.status} · {r.status === "Approved" && r.reviewedAt ? `Approved at ${new Date(r.reviewedAt).toLocaleString()}` : r.registerTime && `Registered at ${new Date(r.registerTime).toLocaleString()}`}{r.jockeyName && <> · <b>{r.jockeyName}</b> ({r.invitationStatus === "AcceptedPendingAdmin" ? "waiting for admin approval" : "approved jockey"})</>}</span><span className="flex shrink-0 gap-1">{user?.role === "Admin" && r.status === "Pending" && <><button disabled={busy} onClick={() => run(() => raceRegistrationApi.approve(r.registrationId), "Registration approved.")} className="rounded bg-emerald-100 px-2 py-1 font-bold text-emerald-700">Approve Horse</button><button disabled={busy} onClick={() => run(() => raceRegistrationApi.reject(r.registrationId), "Registration rejected.")} className="rounded bg-red-100 px-2 py-1 font-bold text-red-700">Reject Horse</button></>}{user?.role === "Admin" && r.invitationStatus === "AcceptedPendingAdmin" && <><button disabled={busy} onClick={() => run(() => invitationApi.adminReview(r.inviteId, true), "Jockey approved and assigned to a lane.")} className="rounded bg-blue-100 px-2 py-1 font-bold text-blue-700">Approve Jockey</button><button disabled={busy} onClick={() => run(() => invitationApi.adminReview(r.inviteId, false), "Jockey assignment rejected.")} className="rounded bg-red-100 px-2 py-1 font-bold text-red-700">Reject Jockey</button></>}{user?.role === "HorseOwner" && r.status === "Approved" && !["AcceptedPendingAdmin", "Accepted"].includes(r.invitationStatus) && <button onClick={() => setInviteRegistration(r)} className="rounded bg-amber-500 px-2 py-1 font-bold text-white">Invite Jockey</button>}</span></div>)}</div>}
    {inviteRegistration && <RaceJockeyInviteModal registration={inviteRegistration} onClose={() => setInviteRegistration(null)}/>} 
  </div>;
}

export default RaceRegistrationPanel;
