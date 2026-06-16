import { useState } from "react";
import toast from "react-hot-toast";
import {
    Mail,
    Lock,
    User,
    Bell,
    Smartphone,
    ShieldCheck,
    Eye,
    EyeOff,
    Save,
    Key,
    UserCheck,
} from "lucide-react";

// Premium Toggle Switch component
function ToggleSwitch({ checked, onChange, id }) {
    return (
        <button
            id={id}
            type="button"
            onClick={onChange}
            className={`
                w-12 h-6.5 rounded-full transition-colors relative duration-200 focus:outline-none flex-shrink-0
                ${checked ? "bg-amber-500 shadow-sm shadow-amber-500/20" : "bg-zinc-200"}
            `}
            style={{ height: "26px" }}
        >
            <span
                className={`
                    w-5 h-5 rounded-lg bg-white absolute top-[3px] transition-transform duration-200 shadow-sm
                    ${checked ? "translate-x-6" : "translate-x-1"}
                `}
            />
        </button>
    );
}

function Settings() {
    // Notification states
    const [emailNotification, setEmailNotification] = useState(true);
    const [smsNotification, setSmsNotification] = useState(false);
    const [pushNotification, setPushNotification] = useState(true);

    // Profile states
    const [fullName, setFullName] = useState("Admin User");
    const [email, setEmail] = useState("admin@equinerace.com");
    const [isSavingProfile, setIsSavingProfile] = useState(false);

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

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        setIsChangingPass(true);
        setTimeout(() => {
            setIsChangingPass(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast.success("Password changed successfully!");
        }, 1000);
    };

    return (
        <div className="space-y-8 max-w-[1000px] mx-auto pb-12 animate-in fade-in duration-300">
            {/* HEADER */}
            <div className="flex flex-col gap-1.5">
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
                    System Settings
                </h1>
                <p className="text-zinc-500 text-sm">
                    Customize your notification preferences, update credentials, and configure account parameters.
                </p>
            </div>

            {/* SETTINGS CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LEFT: INFO CARD */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-800 text-base">Configuration Panel</h3>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                                Control notification delivery methods, general metadata settings, and manage account security protocols.
                            </p>
                        </div>
                        <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 space-y-3.5">
                            <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-500">
                                <UserCheck size={14} className="text-zinc-400" />
                                <span>Role: System Admin</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs font-semibold text-zinc-500">
                                <Key size={14} className="text-zinc-400" />
                                <span>Encryption: AES-256</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: CONFIG SECTIONS */}
                <div className="md:col-span-2 space-y-8">
                    {/* CARD 1: NOTIFICATIONS */}
                    <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2.5">
                            <Bell size={18} className="text-amber-500" />
                            Notifications Configuration
                        </h3>

                        <div className="divide-y divide-zinc-100">
                            {/* Email Row */}
                            <div className="flex items-start justify-between py-4 gap-4">
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 mt-0.5">
                                        <Mail size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-800">Email Alerts</h4>
                                        <p className="text-xs text-zinc-400 mt-0.5">
                                            Receive daily digests, summaries, and race outcome report cards.
                                        </p>
                                    </div>
                                </div>
                                <ToggleSwitch
                                    id="settings-email-toggle"
                                    checked={emailNotification}
                                    onChange={() => setEmailNotification(!emailNotification)}
                                />
                            </div>

                            {/* SMS Row */}
                            <div className="flex items-start justify-between py-4 gap-4">
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 mt-0.5">
                                        <Smartphone size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-800">SMS Alerts</h4>
                                        <p className="text-xs text-zinc-400 mt-0.5">
                                            Send instant text messages when racing matches start.
                                        </p>
                                    </div>
                                </div>
                                <ToggleSwitch
                                    id="settings-sms-toggle"
                                    checked={smsNotification}
                                    onChange={() => setSmsNotification(!smsNotification)}
                                />
                            </div>

                            {/* Push Row */}
                            <div className="flex items-start justify-between py-4 gap-4">
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 mt-0.5">
                                        <Bell size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-zinc-800">Browser Push Alerts</h4>
                                        <p className="text-xs text-zinc-400 mt-0.5">
                                            Display system dashboard browser popups in real-time.
                                        </p>
                                    </div>
                                </div>
                                <ToggleSwitch
                                    id="settings-push-toggle"
                                    checked={pushNotification}
                                    onChange={() => setPushNotification(!pushNotification)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: ACCOUNT PREFERENCES */}
                    <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2.5">
                            <User size={18} className="text-amber-500" />
                            Account Profile Info
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Full Name"
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Email Address"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Profile Button */}
                        <div className="flex justify-end pt-2 border-t border-zinc-100">
                            <button
                                onClick={handleSaveProfile}
                                disabled={isSavingProfile}
                                className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-200 text-black px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow hover:shadow-yellow-400/25 flex items-center justify-center gap-1.5 text-xs"
                            >
                                <Save size={14} />
                                {isSavingProfile ? "Saving Details..." : "Save Preferences"}
                            </button>
                        </div>
                    </div>

                    {/* CARD 3: SECURITY CONTROLS */}
                    <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2.5">
                            <Lock size={18} className="text-amber-500" />
                            Security & Credentials
                        </h3>

                        <div className="space-y-4">
                            {/* Current Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type={showCurrent ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrent(!showCurrent)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type={showNew ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-sm text-zinc-800 placeholder-zinc-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save Password Button */}
                        <div className="flex justify-end pt-2 border-t border-zinc-100">
                            <button
                                onClick={handleChangePassword}
                                disabled={isChangingPass}
                                className="bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 text-xs"
                            >
                                <Key size={14} />
                                {isChangingPass ? "Changing Password..." : "Change Password"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;