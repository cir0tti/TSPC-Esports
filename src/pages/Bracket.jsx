import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Users,
  Clock,
  Gamepad2,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

/* ================= DATA ================= */

const participants = [
  { rank: 1, team: "AONE X MOLFIS", user: "-", history: ["W", "W", "W", "W"] },
  { rank: 2, team: "DEPTZ X PRINCE", user: "-", history: ["W", "W", "W", "L"] },
  { rank: 3, team: "CHINO X SLIZIC", user: "-", history: ["W", "W", "L"] },
  { rank: 3, team: "CHUNGO X LUCI", user: "-", history: ["W", "W", "L"] },
  { rank: 5, team: "KILLER X MASCIO", user: "-", history: ["L"] },
  { rank: 5, team: "LEONCITA X ELI", user: "-", history: ["L"] },
  { rank: 5, team: "SPADES X COVINI", user: "-", history: ["W", "L"] },
  { rank: 5, team: "VLASX X FROSTIX", user: "-", history: ["W", "L"] },
  { rank: 9, team: "FERNADE X BYRON", user: "-", history: ["L"] },
  { rank: 9, team: "GURY X VALCEL", user: "-", history: ["L"] },
  { rank: 9, team: "IDRAX X GABRIEL", user: "-", history: ["L"] },
  { rank: 9, team: "MAGO X MIVKEE", user: "-", history: ["L"] },
  { rank: 9, team: "SEPNIE X NICOLE", user: "-", history: ["L"] },
  { rank: 9, team: "XOTIC X ADRIAN", user: "-", history: ["L"] },
];

const tournament = {
  title: "REGULAR 20 CAP 2v2",
  players: 14,
  format: "Single Elimination",
  game: "Call of Duty: Warzone",
  startTime: "January 29, 2026 · 22:00 GMT-5",
  champion: "AONE x MOLFIS",
};

const results = [
  { place: "1st", team: "AONE x MOLFIS", score: "4-0" },
  { place: "2nd", team: "DEPTZ x PRINCE", score: "3-1" },
  { place: "3rd", team: "CHINO x SLIZIC", score: "2-1" },
  { place: "4th", team: "CHUNGO x LUCI", score: "2-1" },
];

const bracket = [
  {
    round: "Ronda 1",
    matches: [
      { id: 1, team1: "CHINO X SLIZIC", team2: "IDRAX X GABRIEL", winner: 1 },
      { id: 2, team1: "SEPNIE X NICOLE", team2: "AONE X MOLFIS", winner: 2 },
      { id: 3, team1: "XOTIC X ADRIAN", team2: "VLASX X FROSTIX", winner: 2 },
      { id: 4, team1: "DEPTZ X PRINCE", team2: "MAGO X MIVKEE", winner: 1 },
      { id: 5, team1: "GURY X VALCEL", team2: "CHUNGO X LUCI", winner: 2 },
      { id: 6, team1: "FERNADE X BYRON", team2: "SPADES X COVINI", winner: 2 },
    ],
  },
  {
    round: "Ronda 2",
    matches: [
      { id: 7, team1: "CHINO X SLIZIC", team2: "AONE X MOLFIS", winner: 2 },
      { id: 8, team1: "VLASX X FROSTIX", team2: "DEPTZ X PRINCE", winner: 2 },
      { id: 9, team1: "CHUNGO X LUCI", team2: "SPADES X COVINI", winner: 1 },
    ],
  },
  {
    round: "Semifinales",
    matches: [
      { id: 10, team1: "AONE X MOLFIS", team2: "DEPTZ X PRINCE", winner: 1 },
      { id: 11, team1: "CHUNGO X LUCI", team2: "SPADES X COVINI", winner: 2 },
    ],
  },
  {
    round: "Final",
    matches: [
      { id: 12, team1: "AONE X MOLFIS", team2: "SPADES X COVINI", winner: 1 },
    ],
  },
];

const TOTAL_MATCHES = bracket.flatMap(r => r.matches).length;

/* ================= MAIN ================= */

