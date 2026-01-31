import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CartButton from "./CartButton";
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

  const location = useLocation();
  const isPricing = location.pathname === "/pricing";

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Livestreams", to: "/livestreams" },
    { label: "Ruleta", to: "/ruleta" },
    { label: "Promocion", to: "/promocion" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="relative flex items-center h-16 px-6 md:px-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center z-10">
            <img src="/tspc-logo.jpg" className="w-24" alt="TSPC Logo" />
          </Link>

          {/* ================= NAV CENTER ================= */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.32em] text-white/70">
            {navItems.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="relative group transition hover:text-white"
              >
                {label}
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[2px] w-0 group-hover:w-6 transition-all duration-300 bg-[#7B2CFF]" />
              </Link>
            ))}
          </nav>

          {/* ================= RIGHT ================= */}
          <div className="ml-auto flex items-center gap-6">

            {/* STAFF */}
            <div className="hidden lg:flex items-center gap-2">
              {staff.map((member) => (
                <div
                  key={member.name}
                  className="relative group"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/20"
                    style={{ boxShadow: `0 0 0 transparent` }}
                  />

                  {/* TOOLTIP */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    <div
                      className="px-3 py-2 rounded-md text-xs text-white text-center backdrop-blur-xl bg-black/80 border border-white/10"
                      style={{ boxShadow: `0 0 25px ${member.color}40` }}
                    >
                      <p className="font-semibold">{member.name}</p>
                      <span className="text-white/60">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BUY */}
            <Link to="/pricing" className="hidden md:block">
              <button className="px-6 py-2 rounded-md text-xs uppercase tracking-[0.3em] font-bold bg-[#FF7A00] text-black hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] transition">
                Buy
              </button>
            </Link>

            {/* USER / LOGIN */}
            {user ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <a
                href="http://localhost:5000/auth/discord"
                className="hidden md:block px-5 py-2 rounded-md border border-white/20 text-xs uppercase tracking-[0.35em] hover:bg-white/10 transition"
              >
                Login
              </a>
            )}

{/* CART */}
{isPricing && <CartButton />}

{/* HAMBURGER */}
<button
  onClick={() => setMenuOpen(true)}
  className="md:hidden text-2xl text-white"
>
  ☰
</button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-gradient-to-br from-black via-[#120016] to-black backdrop-blur-2xl flex flex-col items-center justify-center">

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl text-white"
          >
            ✕
          </button>

          <img src="/tspc-logo.jpg" className="w-28 mb-10" alt="TSPC" />

          <nav className="flex flex-col gap-8 text-sm uppercase tracking-[0.4em] text-white/80 text-center">
            {navItems.map(({ label, to }) => (
              <Link key={label} to={to} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
          </nav>

          {!user && (
            <button
              onClick={() => window.location.href = "http://localhost:5000/auth/discord"}
              className="mt-12 px-10 py-4 rounded-xl font-bold uppercase tracking-[0.3em] bg-gradient-to-r from-[#7B2CFF] to-[#FF7A00]"
            >
              Login
            </button>
          )}

          <span className="absolute bottom-6 text-xs text-white/30 tracking-widest">
            TSPC ESPORTS © 2026
          </span>
        </div>
      )}
    </>
  );
}
