import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import raceRegistrationApi from "../../api/raceRegistrationApi";
import RaceJockeyInviteModal from "./RaceJockeyInviteModal";
import { invitationApi } from "../../api/invitationApi";
import { ChevronDown, Check } from "lucide-react";

function CustomHorseSelect({ value, onChange, options, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((o) => String(o.horseId) === String(value));

  return (
    <div className="relative min-w-0 flex-1" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm text-left disabled:opacity-50"
      >
        {selectedOption ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 overflow-hidden shrink-0 border border-amber-200">
                <img src={selectedOption.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${selectedOption.horseName || selectedOption.horseId}&backgroundColor=fef3c7`} alt={selectedOption.horseName} className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-zinc-800">{selectedOption.horseName}</span>
          </div>
        ) : (
          <span className="text-zinc-500">Select your horse...</span>
        )}
        <ChevronDown size={16} className="text-zinc-400" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="p-3 text-sm text-zinc-500 text-center">No horses available</div>
          ) : (
            options.map((horse) => (
              <button
                key={horse.horseId}
                type="button"
                onClick={() => {
                  onChange(horse.horseId);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-zinc-50 ${String(value) === String(horse.horseId) ? "bg-amber-50" : ""}`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 overflow-hidden shrink-0 border border-amber-200">
                    <img src={horse.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${horse.horseName || horse.horseId}&backgroundColor=fef3c7`} alt={horse.horseName} className="w-full h-full object-cover" />
                </div>
                <span className="flex-1 font-semibold text-zinc-800">{horse.horseName}</span>
                {String(value) === String(horse.horseId) && <Check size={16} className="text-amber-500" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

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

    {canRegister && <div className="space-y-1"><div className="flex gap-2"><CustomHorseSelect value={horseId} onChange={setHorseId} options={horses} disabled={busy} /><button disabled={!horseId || busy} onClick={() => run(() => raceRegistrationApi.registerHorse(race.raceId, Number(horseId)), "Horse registration submitted for admin approval.")} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">Register Horse</button></div>{horses.length === 0 && <p className="text-xs text-zinc-500">No approved, unassigned horses are available for this tournament.</p>}</div>}

    {user?.role === "Admin" && <div className="flex flex-wrap gap-2"><button disabled={busy || !["Draft", "Upcoming", "Registration Closed"].includes(race.status)} onClick={() => run(() => raceRegistrationApi.open(race.raceId), "Registration opened.")} className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700 disabled:opacity-50">Open Registration</button><button disabled={busy || !registrationOpen} onClick={() => run(() => raceRegistrationApi.close(race.raceId), "Registration closed.")} className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">Close Registration</button></div>}

    {(user?.role === "Admin" || user?.role === "HorseOwner") && <div className="space-y-2">{registrations.map(r => <div key={r.registrationId} className="flex items-center justify-between gap-2 rounded-lg border bg-white p-2 text-xs"><span><b>{r.horseName}</b> · {r.status} · {r.status === "Approved" && r.reviewedAt ? `Approved at ${new Date(r.reviewedAt).toLocaleString()}` : r.registerTime && `Registered at ${new Date(r.registerTime).toLocaleString()}`}{r.jockeyName && <> · <b>{r.jockeyName}</b> ({r.invitationStatus === "AcceptedPendingAdmin" ? "waiting for admin approval" : "approved jockey"})</>}</span><span className="flex shrink-0 gap-1">{user?.role === "Admin" && r.status === "Pending" && <><button disabled={busy} onClick={() => run(() => raceRegistrationApi.approve(r.registrationId), "Registration approved.")} className="rounded bg-emerald-100 px-2 py-1 font-bold text-emerald-700">Approve Horse</button><button disabled={busy} onClick={() => run(() => raceRegistrationApi.reject(r.registrationId), "Registration rejected.")} className="rounded bg-red-100 px-2 py-1 font-bold text-red-700">Reject Horse</button></>}{user?.role === "Admin" && r.invitationStatus === "AcceptedPendingAdmin" && <><button disabled={busy} onClick={() => run(() => invitationApi.adminReview(r.inviteId, true), "Jockey approved and assigned to a lane.")} className="rounded bg-blue-100 px-2 py-1 font-bold text-blue-700">Approve Jockey</button><button disabled={busy} onClick={() => run(() => invitationApi.adminReview(r.inviteId, false), "Jockey assignment rejected.")} className="rounded bg-red-100 px-2 py-1 font-bold text-red-700">Reject Jockey</button></>}{user?.role === "HorseOwner" && r.status === "Approved" && !["AcceptedPendingAdmin", "Accepted"].includes(r.invitationStatus) && <button onClick={() => setInviteRegistration(r)} className="rounded bg-amber-500 px-2 py-1 font-bold text-white">Invite Jockey</button>}</span></div>)}</div>}
    {inviteRegistration && <RaceJockeyInviteModal registration={inviteRegistration} onClose={() => setInviteRegistration(null)}/>} 
  </div>;
}

export default RaceRegistrationPanel;
