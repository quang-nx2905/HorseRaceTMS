import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

const passwordRules = [
    { id: "length", label: "Between 9 and 19 characters", test: (p) => p.length >= 9 && p.length <= 19 },
    { id: "upper",  label: "At least one uppercase letter",  test: (p) => /[A-Z]/.test(p) },
    { id: "number", label: "At least one number",            test: (p) => /\d/.test(p) },
];

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);
    const [password, setPassword]         = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const fullName        = e.target.fullName.value;
        const email           = e.target.email.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        if (fullName.length >= 20) {
            toast.error("Full Name must be shorter than 20 characters");
            return;
        }
        if (password.length < 9 || password.length > 19) {
            toast.error("Password must be between 9 and 19 characters");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7179";
            await axios.post(`${apiBaseUrl}/api/auth/register`, {
                fullName,
                email,
                password,
                confirmPassword,
            });
            toast.success("Account created successfully!");
            navigate("/login");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Cannot connect to server. Please check Backend!";
            toast.error(`Registration Failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* ── LEFT PANEL – Dark Brand ── */}
            <div className="hidden lg:flex lg:w-[46%] bg-zinc-950 flex-col justify-between p-14 relative overflow-hidden">

                {/* Blobs */}
                <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />

                {/* Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-11 h-11 rounded-2xl bg-yellow-400 flex items-center justify-center text-xl font-black text-black">
                        H
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">HorseRace TMS</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-8">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <span className="text-yellow-400 text-xs font-semibold tracking-wider uppercase">
                            Join the Platform
                        </span>
                    </div>

                    <h2 className="text-5xl font-black text-white leading-[1.1] mb-6">
                        Start Your<br />
                        <span className="text-yellow-400">Racing</span><br />
                        Journey
                    </h2>

                    <p className="text-zinc-400 text-base leading-7 max-w-sm mb-12">
                        Create a free account and gain access to professional tournament
                        management tools, AI predictions, and live race data.
                    </p>

                    {/* Perks */}
                    <div className="space-y-3">
                        {[
                            "Full tournament management suite",
                            "Real-time race tracking & analytics",
                            "AI-powered win predictions",
                            "Multi-role access control",
                        ].map((perk) => (
                            <div key={perk} className="flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-yellow-400 flex-shrink-0" />
                                <span className="text-zinc-300 text-sm">{perk}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats row */}
                <div className="relative z-10 grid grid-cols-3 gap-4">
                    {[
                        { label: "Horses", value: "2.4k" },
                        { label: "Tournaments", value: "320+" },
                        { label: "Accuracy", value: "86%" },
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                            <p className="text-yellow-400 font-black text-2xl">{value}</p>
                            <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── RIGHT PANEL – Form ── */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-14 overflow-y-auto">
                <div className="w-full max-w-[440px]">

                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-8 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-lg font-black">
                            H
                        </div>
                        <span className="font-bold text-base">HorseRace TMS</span>
                    </div>

                    {/* Heading */}
                    <div className="mb-7">
                        <h1 className="text-3xl font-black text-zinc-900 mb-1.5">
                            Create your account
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            Join thousands of racing professionals today
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                <input
                                    id="register-fullname"
                                    name="fullName"
                                    type="text"
                                    placeholder="John Smith"
                                    disabled={loading}
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-700">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                <input
                                    id="register-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    disabled={loading}
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                <input
                                    id="register-password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* Password strength hints */}
                            {password.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {passwordRules.map(({ id, label, test }) => {
                                        const ok = test(password);
                                        return (
                                            <span
                                                key={id}
                                                className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full transition-all ${
                                                    ok
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : "bg-zinc-100 text-zinc-400"
                                                }`}
                                            >
                                                <CheckCircle2 size={10} />
                                                {label}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-zinc-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                <input
                                    id="register-confirm"
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    disabled={loading}
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            id="register-submit"
                            type="submit"
                            disabled={loading}
                            className="group w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-200 disabled:text-zinc-400 text-black font-bold py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5 text-sm mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-zinc-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-zinc-900 font-bold hover:text-yellow-600 transition-colors"
                        >
                            Sign in →
                        </Link>
                    </p>

                    <p className="text-center text-xs text-zinc-400 mt-4">
                        By creating an account, you agree to our{" "}
                        <span className="underline cursor-pointer hover:text-zinc-600">Terms of Service</span>
                        {" "}and{" "}
                        <span className="underline cursor-pointer hover:text-zinc-600">Privacy Policy</span>.
                    </p>

                </div>
            </div>

        </div>
    );
}

export default Register;