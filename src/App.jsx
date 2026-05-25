import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tournaments from "./pages/Tournaments";
import Horses from "./pages/Horses";
import Jockeys from "./pages/Jockeys";
import Predictions from "./pages/Predictions";
import Leaderboard from "./pages/Leaderboard";
import LiveTracking from "./pages/LiveTracking";
import Referee from "./pages/Referee";
import Spectator from "./pages/Spectator";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";

import Settings from "./pages/Settings";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tournaments"
          element={
            <ProtectedRoute>
              <Tournaments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/horses"
          element={
            <ProtectedRoute>
              <Horses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jockeys"
          element={
            <ProtectedRoute>
              <Jockeys />
            </ProtectedRoute>
          }
        />

        <Route
          path="/predictions"
          element={
            <ProtectedRoute>
              <Predictions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-tracking"
          element={
            <ProtectedRoute>
              <LiveTracking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/referee"
          element={
            <ProtectedRoute>
              <Referee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/spectator"
          element={
            <ProtectedRoute>
              <Spectator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;