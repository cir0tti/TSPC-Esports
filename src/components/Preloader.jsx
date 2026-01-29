import React, { useEffect } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

export default function Preloader({ onFinish }) {
  useEffect(() => {
    /* ---------------- LENIS ---------------- */
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.15,
    });

    let lenisRaf;
    const raf = (time) => {
      lenis.raf(time);
      lenisRaf = requestAnimationFrame(raf);
    };
    lenisRaf = requestAnimationFrame(raf);

    /* ---------------- PRELOADER ANIMATION ---------------- */
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        onFinish?.();
      },
    });

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
            const el = document.querySelector(".pre-text");
            if (el) el.innerText = "ESCANEANDO CREDENCIALES";
          },
        }
      )

      // Escáner biométrico
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

      // Validación
      .to(".pre-text", {
        duration: 0.4,
        onStart: () => {
          const el = document.querySelector(".pre-text");
          if (el) el.innerText = "VALIDANDO ACCESO";
        },
      })

      // Acceso concedido
      .to(".pre-text", {
        duration: 0.4,
        delay: 0.6,
        onStart: () => {
          const el = document.querySelector(".pre-text");
          if (el) el.innerText = "ACCESO CONCEDIDO";
        },
      })

      // Pulso de aprobación
      .to(".pre-logo", {
        scale: 1.12,
        duration: 0.45,
        boxShadow: "0 0 90px #22d3ee",
      })

      // Salida
      .to(".preloader", {
        opacity: 0,
        scale: 1.35,
        filter: "blur(18px)",
        duration: 0.9,
        ease: "power4.in",
      });

    return () => {
      cancelAnimationFrame(lenisRaf);
      lenis.destroy();
      tl.kill();
    };
  }, [onFinish]);

  return (
    <div className="preloader fixed inset-0 bg-black z-[9999] overflow-hidden flex items-center justify-center">

      {/* SCANLINES */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="scanlines"></div>
      </div>

      {/* LÍNEA DE ESCÁNER */}
      <div
        className="scanner-line absolute inset-x-0 h-[3px]
                   bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                   opacity-70"
      />

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
          alt="TSPC"
        />

        {/* TEXTO */}
        <span
          className="pre-text mt-10 text-[11px] tracking-[0.45em]
                     text-cyan-400 uppercase font-semibold"
        >
          INICIALIZANDO SISTEMA
        </span>
      </div>
    </div>
  );
}
