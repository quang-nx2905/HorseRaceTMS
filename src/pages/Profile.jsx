import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import {
    User,
    Mail,
    Phone,
    Building,
    Camera,
    Trophy,
    Users,
    TrendingUp,
    Zap,
    Clock,
    Activity,
    ShieldCheck,
    CalendarDays,
    Loader2,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    ReceiptText
} from "lucide-react";
import TopupModal from "../components/TopupModal";
import WithdrawModal from "../components/WithdrawModal";

function Profile() {
    const { user, setUser } = useAuth();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "Horse Race Tournament", // Still static as not in DB
        avatarUrl: null,
        role: "User",
        joinedDate: null,
        isActive: true,
        totalPoints: 0
    });

    const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [pointTransactions, setPointTransactions] = useState([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosClient.get("/Profile/Me");
                const data = response.data;
                setProfile(prev => ({
                    ...prev,
                    name: data.fullName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    avatarUrl: data.avatarUrl || null,
                    role: data.role || prev.role,
                    joinedDate: data.joinedDate,
                    isActive: data.isActive,
                    totalPoints: data.totalPoints || 0
                }));
                setUser(prev => ({ ...prev, avatarUrl: data.avatarUrl, name: data.fullName || prev?.name }));
                if (data.role === "Spectator") {
                    setIsLoadingTransactions(true);
                    try {
                        const historyResponse = await axiosClient.get("/points/history?limit=50");
                        setPointTransactions(historyResponse.data?.data || []);
                    } catch (historyError) {
                        console.error("Failed to load point history:", historyError);
                    } finally {
                        setIsLoadingTransactions(false);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                toast.error("Failed to load profile details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        setIsSaving(true);
        try {
            await axiosClient.put("/Profile/Me", {
                fullName: profile.name,
                email: profile.email,
                phone: profile.phone || null,
                avatarUrl: profile.avatarUrl
            });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            let errorMessage = "Failed to update profile.";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.errors) {
                const firstErrorKey = Object.keys(error.response.data.errors)[0];
                errorMessage = error.response.data.errors[firstErrorKey][0];
            }
            toast.error(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosClient.post("/Upload/Image", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            const uploadedUrl = response.data.url;
            setProfile(prev => ({ ...prev, avatarUrl: uploadedUrl }));
            setUser(prev => ({ ...prev, avatarUrl: uploadedUrl }));
            toast.success("Avatar uploaded! Remember to save changes.");
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Failed to upload avatar.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-amber-500" />
            </div>
        );
    }

    // Format joined date
    const formattedDate = profile.joinedDate 
        ? new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "N/A";

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto pb-12 animate-in fade-in duration-300">
            {/* HEADER */}
            <div className="flex flex-col gap-1.5">
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
                    Account Profile
                </h1>
                <p className="text-zinc-500 text-sm">
                    Manage your personal details, credentials, and track tournament achievements.
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN: OVERVIEW */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                        {/* Decorative background accent */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-amber-400/20 to-orange-500/20" />

                        {/* Avatar */}
                        <div className="relative mt-8 mb-4 group">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                                className="hidden"
                            />
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-black text-zinc-950 text-3xl shadow-lg border-4 border-white relative z-10 overflow-hidden">
                                {isUploading ? (
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
                                        <Loader2 size={24} className="animate-spin text-white" />
                                    </div>
                                ) : profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    profile.name.charAt(0) || <User />
                                )}
                            </div>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="absolute bottom-[-6px] right-[-6px] w-8 h-8 rounded-xl bg-zinc-900 border-2 border-white flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-md z-20 disabled:opacity-50 disabled:hover:scale-100"
                                title="Change Avatar"
                            >
                                <Camera size={14} />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <h2 className="text-xl font-bold text-zinc-900">{profile.name}</h2>
                        <p className="text-xs text-zinc-400 mt-1 font-medium">{profile.email}</p>
                        
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mt-4">
                            <ShieldCheck size={12} className="text-amber-500" />
                            {profile.role}
                        </div>

                        {profile.role === "Spectator" && (
                            <div className="mt-6 w-full p-4 bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 rounded-2xl flex flex-col items-center">
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Points Balance</span>
                                <div className="text-3xl font-black text-amber-500 flex items-center gap-2">
                                    {profile.totalPoints.toLocaleString()} <span className="text-sm font-bold text-zinc-400">PTS</span>
                                </div>
                                <div className="mt-3 flex gap-2 w-full">
                                    <button 
                                        onClick={() => setIsTopupModalOpen(true)}
                                        className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Wallet size={16} /> Top Up
                                    </button>
                                    <button 
                                        onClick={() => setIsWithdrawModalOpen(true)}
                                        className="flex-1 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Wallet size={16} className="text-zinc-600" /> Withdraw
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="w-full h-px bg-zinc-100 my-6" />

                        {/* Metadata items */}
                        <div className="w-full space-y-3.5 text-left text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-medium">Status</span>
                                {profile.isActive ? (
                                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                        Active Account
                                    </span>
                                ) : (
                                    <span className="px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                                        Locked
                                    </span>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-medium">Joined Date</span>
                                <span className="text-zinc-700 font-semibold flex items-center gap-1">
                                    <CalendarDays size={13} className="text-zinc-400" />
                                    {formattedDate}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400 font-medium">Security Clearance</span>
                                <span className="text-zinc-700 font-semibold">{profile.role}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: DETAILS FORM */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2">
                            <User size={18} className="text-amber-500" />
                            Personal Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Enter full name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>

                            {/* Organization */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Organization
                                </label>
                                <div className="relative">
                                    <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={profile.organization}
                                        onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Enter organization name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-2 border-t border-zinc-100">
                            <button
                                onClick={handleUpdate}
                                disabled={isSaving || isUploading}
                                className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-200 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow hover:shadow-yellow-400/25 flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Profile Changes"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {profile.role === "Spectator" && (
                <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-zinc-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="flex items-center gap-2 text-lg font-black text-zinc-900">
                                <ReceiptText size={19} className="text-amber-500" /> Point Transaction History
                            </h3>
                            <p className="mt-1 text-sm font-medium text-zinc-500">Top-ups, bets, refunds, and winning rewards recorded by the system.</p>
                        </div>
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Current Balance</p>
                            <p className="text-2xl font-black text-zinc-900">{profile.totalPoints.toLocaleString()} <span className="text-xs text-zinc-400">PTS</span></p>
                        </div>
                    </div>

                    {isLoadingTransactions ? (
                        <div className="flex min-h-48 items-center justify-center"><Loader2 className="animate-spin text-amber-500" /></div>
                    ) : pointTransactions.length === 0 ? (
                        <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
                            <ReceiptText className="mb-3 text-zinc-300" size={36} />
                            <p className="font-bold text-zinc-700">No point transactions yet</p>
                            <p className="mt-1 text-sm text-zinc-400">New bets, rewards, refunds, and top-ups will appear here.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-100">
                            {pointTransactions.map(transaction => {
                                const isCredit = transaction.amount > 0;
                                const labels = { BetPlaced: "Bet placed", BetWon: "Bet reward", BetRefund: "Bet refund", TopUp: "Points top-up" };
                                return (
                                    <div key={transaction.transactionId} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-50/80">
                                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${isCredit ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                                            {isCredit ? <ArrowDownLeft size={19} /> : <ArrowUpRight size={19} />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-zinc-900">{labels[transaction.transactionType] || transaction.transactionType}</p>
                                            <p className="truncate text-xs font-medium text-zinc-400">{transaction.description || "Point balance update"}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-black ${isCredit ? "text-emerald-600" : "text-red-500"}`}>{isCredit ? "+" : ""}{transaction.amount.toLocaleString()} PTS</p>
                                            <p className="mt-0.5 text-[11px] font-medium text-zinc-400">{new Date(transaction.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* PERFORMANCE STATS */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Activity size={18} className="text-amber-500" />
                    Tournament & Management Statistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stat 1 */}
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:scale-[1.01] transition-transform duration-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Races</p>
                            <h4 className="text-3xl font-black text-zinc-800 mt-1.5">128</h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <Trophy size={18} />
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:scale-[1.01] transition-transform duration-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Horses Managed</p>
                            <h4 className="text-3xl font-black text-zinc-800 mt-1.5">56</h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                            <Zap size={18} />
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:scale-[1.01] transition-transform duration-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Jockeys</p>
                            <h4 className="text-3xl font-black text-zinc-800 mt-1.5">24</h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <Users size={18} />
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:scale-[1.01] transition-transform duration-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Win Rate</p>
                            <h4 className="text-3xl font-black text-zinc-800 mt-1.5">86%</h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                            <TrendingUp size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* RECENT ACTIVITIES TIMELINE */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3.5 mb-6 flex items-center gap-2">
                    <Clock size={18} className="text-amber-500" />
                    Recent Activity Timeline
                </h3>

                <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-100">
                    {/* Activity 1 */}
                    <div className="relative flex items-start gap-4">
                        <div className="absolute left-[-21px] w-3 h-3 rounded-full bg-emerald-500 border-4 border-white shadow-[0_0_0_2px_#10b981]" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-zinc-800">
                                Updated horse profile of Thunder Bolt
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">5 minutes ago</p>
                        </div>
                    </div>

                    {/* Activity 2 */}
                    <div className="relative flex items-start gap-4">
                        <div className="absolute left-[-21px] w-3 h-3 rounded-full bg-amber-500 border-4 border-white shadow-[0_0_0_2px_#f59e0b]" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-zinc-800">
                                Created new tournament: Summer Cup 2026
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">20 minutes ago</p>
                        </div>
                    </div>

                    {/* Activity 3 */}
                    <div className="relative flex items-start gap-4">
                        <div className="absolute left-[-21px] w-3 h-3 rounded-full bg-indigo-500 border-4 border-white shadow-[0_0_0_2px_#6366f1]" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-zinc-800">
                                Added new jockey: David Miller to roster
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">1 hour ago</p>
                        </div>
                    </div>

                    {/* Activity 4 */}
                    <div className="relative flex items-start gap-4">
                        <div className="absolute left-[-21px] w-3 h-3 rounded-full bg-zinc-400 border-4 border-white shadow-[0_0_0_2px_#a1a1aa]" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-zinc-800">
                                Updated race results for Race #04
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">Yesterday</p>
                        </div>
                    </div>
                </div>
            </div>

            <TopupModal isOpen={isTopupModalOpen} onClose={() => setIsTopupModalOpen(false)} onSuccess={() => fetchProfile()} />
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} onSuccess={() => fetchProfile()} currentPoints={profile.totalPoints} />
        </div>
    );
}

export default Profile;
