import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Trophy, Zap, BarChart3 } from "lucide-react";
import { loginWithGoogle } from "../api/authApi";

const features = [
    { icon: Trophy, label: "Elite Tournaments", desc: "Manage world-class racing events" },
    { icon: Zap,    label: "AI Predictions",   desc: "86% win accuracy engine"         },
    { icon: BarChart3, label: "Live Analytics", desc: "Real-time race performance data" },
];

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }
        setLoading(true);
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7179";
            const response = await axios.post(
                `${apiBaseUrl}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                window.location.href = "/";
            } else {
                alert("Login failed: Invalid response from server.");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Cannot connect to server. Please check Backend!";
            alert(`Login Failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
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

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-zinc-900 mb-2">
                            Welcome back
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            Sign in to your account to continue
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
                                    id="login-email"
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

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-zinc-700">
                                    Password
                                </label>
                                <button className="text-xs text-yellow-600 hover:text-yellow-700 font-semibold transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={loading}
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
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            onClick={handleLogin}
                            disabled={loading}
                            className="group w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-zinc-200 disabled:text-zinc-400 text-black font-bold py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-0.5 text-sm"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>

                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-7">
                        <div className="flex-1 h-px bg-zinc-100" />
                        <span className="text-xs text-zinc-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-zinc-100" />
                    </div>

                    {/* Google Login Button */}
                    <button
                        id="login-google"
                        type="button"
                        onClick={loginWithGoogle}
                        disabled={loading}
                        className="group w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-50 disabled:opacity-50 border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-semibold py-3.5 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 text-sm"
                    >
                        {/* Google SVG icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="w-5 h-5 flex-shrink-0"
                            aria-hidden="true"
                        >
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Register link */}
                    <p className="text-center text-sm text-zinc-500 mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-zinc-900 font-bold hover:text-yellow-600 transition-colors"
                        >
                            Create account →
                        </Link>
                    </p>

                </div>
            </div>

        </div>
    );
}

export default Login;
