import Tournaments from "./pages/Tournaments";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;