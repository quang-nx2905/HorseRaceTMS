import { useState, useEffect } from "react";
import { Loader2, Mail, Check, X, Calendar, User, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";
import { invitationApi } from "../api/invitationApi";

function MyInvites() {
    const [invites, setInvites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInvites = async () => {
        setIsLoading(true);
        try {
            const response = await invitationApi.getMyInvitations();
            setInvites(response.data || []);
        } catch (error) {
            console.error("Failed to load invites:", error);
            toast.error("Failed to load invitations.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInvites();
    }, []);

    const handleRespond = async (inviteId, isAccepted) => {
        try {
            await invitationApi.respondToInvitation(inviteId, isAccepted);
            toast.success(`Invitation ${isAccepted ? 'accepted' : 'rejected'}!`);
            fetchInvites(); // Refresh list to reflect updated statuses (and auto-canceled ones)
        } catch (error) {
            console.error("Failed to respond to invite:", error);
            toast.error(error.response?.data?.message || "Failed to respond to invitation.");
        }
    };

    const pendingInvites = invites.filter(i => i.status === "Pending");
    const otherInvites = invites.filter(i => i.status !== "Pending");

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-yellow-500" />
            </div>
        );
    }

    return (
        <div className="space-y-7 animate-in fade-in duration-300 max-w-5xl mx-auto">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-2">
                        Inbox
                    </p>
                    <h1 className="text-4xl font-black text-zinc-900">My Invitations</h1>
                    <p className="text-zinc-500 mt-2">
                        Review and manage invitations from horse owners
                    </p>
                </div>
            </div>

            {invites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                        <Mail size={28} className="text-zinc-400" />
                    </div>
                    <p className="font-bold text-zinc-700">No invitations found</p>
                    <p className="text-zinc-400 text-sm mt-1">You haven't received any invitations yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Pending Section */}
                    <div>
                        <h2 className="text-xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
                            Pending Requests <span className="bg-amber-100 text-amber-700 text-xs py-0.5 px-2 rounded-full">{pendingInvites.length}</span>
                        </h2>
                        {pendingInvites.length === 0 ? (
                            <p className="text-zinc-500 italic text-sm">No pending invitations.</p>
                        ) : (
                            <div className="grid gap-4">
                                {pendingInvites.map(invite => (
                                    <div key={invite.inviteId} className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-zinc-400"/>
                                                <span className="text-sm text-zinc-600">From:</span>
                                                <span className="font-bold text-zinc-900">{invite.ownerName}</span>
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
                                            {invite.message && (
                                                <div className="mt-2 bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-sm italic text-zinc-600">
                                                    "{invite.message}"
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2 shrink-0 mt-2 md:mt-0">
                                            <button 
                                                onClick={() => handleRespond(invite.inviteId, true)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 rounded-xl font-bold text-sm transition-colors"
                                            >
                                                <Check size={16} /> Accept
                                            </button>
                                            <button 
                                                onClick={() => handleRespond(invite.inviteId, false)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl font-bold text-sm transition-colors"
                                            >
                                                <X size={16} /> Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Past Section */}
                    {otherInvites.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-zinc-800 mb-4">Past Invitations</h2>
                            <div className="grid gap-4">
                                {otherInvites.map(invite => (
                                    <div key={invite.inviteId} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-75">
                                        <div className="space-y-1">
                                            <p className="text-sm text-zinc-500">From <span className="font-bold text-zinc-700">{invite.ownerName}</span> for horse <span className="font-bold text-zinc-700">{invite.horseName}</span></p>
                                            <p className="text-xs text-zinc-400">{invite.tourName}</p>
                                        </div>
                                        <div className="shrink-0">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                                invite.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                                                invite.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-zinc-200 text-zinc-600'
                                            }`}>
                                                {invite.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MyInvites;
