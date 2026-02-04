import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Play, ChevronDown } from "lucide-react";

export default function TutorialTSPC() {
  const experienceRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start start", "end end"],
  });

  /* VIDEO */
  const videoScale = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [0.96, 1]),
    { stiffness: 120, damping: 18 }
  );

  const glow = useTransform(scrollYProgress, [0, 0.6], ["0px", "100px"]);

  /* TEXT TRANSITION */
  const aprendeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const dominaOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#8B5CFF25,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#FF7A0020,transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[url('/noise.png')]" />
      </div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 relative">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight"
        >
          TSPC
          <span className="block text-[#8B5CFF] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Interactive Guide
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 sm:mt-6 max-w-xl text-gray-300 text-base sm:text-lg md:text-xl"
        >
          No es un tutorial.
          <br />
          Es una experiencia guiada.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 sm:mt-8 md:mt-12"
        >
          <a href="#experience">
            <button className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-9 py-3 sm:py-4 rounded-full bg-white text-black font-semibold text-base sm:text-lg md:text-xl hover:scale-105 transition">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              Iniciar experiencia
            </button>
          </a>
        </motion.div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        ref={experienceRef}
        className="relative min-h-[120vh] px-4 sm:px-6 md:px-8"
      >
        <div className="sticky top-0 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">

            {/* TEXT */}
            <div className="relative h-[25vh] sm:h-[30vh] md:h-auto">
              <motion.h2
                style={{ opacity: aprendeOpacity }}
                className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Aprende.
                <br />
                <span className="text-gray-400 text-base sm:text-lg md:text-xl">
                  Entiende el sistema.
                </span>
              </motion.h2>

              <motion.h2
                style={{ opacity: dominaOpacity }}
                className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Domina.
                <br />
                <span className="text-[#8B5CFF] text-base sm:text-lg md:text-xl">
                  Juega con ventaja.
                </span>
              </motion.h2>
            </div>

            {/* VIDEO */}
            <motion.div
              style={{
                scale: videoScale,
                boxShadow: `0 0 ${glow} #8B5CFF`,
              }}
              className="relative w-full rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <video
                src="/tutorial-tspc.mp4"
                controls
                className="w-full aspect-video object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40" />
            </motion.div>

            {/* SCROLL HINT BELOW VIDEO */}
            <div className="flex justify-center mt-2 sm:mt-4 md:mt-6">
              <motion.a
                href="#transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-1 text-gray-400 text-sm sm:text-base md:text-lg"
              >
                <motion.span
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="flex flex-col items-center"
                >
                  <span>Desliza</span>
                  <ChevronDown className="mt-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.span>
              </motion.a>
            </div>

          </div>
        </div>
      </section>

      {/* TRANSITION SECTION */}
      <section className="relative py-20 sm:py-28 md:py-40 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-16 sm:gap-20 md:gap-28">

          {/* LINE */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "100%", opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 w-px bg-gradient-to-b from-transparent via-[#8B5CFF] to-transparent"
          />

          {/* PHRASES */}
          {["Compite.", "Aprende.", "Mejora.", "Gana."].map((text, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight"
            >
              {text}
            </motion.h2>
          ))}
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="relative py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-8 text-center overflow-hidden">
        {/* BACKGROUND GLOW */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#8B5CFF25,transparent_60%)]"
        />

        {/* MAIN TEXT */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
        >
          Gracias por formar parte de{" "}
          <span className="text-[#8B5CFF]">TSPC</span>
        </motion.h3>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 sm:mt-6 md:mt-8 text-gray-400 text-sm sm:text-base md:text-lg"
        >
          Esta experiencia fue creada para jugadores que buscan competir con
          intención, estrategia y verdadero nivel.
        </motion.p>

        {/* CLOSING LINE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative mt-6 text-gray-500 text-sm sm:text-base"
        >
          Nos vemos en el lobby 👊
        </motion.p>

        {/* FINAL BREATH */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        />
      </section>

      {/* FOOTER */}
      <footer className="py-6 sm:py-8 md:py-10 text-center text-gray-500 text-sm sm:text-base">
        © {new Date().getFullYear()} TSPC Esports Platform
      </footer>
    </div>
  );
}
