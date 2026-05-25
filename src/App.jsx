import Horses from "./pages/Horses";
import Tournaments from "./pages/Tournaments";
import Jockeys from "./pages/Jockeys";
import Predictions from "./pages/Predictions";
import Leaderboard from "./pages/Leaderboard";
import LiveTracking from "./pages/LiveTracking";
import Referee from "./pages/Referee";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;