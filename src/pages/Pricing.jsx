"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Check,
  Star,
} from "lucide-react";

/* =======================
   DATA
======================= */

const plans = [
  {
    id: 1,
    name: "CORE ACCESS",
    price: 9,
    tag: "ENTRY",
    desc: "Acceso base al ecosistema competitivo.",
    perks: ["Torneos públicos", "Perfil validado", "Soporte estándar"],
    gradient: "from-fuchsia-500 to-indigo-500",
  },
  {
    id: 2,
    name: "PRO LEAGUE",
    price: 25,
    tag: "POPULAR",
    desc: "Competencia profesional con ranking.",
    perks: ["Torneos premium", "Ranking global", "Rewards", "Soporte prioritario"],
    gradient: "from-purple-500 to-cyan-400",
    featured: true,
  },
  {
    id: 3,
    name: "GOD STATUS",
    price: 59,
    tag: "ELITE",
    desc: "Acceso total al sistema TSPC.",
    perks: ["Todo desbloqueado", "Badges únicos", "Drops", "Soporte VIP"],
    gradient: "from-pink-500 to-fuchsia-600",
  },
];

const testimonials = [
  { name: "NeoX", role: "Pro Player", text: "Esto no es un servicio, es una ventaja competitiva." },
  { name: "Vortex", role: "Streamer", text: "Visualmente y técnicamente superior a cualquier plataforma." },
  { name: "R4VEN", role: "Team Captain", text: "Si quieres competir en serio, esto es obligatorio." },
];

/* =======================
   COMPONENT
======================= */

export default function TSPCStore() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const addToCart = (plan) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === plan.id);
      if (found)
        return prev.map((p) =>
          p.id === plan.id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...plan, qty: 1 }];
    });
    setOpenCart(true);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart((c) => c.filter((i) => i.id !== id));
    else
      setCart((c) =>
        c.map((i) => (i.id === id ? { ...i, qty } : i))
      );
  };

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="bg-[#050010] text-white">

{/* HEADER */}
<header
  className="
    fixed top-0 w-full z-50
    bg-black/50 backdrop-blur-xl
    border-b border-white/10
    transition-all duration-300
  "
>
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    {/* LOGO */}
    <span className="font-black tracking-widest text-lg">
      TSPC<span className="text-fuchsia-400">.</span>
    </span>

    {/* NAV */}
    <nav className="hidden md:flex gap-10 text-[13px] tracking-widest font-semibold text-white/60">
      <a href="/" className="hover:text-white transition">HOME</a>
      <a href="#plans" className="hover:text-white transition">PLANES</a>
      <a href="#testimonials" className="hover:text-white transition">TESTIMONIOS</a>
      <a href="#footer" className="hover:text-white transition">CONTACTO</a>
    </nav>

    {/* CART */}
    <button
      onClick={() => setOpenCart(true)}
      className="relative group"
    >
      <ShoppingCart className="text-white/70 group-hover:text-white transition" />

      {cart.length > 0 && (
        <span
          className="
            absolute -top-2 -right-2
            w-5 h-5
            bg-gradient-to-r from-fuchsia-500 to-cyan-400
            text-black text-xs font-black
            rounded-full
            flex items-center justify-center
          "
        >
          {cart.length}
        </span>
      )}
    </button>
  </div>
</header>
{/* HERO – TSPC COMMAND CENTER */ }
<section
  id="hero"
  className="relative min-h-[100svh] overflow-hidden flex items-center"
