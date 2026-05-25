import Horses from "./pages/Horses";
import Tournaments from "./pages/Tournaments";
import Jockeys from "./pages/Jockeys";
import Predictions from "./pages/Predictions";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;