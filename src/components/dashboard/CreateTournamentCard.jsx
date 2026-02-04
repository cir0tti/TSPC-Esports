import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateTournamentCard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [game, setGame] = useState("");
  const [format, setFormat] = useState("");
  const [maxTeams, setMaxTeams] = useState(16);
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!user) {
      console.error("No estás logueado");
      return;
    }

    if (!title || !description || !game || !format || !startDate) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const { data, error } = await supabase.from("tournaments").insert({
        owner_id: user.id,
        title,
        description,
        game,
        format,
        max_teams: maxTeams,
        start_date: startDate,
        is_public: true,
      });

      if (error) {
        setError("Hubo un problema al crear el torneo. Inténtalo de nuevo.");
        console.error("Error al crear el torneo:", error);
      } else {
        setSuccessMessage("¡Torneo creado correctamente!");
        navigate("/tournaments");
      }
    } catch (err) {
      setError("Hubo un error inesperado. Inténtalo nuevamente.");
      console.error("Error inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 rounded-2xl border border-white/10 shadow-xl mx-auto mt-8 max-w-full sm:max-w-lg">
      <h3 className="text-3xl font-bold mb-6 text-center text-white">Crear Torneo</h3>

      {/* Mensajes de error y éxito */}
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {successMessage && <p className="text-green-600 mb-4 text-center">{successMessage}</p>}

      <div className="space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre del torneo"
          className="w-full p-4 bg-transparent text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del torneo"
          className="w-full p-4 bg-transparent text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
        <input
          type="text"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          placeholder="Juego"
          className="w-full p-4 bg-transparent text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
        <input
          type="text"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          placeholder="Formato"
          className="w-full p-4 bg-transparent text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
        <input
          type="number"
          value={maxTeams}
          onChange={(e) => setMaxTeams(Number(e.target.value))}
          placeholder="Máximo equipos"
          className="w-full p-4 bg-transparent text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-4 bg-transparent text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl mt-6 hover:bg-gradient-to-l hover:from-purple-700 hover:to-indigo-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Creando Torneo..." : "Crear Torneo"}
      </button>
    </div>
  );
}