>
  {/* GRID / HUD BACKGROUND */}
  <div className="absolute inset-0 -z-10">
    {/* Tactical grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

    {/* Core glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#7B2CFF35,transparent_55%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#00E5FF25,transparent_60%)]" />

    {/* Noise */}
    <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')]" />
  </div>

  {/* SIDE HUD – LEFT */}
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 }}
    className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 text-white/40 text-xs space-y-6"
  >
    <div>
      <p className="font-black text-white/70">MODE</p>
      <p>WARZONE</p>
    </div>
    <div>
      <p className="font-black text-white/70">STATUS</p>
      <p className="text-cyan-400">ONLINE</p>
    </div>
    <div>
      <p className="font-black text-white/70">REGION</p>
      <p>GLOBAL</p>
    </div>
  </motion.div>

  {/* CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* TEXT BLOCK */}
      <div>
        {/* SYSTEM TAG */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full
                     border border-white/15 bg-white/5 text-[10px] tracking-widest font-black"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          TSPC COMPETITIVE SYSTEM
        </motion.div>

{/* TITLE */}
<motion.h1
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="
    font-black
    leading-[1.08]
    overflow-visible
    text-[2.9rem]
    sm:text-[4.1rem]
    lg:text-[5.4rem]
    xl:text-[6.1rem]
  "
>
  <span className="block text-white">
    TSPC
  </span>

  <span
    className="
      block
      pb-2
      bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400
      bg-clip-text text-transparent
    "
  >
    ESPORTS
  </span>
</motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-xl text-white/60 text-base sm:text-lg"
        >
          Sistema competitivo profesional para torneos de Warzone.
          <span className="block mt-2 text-white/40">
            No juegas partidas. Compites en un ecosistema.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex gap-5 flex-wrap"
        >
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="#plans"
            className="px-10 py-5 rounded-xl font-black text-black
                       bg-gradient-to-r from-fuchsia-500 to-cyan-400"
          >
            ACCEDER AL SISTEMA
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#testimonials"
            className="px-10 py-5 rounded-xl font-black text-white
                       border border-white/20 bg-white/5 hover:bg-white/10 transition"
          >
            VER TORNEOS
          </motion.a>
        </motion.div>
      </div>

{/* VISUAL BLOCK – LIVE COMPETITIVE HUD */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  className="relative hidden lg:block"
>
  {/* HUD FRAME */}
  <div className="relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-xl p-6 w-[420px] h-[420px]">

    {/* CORNER LINES */}
    <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-400" />
    <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-fuchsia-400" />
    <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-fuchsia-400" />
    <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-400" />

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6 text-xs tracking-widest text-white/50">
      <span>SYSTEM STATUS</span>
      <span className="text-cyan-400 animate-pulse">LIVE</span>
    </div>

    {/* MAIN METRIC */}
    <div className="mb-6">
      <p className="text-white/40 text-xs tracking-widest mb-1">ACTIVE PLAYERS</p>
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-5xl font-black text-white"
      >
        12,483
      </motion.p>
    </div>

    {/* STATS GRID */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[
        { label: "LIVE TOURNAMENTS", value: "48" },
        { label: "MATCHES TODAY", value: "1,392" },
        { label: "PRIZE POOLS", value: "$25K" },
        { label: "REGION", value: "GLOBAL" },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-xl bg-white/5 border border-white/10 p-4"
        >
          <p className="text-[10px] text-white/40 tracking-widest mb-1">
            {stat.label}
          </p>
          <p className="font-black text-lg">{stat.value}</p>
        </div>
      ))}
    </div>

    {/* SCAN LINE */}
    <motion.div
      animate={{ y: [0, 380, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"
    />

    {/* FOOTER */}
    <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] text-white/40 tracking-widest">
      <span>TSPC CORE</span>
      <span>SECURE</span>
    </div>
  </div>
</motion.div>

    </div>
  </div>
</section>



{/* PLANS – COMPETITIVE TIERS */}
<section
  id="plans"
  className="relative max-w-7xl mx-auto px-6 pb-48"
>
  {/* BACKGROUND */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF22,transparent_65%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#00E5FF18,transparent_70%)]" />
    <div className="absolute inset-0 opacity-[0.035] bg-[url('/noise.png')]" />
  </div>

  {/* TITLE */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-28"
  >
    <h2 className="font-black leading-tight text-[2.6rem] sm:text-[4rem] md:text-[5.5rem]">
      SISTEMA DE
      <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        RANGOS COMPETITIVOS
      </span>
    </h2>
    <p className="mt-6 max-w-2xl mx-auto text-white/60 text-sm sm:text-lg">
      No eliges un plan.  
      <span className="text-white/40">
        Desbloqueas un nivel dentro del ecosistema TSPC.
      </span>
    </p>
  </motion.div>

  {/* GRID */}
  <div className="grid md:grid-cols-3 gap-12 perspective-[1600px]">
    {plans.map((p, index) => (
      <motion.div
        key={p.id}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.18 }}
        whileHover={{
          rotateX: 8,
          rotateY: -8,
          scale: 1.08,
        }}
        className={`relative group rounded-[36px] ${
          p.featured ? "z-20" : "z-10"
        }`}
      >
        {/* ENERGY AURA */}
        <div
          className={`absolute -inset-1 rounded-[36px] bg-gradient-to-br ${p.gradient}
                      opacity-40 blur-2xl group-hover:opacity-80 transition`}
        />

        {/* CARD */}
        <div className="relative h-full rounded-[36px] bg-[#060012]/95 backdrop-blur-xl border border-white/10 p-9 overflow-hidden">

          {/* TOP HUD */}
          <div className="flex justify-between items-center mb-6 text-[10px] tracking-widest text-white/40">
            <span>ACCESS LEVEL</span>
            <span className="text-cyan-400">ACTIVE</span>
          </div>

          {/* NAME */}
          <h3 className="text-3xl font-black tracking-tight">
            {p.name}
          </h3>
          <p className="mt-3 text-sm text-white/60">
            {p.desc}
          </p>

          {/* SIGNAL BAR */}
          <div className="mt-6 flex gap-1">
            {[...Array(p.featured ? 5 : 3)].map((_, i) => (
              <span
                key={i}
                className="h-1 w-full rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400 opacity-70"
              />
            ))}
          </div>

          {/* PERKS */}
          <ul className="mt-8 space-y-4 text-sm">
            {p.perks.map((perk, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70">
                <span className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
                  <Check size={13} className="text-cyan-400" />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          {/* DIVIDER */}
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* PRICE + CTA */}
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-[10px] tracking-widest text-white/40">
                ENTRY COST
              </span>
              <span className="text-4xl font-black">
                ${p.price}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => addToCart(p)}
              className="relative px-7 py-4 rounded-xl font-black text-black
                         bg-gradient-to-r from-fuchsia-500 to-cyan-400 overflow-hidden"
            >
              <span className="relative z-10">ACTIVAR</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/25" />
            </motion.button>
          </div>

          {/* FEATURED CORE */}
          {p.featured && (
            <>
              <div className="absolute top-6 right-6 text-[10px] tracking-widest font-black px-3 py-1 rounded-full bg-fuchsia-500 text-black">
                META CORE
              </div>

              {/* PULSE */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-[36px] ring-2 ring-fuchsia-500/40 pointer-events-none"
              />
            </>
          )}
        </div>
      </motion.div>
    ))}
  </div>
</section>


{/* TESTIMONIALS – GOD TIER */ }
<section
  id="testimonials"
  className="relative max-w-7xl mx-auto px-6 pb-40"
>
  {/* BACKGROUND FX */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7B2CFF18,transparent_70%)]" />
    <div className="absolute inset-0 opacity-[0.035] bg-[url('/noise.png')]" />
  </div>

  {/* TITLE */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
    <h2 className="text-4xl md:text-6xl font-black">
      RESPALDADO POR
      <span className="block bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
        JUGADORES REALES
      </span>
    </h2>
    <p className="mt-6 max-w-xl mx-auto text-white/60">
      Competidores, streamers y capitanes que juegan para ganar.
    </p>
  </motion.div>

  {/* GRID */}
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
    {testimonials.map((t, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 }}
        whileHover={{ y: -14, scale: 1.05 }}
        className="relative group rounded-[28px] p-[1px]"
      >
        {/* GLOW BORDER */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-fuchsia-500/60 to-cyan-400/60 opacity-60 blur-xl group-hover:opacity-100 transition" />

        {/* CARD */}
        <div className="relative h-full rounded-[28px] bg-[#060012]/90 backdrop-blur-xl border border-white/10 p-8 overflow-hidden">
          
          {/* QUOTE ICON */}
          <div className="absolute -top-10 -right-10 text-white/5 text-[180px] font-black select-none">
            “
          </div>

          {/* STARS */}
          <div className="flex gap-1 text-fuchsia-400 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>

          {/* TEXT */}
          <p className="relative text-white/75 text-sm leading-relaxed">
            “{t.text}”
          </p>

          {/* DIVIDER */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent my-6" />

          {/* USER */}
          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 blur-md opacity-70" />
              <div className="relative w-12 h-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center font-black">
                {t.name[0]}
              </div>
            </div>

            {/* INFO */}
            <div className="text-sm">
              <p className="font-black">{t.name}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest">
                {t.role}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* FOOTER */}
<footer
  id="footer"
  className="
    relative
    border-t border-white/10
    bg-black/40
    backdrop-blur
    py-24
    px-6
    overflow-hidden
  "
>
  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px]
                    rounded-full bg-fuchsia-500/10 blur-[140px]" />
    <div className="absolute bottom-0 right-0 w-[420px] h-[420px]
                    rounded-full bg-cyan-400/10 blur-[160px]" />
  </div>

  <div className="max-w-6xl mx-auto text-center">
    {/* LOGO / BRAND */}
    <p className="font-black tracking-widest text-2xl text-white">
      TSPC<span className="text-fuchsia-400">.</span>
    </p>

    {/* TAGLINE */}
    <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/60">
      Plataforma competitiva diseñada para jugadores que buscan
      dominar el ecosistema esports.
    </p>

    {/* LINKS */}
    <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs tracking-widest font-semibold text-white/50">
      <a href="#hero" className="hover:text-white transition">HOME</a>
      <a href="#plans" className="hover:text-white transition">PLANES</a>
      <a href="#testimonials" className="hover:text-white transition">TESTIMONIOS</a>
      <a href="#contact" className="hover:text-white transition">CONTACTO</a>
    </div>

    {/* DIVIDER */}
    <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

    {/* COPYRIGHT */}
    <p className="mt-8 text-xs tracking-wide text-white/40">
      © 2026 TSPC Esports — Competitive Future Starts Here
    </p>
  </div>
</footer>

      {/* CART */}
      <AnimatePresence>
        {openCart && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-[#050010] border-l border-white/10 z-[999] p-6"
          >
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-black">CARRITO</h3>
              <button onClick={() => setOpenCart(false)}><X /></button>
            </div>

            {cart.map((i) => (
              <div key={i.id} className="border-b border-white/10 pb-4 mb-4">
                <p className="font-bold">{i.name}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-white/50">${i.price} x {i.qty}</span>
                  <div className="flex gap-3">
                    <button onClick={() => updateQty(i.id, i.qty - 1)}><Minus size={16} /></button>
                    <button onClick={() => updateQty(i.id, i.qty + 1)}><Plus size={16} /></button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-10">
              <h4 className="text-3xl font-black">${total}</h4>
              <button className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-black">
                FINALIZAR COMPRA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
