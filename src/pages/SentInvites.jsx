import { useState, useEffect } from "react";
import { Loader2, Send, Trash2, Calendar, AlignLeft, User } from "lucide-react";
import toast from "react-hot-toast";
import { invitationApi } from "../api/invitationApi";
import ConfirmModal from "../components/common/ConfirmModal";

function SentInvites() {
    const [invites, setInvites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openCancel, setOpenCancel] = useState(false);
    const [selectedInvite, setSelectedInvite] = useState(null);

    const fetchInvites = async () => {
        setIsLoading(true);
        try {
            const response = await invitationApi.getSentInvitations();
            setInvites(response.data || []);
        } catch (error) {
            console.error("Failed to load invites:", error);
            toast.error("Failed to load sent invitations.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInvites();
    }, []);

    const handleCancel = async () => {
        if (!selectedInvite) return;
        try {
            await invitationApi.cancelInvitation(selectedInvite.inviteId);
            toast.success("Invitation canceled successfully.");
            fetchInvites();
        } catch (error) {
            console.error("Failed to cancel invite:", error);
            toast.error(error.response?.data?.message || "Failed to cancel invitation.");
        } finally {
            setOpenCancel(false);
            setSelectedInvite(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-yellow-500" />
            </div>
        );
    }

    return (
        <div className="w-full space-y-7 animate-in fade-in duration-300">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-2">
                        Outbox
                    </p>
                    <h1 className="text-4xl font-black text-zinc-900">Sent Invitations</h1>
                    <p className="text-zinc-500 mt-2">
                        Track the status of invitations you've sent to jockeys
                    </p>
                </div>
            </div>

            {invites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                        <Send size={28} className="text-zinc-400" />
                    </div>
                    <p className="font-bold text-zinc-700">No sent invitations</p>
                    <p className="text-zinc-400 text-sm mt-1">You haven't sent any invitations yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {invites.map(invite => (
                        <div key={invite.inviteId} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-300 transition-colors">
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-zinc-400"/>
                                    <span className="text-sm text-zinc-600">To Jockey:</span>
                                    <span className="font-bold text-zinc-900">{invite.jockeyName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-zinc-400"/>
                                    <span className="text-sm text-zinc-600">Tournament:</span>
                                    <span className="font-bold text-zinc-900">{invite.tourName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AlignLeft size={16} className="text-zinc-400"/>
                                    <span className="text-sm text-zinc-600">Horse:</span>
                                    <span className="font-bold text-zinc-900">{invite.horseName}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                    invite.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                                    invite.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                    invite.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                    'bg-zinc-200 text-zinc-600'
                                }`}>
                                    {invite.status}
                                </span>
                                {invite.status === 'Pending' && (
                                    <button 
                                        onClick={() => { setSelectedInvite(invite); setOpenCancel(true); }}
                                        className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 mt-1"
                                    >
                                        <Trash2 size={12} /> Cancel Invite
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal
                open={openCancel}
                onClose={() => setOpenCancel(false)}
                onConfirm={handleCancel}
                title="Cancel Invitation"
                message={`Are you sure you want to cancel the invitation sent to ${selectedInvite?.jockeyName}?`}
                confirmLabel="Cancel Invite"
                confirmVariant="danger"
            />
        </div>
    );
}

export default SentInvites;
