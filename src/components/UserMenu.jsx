import React, { useState } from "react";

export default function UserMenu({ user, logout }) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-3 px-4 py-2
          rounded-md bg-black/40 backdrop-blur-md
          border border-white/10
          hover:border-[#7B2CFF]/60 transition
        "
      >
        {/* Aseguramos que el avatar y nombre se obtienen correctamente de user.user_metadata */}
        <img
          src={user.user_metadata?.avatar_url || "/default-avatar.png"}  // Uso de avatar_url correcto
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />

        <span className="text-xs uppercase tracking-widest text-white/80">
          {user.user_metadata?.full_name || "User"}  {/* Cambié 'username' por 'full_name' */}
        </span>
      </button>

      {open && (
        <div className="
          absolute right-0 mt-3 w-56
          bg-[#0b0b12]
          border border-white/10
          rounded-md overflow-hidden
          shadow-2xl z-50
        ">
          <div className="px-4 py-3 text-xs text-white/50">
            Signed in as
            <div className="text-white font-semibold mt-1">
              {user.user_metadata?.full_name || "User"} {/* También cambié 'username' por 'full_name' */}
            </div>
          </div>

          <div className="border-t border-white/10" />

          <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition">
            My Profile
          </button>

          <button
            onClick={logout}
            className="w-full px-4 py-3 text-left text-sm
            text-red-400 hover:bg-red-500/10 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
