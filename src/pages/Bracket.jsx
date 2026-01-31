import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Users,
  Clock,
  Gamepad2,
  ChevronDown,
} from "lucide-react";

/* ================= DATA ================= */

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
  const step = useAutoplay(TOTAL_MATCHES);

  return (
    <div className="min-h-screen bg-[#0B0B10] text-white overflow-hidden">

      {!introDone && (
        <ChampionIntro
          champion={tournament.champion}
          onFinish={() => setIntroDone(true)}
        />
      )}

      <TournamentHero />

      <div className="max-w-7xl mx-auto px-6 py-20 overflow-visible">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          <InfoCard icon={<Users />} label="Jugadores" value={tournament.players} />
          <InfoCard icon={<Gamepad2 />} label="Juego" value={tournament.game} />
          <InfoCard icon={<Trophy />} label="Formato" value={tournament.format} />
          <InfoCard icon={<Clock />} label="Inicio" value={tournament.startTime} />
        </div>

        <PodiumFinal results={results} />

        <button
          onClick={() => setShowBracket(!showBracket)}
          className="w-full mt-10 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800
          border border-white/10 flex items-center justify-center gap-2"
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
className="
  relative mt-12
  bg-white/5 backdrop-blur-xl
  rounded-3xl
  p-4 md:p-6
  border border-white/10
  max-h-[640px] md:max-h-[720px]
  overflow-auto
"
            >
              {/* FX layer libre */}
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2
                w-[800px] h-[800px] bg-purple-500/20 blur-[260px]" />
              </div>

{/* Bracket container */}
<div
  className="
    relative z-10
    flex md:grid
    md:grid-cols-4
    gap-x-10
    items-start
    w-max md:w-full
    mx-auto
  "
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
      className="flex flex-col items-center relative min-w-[240px]"
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
      className={`relative w-[220px] md:w-[240px] rounded-xl overflow-visible border
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
    <div className={`px-3 py-2 flex justify-between items-center text-xs
    ${active ? "bg-purple-500/30 text-purple-200" : "text-zinc-500"}`}>
      <span className="font-semibold">{name}</span>
      {active && <span className="text-xs font-bold text-orange-400">WIN</span>}
    </div>
  );
}

function Connector({ active }) {
  return (
    <svg className="absolute right-[-80px] top-1/2" width="80" height="100">
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
      transition={{ delay: 2.6, duration: 1 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-[999]
      flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="text-6xl mb-6 animate-pulse">👑</div>
        <h1 className="text-5xl font-black">{champion}</h1>
        <p className="mt-3 text-orange-400 tracking-widest uppercase text-sm">
          Tournament Champions
        </p>
      </motion.div>
    </motion.div>
  );
}

function TournamentHero() {
  return (
    <section className="relative py-32 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF30,transparent_70%)]" />
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-black"
      >
        REGULAR 20 CAP
        <span className="block text-purple-400 text-4xl mt-4">
          2v2 TOURNAMENT
        </span>
      </motion.h1>
    </section>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/5 rounded-2xl p-6 flex gap-4
      items-center border border-white/10"
    >
      <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </motion.div>
  );
}

function PodiumFinal({ results }) {
  return (
    <div className="grid md:grid-cols-4 gap-8 mb-20">
      {results.map((r, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -12, scale: 1.05 }}
          className={`relative p-8 rounded-3xl border
          ${r.place === "1st"
            ? "bg-gradient-to-br from-yellow-400/30 to-orange-500/20 border-yellow-400/40 shadow-[0_0_160px_#F59E0B]"
            : "bg-white/5 border-white/10"}`}
        >
          {r.place === "1st" && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl">
              👑
            </div>
          )}
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            {r.place}
          </p>
          <h3 className="text-2xl font-extrabold mt-2">{r.team}</h3>
          <p className="mt-1 text-orange-400 font-semibold">{r.score}</p>
        </motion.div>
      ))}
    </div>
  );
}