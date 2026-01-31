import React from "react";
import { motion } from "framer-motion";
import { Crown, Lock, CheckCircle, ArrowRight } from "lucide-react";

export default function SubscriptionRequired() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#05060a] text-white">
      {/* BACKGROUND FX */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[160px]" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff08,transparent_55%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-32">
        {/* ICON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-[0_0_60px_#7c3aed55]"
        >
          <Lock className="h-10 w-10" />
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-center text-5xl font-extrabold tracking-tight"
        >
          Suscripción requerida
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-14 max-w-2xl text-center text-lg text-white/70"
        >
          Para acceder al <span className="font-semibold text-white">Dashboard de TSPC Esports</span>, necesitas una
          suscripción activa. Desbloquea todas las herramientas premium y lleva tus torneos al siguiente nivel.
        </motion.p>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-10 backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Beneficios Premium</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {["Creación y gestión de torneos ilimitados","Leaderboards en tiempo real","Gestión avanzada de equipos","Multiplicadores de puntuación personalizados","Integración automática con Discord","Roles automáticos para jugadores","Timers y control de partidas","Soporte prioritario TSPC"].map(
              (item, i) => (
                <div key={i} className="flex items-start gap-3 text-white/80">
                  <CheckCircle className="mt-1 h-5 w-5 text-purple-400" />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/pricing"
              className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-10 py-4 text-lg font-semibold shadow-[0_0_40px_#7c3aed66]"
            >
              Ver planes y precios
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <span className="text-sm text-white/50">
              Elige el plan perfecto para tu comunidad y tus torneos
            </span>
          </div>
        </motion.div>

        {/* FOOTER TEXT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 max-w-xl text-center"
        >
          <h3 className="mb-3 text-xl font-semibold">¿Por qué TSPC Esports?</h3>
          <p className="text-white/60">
            Somos una plataforma enfocada 100% en esports competitivos. Automatizamos procesos,
            elevamos la experiencia de los jugadores y te damos control total de tus eventos.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
