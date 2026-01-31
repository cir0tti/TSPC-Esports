import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Clock,
  Flame,
  Users,
  Trophy,
  Zap,
  Eye,
  Shield,
} from "lucide-react";




function useHoverGlow() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    });
  };

  return { ref, pos, onMove };
}


/* ======================================
   🧠 DATA
====================================== */
const initialTeams = [
  {
    id: 1,
    name: "Crimson Phoenix",
    logo: "https://static.vecteezy.com/system/resources/previews/050/126/279/non_2x/the-logo-for-the-v-esports-team-vector.jpg",
    tier: "ELITE",
    game: "Warzone",
    region: "LATAM",
    players: 3,
    achievements: "Top 3 Global Cup",
    status: "ACTIVE",
    energy: 88,
    visibility: 91,
    description:
      "Un roster renacido del caos, agresivo en early game y letal en el cierre.",
    paidUntil: Date.now() + 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: 2,
    name: "Skull Empire",
    logo: "https://img.freepik.com/vector-gratis/plantilla-logotipo-juegos-degradados_52683-140655.jpg",
    tier: "PRO",
    game: "Warzone",
    region: "LATAM",
    players: 4,
    achievements: "Champions League Qualifier",
    status: "ACTIVE",
    energy: 82,
    visibility: 87,
    description:
      "Estrategia silenciosa, rotaciones limpias y ejecuciones sin errores.",
    paidUntil: Date.now() + 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: 3,
    name: "Evos Team",
    logo: "https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/Top-25-Most-Famous-Esports-Team-Logos/Evos.png",
    tier: "ELITE",
    game: "Warzone",
    region: "LATAM",
    players: 3,
    achievements: "Top 5 Continental Finals",
    status: "ACTIVE",
    energy: 90,
    visibility: 94,
    description:
      "Disciplina militar y presión constante. Nunca retroceden.",
    paidUntil: Date.now() + 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 4,
    name: "Team Envy",
    logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/orange-ninja-esports-team-logo-design-template-1c553ff004b390c66f017d133e14f65e_screen.jpg?ts=1734420042",
    tier: "PRO",
    game: "Warzone",
    region: "LATAM",
    players: 4,
    achievements: "Rising Stars Award",
    status: "ACTIVE",
    energy: 79,
    visibility: 85,
    description:
      "Velocidad, creatividad y jugadas impredecibles que rompen el meta.",
    paidUntil: Date.now() + 1000 * 60 * 60 * 24 * 14,
  },
  
];

