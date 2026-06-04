import { Link } from "react-router-dom"; // Bỏ dùng useNavigate vì thay bằng window.location
import { useState } from "react";
import axios from "axios"; // 1. THÊM DÒNG NÀY ĐỂ DÙNG AXIOS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading khi đợi API

  // 2. SỬA HÀM HANDLELOGIN THÀNH HÀM BẤT ĐỒNG BỘ (ASYNC/AWAIT)
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      // Lấy URL Backend từ file .env (https://localhost:7179)
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "https://localhost:7179";

      // Gọi API Đăng nhập sang ASP.NET Core
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        email: email, // Hoặc username: email tùy thuộc vào Backend bạn thiết kế nhận gì nhé
        password: password,
      });

      // Nếu Backend trả về dữ liệu thành công kèm Token
      if (response.data && response.data.accessToken) {
        // Lưu accessToken vào trình duyệt để chứng thực cho các request sau
        localStorage.setItem("token", response.data.accessToken);

        alert("Login successful!");

        // Ép trình duyệt tải lại trang để ProtectedRoute quét lại token mới
        window.location.href = "/";
      } else {
        alert("Login failed: Invalid response from server.");
      }
    } catch (error) {
      console.error("Login API Error:", error);
      // Hiển thị lỗi từ Backend trả về nếu có, hoặc lỗi mất kết nối mạng
      const errorMessage =
        error.response?.data?.message ||
        "Cannot connect to server. Please check Backend!";
      alert(`Login Failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] flex items-center justify-center p-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full max-w-7xl overflow-hidden rounded-[40px] shadow-2xl bg-white">
        {/* LEFT */}
        <div className="p-14 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-12">
            <div className="w-20 h-20 rounded-3xl bg-yellow-400 flex items-center justify-center text-4xl font-black mb-6">
              🏇
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-4">
              Welcome Back
            </h1>
            <p className="text-zinc-500 text-xl leading-8">
              Access the Horse Race Tournament Management System dashboard.
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-zinc-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-yellow-400 transition-all disabled:opacity-50"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-zinc-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-yellow-400 transition-all disabled:opacity-50"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all py-5 rounded-2xl font-bold text-lg disabled:bg-zinc-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {/* REGISTER */}
          <p className="mt-8 text-zinc-500">
            Don’t have an account?
            <Link to="/register" className="ml-2 text-black font-bold">
              Create Account
            </Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden xl:flex bg-gradient-to-br from-yellow-400 to-yellow-500 items-center justify-center p-16">
          <div className="text-black">
            <p className="uppercase tracking-[6px] font-semibold mb-6">
              Elite Racing Platform
            </p>
            <h2 className="text-7xl font-black leading-tight mb-8">
              Horse Race <br /> Tournament <br /> System
            </h2>
            <p className="text-2xl leading-10 max-w-xl">
              Professional management, AI predictions and real-time tournament
              operations platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
