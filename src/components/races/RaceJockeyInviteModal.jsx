import { useEffect, useState, useRef } from "react";
import { Loader2, Send, X, ChevronDown, Check } from "lucide-react";
import toast from "react-hot-toast";
import { jockeyApi } from "../../api/jockeyApi";
import { invitationApi } from "../../api/invitationApi";

function CustomJockeySelect({ value, onChange, options, disabled }) {
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

  const selectedOption = options.find((o) => {
      const id = o.userId || o.user?.id || o.id;
      return String(id) === String(value);
  });

  const getJockeyName = (jockey) =>
    jockey.user?.fullName || jockey.name || `Jockey #${jockey.userId || jockey.user?.id || jockey.id}`;

  const getJockeyFallback = (jockey) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(getJockeyName(jockey))}&backgroundColor=f3f4f6`;

  const getJockeyAvatar = (jockey) =>
    jockey.avatar || jockey.avatarUrl || jockey.user?.avatar || jockey.user?.avatarUrl || getJockeyFallback(jockey);

  const handleImageError = (event, jockey) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = getJockeyFallback(jockey);
  };

  return (
    <div className="relative min-w-0 flex-1" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-left disabled:opacity-50"
      >
        {selectedOption ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-zinc-200 overflow-hidden shrink-0 border border-zinc-300">
                <img
                  src={getJockeyAvatar(selectedOption)}
                  onError={(event) => handleImageError(event, selectedOption)}
                  alt={getJockeyName(selectedOption)}
                  className="w-full h-full object-cover"
                />
            </div>
            <span className="font-semibold text-zinc-800">{getJockeyName(selectedOption)}</span>
          </div>
        ) : (
          <span className="text-zinc-500">Select a jockey</span>
        )}
        <ChevronDown size={16} className="text-zinc-400" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border bg-white shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="p-3 text-sm text-zinc-500 text-center">No available jockeys</div>
          ) : (
            options.map((jockey) => {
              const id = jockey.userId || jockey.user?.id || jockey.id;
              const name = getJockeyName(jockey);
              const isSelected = String(value) === String(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChange(id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-zinc-50 ${isSelected ? "bg-amber-50" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden shrink-0 border border-zinc-300">
                      <img
                        src={getJockeyAvatar(jockey)}
                        onError={(event) => handleImageError(event, jockey)}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                  </div>
                  <span className="flex-1 font-semibold text-zinc-800">{name}</span>
                  {isSelected && <Check size={16} className="text-amber-500" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function RaceJockeyInviteModal({ registration, onClose }) {
  const [jockeys, setJockeys] = useState([]);
  const [jockeyId, setJockeyId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    jockeyApi.getAvailableJockeys(registration.raceId)
      .then(response => {
          const availableJockeys = (response?.data || []);
          setJockeys(availableJockeys);
      })
      .catch(error => toast.error(error.response?.data?.message || "Failed to load jockeys."))
      .finally(() => setLoading(false));
  }, [registration.raceId]);

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
        <div>
            <label className="mb-1.5 block text-sm font-bold">Jockey</label>
            {loading ? (
                <div className="flex gap-2 rounded-xl bg-zinc-50 p-3 text-sm"><Loader2 size={16} className="animate-spin"/>Loading...</div>
            ) : (
                <CustomJockeySelect value={jockeyId} onChange={setJockeyId} options={jockeys} />
            )}
        </div>
        <div><label className="mb-1.5 block text-sm font-bold">Message (optional)</label><textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} className="w-full resize-none rounded-xl border bg-zinc-50 px-4 py-3 text-sm" placeholder="Write a message..."/></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-bold">Cancel</button><button disabled={!jockeyId || sending} className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{sending ? <Loader2 size={15} className="animate-spin"/> : <Send size={15}/>}Send Invite</button></div>
      </form>
    </div>
  </div>;
}

export default RaceJockeyInviteModal;