export default function TournamentExperience() {
  const [showBracket, setShowBracket] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [activeView, setActiveView] = useState("positions");
  const [menuOpen, setMenuOpen] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const step = useAutoplay(TOTAL_MATCHES);

  const menuTitle = activeView.charAt(0).toUpperCase() + activeView.slice(1); // Formato el título del menú

  return (
    <div className="min-h-screen bg-[#0B0B10] text-white overflow-hidden flex flex-col items-center">

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF30,transparent_70%)]" />
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
        >
          REGULAR 20 CAP
          <span className="block text-purple-400 text-2xl sm:text-3xl md:text-4xl mt-3">
            2v2 TOURNAMENT
          </span>
        </motion.h1>
      </section>

      {/* Dropdown Menu under the Title */}
      <div className="w-full max-w-2xl px-6 py-4 bg-[#1D1D1D] rounded-xl">
        <button
          onClick={() => setMenuOpen(!menuOpen)} // Controlamos la apertura del dropdown
          className="w-full text-left text-white font-semibold text-lg flex items-center justify-between"
        >
          <span>{menuTitle}</span> {/* Aquí se muestra la sección activa */}
          <ChevronDown className={`transition ${menuOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Desplegar las opciones si el menú está abierto */}
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-4">
            <button
              onClick={() => setActiveView("positions")}
              className={`text-left ${activeView === "positions" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
            >
              Posiciones
            </button>
            <button
              onClick={() => setActiveView("participants")}
              className={`text-left ${activeView === "participants" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
            >
              Participantes
            </button>
            <button
              onClick={() => setActiveView("announcements")}
              className={`text-left ${activeView === "announcements" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
            >
              Anuncios
            </button>
            <button
              onClick={() => setActiveView("activity")}
              className={`text-left ${activeView === "activity" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
            >
              Actividad
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 md:p-6 pt-16 md:pt-6 w-full max-w-7xl px-4 md:px-6 py-16 md:py-20">
        {!introDone && (
          <ChampionIntro
            champion={tournament.champion}
            onFinish={() => setIntroDone(true)}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 overflow-visible">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
            <InfoCard icon={<Users />} label="Jugadores" value={tournament.players} />
            <InfoCard icon={<Gamepad2 />} label="Juego" value={tournament.game} />
            <InfoCard icon={<Trophy />} label="Formato" value={tournament.format} />
            <InfoCard icon={<Clock />} label="Inicio" value={tournament.startTime} />
          </div>

          {activeView === "positions" && (
            <>
              <PodiumFinal results={results} />

              <button
                onClick={() => setShowBracket(!showBracket)}
                className="w-full mt-8 md:mt-10 py-3 md:py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800
                border border-white/10 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                {showBracket ? "Ocultar bracket" : "Ver bracket completo"}
                <ChevronDown className={`transition ${showBracket && "rotate-180"}`} />
              </button>

              <AnimatePresence>
                {showBracket && (
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 60 }}
                    className="relative mt-8 md:mt-12 bg-white/5 backdrop-blur-xl rounded-3xl p-3 md:p-6 border border-white/10 max-h-[70vh] overflow-auto"
                  >
                    <div className="absolute inset-0 pointer-events-none overflow-visible">
                      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-purple-500/20 blur-[200px] md:blur-[260px]" />
                    </div>

                    <div
                      className="relative z-10 flex gap-x-8 md:grid md:grid-cols-4 items-start w-max md:w-full mx-auto"
                      style={{ perspective: "1400px" }}
                    >
                      {bracket.map((round, index) => (
                        <RoundColumn
                          key={round.round}
                          round={round}
                          roundIndex={index}
                          step={step}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {activeView === "participants" && (
            <ParticipantsSection participants={participants} />
          )}

        </div>
      </main>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function SidebarContent({ activeView, setActiveView }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-white font-semibold text-lg">Torneo</div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setActiveView("positions")}
          className={`text-left ${activeView === "positions" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
        >
          Posiciones
        </button>
        <button
          onClick={() => setActiveView("participants")}
          className={`text-left ${activeView === "participants" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
        >
          Participantes
        </button>
        <div className="text-zinc-400">Anuncios</div>
      </div>
    </div>
  );
}

/* ================= AUTOPLAY ================= */

function useAutoplay(total) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= total) return;
    const timeout = setTimeout(() => setStep(s => s + 1), 850);
    return () => clearTimeout(timeout);
  }, [step, total]);

  return step;
}

/* ================= BRACKET ================= */

function RoundColumn({ round, roundIndex, step }) {
  const gap = Math.min(44 * Math.pow(1.45, roundIndex), 140);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: roundIndex * 0.15, duration: 0.7 }}
      className="flex flex-col items-center relative min-w-[200px] md:min-w-[240px]"
    >
      <h3 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-purple-400">
        {round.round}
      </h3>

      <div className="flex flex-col items-center" style={{ gap }}>
        {round.matches.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            revealed={step >= match.id}
            isFinal={round.round === "Final"}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MatchCard({ match, revealed, isFinal }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
      animate={revealed ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative w-[180px] md:w-[220px] rounded-xl overflow-visible border
      ${isFinal
        ? "bg-gradient-to-br from-purple-600/40 to-orange-500/30 border-orange-400/40 shadow-[0_0_120px_#F59E0B]"
        : "bg-[#0E0E15] border-white/10"}`}
    >
      <TeamRow name={match.team1} active={match.winner === 1} />
      <div className="h-px bg-white/10" />
      <TeamRow name={match.team2} active={match.winner === 2} />
      {!isFinal && <Connector active={revealed} />}
    </motion.div>
  );
}

function TeamRow({ name, active }) {
  return (
    <div className={`px-3 py-2 flex justify-between items-center text-[11px] md:text-xs
    ${active ? "bg-purple-500/30 text-purple-200" : "text-zinc-500"}`}>
      <span className="font-semibold truncate max-w-[110px] md:max-w-[150px]">
        {name}
      </span>
      {active && <span className="text-[10px] md:text-xs font-bold text-orange-400">WIN</span>}
    </div>
  );
}

function Connector({ active }) {
  return (
    <svg className="absolute right-[-60px] md:right-[-80px] top-1/2" width="80" height="100">
      <motion.path
        d="M0 10 H40 V50 H80"
        fill="none"
        stroke={active ? "#F59E0B" : "#7B2CFF"}
        strokeWidth="2"
        strokeDasharray="6 10"
        animate={{
          strokeDashoffset: active ? [0, -40] : 0,
          opacity: active ? 1 : 0.15,
        }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
      />
    </svg>
  );
}

/* ================= INTRO ================= */

function ChampionIntro({ champion, onFinish }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3, duration: 1 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-b from-black via-transparent to-transparent"
    >
      {/* Fondo animado con partículas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF30,transparent_70%)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 2 }}
          className="absolute top-0 left-0 w-full h-full bg-[url('https://cdn.pixabay.com/photo/2015/09/18/19/01/galaxy-944388_960_720.jpg')] bg-cover bg-center bg-no-repeat opacity-60"
        />
      </div>

      {/* Contenido de la intro */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center px-6 md:px-8 relative z-[1000]"
      >
        {/* Icono de corona */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-6xl md:text-7xl text-white font-extrabold mb-6 animate-pulse"
        >
          👑
        </motion.div>

        {/* Título del campeón */}
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4"
        >
          {champion}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="text-sm md:text-lg text-orange-300 tracking-widest uppercase font-semibold"
        >
          Tournament Champions
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function TournamentHero() {
  return (
    <section className="relative py-20 md:py-32 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF30,transparent_70%)]" />
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
      >
        REGULAR 20 CAP
        <span className="block text-purple-400 text-2xl sm:text-3xl md:text-4xl mt-3">
          2v2 TOURNAMENT
        </span>
      </motion.h1>
    </section>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white/5 rounded-2xl p-4 md:p-6 flex gap-3 md:gap-4
      items-center border border-white/10"
    >
      <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
        {icon}
      </div>
      <div>
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        <p className="font-bold text-sm md:text-lg">{value}</p>
      </div>
    </motion.div>
  );
}

function ParticipantsSection({ participants }) {
  return (
    <section className="mt-16 md:mt-24">
      <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8">Participantes</h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#0E0E15] rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 text-xs uppercase tracking-widest text-zinc-400 border-b border-white/10">
          <div className="col-span-1">Rango</div>
          <div className="col-span-4">Equipo</div>
          <div className="col-span-3">Usuario</div>
          <div className="col-span-4">Historial</div>
        </div>

        {participants.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-12 px-6 py-4 items-center text-sm border-b border-white/5 hover:bg-white/5 transition"
          >
            <div className="col-span-1 font-bold">{p.rank}</div>
            <div className="col-span-4 font-semibold">{p.team}</div>
            <div className="col-span-3 text-zinc-400">{p.user}</div>
            <div className="col-span-4 flex gap-2 flex-wrap">
              {p.history.map((h, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-md text-xs font-bold
                  ${h === "W"
                    ? "bg-cyan-400/20 text-cyan-300"
                    : "bg-orange-500/20 text-orange-300"}`}
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {participants.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0E0E15] rounded-xl border border-white/10 p-4"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400">
                Rango
              </span>
              <span className="font-bold">{p.rank}</span>
            </div>

            <div className="mb-2">
              <p className="text-xs uppercase tracking-widest text-zinc-400">
                Equipo
              </p>
              <p className="font-semibold">{p.team}</p>
            </div>

            <div className="mb-2">
              <p className="text-xs uppercase tracking-widest text-zinc-400">
                Usuario
              </p>
              <p className="text-zinc-400">{p.user}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1">
                Historial
              </p>
              <div className="flex gap-2 flex-wrap">
                {p.history.map((h, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-md text-xs font-bold
                    ${h === "W"
                      ? "bg-cyan-400/20 text-cyan-300"
                      : "bg-orange-500/20 text-orange-300"}`}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PodiumFinal({ results }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
      {results.map((r, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -8, scale: 1.04 }}
          className={`relative p-6 md:p-8 rounded-3xl border
          ${r.place === "1st"
            ? "bg-gradient-to-br from-yellow-400/30 to-orange-500/20 border-yellow-400/40 shadow-[0_0_160px_#F59E0B]"
            : "bg-white/5 border-white/10"}`}
        >
          {r.place === "1st" && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl md:text-5xl">
              👑
            </div>
          )}
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            {r.place}
          </p>
          <h3 className="text-lg md:text-2xl font-extrabold mt-2">{r.team}</h3>
          <p className="mt-1 text-orange-400 font-semibold">{r.score}</p>
        </motion.div>
      ))}
    </div>
  );
}
