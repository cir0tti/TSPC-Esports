import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
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

  const [loaded, setLoaded] = useState(!!token);
  const [showPage, setShowPage] = useState(!!token);
  const [menuOpen, setMenuOpen] = useState(false);



  useEffect(() => {
    // 👉 SI VIENE LOGEADO, NO EJECUTAR PRELOADER NI GSAP
    if (token) return;

  /* ---------------- LENIS ---------------- */
  const lenis = new Lenis({ smoothWheel: true, duration: 1.15 });

  let lenisRaf;
  const raf = (time) => {
    lenis.raf(time);
    lenisRaf = requestAnimationFrame(raf);
  };
  lenisRaf = requestAnimationFrame(raf);

/* ---------------- PRELOADER : ESCANEO DE ACCESO ---------------- */
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

tl
  // Encendido
  .fromTo(".preloader", { opacity: 0 }, { opacity: 1, duration: 0.4 })

  // Logo
  .fromTo(
    ".pre-logo",
    { scale: 0.35, opacity: 0, filter: "blur(20px)" },
    { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.4 }
  )

  // Anillos
  .fromTo(".ring-outer", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=1")
  .fromTo(".ring-inner", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.8")

  // HUD
  .fromTo(".hud", { opacity: 0 }, { opacity: 1, duration: 0.4 })

  // Texto inicial
  .fromTo(
    ".pre-text",
    { opacity: 0, y: 14 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      onStart: () => {
        document.querySelector(".pre-text").innerText =
          "ESCANEANDO CREDENCIALES";
      },
    }
  )

  // ESCÁNER BIOMÉTRICO
  .fromTo(
    ".scanner-line",
    { y: "-120%", opacity: 0 },
    {
      y: "120%",
      opacity: 1,
      duration: 1.4,
      ease: "linear",
      repeat: 1,
      yoyo: true,
    },
    "+=0.4"
  )

  // VALIDACIÓN
  .to(".pre-text", {
    duration: 0.4,
    onStart: () => {
      document.querySelector(".pre-text").innerText =
        "VALIDANDO ACCESO";
    },
  })

  // ACCESO CONCEDIDO
  .to(".pre-text", {
    duration: 0.4,
    delay: 0.6,
    onStart: () => {
      document.querySelector(".pre-text").innerText =
        "ACCESO CONCEDIDO";
    },
  })

  // Pulso de aprobación
  .to(".pre-logo", {
    scale: 1.12,
    duration: 0.45,
    boxShadow: "0 0 90px #22d3ee",
  })

  // SALIDA – DESPLIEGUE
  .to(".preloader", {
    opacity: 0,
    scale: 1.35,
    filter: "blur(18px)",
    duration: 0.9,
    ease: "power4.in",
    onComplete: () => {
      setLoaded(true);
      setTimeout(() => setShowPage(true), 60);
    },
  });

  return () => {
    cancelAnimationFrame(lenisRaf);
    lenis.destroy();
  };
}, [token]);


  /* ---------------- PRELOADER ---------------- */
if (!loaded) {
  return (
    <div className="preloader fixed inset-0 bg-black z-[9999] overflow-hidden flex items-center justify-center">

      {/* SCANLINES */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="scanlines"></div>
      </div>

      {/* LÍNEA DE ESCÁNER */}
      <div className="scanner-line absolute inset-x-0 h-[3px]
                      bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                      opacity-70" />

      {/* HUD */}
      <div className="hud absolute inset-0 text-[10px] tracking-widest text-white/40 font-semibold pointer-events-none">
        <span className="absolute top-6 left-6">NODO: TSPC</span>
        <span className="absolute top-6 right-6">SEGURIDAD: ACTIVA</span>
        <span className="absolute bottom-6 left-6">PROTOCOLO: WARZONE</span>
        <span className="absolute bottom-6 right-6">ESTADO: VERIFICANDO</span>
      </div>

      {/* NÚCLEO */}
      <div className="relative flex flex-col items-center">

        {/* ANILLOS */}
        <div className="ring-outer absolute w-64 h-64 rounded-full border border-fuchsia-500/25 animate-spin-slow" />
        <div className="ring-inner absolute w-44 h-44 rounded-full border border-cyan-400/40 animate-spin-reverse" />

        {/* LOGO */}
        <img
          src="/tspc-logo.jpg"
          className="pre-logo w-36 relative z-10
                     drop-shadow-[0_0_55px_#22d3ee]"
        />

        {/* TEXTO */}
        <span className="pre-text mt-10 text-[11px] tracking-[0.45em]
                         text-cyan-400 uppercase font-semibold">
          INICIALIZANDO SISTEMA
        </span>
      </div>
    </div>
  );
}

  return (
    <main
      className={`bg-[#050507] text-white overflow-x-hidden font-['Rajdhani'] transition-opacity duration-700 ${
        showPage ? "opacity-100" : "opacity-0"
      }`}
    >
{/* HEADER */}
<header className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-black/60 border-b border-white/10">
  <div className="relative flex items-center px-6 md:px-24 h-16">

    {/* LOGO */}
    <img src="/tspc-logo.jpg" className="w-24" alt="TSPC Logo" />

{/* NAV DESKTOP — COMMAND BAR */}
<nav
  className="hidden md:flex items-center gap-10
  px-10 py-3
  absolute left-1/2 -translate-x-1/2
  rounded-full
  bg-black/40 backdrop-blur-xl
  border border-white/10
  shadow-[0_0_40px_rgba(0,0,0,0.6)]
"
>
  {[
    { label: "Torneos", color: "#7B2CFF" },
    { label: "Rankings", color: "#7B2CFF" },
    { label: "Equipos", color: "#7B2CFF" },
    { label: "Livestreams", to: "/livestreams", color: "#FF7A00" },
    { label: "Ruleta", to: "/ruleta", color: "#00FFA2" },
  ].map(({ label, to, color }) => {
    const Tag = to ? Link : "a"
    return (
      <Tag
        key={label}
        to={to}
        className="relative group text-xs uppercase tracking-[0.32em] text-white/70 transition"
      >
        {/* TEXT */}
        <span className="relative z-10 group-hover:text-white">
          {label}
        </span>

        {/* UNDERLINE ENERGY */}
        <span
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[2px] w-0
          group-hover:w-6 transition-all duration-500"
          style={{ backgroundColor: color }}
        />

        {/* HOVER GLOW */}
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
          blur-lg transition duration-500"
          style={{ backgroundColor: `${color}20` }}
        />
      </Tag>
    )
  })}
</nav>


    {/* DERECHA */}
    <div className="ml-auto flex items-center gap-6">

      {/* STAFF ICONS */}
      <div className="hidden lg:flex items-center gap-2 relative">
        {staff.map((member) => (
          <div
            key={member.name}
            className="staff-icon group"
            style={{ "--glow": member.color }}
          >
            <img src={member.avatar} alt={member.name} />
            <div className="staff-tooltip">
              <p className="staff-name">{member.name}</p>
              <span className="staff-role">{member.role}</span>
            </div>
          </div>
        ))}
      </div>

{/* BUY — PRIMARY CTA */}
<Link to="/pricing" className="hidden md:block">
  <button
    className="relative group px-8 py-3
    font-black uppercase tracking-[0.32em]
    text-black rounded-md
    bg-[#FF7A00]
    shadow-[0_0_35px_rgba(255,122,0,0.45)]
    transition-all duration-500
    hover:shadow-[0_0_60px_rgba(255,122,0,0.85)]
    hover:-translate-y-[1px]"
  >
    {/* GLOW AURA */}
    <span className="absolute inset-0 rounded-md bg-[#FF7A00]/50 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

    {/* ENERGY LINE */}
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0
    bg-gradient-to-r from-transparent via-black to-transparent
    group-hover:w-2/3 transition-all duration-700" />

    {/* TEXT */}
    <span className="relative z-10">
      Buy
    </span>
  </button>
</Link>

{/* LOGIN — SECONDARY CTA */}
<button
  onClick={() => (window.location.href = "http://localhost:5000/auth/discord")}
  className="hidden md:block relative group px-7 py-3
  font-semibold uppercase tracking-[0.32em]
  text-white rounded-md
  border border-white/20
  bg-black/40 backdrop-blur-md
  transition-all duration-500
  hover:border-[#7B2CFF]/60
  hover:text-[#7B2CFF]"
>
  {/* INNER GLOW */}
  <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100
  bg-[radial-gradient(circle_at_center,rgba(123,44,255,0.25),transparent_70%)]
  transition duration-500" />

  {/* TEXT */}
  <span className="relative z-10">
    Login
  </span>
</button>

      {/* HAMBURGER MOBILE */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden text-white text-3xl z-50"
      >
        ☰
      </button>

    </div>
  </div>
</header>

{/* MENU MOBILE PRO */}
{menuOpen && (
  <div
    className="fixed inset-0 z-[999] bg-gradient-to-br from-black via-[#120016] to-black
    backdrop-blur-2xl flex flex-col items-center justify-center px-6"
  >

    {/* CLOSE */}
    <button
      onClick={() => setMenuOpen(false)}
      className="absolute top-6 right-6 text-white text-3xl hover:text-[#7B2CFF] transition"
    >
      ✕
    </button>

    {/* LOGO */}
    <img
      src="/tspc-logo.jpg"
      className="w-28 mb-10 drop-shadow-[0_0_25px_rgba(123,44,255,0.6)]"
      alt="TSPC"
    />

    {/* LINKS */}
    <nav className="flex flex-col gap-6 text-center uppercase tracking-[0.35em] text-sm text-white/80">
      <a onClick={() => setMenuOpen(false)} href="#" className="hover:text-[#7B2CFF] transition">
        Torneos
      </a>
      <a onClick={() => setMenuOpen(false)} href="#" className="hover:text-[#7B2CFF] transition">
        Rankings
      </a>
      <a onClick={() => setMenuOpen(false)} href="#" className="hover:text-[#7B2CFF] transition">
        Equipos
      </a>

      <Link
        to="/livestreams"
        onClick={() => setMenuOpen(false)}
        className="hover:text-[#FF7A00] transition"
      >
        Livestreams
      </Link>

      <Link
        to="/ruleta"
        onClick={() => setMenuOpen(false)}
        className="hover:text-[#00FFA2] transition"
      >
        Ruleta
      </Link>
    </nav>

    {/* ACTIONS */}
    <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">

      {/* BUY MOBILE */}
      <button
        onClick={() => {
          setMenuOpen(false);
          window.location.href = "/buy";
        }}
        className="w-full py-4 rounded-xl font-extrabold uppercase tracking-[0.3em]
        text-black bg-gradient-to-r from-[#FF7A00] via-[#FFB347] to-[#7B2CFF]
        shadow-[0_0_40px_rgba(255,122,0,0.7)]
        hover:scale-[1.05]
        transition-all duration-300"
      >
        Buy
      </button>

      {/* LOGIN MOBILE */}
      <button
        onClick={() => {
          setMenuOpen(false);
          window.location.href = "http://localhost:5000/auth/discord";
        }}
        className="w-full py-4 rounded-xl font-bold uppercase tracking-[0.3em]
        bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00]
        hover:shadow-[0_0_30px_rgba(123,44,255,0.7)]
        hover:scale-[1.05]
        transition-all duration-300"
      >
        Login
      </button>

    </div>

    {/* FOOTER */}
    <span className="mt-10 text-xs text-white/30 tracking-widest">
      TSPC ESPORTS © 2026
    </span>

  </div>
)}




{/* HERO – GOD MODE ELITE (PRO / SOBRIO / IMPACTANTE) */}

<section className="relative min-h-screen flex items-center px-6 sm:px-10 md:px-24 pt-28 md:pt-32 overflow-hidden bg-black">
      {/* REACTIVE BACKGROUND */}
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: "translate(var(--px), var(--py))" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF55,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#FF7A0035,transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.045] bg-[url('/noise.png')] mix-blend-overlay" />
      </div>

      {/* GRID OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] opacity-25" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >

        {/* STATUS */}
        <div className="flex items-center gap-4 mb-8">
          <span className="px-4 py-1.5 border border-[#7B2CFF] text-[#7B2CFF] text-[11px] uppercase tracking-[0.35em] backdrop-blur-md">
            Registro Abierto
          </span>
          <span className="px-4 py-1.5 bg-red-500 text-black text-[11px] font-black uppercase tracking-[0.35em] shadow-[0_0_30px_rgba(255,0,0,0.9)] animate-pulse">
            LIVE
          </span>
        </div>

        {/* TITLE */}
        <h1 className="font-['Orbitron'] font-extrabold leading-[1.05] tracking-[0.14em] text-[clamp(3rem,6vw,5.6rem)]">
          <span
            className="block text-white/80 transition-transform"
            style={{ transform: "translateX(var(--px))" }}
          >
            TSPC
          </span>

          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7B2CFF] via-white to-[#7B2CFF] drop-shadow-[0_0_50px_rgba(123,44,255,0.9)] animate-coreBreath">
            WARZONE
          </span>

          <span
            className="block text-white/80 transition-transform"
            style={{ transform: "translateX(calc(var(--px) * -1))" }}
          >
            CUP
          </span>
        </h1>

        {/* ACCENT */}
        <div className="mt-6 h-[2px] w-56 bg-gradient-to-r from-transparent via-[#7B2CFF] to-transparent" />

        {/* SUBTITLE */}
        <p className="text-gray-300 mt-8 max-w-xl text-base sm:text-lg leading-relaxed">
          Torneos competitivos de Warzone con producción profesional,
          sistema de ranking real y equipos élite de LATAM.
        </p>

        {/* HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-16">
          {[
            "Prize Pool|$1,000",
            "Equipos|28 / 32",
            "Modo|Trios",
            "Región|LATAM",
          ].map((item) => {
            const [label, value] = item.split("|")
            return (
              <div
                key={label}
                className="relative p-5 text-center rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#7B2CFF]/60 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="text-gray-400 text-[10px] tracking-[0.4em] uppercase">
                  {label}
                </span>
                <p className="text-[#7B2CFF] font-black text-xl sm:text-2xl mt-2 drop-shadow-[0_0_25px_rgba(123,44,255,0.7)]">
                  {value}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-6 mt-20">
          <button className="px-10 py-3.5 bg-[#7B2CFF] text-black font-black uppercase tracking-[0.3em] rounded-md shadow-[0_0_50px_rgba(123,44,255,0.6)] hover:bg-[#FF7A00] transition">
            Inscribirse
          </button>
          <button className="px-10 py-3.5 border border-white/20 text-white uppercase tracking-[0.3em] rounded-md hover:border-[#FF7A00] hover:text-[#FF7A00] transition">
            Ver en vivo
          </button>
        </div>
      </motion.div>

      {/* RIGHT CORE – SIGNATURE */}
      <div
        className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2"
        style={{ transform: "translate(var(--px), var(--py))" }}
      >
        <div className="relative w-[460px] h-[460px]">

          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7B2CFF]/45 to-[#FF7A00]/30 blur-[120px] animate-coreBreath" />

          <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slower" />
          <div className="absolute inset-10 rounded-full border border-[#7B2CFF]/40 animate-spin-reverse-slow" />

          <div className="absolute inset-28 rounded-full bg-black/70 backdrop-blur-xl border border-[#7B2CFF]/60 shadow-[0_0_90px_rgba(123,44,255,0.8)]" />

          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_30px_rgba(255,0,0,1)] animate-ping" />
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

      {/* TITLE */}
      <h2 className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold mb-6 leading-tight">
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
          <span className="relative z-10">Ver planes</span>
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
        onClick={() => (window.location.href = "http://localhost:5000/auth/discord")}
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
  );
}
