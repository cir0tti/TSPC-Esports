import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserMenu from "./UserMenu";

/* ================= STAFF ================= */
const staff = [
  { name: "Skull", role: "Founder", avatar: "/staff/skull.jpg", color: "#7B2CFF" },
  { name: "Pr3dator", role: "Founder", avatar: "/staff/predator.png", color: "#FF7A00" },
  { name: "Chucci", role: "Founder", avatar: "/staff/chucci.jpg", color: "#00FFA2" },
  { name: "Cirotti", role: "Developer", avatar: "/staff/cirotti.png", color: "#7B2CFF" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="relative flex items-center px-6 md:px-24 h-16">

          {/* LOGO */}
          <img src="/tspc-logo.jpg" className="w-24" alt="TSPC Logo" />

          {/* ================= NAV DESKTOP ================= */}
          <nav
            className="
              hidden md:flex items-center gap-10
              px-10 py-3
              absolute left-1/2 -translate-x-1/2
              rounded-full
              bg-black/40 backdrop-blur-xl
              border border-white/10
              shadow-[0_0_40px_rgba(0,0,0,0.6)]
            "
          >
            {[
              { label: "Torneos", color: "#7B2CFF" },
              { label: "Rankings", color: "#7B2CFF" },
              { label: "Equipos", color: "#7B2CFF" },
              { label: "Livestreams", to: "/livestreams", color: "#FF7A00" },
              { label: "Ruleta", to: "/ruleta", color: "#00FFA2" },
            ].map(({ label, to, color }) => {
              const Tag = to ? Link : "a";
              return (
                <Tag
                  key={label}
                  to={to}
                  className="relative group text-xs uppercase tracking-[0.32em] text-white/70 transition"
                >
                  <span className="relative z-10 group-hover:text-white">
                    {label}
                  </span>

                  <span
                    className="
                      absolute left-1/2 -translate-x-1/2 -bottom-2
                      h-[2px] w-0 group-hover:w-6
                      transition-all duration-500
                    "
                    style={{ backgroundColor: color }}
                  />

                  <span
                    className="
                      absolute inset-0 rounded-full opacity-0
                      group-hover:opacity-100 blur-lg
                      transition duration-500
                    "
                    style={{ backgroundColor: `${color}20` }}
                  />
                </Tag>
              );
            })}
          </nav>

          {/* ================= RIGHT ================= */}
          <div className="ml-auto flex items-center gap-6">

            {/* STAFF ICONS */}
            <div className="hidden lg:flex items-center gap-2 relative">
              {staff.map((member) => (
                <div
                  key={member.name}
                  className="staff-icon group"
                  style={{ "--glow": member.color }}
                >
                  <img src={member.avatar} alt={member.name} />
                  <div className="staff-tooltip">
                    <p className="staff-name">{member.name}</p>
                    <span className="staff-role">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* BUY CTA */}
            <Link to="/pricing" className="hidden md:block">
              <button
                className="
                  relative group px-8 py-3
                  font-black uppercase tracking-[0.32em]
                  text-black rounded-md
                  bg-[#FF7A00]
                  shadow-[0_0_35px_rgba(255,122,0,0.45)]
                  transition-all duration-500
                  hover:shadow-[0_0_60px_rgba(255,122,0,0.85)]
                  hover:-translate-y-[1px]
                "
              >
                <span className="absolute inset-0 rounded-md bg-[#FF7A00]/50 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <span className="relative z-10">Buy</span>
              </button>
            </Link>

            {/* LOGIN / USER */}
            {user ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <a
                href="http://localhost:5000/auth/discord"
                className="
                  hidden md:flex items-center gap-2
                  px-6 py-2 rounded-md
                  border border-white/20
                  text-xs tracking-[0.35em] uppercase
                  hover:bg-white/10 transition
                "
              >
                Login
              </a>
            )}

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white text-3xl z-50"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div
          className="
            fixed inset-0 z-[999]
            bg-gradient-to-br from-black via-[#120016] to-black
            backdrop-blur-2xl
            flex flex-col items-center justify-center px-6
          "
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl hover:text-[#7B2CFF] transition"
          >
            ✕
          </button>

          <img
            src="/tspc-logo.jpg"
            className="w-28 mb-10 drop-shadow-[0_0_25px_rgba(123,44,255,0.6)]"
            alt="TSPC"
          />

          <nav className="flex flex-col gap-6 text-center uppercase tracking-[0.35em] text-sm text-white/80">
            <Link to="/livestreams" onClick={() => setMenuOpen(false)}>Livestreams</Link>
            <Link to="/ruleta" onClick={() => setMenuOpen(false)}>Ruleta</Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          </nav>

          <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
            {!user && (
              <button
                onClick={() => window.location.href = "http://localhost:5000/auth/discord"}
                className="
                  w-full py-4 rounded-xl font-bold uppercase tracking-[0.3em]
                  bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00]
                  hover:scale-[1.05] transition
                "
              >
                Login
              </button>
            )}
          </div>

          <span className="mt-10 text-xs text-white/30 tracking-widest">
            TSPC ESPORTS © 2026
          </span>
        </div>
      )}
    </>
  );
}
