import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { Lock, Crown, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function PremiumPreviewGate({ active, children }) {
  const [devtoolsOpen, setDevtoolsOpen] = useState(false)

  /* ============================= */
  /* DEVTOOLS BASIC DETECTION */
  /* ============================= */
  useEffect(() => {
    if (!active) return

    const threshold = 160
    const detect = () => {
      const widthDiff = window.outerWidth - window.innerWidth
      const heightDiff = window.outerHeight - window.innerHeight
      setDevtoolsOpen(widthDiff > threshold || heightDiff > threshold)
    }

    const interval = setInterval(detect, 1000)
    return () => clearInterval(interval)
  }, [active])

  /* ============================= */
  /* BLOCK INTERACTION */
  /* ============================= */
  useEffect(() => {
    if (!active) return

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
  }, [active])

  if (!active) return children

  return (
    <div className="relative overflow-hidden">
      {/* PREVIEW (VISIBLE BUT SAFE) */}
      <div
        className={`select-none pointer-events-none transition-all duration-700
        ${devtoolsOpen ? "blur-xl brightness-50" : "blur-sm brightness-90"}`}
      >
        {children}
      </div>

      {/* OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-50 flex items-center justify-center"
      >
        {/* GLASS BACKDROP */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-2xl" />

        {/* CARD */}
        <motion.div
          initial={{ y: 40, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="relative z-10 max-w-xl mx-6 text-center px-10 py-12 rounded-3xl
          bg-gradient-to-b from-white/10 to-white/5
          border border-white/20
          shadow-[0_0_120px_rgba(123,44,255,0.65)]"
        >
          {/* ICON */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
          bg-gradient-to-br from-purple-600 to-fuchsia-600
          shadow-[0_0_40px_rgba(168,85,247,0.7)]">
            <Lock className="h-8 w-8" />
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-black tracking-tight mb-3">
            Acceso restringido
          </h2>

          {/* COPY */}
          <p className="text-white/70 mb-8 leading-relaxed">
            Estás viendo un{" "}
            <span className="text-white font-semibold">preview protegido</span>{" "}
            del <span className="text-white font-semibold">Live Control Room</span>.
            <br />
            <span className="text-white/50 text-sm">
              Interacciones, multistream y control avanzado están bloqueados.
            </span>
          </p>

          {/* CTA */}
          <Link
            to="/pricing"
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-xl
            bg-gradient-to-r from-purple-600 to-fuchsia-600 font-black uppercase tracking-wider
            shadow-[0_0_50px_rgba(168,85,247,0.7)]
            hover:scale-[1.06] transition"
          >
            <Crown className="h-5 w-5 group-hover:rotate-12 transition" />
            Desbloquear acceso
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
          </Link>

          {/* DEVTOOLS WARNING */}
          {devtoolsOpen && (
            <p className="mt-6 text-xs text-red-400 animate-pulse">
              Vista limitada por seguridad
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
