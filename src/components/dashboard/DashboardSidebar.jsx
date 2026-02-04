import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Trophy, Video, Settings, Menu, Home } from "lucide-react";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "../../pages/tournaments", icon: Trophy, label: "Torneos" },
  { to: "/dashboard/streams", icon: Video, label: "Streams" },
  { to: "/dashboard/settings", icon: Settings, label: "Configuración" },
  { to: "/", icon: Home, label: "Home" }, // Añadimos el enlace Home
];

export default function DashboardSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para manejar el menú en móviles

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Header negro con botón de hamburguesa */}
      <header className="md:hidden flex items-center justify-between p-4 bg-black text-white shadow-md fixed w-full z-50">
        <button
          onClick={toggleSidebar}
          className="bg-purple-600 text-white p-3 rounded-full"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Menú lateral en escritorio */}
      <aside className={`w-64 bg-[#0f0f0f] border-r border-white/10 p-6 transition-all ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-bold mb-8">TSPC Panel</h2>
        <nav className="space-y-3">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive ? "bg-purple-600" : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Botón de hamburguesa visible solo en móviles */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-purple-600 text-white p-3 rounded-full"
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}
