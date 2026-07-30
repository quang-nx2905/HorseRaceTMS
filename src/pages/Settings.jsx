import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { changePasswordApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import {
    Mail,
    Lock,
    User,
    ShieldCheck,
    Eye,
    EyeOff,
    Save,
    Key,
    UserCheck,
    BadgeCheck,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import { getProfileAvatar } from "../utils/media";

function Settings() {
    const { user } = useAuth();

    // Profile states
    const [fullName, setFullName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const avatar = getProfileAvatar(user);
    const displayName = fullName || user?.name || "Account";
    const roleName = user?.role || "User";

    useEffect(() => {
        if (user) {
            setFullName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    // Security states
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isChangingPass, setIsChangingPass] = useState(false);

    const handleSaveProfile = () => {
        setIsSavingProfile(true);
        setTimeout(() => {
            setIsSavingProfile(false);
            toast.success("Account preferences updated!");
        }, 800);
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        setIsChangingPass(true);
        try {
            const res = await changePasswordApi({
                oldPassword: currentPassword,
                newPassword: newPassword,
                confirmNewPassword: confirmPassword
            });
            toast.success(res.message || "Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            let errorMsg = "Failed to change password.";
            if (error.response?.data) {
                const data = error.response.data;
                if (data.message) {
                    errorMsg = data.message;
                } else if (data.errors) {
                    // Extract the first error from DataAnnotations errors object
                    const firstErrorKey = Object.keys(data.errors)[0];
                    errorMsg = data.errors[firstErrorKey][0];
                } else if (data.title) {
                    errorMsg = data.title;
                }
            }
            toast.error(errorMsg);
        } finally {
            setIsChangingPass(false);
        }
    };

    const inputClass = "w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-12 pr-4 text-sm font-semibold text-zinc-800 outline-none transition-all placeholder:font-normal placeholder:text-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10";
    const passwordClass = `${inputClass} pr-12`;

    return (
        <div className="mx-auto max-w-[1180px] space-y-6 pb-12 animate-in fade-in duration-300">
            <section className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-7 py-8 text-white shadow-xl shadow-zinc-300/40 md:px-10">
                <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
                <div className="absolute bottom-0 right-12 h-32 w-32 rounded-full border border-white/5" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-400">
                            <ShieldCheck size={15} /> Account center
                        </div>
                        <h1 className="text-3xl font-black tracking-tight md:text-4xl">Settings</h1>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                            Keep your profile details accurate and protect your account credentials.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
                        <CheckCircle2 size={18} className="text-emerald-400" />
                        <div>
                            <p className="text-xs font-bold text-white">Account protected</p>
                            <p className="text-[10px] text-zinc-400">Security controls are active</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
                <aside className="space-y-4">
                    <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
                        <div className="h-20 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500" />
                        <div className="-mt-10 px-6 pb-6">
                            <div className="h-20 w-20 overflow-hidden rounded-3xl border-4 border-white bg-zinc-900 shadow-lg">
                                {avatar ? (
                                    <img src={avatar} alt={displayName} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-2xl font-black text-white">
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center gap-1.5">
                                    <h2 className="truncate text-lg font-black text-zinc-900">{displayName}</h2>
                                    <BadgeCheck size={17} className="flex-shrink-0 text-amber-500" />
                                </div>
                                <p className="mt-1 truncate text-xs text-zinc-400">{email || user?.email}</p>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-5">
                                <div className="rounded-2xl bg-zinc-50 p-3">
                                    <p className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Role</p>
                                    <p className="mt-1 truncate text-xs font-bold text-zinc-800">{roleName}</p>
                                </div>
                                <div className="rounded-2xl bg-emerald-50 p-3">
                                    <p className="text-[9px] font-black uppercase tracking-wider text-emerald-500">Status</p>
                                    <p className="mt-1 text-xs font-bold text-emerald-700">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-amber-100 bg-amber-50/70 p-5">
                        <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                            <UserCheck size={17} /> Account tip
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-amber-700/80">
                            Use a unique password and update it regularly to keep your account secure.
                        </p>
                    </div>
                </aside>

                <main className="space-y-6">
                    <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-7 flex items-start gap-4 border-b border-zinc-100 pb-6">
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                                <User size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-zinc-900">Profile information</h2>
                                <p className="mt-1 text-xs leading-relaxed text-zinc-400">Update the personal details associated with your account.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <label className="space-y-2">
                                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Full name</span>
                                <div className="relative">
                                    <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="Enter your full name" />
                                </div>
                            </label>
                            <label className="space-y-2">
                                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Email address</span>
                                <div className="relative">
                                    <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="Enter your email" />
                                </div>
                            </label>
                        </div>
                        <div className="mt-7 flex justify-end border-t border-zinc-100 pt-6">
                            <button onClick={handleSaveProfile} disabled={isSavingProfile} className="flex min-w-40 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-xs font-black text-zinc-950 shadow-lg shadow-amber-200/60 transition-all hover:-translate-y-0.5 hover:bg-amber-500 disabled:translate-y-0 disabled:bg-zinc-200 disabled:shadow-none">
                                {isSavingProfile ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                                {isSavingProfile ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </section>

                    <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-7 flex items-start gap-4 border-b border-zinc-100 pb-6">
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                                <Lock size={19} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-zinc-900">Password & security</h2>
                                <p className="mt-1 text-xs leading-relaxed text-zinc-400">Choose a strong password that you do not use elsewhere.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <label className="space-y-2 md:col-span-2">
                                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Current password</span>
                                <div className="relative">
                                    <Key size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={passwordClass} placeholder="Enter current password" />
                                    <button type="button" aria-label="Toggle current password visibility" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700">
                                        {showCurrent ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </label>
                            <label className="space-y-2">
                                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">New password</span>
                                <div className="relative">
                                    <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={passwordClass} placeholder="Enter new password" />
                                    <button type="button" aria-label="Toggle new password visibility" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700">
                                        {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </label>
                            <label className="space-y-2">
                                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">Confirm new password</span>
                                <div className="relative">
                                    <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={passwordClass} placeholder="Repeat new password" />
                                    <button type="button" aria-label="Toggle confirmation password visibility" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700">
                                        {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </label>
                        </div>

                        <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-zinc-500">
                                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-zinc-200">8+ characters</span>
                                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-zinc-200">Upper & lowercase</span>
                                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-zinc-200">Number or symbol</span>
                            </div>
                            <button onClick={handleChangePassword} disabled={isChangingPass} className="flex flex-shrink-0 items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-xs font-black text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 disabled:translate-y-0 disabled:bg-zinc-300">
                                {isChangingPass ? <Loader2 size={15} className="animate-spin" /> : <Key size={15} />}
                                {isChangingPass ? "Updating..." : "Update password"}
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Settings;
