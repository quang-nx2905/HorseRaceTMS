import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Horses from "./pages/Horses";
import Tournaments from "./pages/Tournaments";
import Jockeys from "./pages/Jockeys";
import Predictions from "./pages/Predictions";
import Leaderboard from "./pages/Leaderboard";
import Referee from "./pages/Referee";
import Spectator from "./pages/Spectator";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/horses"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Horses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tournaments"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Tournaments />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/jockeys"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Jockeys />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/predictions"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Predictions />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Leaderboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/referee"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Referee />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/spectator"
            element={
              <ProtectedRoute>
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

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;