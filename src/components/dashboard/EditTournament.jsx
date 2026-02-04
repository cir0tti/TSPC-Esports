// src/components/dashboard/EditTournament.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

const EditTournament = ({ tournamentId, onCancel, onSave }) => {
  const [tournament, setTournament] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [game, setGame] = useState("");
  const [format, setFormat] = useState("");
  const [maxTeams, setMaxTeams] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los detalles del torneo
  useEffect(() => {
    const fetchTournament = async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .eq("id", tournamentId)
        .single(); // Solo traer un torneo

      if (error) {
        setError(error.message);
      } else {
        setTournament(data);
        setTitle(data.title);
        setDescription(data.description);
        setGame(data.game);
        setFormat(data.format);
        setMaxTeams(data.max_teams);
        setStartDate(data.start_date);
      }
      setLoading(false);
    };

    fetchTournament();
  }, [tournamentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("tournaments")
      .update({
        title,
        description,
        game,
        format,
        max_teams: maxTeams,
        start_date: startDate,
      })
      .eq("id", tournamentId);

    if (error) {
      setError(error.message);
    } else {
      alert("Torneo actualizado correctamente!");
      onSave(); // Llamamos al callback de onSave para notificar que se guardó el torneo
    }
    setLoading(false);
  };

  const handleCancel = () => {
    onCancel(); // Llamamos al callback de onCancel para cancelar la edición
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-800 text-white rounded-xl">
      <h3 className="text-2xl mb-4">Editar Torneo</h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block">Juego:</label>
          <input
            type="text"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block">Formato:</label>
          <input
            type="text"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block">Equipos máximos:</label>
          <input
            type="number"
            value={maxTeams}
            onChange={(e) => setMaxTeams(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Fecha de inicio:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {loading ? "Actualizando..." : "Actualizar Torneo"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTournament;
