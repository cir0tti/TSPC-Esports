import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Preloader from "./components/Preloader";

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
  const [booting, setBooting] = useState(false);
  const [ready, setReady] = useState(false);

  // Detectamos cuando venimos desde el login de Discord
  useEffect(() => {
    const fromLogin = localStorage.getItem("tspc:fromLogin");

    if (fromLogin === "true" && !booting) {
      setBooting(true);
      setReady(false);
      localStorage.removeItem("tspc:fromLogin");
    } else if (!fromLogin) {
      setReady(true); // Si no venimos de un login, activamos la app
    }
  }, [booting]);

  return (
    <>
      <ScrollToTop />

      {/* Preloader solo si viene de login */}
      {booting && (
        <Preloader
          onFinish={() => {
            setBooting(false);
            setReady(true);
          }}
        />
      )}

      {ready && <Header />}

      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/login-success" element={<LoginSuccess />} />

        {ready ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/ruleta" element={<Ruleta />} />
            <Route path="/livestreams" element={<Livestreams />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/promocion" element={<Promocion />} />
            <Route path="/bracket" element={<Bracket />} />
            <Route path="/tutorialtspc" element={<Tutorial />} />
            <Route path="/tournaments" element={<Tournaments />} /> {/* Ruta para los torneos */}
            <Route path="/tournament/:id" element={<TournamentDetails />} />
          </>
        ) : (
          <Route path="*" element={null} />
        )}
      </Routes>
    </>
  );
}
