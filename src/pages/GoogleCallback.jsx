import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getGoogleCallbackToken } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

/**
 * This page is loaded after backend completes Google OAuth
 * and redirects to: /auth/callback?token=<accessToken>
 *
 * It reads the token from the URL, saves it to context, and navigates to the dashboard.
 * If no token is found (URL is incorrect / error), it displays an error message.
 */
function GoogleCallback() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const isProcessed = useRef(false);

    useEffect(() => {
        if (isProcessed.current) return;
        isProcessed.current = true;

        const token = getGoogleCallbackToken();

        if (token) {
            // Save token and parse user via context
            login(token);
            // Navigate to dashboard
            navigate("/dashboard", { replace: true });
        } else {
            setError("Google login failed. Did not receive token from server.");
        }
    }, [navigate, login]);

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 max-w-md w-full text-center space-y-6">
                    {/* Error icon */}
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-xl mb-2">Login Failed</h1>
                        <p className="text-zinc-400 text-sm leading-6">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate("/login", { replace: true })}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-2xl transition-all duration-200 text-sm"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <div className="text-center space-y-4">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin mx-auto" />
                <p className="text-zinc-400 text-sm font-medium">Authenticating Google account...</p>
            </div>
        </div>
    );
}

export default GoogleCallback;
