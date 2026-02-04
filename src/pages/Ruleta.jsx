import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function RuletaPremium() {
  const canvasRef = useRef(null);
  const [allItems, setAllItems] = useState([]); // Todos los jugadores originales
  const [availableItems, setAvailableItems] = useState([]); // Jugadores en ruleta actual
  const [input, setInput] = useState("");
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [matches, setMatches] = useState([]);
  const [spinMode, setSpinMode] = useState("normal");

  const size = 460;
  const radius = size / 2;
  const colors = ["#7B2CFF", "#FF7A00", "#4A3DFB", "#FF5500", "#00D4FF", "#00FFB2"];

  useEffect(() => {
    document.body.style.cursor = "default";
    return () => (document.body.style.cursor = "default");
  }, []);

const waitForStateUpdate = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);
  };

const drawWheel = (rotation = 0, items = availableItems) => {
  const canvas = canvasRef.current;
  if (!canvas || items.length === 0) {
    clearCanvas();
    return;
  }

  const ctx = canvas.getContext("2d");
  const arc = (2 * Math.PI) / items.length;
  ctx.clearRect(0, 0, size, size);

  // Glow externo
  const glow = ctx.createRadialGradient(
    radius,
    radius,
    radius * 0.5,
    radius,
    radius,
    radius
  );
  glow.addColorStop(0, "rgba(123,44,255,0.35)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI * 2);
  ctx.fill();

  items.forEach((item, i) => {
    const start = arc * i + rotation;

    ctx.beginPath();
    ctx.fillStyle = item.color;
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, start, start + arc);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(start + arc / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 4;
    ctx.fillText(item.label, radius - 18, 6);
    ctx.restore();
  });

  // Centro
  ctx.beginPath();
  ctx.fillStyle = "#0f0f1a";
  ctx.arc(radius, radius, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#7B2CFF";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Flecha superior
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(radius, 6);
  ctx.lineTo(radius - 18, 44);
  ctx.lineTo(radius + 18, 44);
  ctx.closePath();
  ctx.fill();
};

  useEffect(() => {
    drawWheel(angle);
  }, [availableItems, angle]);

  const getWinner = (finalAngle) => {
    const arc = (2 * Math.PI) / availableItems.length;
    const normalized =
      ((2 * Math.PI) - ((finalAngle + Math.PI / 2) % (2 * Math.PI))) %
      (2 * Math.PI);
    const index = Math.floor(normalized / arc);
    return availableItems[index];
  };

const spinOnce = (items) =>
  new Promise((resolve) => {
    let currentAngle = 0; // 🔥 RESET SIEMPRE
    let velocity = Math.random() * 0.45 + 0.55;
    const friction = 0.988;

    const animate = () => {
      currentAngle += velocity;
      velocity *= friction;
      setAngle(currentAngle);

      drawWheel(currentAngle, items);

      if (velocity < 0.002) {
        const arc = (2 * Math.PI) / items.length;
        const normalized =
          ((2 * Math.PI) - ((currentAngle + Math.PI / 2) % (2 * Math.PI))) %
          (2 * Math.PI);
        const index = Math.floor(normalized / arc);

        confetti({ particleCount: 140, spread: 75, origin: { y: 0.6 } });
        resolve(items[index]);
      } else {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  });

const spin = async () => {
  if (spinning || availableItems.length === 0) return;

  setSpinning(true);
  setWinner(null);

  const modeMap = { "1v1": 2, "2v2": 4, "3v3": 6 };
  const picksNeeded = modeMap[spinMode] || 2;

  let remaining = [...availableItems];
  let selected = [];

  for (let i = 0; i < picksNeeded; i++) {
    if (remaining.length === 0) break;

    const result = await spinOnce(remaining);
    selected.push(result);

    // ❌ eliminar ANTES del siguiente giro
    remaining = remaining.filter(p => p.label !== result.label);
    setAvailableItems(remaining);

    // pequeña pausa visual
    await new Promise(r => setTimeout(r, 150));
  }

  const half = picksNeeded / 2;

  setMatches(prev => [
    ...prev,
    {
      id: Date.now(),
      teamA: selected.slice(0, half),
      teamB: selected.slice(half),
    },
  ]);

  setWinner(
    `${selected.slice(0, half).map(p => p.label).join(", ")} vs ${
      selected.slice(half).map(p => p.label).join(", ")
    }`
  );

  setSpinning(false);
};

  const addItem = () => {
    if (!input.trim()) return;

    const newItem = {
      label: input.trim(),
      color: colors[allItems.length % colors.length], // color fijo desde origen
    };

    setAllItems((prev) => [...prev, newItem]);
    setAvailableItems((prev) => [...prev, newItem]);
    setInput("");
  };

  const clearItems = () => {
    setAllItems([]);
    setAvailableItems([]);
    setWinner(null);
    setAngle(0);
    setMatches([]);
    clearCanvas();
  };

  const resetToTable = () => {
    // 🔁 AHORA REINICIA A TODOS LOS JUGADORES ORIGINALES
    if (allItems.length === 0) return;

    setAvailableItems(allItems);
    setMatches([]);
    setWinner(null);
    setAngle(0);
  };

  return (
    <div className="min-h-screen bg-[#0b0b16] text-white px-4 pt-16 pb-12 flex flex-col items-center">
      <h1 className="relative z-10 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] bg-clip-text text-transparent mb-10">
        🎡 Ruleta TSPC
      </h1>

      <div className="flex flex-col xl:flex-row gap-10 w-full max-w-7xl">
        {/* RULETA */}
        <div className="flex flex-col items-center gap-6 flex-1">
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Escribe un nombre..."
              className="w-full sm:w-64 px-4 py-3 rounded-xl bg-[#0f0f1a] border border-white/10 cursor-text"
            />
            <button
              onClick={addItem}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] font-bold cursor-pointer"
            >
              Añadir
            </button>
          </div>

          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[460px]">
            <canvas
              ref={canvasRef}
              width={size}
              height={size}
              className="w-full h-auto rounded-full shadow-[0_0_60px_rgba(123,44,255,0.7)]"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
            <select
              value={spinMode}
              onChange={(e) => setSpinMode(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[#0f0f1a] border border-white/10 cursor-pointer w-full sm:w-auto"
            >
              <option value="1v1">1 vs 1</option>
              <option value="2v2">2 vs 2</option>
              <option value="3v3">3 vs 3</option>
            </select>

            <button
              onClick={spin}
              disabled={spinning || availableItems.length === 0}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] font-extrabold disabled:opacity-50 cursor-pointer w-full sm:w-auto"
            >
              {spinning ? "Girando..." : "🎯 Girar Ruleta"}
            </button>
          </div>

          {winner && (
            <div className="mt-2 px-6 py-4 rounded-xl bg-black/40 text-center w-full sm:w-auto">
              <p className="text-sm opacity-60">RESULTADO</p>
              <p className="text-xl font-extrabold text-[#FF7A00]">
                {winner}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={resetToTable}
              className="px-6 py-3 rounded-xl bg-[#0f0f1a] border border-white/10 hover:bg-white/5 transition font-semibold"
            >
              🔁 Reiniciar ruleta
            </button>
            <button
              onClick={clearItems}
              className="px-6 py-3 rounded-xl bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 transition font-semibold"
            >
              🧹 Limpiar todo
            </button>
          </div>
        </div>

        {/* TABLA */}
        <div className="flex-1 bg-gradient-to-br from-[#0f0f1a] to-[#0b0b16] border border-white/10 rounded-3xl p-6 shadow-[0_0_40px_rgba(123,44,255,0.25)]">
          <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] bg-clip-text text-transparent">
            ⚔️ Enfrentamientos
          </h2>

          {matches.length === 0 ? (
            <p className="opacity-50 text-sm">Aún no hay enfrentamientos.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {matches.map((match, index) => (
                <div
                  key={match.id}
                  className="relative bg-[#0f0f1a] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(123,44,255,0.15)] hover:scale-[1.01] transition"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs opacity-50">Team A</p>
                    <div className="flex gap-2 flex-wrap">
                      {match.teamA.map((player) => (
                        <span
                          key={player.label}
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{ backgroundColor: player.color }}
                        >
                          {player.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-xl font-extrabold text-[#FF7A00]">
                    VS
                  </span>

                  <div className="flex flex-col gap-1 items-end">
                    <p className="text-xs opacity-50">Team B</p>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {match.teamB.map((player) => (
                        <span
                          key={player.label}
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{ backgroundColor: player.color }}
                        >
                          {player.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="absolute -top-3 -left-3 text-xs px-3 py-1 rounded-full bg-black/60 border border-white/10">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
