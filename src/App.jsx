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

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/tournaments"
          element={<Tournaments />}
        />

        <Route
          path="/horses"
          element={<Horses />}
        />

        <Route
          path="/jockeys"
          element={<Jockeys />}
        />

        <Route
          path="/predictions"
          element={<Predictions />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/live-tracking"
          element={<LiveTracking />}
        />

        <Route
          path="/referee"
          element={<Referee />}
        />

        <Route
          path="/spectator"
          element={<Spectator />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;