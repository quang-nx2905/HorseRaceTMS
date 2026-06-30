import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // READ TOKEN FROM LOCALSTORAGE
  const token = localStorage.getItem("token");

  // If both system variable (user) and browser token are missing -> Force login
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  // Role authorization (if route requires a specific role)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If no permission, redirect to dashboard (or 403 page)
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
