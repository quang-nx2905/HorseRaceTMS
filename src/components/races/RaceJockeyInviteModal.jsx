import { useEffect, useState } from "react";
import { Loader2, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { jockeyApi } from "../../api/jockeyApi";
import { invitationApi } from "../../api/invitationApi";

function RaceJockeyInviteModal({ registration, onClose }) {
  const [jockeys, setJockeys] = useState([]);
  const [jockeyId, setJockeyId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    jockeyApi.getJockeys()
      .then(response => setJockeys((response?.data || []).filter(j => j.user?.isActive !== false)))
      .catch(error => toast.error(error.response?.data?.message || "Failed to load jockeys."))
      .finally(() => setLoading(false));
  }, []);

  const submit = async event => {
    event.preventDefault();
    setSending(true);
    try {
      await invitationApi.sendInvitation({ jockeyId: Number(jockeyId), horseId: registration.horseId, tourId: registration.tourId, message });
      toast.success("Invitation sent successfully.");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send invitation.");
    } finally { setSending(false); }
  };

  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-sm">
    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="flex items-start justify-between border-b p-6"><div><h3 className="text-xl font-black">Invite a Jockey</h3><p className="mt-1 text-sm text-zinc-500"><b>{registration.horseName}</b> · {registration.raceName}</p></div><button onClick={onClose} className="rounded-full bg-zinc-100 p-2"><X size={18}/></button></div>
      <form onSubmit={submit} className="space-y-5 p-6">
        <div><label className="mb-1.5 block text-sm font-bold">Jockey</label>{loading ? <div className="flex gap-2 rounded-xl bg-zinc-50 p-3 text-sm"><Loader2 size={16} className="animate-spin"/>Loading...</div> : <select required value={jockeyId} onChange={e => setJockeyId(e.target.value)} className="w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm"><option value="">Select a jockey</option>{jockeys.map(j => { const id = j.userId || j.user?.id || j.id; return <option key={id} value={id}>{j.user?.fullName || j.name || `Jockey #${id}`}</option>; })}</select>}</div>
        <div><label className="mb-1.5 block text-sm font-bold">Message (optional)</label><textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} className="w-full resize-none rounded-xl border bg-zinc-50 px-4 py-3 text-sm" placeholder="Write a message..."/></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-bold">Cancel</button><button disabled={!jockeyId || sending} className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{sending ? <Loader2 size={15} className="animate-spin"/> : <Send size={15}/>}Send Invite</button></div>
      </form>
    </div>
  </div>;
}

export default RaceJockeyInviteModal;