/* ======================================
   COMPONENT
====================================== */
export default function Promocion() {
  const [teams, setTeams] = useState(initialTeams);

  useEffect(() => {
    const i = setInterval(() => {
      setTeams((t) => t.filter((x) => x.paidUntil > Date.now()));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white overflow-hidden">
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-purple-500/10 animate-spin-slow" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-orange-500/20 blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 blur-[200px]" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* TEXT */}
          <div>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-4 py-1 text-xs rounded-full bg-purple-600/20 border border-purple-500/40">
                PROMOTION SYSTEM
              </span>
              <span className="px-4 py-1 text-xs rounded-full bg-orange-500/20 border border-orange-500/40">
                LIVE ECOSYSTEM
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                TSPC
              </span>
              <br />
              TEAM PROMOTION
            </h1>

            <p className="mt-6 text-gray-400 max-w-xl">
              Un ecosistema visual donde los teams no se muestran,
              <span className="text-white"> dominan.</span>
            </p>

            {/* STATS */}
<div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
  <Stat icon={<Eye size={18} />} label="Daily Views" value="12.4K" />
  <Stat icon={<Zap size={18} />} label="Active Teams" value="28" />
  <Stat icon={<Shield size={18} />} label="Verified" value="100%" />
</div>

            <div className="flex flex-wrap gap-6 mt-12">
<CTA
  text="PROMOTE MY TEAM"
  onClick={() => {
    document.getElementById("pricing-section")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
/>

<CTA
  secondary
  text="TEAMS"
  onClick={() => {
    document.getElementById("teams-section")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
/>
            </div>
          </div>

          {/* VISUAL – WARZONE RADAR */}
          <div className="relative hidden md:flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-80 h-80 rounded-full border border-purple-500/40 backdrop-blur-xl"
            >
              {/* GRID */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* SWEEP */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(168,85,247,0.4), transparent 60%)",
                }}
              />

              {/* BLIPS */}
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-2 h-2 bg-orange-400 rounded-full"
                  style={{
                    top: `${20 + i * 10}%`,
                    left: `${30 + i * 8}%`,
                  }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section
  id="pricing-section"
  className="relative z-10 max-w-7xl mx-auto px-6 pb-40"
>
        <h2 className="text-4xl font-bold text-center mb-14">
          Promotion Plans
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          <PriceCard
            title="STARTER"
            price="$9"
            desc="Ideal para nuevos teams"
            features={["7 días", "Visibilidad básica", "Listado activo"]}
          />
          <PriceCard
            highlight
            title="PRO"
            price="$19"
            desc="El más popular"
            features={[
              "14 días",
              "Alta visibilidad",
              "Animación destacada",
              "Más views",
            ]}
          />
          <PriceCard
            title="ELITE"
            price="$39"
            desc="Dominio total"
            features={[
              "30 días",
              "Máxima visibilidad",
              "Posición prioritaria",
              "Efectos premium",
            ]}
          />
        </div>
      </section>

      {/* ================= TEAMS ================= */}
      <section
  id="teams-section"
  className="relative z-10 max-w-7xl mx-auto px-6 pb-40"
>
        <h2 className="text-4xl font-bold mb-12">Promoted Teams</h2>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {teams.map((team) => {
            const days = Math.floor(
              (team.paidUntil - Date.now()) / 86400000
            );

            return (
              <motion.div
                key={team.id}
                whileHover={{ scale: 1.03 }}
                className="rounded-3xl bg-gradient-to-br from-purple-600/30 to-black border border-purple-500/30 p-8"
              >
                <div className="flex justify-between mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-500 text-black">
                    {team.tier}
                  </span>
                  <span className="text-xs text-orange-400 flex items-center gap-1">
                    <Flame size={14} /> {team.status}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={team.logo}
                    className="w-20 h-20 rounded-full border-2 border-orange-400"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{team.name}</h3>
                    <p className="text-xs text-gray-400">
                      {team.game} • {team.region}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mt-4">
                  {team.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                  <Info icon={<Users size={14} />} text={`${team.players} Players`} />
                  <Info icon={<Trophy size={14} />} text={team.achievements} />
                </div>

                <div className="mt-6">
                  <Bar label="Visibility" value={team.visibility} />
                  <Bar label="Energy" value={team.energy} color="orange" />
                </div>

                <div className="mt-6 flex justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {days} days left
                  </span>
                  <span>LIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ======================================
   SMALL COMPONENTS
====================================== */
const Stat = ({ icon, label, value }) => (
  <div className="relative group w-full">
    {/* halo */}
    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-orange-500/40 via-purple-500/40 to-cyan-400/40 opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />

    <div
      className="
        relative
        rounded-2xl
        p-4 sm:p-5
        bg-black/60 backdrop-blur-xl
        border border-white/10
        flex items-center sm:items-center
        gap-3 sm:gap-4
        transition
        group-hover:-translate-y-1
      "
    >
      {/* ICON */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-xl bg-orange-500 blur-md opacity-50" />
        <div className="relative p-3 sm:p-3.5 rounded-xl bg-gradient-to-br from-orange-400 to-purple-600 text-black">
          {icon}
        </div>
      </div>

      {/* TEXT */}
      <div className="min-w-0">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-white/50 truncate">
          {label}
        </p>
        <p className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
          {value}
        </p>
      </div>
    </div>
  </div>
);



const CTA = ({ text, secondary, onClick }) => (
  <div
    onClick={onClick}
    className={`relative inline-flex items-center justify-center px-10 py-4 rounded-full cursor-pointer select-none
      font-black text-[11px] tracking-[0.45em] uppercase overflow-hidden transition-all duration-500
      ${
        secondary
          ? "border border-white/20 text-white/70 hover:text-white"
          : "text-black"
      }
    `}
  >
    {!secondary && (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-purple-600" />
        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-[radial-gradient(circle_at_top,#ffffff80,transparent_60%)] transition" />
      </>
    )}

    <span className="relative z-10">{text}</span>
  </div>
);

const Info = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-300">
    {icon} {text}
  </div>
);

const Bar = ({ label, value, color = "purple" }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
      <span>{label}</span>
      <span className="text-white/60 font-bold">{value}%</span>
    </div>

    <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${
          color === "orange"
            ? "from-orange-400 via-orange-500 to-orange-600"
            : "from-purple-500 via-purple-600 to-purple-700"
        } shadow-[0_0_25px_rgba(255,138,0,0.6)]`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);


const rarityConfig = {
  common: {
    label: "COMMON",
    glow: "from-gray-400/30 to-gray-600/30",
    accent: "text-gray-300",
    border: "border-white/10",
  },
  epic: {
    label: "EPIC",
    glow: "from-purple-500/40 to-fuchsia-500/30",
    accent: "text-purple-400",
    border: "border-purple-400/40",
  },
  legendary: {
    label: "LEGENDARY",
    glow: "from-orange-400/60 via-orange-500/40 to-purple-600/40",
    accent: "text-orange-400",
    border: "border-orange-400/60",
  },
};


const Particles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(18)].map((_, i) => (
      <span
        key={i}
        className="absolute w-[2px] h-[2px] bg-white/40 rounded-full animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

const PriceCard = ({
  title,
  price,
  desc,
  features,
  rarity = "common",
}) => {
  const { glow, accent, border, label } = rarityConfig[rarity];
  const { ref, pos, onMove } = useHoverGlow();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -14 }}
      className={`relative group rounded-[3rem] p-10 overflow-hidden bg-black/70 backdrop-blur-xl border ${border}`}
    >
      {/* HOVER FOLLOW GLOW */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_${pos.x}_${pos.y},rgba(255,138,0,0.35),transparent_65%)]`}
      />

      {/* GRADIENT HALO */}
      <div
        className={`absolute -inset-1 blur-2xl opacity-40 bg-gradient-to-br ${glow}`}
      />

      <Particles />

      {/* BADGE */}
      <div className={`absolute top-6 right-6 text-[10px] font-black tracking-widest ${accent}`}>
        {label}
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl font-black">{title}</h3>
        <p className="mt-2 text-white/50 text-sm">{desc}</p>

        <p className={`mt-8 text-5xl font-black ${accent}`}>
          {price}
        </p>

        <ul className="mt-8 space-y-4 text-sm text-white/80">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              {f}
            </li>
          ))}
        </ul>

        <button
          className={`mt-10 w-full py-4 rounded-full font-black tracking-[0.4em] text-xs uppercase
          bg-gradient-to-r from-orange-400 to-purple-600 text-black`}
        >
          SELECT PLAN
        </button>
      </div>
    </motion.div>
  );
};


