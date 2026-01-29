import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Preloader from "./components/Preloader";

import Home from "./pages/Home";
import Ruleta from "./pages/Ruleta";
import Livestreams from "./pages/Livestreams";
import Pricing from "./pages/Pricing";
import LoginSuccess from "./pages/LoginSuccess";

export default function App() {
  const [booting, setBooting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fromLogin = localStorage.getItem("tspc:fromLogin");

    if (fromLogin === "true") {
      setBooting(true);
      setReady(false);

      // 🔥 consumir flag (NO vuelve a disparar)
      localStorage.removeItem("tspc:fromLogin");
    } else {
      setReady(true);
    }
  }, []);

  return (
    <>
      <ScrollToTop />

      {/* 🔐 ESCANEO SOLO POST-LOGIN */}
      {booting && (
        <Preloader
          onFinish={() => {
            setBooting(false);
            setReady(true);
          }}
        />
      )}

      {/* 🌍 APP NORMAL */}
      {ready && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ruleta" element={<Ruleta />} />
            <Route path="/livestreams" element={<Livestreams />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login-success" element={<LoginSuccess />} />
          </Routes>
        </>
      )}
    </>
  );
}
