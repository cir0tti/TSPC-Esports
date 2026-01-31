import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff003320,transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')]" />

      {/* Card */}
      <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-[0_0_60px_#ff003340]">
        
        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <span className="text-3xl">❌</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Pago cancelado
        </h1>

        {/* Description */}
        <p className="text-white/70 mb-6">
          El pago fue cancelado o no se completó correctamente.  
          No se ha realizado ningún cargo.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold text-white"
          >
            Reintentar pago
          </Link>

          <Link
            to="/"
            className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition text-white/80"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Extra info */}
        <p className="text-xs text-white/40 mt-6">
          Si el problema persiste, contacta al soporte de TSPC.
        </p>
      </div>
    </section>
  );
}
