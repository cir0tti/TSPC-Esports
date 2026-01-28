import React from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Ruleta from "./pages/Ruleta";
import Livestreams from "./pages/Livestreams";
import Pricing from "./pages/Pricing";
import LoginSuccess from "./pages/LoginSuccess";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ruleta" element={<Ruleta />} />
        <Route path="/livestreams" element={<Livestreams />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login-success" element={<LoginSuccess />} />
      </Routes>
    </>
  );
}