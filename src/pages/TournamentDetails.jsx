import React, { useEffect, useState, useMemo, Suspense, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaUsers, FaBolt, FaShieldAlt, FaPlay } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import Particles from 'react-tsparticles';

// =====================================
// TournamentDetails_Stellar.jsx
// "Nivel 100000000" — Futurista, responsive, con partículas y un toque 3D.
// Requisitos (instala en tu proyecto):
// npm i framer-motion react-icons @react-three/fiber three @react-three/drei react-tsparticles tsparticles
// (ya necesitas @supabase/supabase-js y tailwindcss configurado)
// =====================================

// Lightweight floating 3D object for subtle parallax/3D effect
function FloatingShard({ color = '#7c3aed', speed = 0.002, depth = 0 }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(t * 0.3 + depth) * 0.3;
    ref.current.rotation.y = Math.cos(t * 0.2 + depth) * 0.3;
    ref.current.position.y = Math.sin(t * speed + depth) * 0.3;
  });

  return (
    <mesh ref={ref} position={[Math.sin(depth) * 0.5, 0, depth - 2]}>
      <icosahedronGeometry args={[0.6, 2]} /> {/* 👈 corregido */}
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={1.2}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function TournamentDetailsStellar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchAll = async () => {
      try {
        const { data: tourData, error: tourError } = await supabase
          .from('tournaments')
          .select('*')
          .eq('id', id)
          .single();
        if (tourError) throw tourError;
        setTournament(tourData);

        const { data: teamsData, error: teamsError } = await supabase
          .from('teams')
          .select('*')
          .eq('tournament_id', id)
          .order('points', { ascending: false })
          .limit(200);
        if (teamsError) throw teamsError;
        setTeams(teamsData || []);

        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select('*, team:team_id(name, logo_url)')
          .eq('tournament_id', id)
          .order('kills', { ascending: false })
          .limit(200);
        if (playersError) throw playersError;
        setPlayers(playersData || []);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al cargar datos.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();

    // realtime subscription (optional)
// Realtime para equipos
const teamSub = supabase
  .channel('teams-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'teams', filter: `tournament_id=eq.${id}` },
    () => setRefreshKey((k) => k + 1)
  )
  .subscribe();

// Realtime para jugadores
const playerSub = supabase
  .channel('players-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'players', filter: `tournament_id=eq.${id}` },
    () => setRefreshKey((k) => k + 1)
  )
  .subscribe();

// Limpieza al desmontar
return () => {
  supabase.removeChannel(teamSub);
  supabase.removeChannel(playerSub);
};
    return () => {
      // cleanup: remove subscriptions if API supports remove
      try { supabase.removeSubscription(teamSub); supabase.removeSubscription(playerSub); } catch (e) {}
    };
  }, [id, refreshKey]);

  const topTeams = useMemo(() => teams.slice(0, 10), [teams]);
  const topFraggers = useMemo(() => players.slice(0, 12), [players]);

  // Particles config — subtle neon
  const particlesOptions = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 30, density: { enable: true, area: 800 } },
      color: { value: ['#7c3aed', '#06b6d4', '#ff6fa3'] },
      links: { enable: true, distance: 200, color: '#ffffff22', opacity: 0.2 },
      move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'bounce' } },
      size: { value: { min: 1, max: 4 } },
      opacity: { value: 0.8 },
    },
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center px-6">
          <div className="animate-pulse text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
            Cargando torneo...
          </div>
          <div className="w-64 h-2 bg-gradient-to-r from-indigo-700 to-pink-600 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-red-900/80 text-white p-6 rounded-2xl backdrop-blur">
          <h3 className="text-xl font-bold">Error</h3>
          <p className="mt-2">{error}</p>
          <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );

  if (!tournament)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Torneo no encontrado</h2>
          <button className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-lg" onClick={() => navigate('/')}>Volver</button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-x-hidden">
      {/* Particles background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Particles options={particlesOptions} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      </div>

      {/* Top 3D subtle canvas for depth */}
      <div className="absolute inset-0 -z-20 opacity-60">
        <Canvas style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Suspense fallback={null}>
            <FloatingShard color="#7c3aed" depth={-1} />
            <FloatingShard color="#06b6d4" depth={-0.3} />
            <FloatingShard color="#ff6fa3" depth={0.4} />
          </Suspense>
        </Canvas>
      </div>

      {/* HERO */}
      <header className="relative py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="lg:col-span-2">
              <div className="backdrop-blur-md bg-gradient-to-r from-white/3 to-white/2 rounded-3xl p-6 lg:p-10 border border-white/6 shadow-xl relative overflow-hidden">
                {/* banner */}
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={tournament.banner_url || 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/486047110098469.5fe384050a50d.png'} alt="banner" className="w-full h-56 object-cover md:h-72 lg:h-96 transform hover:scale-105 transition-transform duration-700" />

                  {/* Glitch/overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/20 via-transparent to-pink-600/12 mix-blend-overlay pointer-events-none" />

                  <div className="absolute left-6 bottom-6">
                    <div className="inline-flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full border border-white/6">
                      <div className="p-2 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 shadow-lg">
                        <FaTrophy className="text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-300 uppercase tracking-widest">Evento</div>
                        <div className="font-extrabold text-xl md:text-2xl">{tournament.title}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* description & actions */}
                <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <p className="text-gray-300 max-w-3xl">{tournament.description}</p>

                  <div className="flex items-center gap-3">
                    <button onClick={() => window.open(tournament.registration_url || '#', '_blank')} className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-pink-600 to-indigo-700 shadow-2xl hover:scale-105 transform transition">
                      <FaPlay />
                      <span className="font-semibold">Unirse / Registrarse</span>
                    </button>

                    <button onClick={() => setRefreshKey((k) => k + 1)} className="px-4 py-2 rounded-lg bg-white/5 border border-white/6">Refrescar</button>
                  </div>
                </div>

                {/* hero stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-black/40 to-white/2 border border-white/6 text-center">
                    <div className="text-xs text-gray-400">Equipos</div>
                    <div className="font-bold text-lg">{teams.length}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-br from-black/40 to-white/2 border border-white/6 text-center">
                    <div className="text-xs text-gray-400">Top Fragger</div>
                    <div className="font-bold text-lg">{topFraggers[0]?.name ?? 'N/A'}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-br from-black/40 to-white/2 border border-white/6 text-center">
                    <div className="text-xs text-gray-400">Formato</div>
                    <div className="font-bold text-lg">{tournament.format ?? '-'}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-gradient-to-br from-black/40 to-white/2 border border-white/6 text-center">
                    <div className="text-xs text-gray-400">Comienza</div>
                    <div className="font-bold text-lg">{new Date(tournament.start_date).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* side card */}
            <motion.aside initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-black/60 to-white/4 border border-white/6 shadow-lg">
                <div className="text-sm text-gray-300">Detalles</div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Max Equipos</span><strong>{tournament.max_teams ?? '—'}</strong></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Formato</span><strong>{tournament.format ?? '—'}</strong></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Host</span><strong>{tournament.hosted_by ?? tournament.owner_id ?? '—'}</strong></div>
                </div>

                <div className="mt-4">
                  <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Link copiado!'); }} className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-700 to-pink-600">Compartir</button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-black/60 to-white/4 border border-white/6 shadow-lg">
                <div className="text-sm text-gray-300">Acciones</div>
                <div className="mt-3 flex flex-col gap-2">
                  <button className="px-3 py-2 rounded-lg bg-white/5">Soporte</button>
                  <button onClick={() => window.open('https://discord.gg/ktmaUX76TD', '_blank')} className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-700 to-pink-600">Conectar Discord</button>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </header>

      {/* MAIN: Leaderboard + sidebar */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-3"><span className="inline-flex items-center justify-center p-2 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full text-black"><FaShieldAlt /></span> Leaderboard</h2>
            <div className="text-sm text-gray-400">Live • actualizado</div>
          </div>

          <div className="space-y-4">
            {topTeams.map((team, idx) => (
              <motion.div key={team.id || idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className="flex items-center justify-between p-4 rounded-2xl border border-white/6 bg-gradient-to-br from-white/2 to-white/3 hover:scale-[1.02] transform transition">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-800 to-pink-700 flex items-center justify-center">
                    {team.logo_url ? <img src={team.logo_url} alt={team.name} className="w-full h-full object-cover" /> : <div className="text-sm font-bold">{team.name?.slice(0,2).toUpperCase()}</div>}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{team.name}</div>
                    <div className="text-xs text-gray-400">{team.kills ?? 0} kills • {team.deaths ?? 0} deaths</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right"><div className="text-sm text-gray-400">Points</div><div className="text-xl font-bold">{team.points ?? 0}</div></div>
                  <div className="px-3 py-1 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-full text-sm">#{idx+1}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="p-4 rounded-2xl border border-white/6 bg-gradient-to-br from-black/40 to-white/2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2"><span className="p-2 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 text-black"><FaBolt /></span> Top Fraggers</h3>
              <div className="text-xs text-gray-400">Live</div>
            </div>

            <div className="mt-3 space-y-3">
              {topFraggers.length === 0 && <div className="text-gray-400">No hay datos aún.</div>}
              {topFraggers.map((p, i) => (
                <div key={p.id || i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">{p.avatar_url ? <img src={p.avatar_url} className="w-full h-full object-cover" alt={p.name} /> : <div className="text-sm">{p.name?.charAt(0)?.toUpperCase()}</div>}</div>
                  <div className="flex-1"><div className="text-sm font-semibold">{p.name}</div><div className="text-xs text-gray-400">{p.team?.name ?? 'Sin equipo'} • {p.kills ?? 0} kills</div></div>
                  <div className="text-right"><div className="text-sm text-gray-400">K/D</div><div className="font-bold">{((p.kills ?? 0)/Math.max(1, p.deaths ?? 1)).toFixed(2)}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-white/6 bg-gradient-to-br from-black/40 to-white/2">
            <div className="flex items-center justify-between"><h3 className="font-bold">Equipos</h3><div className="text-xs text-gray-400">{teams.length} registrados</div></div>
            <div className="mt-3 space-y-2 max-h-64 overflow-auto">
              {teams.map((t, i) => (
                <div key={t.id || i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/2 cursor-pointer" onClick={() => alert(`${t.name} • ${t.points ?? 0} pts`)}>
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">{t.logo_url ? <img src={t.logo_url} className="w-full h-full object-cover" alt={t.name} /> : <div className="text-xs">{t.name?.slice(0,2).toUpperCase()}</div>}</div><div className="text-sm">{t.name}</div></div>
                  <div className="text-xs text-gray-400">{t.points ?? 0} pts</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-12 pb-12 text-sm text-gray-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>Powered by <strong>TSPC</strong> • Diseño estelar</div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-white/5">Soporte</button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-700 to-pink-600" onClick={() => window.open('https://discord.gg/ktmaUX76TD','_blank')}>Conectar Discord</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
