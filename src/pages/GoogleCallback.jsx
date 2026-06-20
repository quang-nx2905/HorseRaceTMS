import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoogleCallbackToken } from "../api/authApi";

/**
 * Trang này được load sau khi backend hoàn tất Google OAuth
 * và redirect về: /auth/callback?token=<accessToken>
 *
 * Nó đọc token từ URL, lưu vào localStorage rồi điều hướng về dashboard.
 * Nếu không tìm thấy token (URL sai / lỗi), hiện thông báo lỗi.
 */
function GoogleCallback() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getGoogleCallbackToken();

        if (token) {
            // Lưu token như khi login bình thường
            localStorage.setItem("token", token);
            // Chuyển về trang chủ
            navigate("/", { replace: true });
        } else {
            setError("Đăng nhập Google thất bại. Không nhận được token từ server.");
        }
    }, [navigate]);

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
                        <h1 className="text-white font-bold text-xl mb-2">Đăng nhập thất bại</h1>
                        <p className="text-zinc-400 text-sm leading-6">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate("/login", { replace: true })}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-2xl transition-all duration-200 text-sm"
                    >
                        Quay về trang đăng nhập
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
                <p className="text-zinc-400 text-sm font-medium">Đang xác thực tài khoản Google...</p>
            </div>
        </div>
    );
}

export default GoogleCallback;
