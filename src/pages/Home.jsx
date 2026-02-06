import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Preloader from "../components/Preloader";
import gsap from "gsap";
import { useAuth } from "../context/AuthContext";
import UserMenu from "../components/UserMenu";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "../data/testimonials";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const staff = [
  { name: "Skull", role: "Founder", avatar: "/staff/skull.jpg", color: "#7B2CFF" },
  { name: "Pr3dator", role: "Founder", avatar: "/staff/predator.png", color: "#FF7A00" },
  { name: "Chucci", role: "Founder", avatar: "/staff/chucci.jpg", color: "#00FFA2" },
  { name: "Cirotti", role: "Developer", avatar: "/staff/cirotti.png" },
];

export default function Home() {
  const token = localStorage.getItem("tspc_token");
  const isMobile = window.innerWidth < 768;
  const { user, logout } = useAuth();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ENABLE_PRELOADER = false;

  const [loaded, setLoaded] = useState(false);
const [showPage, setShowPage] = useState(true);



useEffect(() => {
  const move = (e) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);

  const bgX = useTransform(mouseX, [-500, 500], [-40, 40]);
  const bgY = useTransform(mouseY, [-500, 500], [-30, 30]);
  const coreX = useTransform(mouseX, [-500, 500], [-12, 12]);
  const coreY = useTransform(mouseY, [-500, 500], [-12, 12]);
return (
  <>
    {/* 🚀 PRELOADER */}
{ENABLE_PRELOADER && !preloaderDone && (
  <Preloader
    onFinish={() => {
      sessionStorage.setItem("tspc:preloaderPlayed", "true");
      setPreloaderDone(true);
    }}
  />
)}

    {/* 🌍 HOME */}
    {showPage && (
      <main className="transition-opacity duration-700 opacity-100">

{/* HERO – GOD MODE ELITE (PRO / SOBRIO / IMPACTANTE) */}

    <section className="relative min-h-[100svh] overflow-hidden bg-black px-6 sm:px-10 md:px-24 pt-28 md:pt-32 flex items-center perspective-[1600px]">

{/* ================= BACKGROUND SYSTEM ================= */}
<div className="absolute inset-0">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF66,transparent_55%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#FF7A0040,transparent_60%)]" />
  <div className="absolute inset-0 opacity-[0.045] bg-[url('/noise.png')] mix-blend-overlay" />
</div>


      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      {/* ================= MAIN CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >

        {/* STATUS */}
        <div className="flex items-center gap-4 mb-12">
          <span className="px-4 py-1.5 border border-[#7B2CFF] text-[#7B2CFF] text-[11px] uppercase tracking-[0.35em] backdrop-blur-md">
            Registro Abierto
          </span>
          <span className="px-4 py-1.5 bg-red-500 text-black text-[11px] font-black uppercase tracking-[0.35em] shadow-[0_0_30px_rgba(255,0,0,0.9)] animate-pulse">
            LIVE
          </span>
        </div>

        {/* TITLE */}
        <h1 className="font-['Orbitron'] font-extrabold leading-[0.95] tracking-[0.22em] text-[clamp(2.8rem,6vw,6rem)]">

          <span className="block text-white/40 text-sm tracking-[0.6em] mb-5">
            TSPC Esports
          </span>

          <span className="relative block">
            <span className="absolute inset-0 text-[#7B2CFF] blur-2xl opacity-70 animate-coreBreath">
              WARZONE
            </span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#7B2CFF] via-white to-[#FF7A00]">
              WARZONE
            </span>
          </span>

          <span className="block mt-4 text-white/80 text-[clamp(1.8rem,4vw,3rem)] tracking-[0.45em]">
            CUP
          </span>
        </h1>

        {/* DIVIDER */}
        <div className="mt-10 h-[2px] w-64 bg-gradient-to-r from-transparent via-[#7B2CFF] to-transparent" />

        {/* DESCRIPTION */}
        <p className="text-gray-300 mt-10 max-w-xl text-base sm:text-lg leading-relaxed">
          Torneos competitivos de Warzone con producción profesional,
          ranking real, anti-cheat activo y equipos élite de LATAM.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
          {[
            ["Prize Pool", "$1,000"],
            ["Equipos", "28 / 32"],
            ["Modo", "Trios"],
            ["Región", "LATAM"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="relative p-6 text-center rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#7B2CFF]/60 transition-all duration-500 hover:-translate-y-1"
            >
              <span className="text-gray-400 text-[10px] tracking-[0.4em] uppercase">
                {label}
              </span>
              <p className="text-[#7B2CFF] font-black text-xl sm:text-2xl mt-2 drop-shadow-[0_0_25px_rgba(123,44,255,0.7)]">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-6 mt-20">
          <Link
            to="/tutorialtspc"
            className="relative px-14 py-4 font-black uppercase tracking-[0.35em] text-black rounded-md overflow-hidden group text-center"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] group-hover:scale-110 transition-transform" />
            <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.7),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700" />
            <span className="relative z-10">Tutorial</span>
          </Link>

          <Link
            to="/livestreams"
            className="px-14 py-4 border border-white/20 text-white uppercase tracking-[0.35em] rounded-md hover:border-[#FF7A00] hover:text-[#FF7A00] transition text-center"
          >
            Ver en vivo
          </Link>
        </div>
      </motion.div>

{/* ================= RIGHT CORE ================= */}
<div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
  <div className="relative w-[460px] h-[460px]">

    {/* 🔥 RADAR QUE SE MUEVE */}
    <motion.div
      style={{ x: coreX, y: coreY }}
      className="absolute inset-0"
    >

      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7B2CFF]/40 via-transparent to-[#FF7A00]/30 blur-[160px]" />

      <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slower" />
      <div className="absolute inset-12 rounded-full border border-[#7B2CFF]/40 animate-spin-reverse-slow" />

      <div className="absolute inset-24 rounded-full bg-black/80 backdrop-blur-xl border border-[#7B2CFF]/60 shadow-[0_0_140px_rgba(123,44,255,1)]" />

      <div className="absolute inset-36 rounded-full border border-[#FF7A00]/40 animate-pulse" />

      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_40px_rgba(255,0,0,1)] animate-ping" />

    </motion.div>

  </div>
</div>
    </section>


{/* LIVE EXPERIENCE — GOD MODE */}
<section className="relative px-8 md:px-24 py-44 bg-black overflow-hidden">

  {/* CINEMATIC BACKGROUND */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7B2CFF25,transparent_70%)]" />
  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,black_70%)]" />
  <div className="absolute inset-0 opacity-[0.035] bg-[url('/noise.png')]" />

  {/* MOVING SCANLINES */}
  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] animate-scanlines" />

  {/* ENERGY BLOBS */}
  <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-[#7B2CFF]/30 blur-[220px] rounded-full animate-pulse-slow" />
  <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#FF7A00]/25 blur-[200px] rounded-full animate-pulse-slower" />

  {/* CONTENT */}
  <motion.div
    className="relative z-10 max-w-7xl mx-auto"
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-120px" }}
    transition={{ duration: 1, ease: "easeOut" }}
  >

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-6xl font-black text-center mb-6 tracking-tight"
    >
      EXPERIENCIA{" "}
      <span className="relative text-[#7B2CFF]">
        LIVE MATCH
        <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00]" />
      </span>
    </motion.h2>

    {/* DESCRIPTION */}
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-gray-400 text-center max-w-2xl mx-auto mb-24"
    >
      Producción en tiempo real con overlays avanzados, estadísticas
      reactivas y transmisión de nivel competitivo profesional.
    </motion.p>

    {/* HUD GRID */}
    <motion.div
      className="grid md:grid-cols-3 gap-12 perspective-[1200px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {[
        ["LIVE KILLS", "124", "Actualización en tiempo real"],
        ["PLAYERS", "84", "En partida activa"],
        ["MATCH TIME", "22:41", "Zona final"],
      ].map(([title, value, desc]) => (
        <motion.div
          key={title}
          variants={{
            hidden: {
              opacity: 0,
              y: 60,
              rotateX: -12,
            },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
          className="group relative p-10 bg-black/45 border border-white/10 backdrop-blur-2xl
          transform-gpu transition-all duration-700
          hover:rotate-x-[6deg] hover:-translate-y-3 hover:border-[#7B2CFF]/60"
        >

          {/* GLOW FRAME */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700
          bg-[linear-gradient(120deg,transparent,rgba(123,44,255,0.25),transparent)]" />

          {/* TITLE */}
          <span className="relative z-10 text-xs tracking-[0.35em] uppercase text-gray-400">
            {title}
          </span>

          {/* VALUE */}
          <motion.p
            className="relative z-10 text-6xl font-black text-[#7B2CFF] mt-6
            drop-shadow-[0_0_30px_rgba(123,44,255,0.75)]
            animate-valuePulse"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {value}
          </motion.p>

          {/* DESC */}
          <p className="relative z-10 text-gray-400 mt-4 text-sm">
            {desc}
          </p>

          {/* ENERGY LINE */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0
          bg-gradient-to-r from-[#7B2CFF] via-[#FF7A00] to-[#7B2CFF]
          group-hover:w-full transition-all duration-1000" />

          {/* GLITCH */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
          mix-blend-screen bg-[url('/glitch.png')] bg-cover transition duration-300" />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</section>



<section className="relative py-32 md:py-48 overflow-hidden bg-black">

  {/* BACKGROUND */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#8B5CFF55,transparent_55%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#FF7A0040,transparent_60%)]" />
    <div className="absolute inset-0 opacity-[0.07] bg-[url('/noise.png')] mix-blend-overlay" />
  </div>

  {/* ENERGY */}
  <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#8B5CFF]/40 blur-[260px] rounded-full animate-pulse-slow" />
  <div className="absolute bottom-[-240px] right-1/4 w-[700px] h-[700px] bg-[#FF7A00]/35 blur-[320px] rounded-full animate-pulse-slow" />

  <div className="relative max-w-7xl mx-auto px-6">

    {/* TITLE */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-160px" }}
      transition={{ duration: 0.5, ease: "linear" }}
      className="text-center mb-24 md:mb-32"
    >
      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.55em] text-[#8B5CFF] mb-5">
        Validado por la Comunidad Competitiva
      </p>

      <h2 className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-widest leading-tight">
        La Plataforma en la que
        <span className="block mt-4 text-transparent bg-clip-text
          bg-gradient-to-r from-[#8B5CFF] via-white to-[#FF7A00]
          drop-shadow-[0_0_60px_rgba(139,92,255,1)]">
          Confían las Mejores Comunidades de Warzone
        </span>
      </h2>

      <p className="mt-8 md:mt-10 max-w-3xl mx-auto text-white/60 text-sm md:text-base">
        No es marketing. Es reputación construida torneo tras torneo.
      </p>

      <div className="mt-12 mx-auto h-[2px] w-56
        bg-gradient-to-r from-transparent via-[#8B5CFF] to-transparent" />
    </motion.div>

    {/* GRID */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

  {testimonials.map((t, i) => (
    <div
      key={i}
      className="group relative rounded-[2.5rem]
        p-10 md:p-14
        bg-black/70 backdrop-blur-2xl
        border border-white/10
        transform-gpu
        transition-all duration-700 ease-out
        hover:-translate-y-4
        hover:border-[#8B5CFF]/80
        hover:shadow-[0_0_120px_rgba(139,92,255,0.6)]"
    >

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit]
        opacity-0 group-hover:opacity-100
        transition-opacity duration-700
        bg-[linear-gradient(135deg,transparent,rgba(139,92,255,0.45),transparent)]" />

      {/* QUOTE */}
      <div className="absolute -top-8 -left-8
        w-16 h-16 rounded-full
        bg-gradient-to-br from-[#8B5CFF] to-[#FF7A00]
        flex items-center justify-center
        text-black text-4xl font-black
        shadow-[0_0_70px_rgba(139,92,255,1)]">
        “
      </div>

      {/* TEXT */}
      <p className="relative z-10 text-white/95 mb-10 leading-relaxed text-base md:text-lg">
        {t.text}
      </p>

      {/* USER */}
      <div className="relative z-10 flex items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl
            bg-gradient-to-br from-[#8B5CFF] to-[#FF7A00]" />
          <div className="relative w-14 h-14 rounded-full bg-black
            flex items-center justify-center
            font-extrabold text-lg">
            {t.initial}
          </div>
        </div>

        <div>
          <p className="font-bold tracking-wide text-base">
            {t.name}
          </p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5CFF]">
            {t.role}
          </p>
        </div>
      </div>

    </div>
  ))}
</div>

  </div>
</section>





<section className="relative py-28 md:py-40 overflow-hidden">

  {/* ===== ATMOSFERA WARZONE ===== */}
  <div className="absolute inset-0 bg-black" />

  {/* Radar glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(123,44,255,0.35),transparent_55%)]" />
  <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F1F] via-black to-black opacity-90" />

  {/* Noise */}
  <div className="absolute inset-0 opacity-[0.06] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

  {/* Mega glow */}
  <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] bg-[#7B2CFF]/30 blur-[300px] rounded-full" />

  {/* ===== CONTENIDO ===== */}
  <div className="relative max-w-5xl mx-auto px-6 text-center">

    <div className="relative rounded-[2rem] p-8 md:p-14 bg-black/60 backdrop-blur-2xl border border-white/10
    shadow-[0_0_120px_rgba(123,44,255,0.35)] overflow-hidden">

      {/* HUD lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] text-[#7B2CFF]/60">
          STATUS: READY
        </div>
        <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] text-[#7B2CFF]/60">
          MODE: WARZONE
        </div>
        <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] text-[#7B2CFF]/60">
          REGION: LATAM
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] text-[#7B2CFF]/60">
          BUILD: v1.0
        </div>
      </div>

      {/* EYEBROW */}
      <span className="inline-flex items-center gap-2 mb-8 px-5 py-2 text-[11px]
      uppercase tracking-[0.4em] text-[#7B2CFF]
      border border-[#7B2CFF]/40 rounded-full bg-[#7B2CFF]/10">
        DEPLOYMENT ACCESS
      </span>

<h2 className="
text-[clamp(1.7rem,6vw,3.2rem)]
sm:text-[clamp(2.2rem,5vw,3.6rem)]
font-extrabold
mb-6
leading-tight
text-balance
">
¿Listo para dominar los{" "}
<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2CFF] via-white to-[#7B2CFF]">
torneos
</span>
<br className="hidden sm:block" />
como un profesional?
</h2>

      {/* DESCRIPTION */}
      <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-14">
        Eleva tus eventos de Warzone al nivel competitivo real. Rankings avanzados,
        estadísticas precisas y una experiencia que se siente como entrar a partida.
      </p>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">

        {/* PRIMARY */}
        <button
          className="group relative px-12 py-4 rounded-xl bg-[#7B2CFF] text-black
          font-black uppercase tracking-[0.3em]
          shadow-[0_0_60px_rgba(123,44,255,0.7)]
          overflow-hidden transition-all duration-300
          hover:scale-[1.03] hover:bg-[#8F4BFF]"
        >
          <Link to="/pricing">
  <span className="relative z-10 cursor-pointer hover:text-orange-400 transition">
    Ver planes
  </span>
</Link>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>

        {/* SECONDARY */}
        <button
          className="px-12 py-4 rounded-xl border border-white/20
          uppercase tracking-[0.3em] font-semibold
          text-white/80 transition-all duration-300
          hover:border-[#7B2CFF] hover:text-[#7B2CFF] hover:shadow-[0_0_40px_rgba(123,44,255,0.35)]"
        >
          Agendar demo
        </button>

      </div>
    </div>
  </div>
</section>



{/* EXPERIENCE — GOD TIER */}
<section className="relative px-8 md:px-24 py-40 bg-[#07070a] overflow-hidden">

  {/* AMBIENT FX */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7B2CFF18,transparent_65%)]" />
  <div className="absolute inset-0 opacity-[0.035] bg-[url('/noise.png')]" />

  {/* SUBTLE ENERGY FLOW */}
  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(123,44,255,0.06),transparent)] animate-energyFlow" />

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* GRID */}
    <div className="grid md:grid-cols-4 gap-16 text-center perspective-[1400px]">

      {[
        ["+120", "Equipos"],
        ["LATAM", "Región"],
        ["LIVE", "Broadcast"],
        ["$10K+", "Premios"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="group relative transform-gpu transition-all duration-700
          hover:-translate-y-4 hover:rotate-x-[6deg]"
        >

          {/* BACKPLATE */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100
          transition duration-700
          bg-[radial-gradient(circle_at_center,rgba(123,44,255,0.25),transparent_70%)] blur-xl" />

          {/* VALUE */}
          <p className="relative text-6xl md:text-7xl font-black text-[#7B2CFF]
          drop-shadow-[0_0_35px_rgba(123,44,255,0.8)]
          animate-statPulse">
            {value}
          </p>

          {/* DIVIDER */}
          <div className="mx-auto mt-4 h-[2px] w-10 bg-gradient-to-r from-transparent via-[#7B2CFF] to-transparent
          group-hover:w-20 transition-all duration-700" />

          {/* LABEL */}
          <span className="block mt-4 text-gray-400 uppercase tracking-[0.35em] text-xs">
            {label}
          </span>

          {/* MICRO GLOW DOT */}
          <span className="absolute top-2 right-1/2 translate-x-1/2 w-2 h-2 rounded-full
          bg-[#7B2CFF] opacity-0 group-hover:opacity-100
          shadow-[0_0_12px_rgba(123,44,255,1)]
          transition duration-500" />
        </div>
      ))}

    </div>
  </div>
</section>

      


{/* FOOTER */}
<footer className="relative mt-40 bg-black overflow-hidden border-t border-white/10">

  {/* BACKGROUND FX */}
  <div className="absolute inset-0 pointer-events-none">
    {/* GLOW CENTRAL */}
    <div className="absolute -bottom-64 left-1/2 -translate-x-1/2
      w-[1000px] h-[1000px] bg-[#7B2CFF]/25 blur-[300px] rounded-full" />

    {/* GLOW SECUNDARIO */}
    <div className="absolute top-[-200px] right-[-200px]
      w-[500px] h-[500px] bg-[#FF7A00]/10 blur-[220px] rounded-full" />

    {/* LINEA ENERGÉTICA */}
    <div className="absolute top-0 left-0 w-full h-px
      bg-gradient-to-r from-transparent via-[#7B2CFF]/50 to-transparent" />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 md:px-24 py-28">

    {/* HEADER ENDGAME */}
    <div className="text-center mb-24">
      <p className="text-[10px] tracking-[0.5em] text-white/40 mb-4">
        MATCH COMPLETED
      </p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-widest">
        TSPC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#7B2CFF]">ENDGAME</span>
      </h2>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-16">

      {/* BRAND */}
      <div className="md:col-span-2">
        <h3 className="text-2xl font-bold tracking-widest mb-4">
          TSPC <span className="text-[#7B2CFF]">ESPORTS</span>
        </h3>

        <p className="text-white/50 text-sm leading-relaxed max-w-md">
          Plataforma competitiva profesional para torneos de Warzone en LATAM.
          Donde se juega serio, se compite duro y se construye legado.
        </p>

        {/* SYSTEM STATUS */}
        <div className="mt-8 flex items-center gap-3 text-xs tracking-widest">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFA2]/60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFA2]" />
          </span>
          <span className="text-white/60">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* PLATAFORMA */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-white/60 mb-5">
          Plataforma
        </h4>
        <ul className="space-y-3 text-sm">
          {["Torneos","Rankings","Equipos","Livestreams"].map(item => (
            <li
              key={item}
              className="cursor-pointer text-white/50 hover:text-[#7B2CFF] transition"
            >
              ▸ {item}
            </li>
          ))}
        </ul>
      </div>

      {/* COMPETITIVO */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-white/60 mb-5">
          Competitivo
        </h4>
        <ul className="space-y-3 text-sm">
          {["Reglamento","Soporte","Staff","Ruleta"].map(item => (
            <li
              key={item}
              className="cursor-pointer text-white/50 hover:text-[#FF7A00] transition"
            >
              ▸ {item}
            </li>
          ))}
        </ul>
      </div>

      {/* COMUNIDAD */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-white/60 mb-5">
          Comunidad
        </h4>
        <ul className="space-y-3 text-sm">
          {["Discord","Instagram","Twitter / X","YouTube"].map(item => (
            <li
              key={item}
              className="cursor-pointer text-white/50 hover:text-[#00FFA2] transition"
            >
              ▸ {item}
            </li>
          ))}
        </ul>
      </div>

    </div>

    {/* CTA FINAL */}
    <div className="mt-28 flex flex-col items-center gap-6">
      <button
        onClick={() => (window.location.href = "/pricing")}
        className="px-12 py-5 text-sm uppercase tracking-[0.35em] font-extrabold
        rounded-2xl text-black
        bg-gradient-to-r from-[#FF7A00] to-[#7B2CFF]
        hover:scale-110 transition
        shadow-[0_0_60px_#7B2CFF66]"
      >
        Enter Competitive Lobby
      </button>

      <button
        onClick={() => (window.location.href = "")}
        className="text-xs uppercase tracking-widest text-white/60
        hover:text-[#7B2CFF] transition"
      >
        Login with Discord
      </button>
    </div>

    {/* DIVIDER */}
    <div className="mt-24 border-t border-white/10" />

    {/* BOTTOM */}
    <div className="mt-6 flex flex-col md:flex-row justify-between items-center
      gap-4 text-white/40 text-xs tracking-widest">
      <span>© 2026 TSPC Esports. All rights reserved.</span>
      <span className="uppercase">Developed by Cirotti</span>
    </div>

  </div>
</footer>


      </main>
    )}
  </>
);
}