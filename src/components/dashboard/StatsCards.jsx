import React from "react";

export default function StatsCards() {
  const stats = [
    { label: "Torneos activos", value: 3 },
    { label: "Jugadores", value: 128 },
    { label: "Streams", value: 5 },
    { label: "Ingresos", value: "$420" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#121212] rounded-2xl p-6 border border-white/10"
        >
          <p className="text-white/60 text-sm">{s.label}</p>
          <p className="text-3xl font-bold mt-2">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
