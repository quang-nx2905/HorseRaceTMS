import { useState, useEffect, useMemo } from "react";
import { Loader2, Mail, Check, X, Calendar, User, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";
import { invitationApi } from "../api/invitationApi";

function MyInvites() {
    const [invites, setInvites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("All");

    const fetchInvites = async () => {
        setIsLoading(true);
        try {
            const response = await invitationApi.getMyInvitations();
            const data = response.data || [];
            // Sort by newest first (descending by inviteId)
            data.sort((a, b) => b.inviteId - a.inviteId);
            setInvites(data);
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

    const filteredInvites = useMemo(() => {
        if (activeTab === "All") return invites;
        return invites.filter(i => i.status === activeTab);
    }, [invites, activeTab]);

    const TABS = ["All", "Pending", "Accepted", "Rejected"];

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-amber-500" />
            </div>
        );
    }

    return (
        <div className="space-y-7 animate-in fade-in duration-300 max-w-5xl mx-auto pb-10">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2">
                        Inbox
                    </p>
                    <h1 className="text-4xl font-black text-zinc-900">My Invitations</h1>
                    <p className="text-zinc-500 mt-2">
                        Review and manage invitations from horse owners
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                            activeTab === tab
                                ? "bg-zinc-900 text-white shadow-md"
                                : "bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-800"
                        }`}
                    >
                        {tab}
                        {tab !== "All" && (
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                activeTab === tab ? "bg-white/20" : "bg-zinc-100"
                            }`}>
                                {invites.filter(i => i.status === tab).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {filteredInvites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-zinc-100 rounded-3xl">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-4 border border-zinc-100">
                        <Mail size={28} className="text-zinc-400" />
                    </div>
                    <p className="font-bold text-zinc-700">No invitations found</p>
                    <p className="text-zinc-400 text-sm mt-1">You don't have any {activeTab !== "All" ? activeTab.toLowerCase() : ""} invitations.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredInvites.map(invite => (
                        <div key={invite.inviteId} className={`bg-white border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-md ${invite.status === 'Pending' ? 'border-amber-200 bg-amber-50/10' : 'border-zinc-200'}`}>
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 text-zinc-500">
                                            <User size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase">From</p>
                                            <p className="font-bold text-zinc-900">{invite.ownerName}</p>
                                        </div>
                                    </div>
                                    <div className="w-px h-8 bg-zinc-200 hidden sm:block"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-500">
                                            <Calendar size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase">Tournament</p>
                                            <p className="font-bold text-zinc-900">{invite.tourName}</p>
                                        </div>
                                    </div>
                                    <div className="w-px h-8 bg-zinc-200 hidden sm:block"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-500">
                                            <AlignLeft size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase">Horse</p>
                                            <p className="font-bold text-zinc-900">{invite.horseName}</p>
                                        </div>
                                    </div>
                                </div>
                                {invite.message && (
                                    <div className="mt-4 bg-zinc-50/80 p-4 rounded-2xl border border-zinc-100 text-sm text-zinc-600 relative">
                                        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-[10px] font-bold text-zinc-400 uppercase">Message</div>
                                        <span className="italic">"{invite.message}"</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 shrink-0 md:flex-col md:items-end">
                                {invite.status === "Pending" ? (
                                    <>
                                        <button 
                                            onClick={() => handleRespond(invite.inviteId, true)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-200 hover:border-emerald-500 rounded-xl font-bold text-sm transition-all shadow-sm"
                                        >
                                            <Check size={16} /> Accept
                                        </button>
                                        <button 
                                            onClick={() => handleRespond(invite.inviteId, false)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500 rounded-xl font-bold text-sm transition-all shadow-sm"
                                        >
                                            <X size={16} /> Reject
                                        </button>
                                    </>
                                ) : (
                                    <span className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl border shadow-sm ${
                                        invite.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                        invite.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                        'bg-zinc-100 text-zinc-600 border-zinc-200'
                                    }`}>
                                        {invite.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyInvites;
