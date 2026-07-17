import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import DashboardLayout from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Wraps NotificationProvider inside AuthProvider so it can access the logged-in user
function NotificationWrapper({ children }) {
  const { user } = useAuth();
  return <NotificationProvider user={user}>{children}</NotificationProvider>;
}

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GoogleCallback from "./pages/GoogleCallback";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Horses from "./pages/Horses";
import MyHorses from "./pages/MyHorses";
import Tournaments from "./pages/Tournaments";
import Jockeys from "./pages/Jockeys";
import Predictions from "./pages/Predictions";
import Leaderboard from "./pages/Leaderboard";
import Referee from "./pages/Referee";
import Spectator from "./pages/Spectator";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import UsersManagement from "./pages/UsersManagement";
import MyInvites from "./pages/MyInvites";
import SentInvites from "./pages/SentInvites";
import VNPayReturnPage from "./pages/VNPayReturnPage";
import Invitations from "./pages/Invitations";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NotificationWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<GoogleCallback />} />

          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"]}>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/horses"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"]}>
                <DashboardLayout>
                  <Horses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-horses"
            element={
              <ProtectedRoute allowedRoles={["Admin", "HorseOwner"]}>
                <DashboardLayout>
                  <MyHorses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tournaments"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"]}>
                <DashboardLayout>
                  <Tournaments />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/jockeys"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"]}>
                <DashboardLayout>
                  <Jockeys />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/predictions"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Spectator"]}>
                <DashboardLayout>
                  <Predictions />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Referee", "HorseOwner", "Jockey", "Spectator"]}>
                <DashboardLayout>
                  <Leaderboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/referee"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Referee"]}>
                <DashboardLayout>
                  <Referee />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/spectator"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Spectator"]}>
                <DashboardLayout>
                  <Spectator />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout>
                  <UsersManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/invitations/my"
            element={
              <ProtectedRoute allowedRoles={["Jockey"]}>
                <DashboardLayout>
                  <MyInvites />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/invitations"
            element={
              <ProtectedRoute allowedRoles={["HorseOwner", "Jockey"]}>
                <DashboardLayout>
                  <Invitations />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/invitations/sent"
            element={
              <ProtectedRoute allowedRoles={["HorseOwner"]}>
                <DashboardLayout>
                  <SentInvites />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/topup/vnpay-return"
            element={
              <ProtectedRoute allowedRoles={["Spectator"]}>
                <VNPayReturnPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </NotificationWrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
