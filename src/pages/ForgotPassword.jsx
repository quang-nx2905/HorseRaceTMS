import { Link } from "react-router-dom";
import { useState } from "react";
import { Mail, ArrowRight, Trophy, Zap, BarChart3, CheckCircle } from "lucide-react";
import { forgotPasswordApi } from "../api/authApi";

const features = [
    { icon: Trophy, label: "Elite Tournaments", desc: "Manage world-class racing events" },
    { icon: Zap,    label: "AI Predictions",   desc: "86% win accuracy engine"         },
    { icon: BarChart3, label: "Live Analytics", desc: "Real-time race performance data" },
];

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleForgot = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        setLoading(true);
        try {
            await forgotPasswordApi({ email });
            setSuccess(true);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Cannot connect to server. Please check Backend!";
            alert(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleForgot();
    };

    return (
        <div className="min-h-screen flex">

            {/* ── LEFT PANEL – Dark Brand ── */}
            <div className="hidden lg:flex lg:w-[52%] bg-zinc-950 flex-col justify-between p-14 relative overflow-hidden">

                {/* Decorative blobs */}
                <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />

                {/* Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-11 h-11 rounded-2xl bg-yellow-400 flex items-center justify-center text-xl font-black text-black">
                        H
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">HorseRace TMS</span>
                </div>

                {/* Hero text */}
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-8">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        <span className="text-yellow-400 text-xs font-semibold tracking-wider uppercase">
                            Elite Racing Platform
                        </span>
                    </div>

                    <h2 className="text-5xl font-black text-white leading-[1.1] mb-6">
                        Horse Race<br />
                        <span className="text-yellow-400">Tournament</span><br />
                        Management
                    </h2>

                    <p className="text-zinc-400 text-base leading-7 max-w-sm mb-12">
                        Professional management, AI-powered predictions and real-time
                        tournament operations — all in one platform.
                    </p>

                    {/* Feature list */}
                    <div className="space-y-4">
                        {features.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                                    <Icon size={18} className="text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{label}</p>
                                    <p className="text-zinc-500 text-xs">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom badge */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {["#f59e0b", "#10b981", "#3b82f6"].map((c, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950" style={{ background: c }} />
                        ))}
                    </div>
                    <p className="text-zinc-500 text-sm">
                        Trusted by <span className="text-white font-semibold">2,400+</span> racing professionals
                    </p>
                </div>
            </div>

            {/* ── RIGHT PANEL – Form ── */}
            <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-[420px]">

                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-lg font-black text-black">
                            H
                        </div>
                        <span className="font-bold text-base">HorseRace TMS</span>
                    </div>

                    {success ? (
                        <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                            <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h1 className="text-3xl font-black text-zinc-900 mb-2">
                                Check your email
                            </h1>
                            <p className="text-zinc-500 text-sm">
                                We've sent a password reset link to <br/>
                                <span className="font-semibold text-zinc-800">{email}</span>
                            </p>
                            <Link
                                to="/login"
                                className="block w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-2xl transition-colors text-sm mt-8"
                            >
                                Back to Sign in
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Heading */}
                            <div className="mb-8">
                                <h1 className="text-4xl font-black text-zinc-900 mb-2">
                                    Reset Password
                                </h1>
                                <p className="text-zinc-500 text-sm">
                                    Enter your email and we'll send you a link to reset your password.
                                </p>
                            </div>

                            {/* Form */}
                            <div className="space-y-5">

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-zinc-700">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                        <input
                                            id="forgot-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            disabled={loading}
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 outline-none text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    id="forgot-submit"
                                    onClick={handleForgot}
                                    disabled={loading}
                                    className="group w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-200 disabled:text-zinc-400 text-black font-bold py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5 text-sm"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Sending link...
                                        </>
                                    ) : (
                                        <>
                                            Send Reset Link
                                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
                                </button>

                            </div>

                            {/* Back link */}
                            <p className="text-center text-sm text-zinc-500 mt-8">
                                Remember your password?{" "}
                                <Link
                                    to="/login"
                                    className="text-zinc-900 font-bold hover:text-yellow-600 transition-colors"
                                >
                                    Sign in instead →
                                </Link>
                            </p>
                        </>
                    )}

                </div>
            </div>

        </div>
    );
}

export default ForgotPassword;
