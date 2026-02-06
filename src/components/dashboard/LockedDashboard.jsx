import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Crown, Lock, CheckCircle, ArrowRight } from "lucide-react"

export default function SubscriptionRequired() {
  const [devtoolsOpen, setDevtoolsOpen] = useState(false)

  /* ============================= */
  /* DEVTOOLS DETECTION (BASIC) */
  /* ============================= */
  useEffect(() => {
    const threshold = 160

    const detect = () => {
      const w = window.outerWidth - window.innerWidth
      const h = window.outerHeight - window.innerHeight
      setDevtoolsOpen(w > threshold || h > threshold)
    }

    const interval = setInterval(detect, 1000)
    return () => clearInterval(interval)
  }, [])

  /* ============================= */
  /* BLOCK INPUTS */
  /* ============================= */
  useEffect(() => {
    const block = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    document.addEventListener("keydown", block, true)
    document.addEventListener("wheel", block, { passive: false })
    document.addEventListener("contextmenu", block)

    return () => {
      document.removeEventListener("keydown", block, true)
      document.removeEventListener("wheel", block)
      document.removeEventListener("contextmenu", block)
    }
  }, [])

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden text-white
      ${devtoolsOpen ? "blur-sm brightness-75" : ""}
      bg-[#05060a]`}
    >
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
          transition={{ duration: 0.8 }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl
          bg-gradient-to-br from-purple-600 to-fuchsia-600
          shadow-[0_0_80px_rgba(168,85,247,0.7)]"
        >
          <Lock className="h-10 w-10" />
        </motion.div>

        {/* TITLE */}
        <h1 className="mb-4 text-center text-5xl font-extrabold tracking-tight">
          Acceso restringido
        </h1>

        <p className="mb-14 max-w-2xl text-center text-lg text-white/70">
          Esta sección está protegida por suscripción activa.
          <br />
          <span className="text-white font-semibold">
            El acceso no autorizado está bloqueado.
          </span>
        </p>

        {/* CARD */}
        <div
          className="relative w-full max-w-3xl rounded-3xl border border-white/10
          bg-gradient-to-b from-white/10 to-white/5 p-10 backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Acceso Premium</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Herramientas avanzadas de torneo",
              "Control completo de partidas",
              "Automatización profesional",
              "Integración con Discord",
              "Soporte prioritario",
              "Panel administrativo completo",
              "Configuraciones avanzadas",
              "Escalabilidad total",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-white/80">
                <CheckCircle className="mt-1 h-5 w-5 text-purple-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href="/pricing"
              className="group flex items-center gap-3 rounded-xl
              bg-gradient-to-r from-purple-600 to-fuchsia-600
              px-10 py-4 text-lg font-black uppercase tracking-wider
              shadow-[0_0_50px_rgba(168,85,247,0.7)]
              hover:scale-[1.06] transition"
            >
              Desbloquear acceso
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            {devtoolsOpen && (
              <span className="text-xs text-red-400 animate-pulse">
                Vista limitada por seguridad
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
