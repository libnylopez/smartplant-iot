import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Historial from "./pages/Historial";
import Riegos from "./pages/Riegos";
import Alertas from "./pages/Alertas";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/historial"
          element={<Historial />}
        />

        <Route
          path="/riegos"
          element={<Riegos />}
        />

        <Route
          path="/alertas"
          element={<Alertas />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;