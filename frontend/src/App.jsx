import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login";
import Register from "./register";
import LandingPage from "./landin";

/**
 * App.jsx — Punto principal de la aplicación
 *
 * Rutas:
 * /            → Landing principal
 * /login       → Inicio de sesión
 * /register    → Registro
 */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Registro */}
        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>
    </BrowserRouter>
  );
}