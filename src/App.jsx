import React from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

// Pages
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Home from "./pages/Home";
import Ruleta from "./pages/Ruleta";
import Livestreams from "./pages/Livestreams";
import Dashboard from "./pages/dashboard";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import Pricing from "./pages/Pricing";
import Promocion from "./pages/Promocion";
import Tutorial from "./pages/Tutorial";
import Bracket from "./pages/Bracket";
import LoginSuccess from "./pages/LoginSuccess";

export default function App() {
  return (
    <>
      {/* Siempre vuelve al top al cambiar de ruta */}
      <ScrollToTop />

      {/* Header global */}
      <Header />

      <Routes>
        {/* Home (con Preloader dentro del Home.jsx) */}
        <Route path="/" element={<Home />} />

        {/* Pagos */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* Auth */}
        <Route path="/login-success" element={<LoginSuccess />} />

        {/* Páginas */}
        <Route path="/ruleta" element={<Ruleta />} />
        <Route path="/livestreams" element={<Livestreams />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/promocion" element={<Promocion />} />
        <Route path="/bracket" element={<Bracket />} />
        <Route path="/tutorialtspc" element={<Tutorial />} />

        {/* Torneos */}
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
      </Routes>
    </>
  );
}
