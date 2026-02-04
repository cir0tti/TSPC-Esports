import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import EditTournament from "./EditTournament"; // Importamos el componente

export default function MyTournaments() {
  const [myTournaments, setMyTournaments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Guardamos el usuario autenticado
  const [editingTournamentId, setEditingTournamentId] = useState(null); // Estado para gestionar el torneo que se está editando

  useEffect(() => {
    // Obtener la sesión actual de Supabase usando getSession()
    const session = supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user); // Si el usuario ya está autenticado, establecerlo en el estado
    }

    // Listener para cambios en la sesión de Supabase
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user); // Actualiza el usuario cuando cambia el estado de autenticación
    });

    // No es necesario llamar a unsubscribe, Supabase se encarga de ello
    // No necesitamos hacer nada en el return aquí, ya que Supabase maneja el cleanup del listener

  }, []); // Este efecto se ejecuta una sola vez al montar el componente

  useEffect(() => {
    // Si no hay usuario, no hacemos la consulta
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyTournaments = async () => {
      setLoading(true); // Inicia el estado de carga

      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .eq("owner_id", user.id) // Filtra los torneos por el ID del usuario
        .order("start_date", { ascending: true });

      if (error) {
        setError(error.message); // Si ocurre un error, lo mostramos
      } else {
        setMyTournaments(data); // Si todo está bien, guardamos los torneos
      }
      setLoading(false); // Finaliza el estado de carga
    };

    fetchMyTournaments();
  }, [user]); // La consulta se ejecuta cada vez que cambia el `user`

  const handleDelete = async (tournamentId) => {
    const { error } = await supabase
      .from("tournaments")
      .delete()
      .eq("id", tournamentId); // Eliminar el torneo con el ID correspondiente

    if (error) {
      setError(error.message); // Si ocurre un error al eliminar, lo mostramos
    } else {
      // Si la eliminación fue exitosa, actualizamos el estado de los torneos
      setMyTournaments((prevTournaments) =>
        prevTournaments.filter((tournament) => tournament.id !== tournamentId)
      );
      alert("Torneo eliminado correctamente!");
    }
  };

  if (loading) return <div className="text-center text-xl text-gray-400">Cargando...</div>; // Muestra un mensaje de carga mientras obtenemos los torneos

  if (error) return <div className="text-red-500">{error}</div>; // Muestra el error si ocurre

  return (
    <div className="bg-[#1A1A1A] p-8 min-h-screen text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
        Mis Torneos
      </h2>

      {myTournaments.length === 0 ? (
        <div className="text-center text-xl text-gray-400">
          No has creado ningún torneo aún.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {myTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 rounded-2xl border-2 border-transparent hover:border-pink-600 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              <h3 className="text-3xl font-semibold text-white">{tournament.title}</h3>
              <p className="text-sm text-gray-200 mt-2">{tournament.description}</p>
              <p className="text-xs text-gray-300 mt-4">
                <strong>Fecha de inicio:</strong> {new Date(tournament.start_date).toLocaleDateString()}
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setEditingTournamentId(tournament.id)} // Abre el formulario de edición
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(tournament.id)} // Lógica para eliminar torneo
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingTournamentId && (
        <EditTournament
          tournamentId={editingTournamentId}
          onCancel={() => setEditingTournamentId(null)}
          onSave={() => setEditingTournamentId(null)} // Aquí puedes manejar lo que ocurre después de guardar
        />
      )}
    </div>
  );
}
