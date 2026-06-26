import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // ĐỌC THÊM TOKEN TỪ LOCALSTORAGE
  const token = localStorage.getItem("token");

  // Nếu cả biến hệ thống (user) và token trong trình duyệt đều không có -> Mới bắt đăng nhập
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  // Phân quyền Role (nếu route có yêu cầu role cụ thể)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Nếu không có quyền, đẩy về dashboard (hoặc trang 403)
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
