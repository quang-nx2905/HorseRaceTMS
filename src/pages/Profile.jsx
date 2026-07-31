import { useState, useEffect, useRef, useCallback } from "react";
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
    Activity,
    ShieldCheck,
    CalendarDays,
    Loader2,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    ReceiptText,
    BadgeCheck,
    Save
} from "lucide-react";
import TopupModal from "../components/TopupModal";
import WithdrawModal from "../components/WithdrawModal";

function Profile() {
    const { setUser } = useAuth();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
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

    const fetchProfile = useCallback(async () => {
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
    }, [setUser]);

    useEffect(() => {
        Promise.resolve().then(fetchProfile);
    }, [fetchProfile]);

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
        <div className="w-full space-y-6 pb-12 animate-in fade-in duration-300">
            {/* HEADER */}
            <section className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-7 py-8 text-white shadow-xl shadow-zinc-300/40 md:px-10">
                <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
                <div className="absolute bottom-0 right-16 h-28 w-28 rounded-full border border-white/5" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-400">
                            <User size={15} /> Personal workspace
                        </div>
                        <h1 className="text-3xl font-black tracking-tight md:text-4xl">My Profile</h1>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                            Manage your identity, contact details and account activity in one place.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
                        <div className={`h-2.5 w-2.5 rounded-full ${profile.isActive ? "bg-emerald-400 shadow-[0_0_12px_#34d399]" : "bg-red-400"}`} />
                        <div>
                            <p className="text-xs font-bold text-white">{profile.isActive ? "Account active" : "Account locked"}</p>
                            <p className="text-[10px] text-zinc-400">{profile.role} access</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">
                {/* LEFT COLUMN: OVERVIEW */}
                <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white px-7 pb-7 pt-8 text-center shadow-sm">
                        {/* Decorative background accent */}
                        <div className="absolute left-0 right-0 top-0 h-28 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500" />
                        <div className="absolute right-[-28px] top-[-36px] h-28 w-28 rounded-full bg-white/15" />

                        {/* Avatar */}
                        <div className="group relative mb-4 mt-8 inline-flex">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                                className="hidden"
                            />
                            <div className="relative z-10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-[2rem] border-4 border-white bg-zinc-900 text-3xl font-black text-white shadow-xl">
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
                                className="absolute bottom-[-4px] right-[-4px] z-20 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-zinc-900 text-white shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                                title="Change Avatar"
                            >
                                <Camera size={14} />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="flex items-center justify-center gap-1.5">
                            <h2 className="text-xl font-black text-zinc-900">{profile.name}</h2>
                            <BadgeCheck size={18} className="text-amber-500" />
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 font-medium">{profile.email}</p>
                        
                        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                            <ShieldCheck size={12} className="text-amber-500" />
                            {profile.role}
                        </div>

                        {profile.role === "Spectator" && (
                            <div className="mt-6 flex w-full flex-col items-center rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-white">
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Points Balance</span>
                                <div className="flex items-center gap-2 text-3xl font-black text-amber-400">
                                    {profile.totalPoints.toLocaleString()} <span className="text-sm font-bold text-zinc-500">PTS</span>
                                </div>
                                <div className="mt-3 flex gap-2 w-full">
                                    <button 
                                        onClick={() => setIsTopupModalOpen(true)}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-sm font-black text-zinc-950 transition-colors hover:bg-amber-500"
                                    >
                                        <Wallet size={16} /> Top Up
                                    </button>
                                    <button 
                                        onClick={() => setIsWithdrawModalOpen(true)}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/15"
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
                <div className="space-y-6">
                    <div className="flex flex-col gap-6 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="flex items-start gap-4 border-b border-zinc-100 pb-6">
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                                <User size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-zinc-900">Personal details</h3>
                                <p className="mt-1 text-xs leading-relaxed text-zinc-400">Keep your account information accurate and up to date.</p>
                            </div>
                        </div>

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
                                        className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold text-zinc-800 outline-none transition-all placeholder:font-normal placeholder:text-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
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
                                        className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold text-zinc-800 outline-none transition-all placeholder:font-normal placeholder:text-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
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
                                        className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold text-zinc-800 outline-none transition-all placeholder:font-normal placeholder:text-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-2 border-t border-zinc-100">
                            <button
                                onClick={handleUpdate}
                                disabled={isSaving || isUploading}
                                className="flex min-w-48 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-3 text-sm font-black text-zinc-950 shadow-lg shadow-amber-200/60 transition-all hover:-translate-y-0.5 hover:bg-amber-500 disabled:translate-y-0 disabled:bg-zinc-200 disabled:shadow-none"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <><Save size={17} /> Save profile changes</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {profile.role === "Spectator" && (
                <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-zinc-100 bg-gradient-to-r from-white to-amber-50/50 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
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
            <div className="space-y-5 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-black text-zinc-900">
                        <Activity size={19} className="text-amber-500" />
                        Tournament & Management Statistics
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">A quick overview of your activity across the platform.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Stat 1 */}
                    <div className="flex items-center justify-between rounded-3xl border border-zinc-100 bg-zinc-50/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/40">
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Races</p>
                            <h4 className="text-3xl font-black text-zinc-800 mt-1.5">128</h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <Trophy size={18} />
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-center justify-between rounded-3xl border border-zinc-100 bg-zinc-50/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50/40">
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Horses Managed</p>
                            <h4 className="text-3xl font-black text-zinc-800 mt-1.5">56</h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                            <Zap size={18} />
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex items-center justify-between rounded-3xl border border-zinc-100 bg-zinc-50/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/40">
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Jockeys</p>
                            <h4 className="text-3xl font-black text-zinc-800 mt-1.5">24</h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <Users size={18} />
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex items-center justify-between rounded-3xl border border-zinc-100 bg-zinc-50/70 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50/40">
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

            <TopupModal isOpen={isTopupModalOpen} onClose={() => setIsTopupModalOpen(false)} onSuccess={() => fetchProfile()} />
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} onSuccess={() => fetchProfile()} currentPoints={profile.totalPoints} />
        </div>
    );
}

export default Profile;
