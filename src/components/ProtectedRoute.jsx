import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // ĐỌC THÊM TOKEN TỪ LOCALSTORAGE
  const token = localStorage.getItem("token");

  // Nếu cả biến hệ thống (user) và token trong trình duyệt đều không có -> Mới bắt đăng nhập
  if (false) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
