
import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function RuletaPremium() {
  const canvasRef = useRef(null);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const size = 460;
  const radius = size / 2;
  const colors = ["#7B2CFF", "#FF7A00", "#4A3DFB", "#FF5500"];

  // 🟢 FORZAR CURSOR VISIBLE (FIX DEFINITIVO)
  useEffect(() => {
    document.body.style.cursor = "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);
  };

  const drawWheel = (rotation = 0) => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) {
      clearCanvas();
      return;
    }

    const ctx = canvas.getContext("2d");
    const arc = (2 * Math.PI) / items.length;
    ctx.clearRect(0, 0, size, size);

    // Glow
    const glow = ctx.createRadialGradient(
      radius,
      radius,
      radius * 0.4,
      radius,
      radius,
      radius
    );
    glow.addColorStop(0, "rgba(123,44,255,0.25)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.fill();

    // Slices
    items.forEach((item, i) => {
      const start = arc * i + rotation;

      ctx.beginPath();
      ctx.fillStyle = item.color;
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, start, start + arc);
      ctx.fill();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(start + arc / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "right";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 4;
      ctx.fillText(item.label, radius - 20, 6);
      ctx.restore();
    });

    // Center
    ctx.beginPath();
    ctx.fillStyle = "#0f0f1a";
    ctx.arc(radius, radius, 42, 0, Math.PI * 2);
    ctx.fill();

    // Arrow (TOP)
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(radius, 6);
    ctx.lineTo(radius - 16, 42);
    ctx.lineTo(radius + 16, 42);
    ctx.closePath();
    ctx.fill();
  };

  useEffect(() => {
    drawWheel(angle);
  }, [items, angle]);

  // 🎯 GANADOR CORRECTO (DESFASE π/2)
  const getWinner = (finalAngle) => {
    const arc = (2 * Math.PI) / items.length;

    const normalized =
      ((2 * Math.PI) - ((finalAngle + Math.PI / 2) % (2 * Math.PI))) %
      (2 * Math.PI);

    const index = Math.floor(normalized / arc);
    return items[index];
  };

  const spin = () => {
    if (spinning || items.length === 0) return;

    setWinner(null);
    setSpinning(true);

    let currentAngle = angle;
    let velocity = Math.random() * 0.4 + 0.5;
    const friction = 0.988;

    const animate = () => {
      currentAngle += velocity;
      velocity *= friction;

      setAngle(currentAngle);
      drawWheel(currentAngle);

      if (velocity < 0.002) {
        setSpinning(false);

        const result = getWinner(currentAngle);
        setWinner(result.label);

        confetti({
          particleCount: 160,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const addItem = () => {
    if (!input.trim()) return;

    setItems((prev) => [
      ...prev,
      {
        label: input.trim(),
        color: colors[prev.length % colors.length],
      },
    ]);
    setInput("");
  };

  const clearItems = () => {
    setItems([]);
    setWinner(null);
    setAngle(0);
    clearCanvas();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 text-white bg-[#0b0b16]"
      style={{ cursor: "default" }} // 🔒 extra seguridad
    >
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] bg-clip-text text-transparent">
        🎡 Ruleta de la Suerte
      </h1>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Escribe un nombre..."
          className="px-4 py-3 rounded-xl bg-[#0f0f1a] border border-white/10 cursor-text"
        />
        <button
          onClick={addItem}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] font-bold cursor-pointer"
        >
          Añadir
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="rounded-full shadow-[0_0_60px_rgba(123,44,255,0.7)]"
        style={{ cursor: "pointer" }}
      />

      <button
        onClick={spin}
        disabled={spinning || items.length === 0}
        className="px-10 py-4 rounded-full bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00] font-extrabold disabled:opacity-50 cursor-pointer"
      >
        {spinning ? "Girando..." : "🎯 Girar Ruleta"}
      </button>

      {winner && (
        <div className="mt-4 px-6 py-4 rounded-xl bg-black/40 text-center">
          <p className="text-sm opacity-60">GANADOR</p>
          <p className="text-3xl font-extrabold text-[#FF7A00]">{winner}</p>
        </div>
      )}

      {items.length > 0 && (
        <button
          onClick={clearItems}
          className="text-xs opacity-50 hover:opacity-100 underline cursor-pointer"
        >
          Limpiar ruleta
        </button>
      )}
    </div>
  );
}
