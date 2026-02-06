import React, { useState } from "react"
import { Link } from "react-router-dom"
import PremiumPreviewGate from "../components/PremiumPreviewGate"
import { useAuth } from "../context/AuthContext"
import { useUserPlan } from "../hooks/useUserPlan"

const PLATFORMS = [
  { id: "twitch", label: "Twitch", color: "#9146FF" },
  { id: "kick", label: "Kick", color: "#00FFA3" },
  { id: "tiktok", label: "TikTok", color: "#FFFFFF" },
]

/* ============================= */
/* CONTENIDO REAL DE LA PÁGINA */
/* ============================= */
function LivestreamsContent() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState([])
  const [platform, setPlatform] = useState("twitch")
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query.trim() || platform !== "twitch") return
    setLoading(true)
    setResults([])

    try {
      const res = await fetch(
        `https://api.twitch.tv/helix/search/channels?query=${query}&live_only=true&first=24`,
        {
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
          },
        }
      )
      const data = await res.json()
      setResults(data.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const toggleStream = (stream) => {
    const exists = selected.find((s) => s.id === stream.id)
    exists
      ? setSelected(selected.filter((s) => s.id !== stream.id))
      : setSelected([...selected, stream])
  }

  const gridCols =
    selected.length === 1
      ? "grid-cols-1"
      : selected.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"

  return (
    <div className="relative min-h-screen bg-black text-white px-4 sm:px-8 lg:px-10 py-20 sm:py-24 overflow-hidden">
      {/* BACKGROUND FX */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#7B2CFF30,transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom,#FF7A0020,transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.035] bg-[url('/noise.png')] pointer-events-none" />

      {/* HEADER */}
      <section className="relative max-w-6xl mx-auto text-center mb-20 sm:mb-28">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
          <span className="text-white/70">TSPC</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2CFF] via-[#FF7A00] to-[#7B2CFF] animate-gradient">
            LIVE CONTROL ROOM
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
          Producción en vivo, múltiples plataformas y control total. Esta no es
          una vista de streams, es una{" "}
          <span className="text-white font-semibold">
            experiencia de torneo
          </span>.
        </p>
      </section>

      {/* PLATFORM SELECTOR */}
      <section className="max-w-5xl mx-auto mb-16 sm:mb-24">
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPlatform(p.id)
                setResults([])
                setSelected([])
              }}
              className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-full uppercase tracking-[0.3em]
              text-[10px] sm:text-xs font-black transition-all duration-500
              ${
                platform === p.id
                  ? "text-black"
                  : "text-white/50 border border-white/15 hover:text-white"
              }`}
              style={{
                background: platform === p.id ? p.color : "transparent",
                boxShadow:
                  platform === p.id ? `0 0 60px ${p.color}90` : "none",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      {/* SEARCH */}
      {platform === "twitch" && (
        <section className="max-w-3xl mx-auto mb-20 sm:mb-28">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Buscar transmisiones en vivo"
              className="flex-1 px-6 sm:px-7 py-4 sm:py-5 rounded-2xl bg-white/5 border border-white/10
              focus:border-[#7B2CFF] outline-none backdrop-blur transition"
            />
            <button
              onClick={search}
              className="px-10 sm:px-12 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.25em]
              bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00]
              text-black shadow-[0_0_60px_rgba(123,44,255,0.6)]
              hover:scale-[1.05] transition"
            >
              Buscar
            </button>
          </div>
        </section>
      )}

      {/* MULTISTREAM */}
      {selected.length > 0 && (
        <section className="max-w-[1700px] mx-auto mb-28 sm:mb-36">
          <h2 className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-6 sm:mb-8">
            Multistream Activo · {selected.length}
          </h2>

          <div className={`grid gap-8 sm:gap-12 ${gridCols}`}>
            {selected.map((s) => (
              <div
                key={s.id}
                className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden
                bg-black border border-white/10
                shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
              >
                <button
                  onClick={() => toggleStream(s)}
                  className="absolute top-4 right-4 z-20 px-3 py-1 rounded-lg
                  bg-black/70 hover:bg-red-600 text-xs transition"
                >
                  ✕
                </button>

                <iframe
                  src={`https://player.twitch.tv/?channel=${s.broadcaster_login}&parent=${window.location.hostname}`}
                  allowFullScreen
                  className="w-full aspect-video"
                />

                <div className="p-4 sm:p-6 bg-black/80 backdrop-blur">
                  <h3 className="font-bold text-base sm:text-lg">
                    {s.display_name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {s.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RESULTS */}
      {platform === "twitch" && (
        <section className="max-w-7xl mx-auto">
          {loading && (
            <div className="text-center text-gray-500 animate-pulse mb-16 sm:mb-20">
              Buscando streams en vivo...
            </div>
          )}

          <div className="grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => {
              const active = selected.find((x) => x.id === s.id)
              return (
                <div
                  key={s.id}
                  onClick={() => toggleStream(s)}
                  className={`cursor-pointer rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden
                  border transition-all duration-500 hover:-translate-y-2
                  shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                  ${
                    active
                      ? "border-[#7B2CFF] bg-[#7B2CFF]/10"
                      : "border-white/10 bg-white/5 hover:border-[#7B2CFF]"
                  }`}
                >
                  <img
                    src={s.thumbnail_url
                      .replace("{width}", "640")
                      .replace("{height}", "360")}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold">{s.display_name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {s.title}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* GRADIENT ANIMATION */}
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

/* ============================= */
/* WRAPPER PREMIUM (EXPORT) */
/* ============================= */
export default function Livestreams() {
  const { user, loading: authLoading } = useAuth()
  const { plan, loading: planLoading } = useUserPlan(user)

  if (authLoading || planLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Cargando...
      </div>
    )
  }

  return (
    <PremiumPreviewGate active={!plan}>
      <LivestreamsContent />
    </PremiumPreviewGate>
  )
}
