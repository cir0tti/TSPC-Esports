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
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Promocion from "./pages/Promocion";
import Bracket from "./pages/Bracket";
import LoginSuccess from "./pages/LoginSuccess";

export default function App() {
  const [booting, setBooting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fromLogin = localStorage.getItem("tspc:fromLogin");

    if (fromLogin === "true") {
      setBooting(true);
      setReady(false);

      // consumir flag (no se repite)
      localStorage.removeItem("tspc:fromLogin");
    } else {
      setReady(true);
    }
  }, []);

  return (
    <>
      <ScrollToTop />

      {/* 🔥 PRELOADER SOLO POST LOGIN */}
      {booting && (
        <Preloader
          onFinish={() => {
            setBooting(false);
            setReady(true);
          }}
        />
      )}

      {/* HEADER SOLO CUANDO LA APP ESTÁ LISTA */}
      {ready && <Header />}

      {/* 🚨 RUTAS STRIPE SIEMPRE DISPONIBLES */}
<Routes>
  <Route path="/success" element={<Success />} />
  <Route path="/cancel" element={<Cancel />} />

  {ready ? (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/ruleta" element={<Ruleta />} />
      <Route path="/livestreams" element={<Livestreams />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/promocion" element={<Promocion />} />
      <Route path="/bracket" element={<Bracket />} />
      <Route path="/login-success" element={<LoginSuccess />} />
    </>
  ) : (
    <Route path="*" element={null} />
  )}
</Routes>
    </>
  );
}
