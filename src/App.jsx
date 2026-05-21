import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tournament from "./pages/Tournament";
import Horses from "./pages/Horses";
import LiveRace from "./pages/LiveRace";
import Leaderboard from "./pages/Leaderboard";
import Predictions from "./pages/Predictions";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/tournaments" element={<Tournament />} />

        <Route path="/horses" element={<Horses />} />

        <Route path="/live-races" element={<LiveRace />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route path="/predictions" element={<Predictions />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;