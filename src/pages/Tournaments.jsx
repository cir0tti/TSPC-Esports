import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      // Paso 1: Obtener los torneos
      const { data, error } = await supabase
        .from("tournaments")
        .select(`
          id,
          title,
          description,
          game,
          format,
          max_teams,
          start_date,
          owner_id
        `)
        .eq("is_public", true)
        .order("start_date", { ascending: true });

      if (error) {
        setError(error.message);
        console.error("Error al obtener los torneos:", error);
      } else {
        // Paso 2: Obtener el nombre de usuario para cada torneo
        const tournamentsWithUsernames = await Promise.all(
          data.map(async (tournament) => {
            // Realizamos una consulta a la tabla 'users' para obtener el nombre del host
            const { data: userData, error: userError } = await supabase
              .from('users') // Consulta a la tabla users
              .select('email, username') // Seleccionamos el correo y el nombre de usuario
              .eq('id', tournament.owner_id) // Filtramos por owner_id
              .single(); // Nos aseguramos de que solo se obtenga un único registro

            if (userError) {
              console.error("Error al obtener el usuario:", userError.message);
            }

            console.log(`Host Data for Tournament ${tournament.id}:`, userData); // Depuración

            return {
              ...tournament,
              hosted_by: userData ? (userData.username || userData.email) : "Unknown", // Usamos el username o email
            };
          })
        );
        setTournaments(tournamentsWithUsernames);
      }
    };

    fetchTournaments();
  }, []);

  const handleJoinTournament = (tournamentId) => {
    // Redirigir a la página de detalles del torneo usando useNavigate
    navigate(`/tournament/${tournamentId}`);
  };

  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-800 to-pink-700 min-h-screen text-white p-8 relative">
      <div className="absolute inset-0 bg-cover bg-center bg-opacity-40"
        style={{ backgroundImage: "url('https://source.unsplash.com/featured/?esports,arena')" }}></div>

      <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-12 text-center mt-16 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 animate-pulse">
        Torneos Activos
      </h2>

      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
          <p>Error al cargar los torneos: {error}</p>
        </div>
      )}

      {tournaments.length === 0 ? (
        <div className="text-center space-y-6 relative z-10">
          <div className="text-7xl animate-pulse text-gray-400">
            <i className="fas fa-trophy"></i>
          </div>
          <h3 className="text-3xl text-gray-300">No hay torneos activos en este momento</h3>
          <p className="text-lg text-gray-500">Vuelve pronto para participar en el próximo torneo</p>

          <button
            className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-xl hover:bg-gradient-to-l hover:from-indigo-800 hover:to-purple-800 transition duration-300 transform hover:scale-105"
            onClick={() => window.location.reload()}
          >
            ¡Recargar y ver nuevos torneos!
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 rounded-2xl border-2 border-transparent hover:border-pink-600 transition-all duration-500 transform hover:scale-105 shadow-lg hover:translate-y-2 relative overflow-hidden"
            >
              {/* Estado "LIVE" */}
              <div className="absolute top-2 left-2 bg-red-500 text-xs text-white py-1 px-3 rounded-full">
                LIVE
              </div>

              {/* Contenido de la card */}
              <div className="relative z-10">
                {/* Nombre del torneo */}
                <h3 className="text-2xl sm:text-3xl font-semibold text-white">{tournament.title}</h3>
                <p className="text-sm text-gray-200 mt-2">{tournament.description}</p>

                {/* Hora de cierre */}
                <div className="text-xs text-gray-300 mt-2">
                  Closes at {new Date(tournament.start_date).toLocaleTimeString()}
                </div>

                {/* Host */}
                <div className="text-sm text-gray-300 mt-2">
                  Hosted by <strong>{tournament.hosted_by ? tournament.hosted_by : 'Unknown'}</strong>
                </div>

                {/* Botón Follow on Twitter */}
                <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105">
                  Follow on Twitter
                </button>

                {/* Barra de progreso de equipos */}
                <div className="mt-4">
                  <p className="text-xs text-gray-300">Teams registered:</p>
                  <div className="h-2 bg-gray-600 rounded-full">
                    <div
                      className="h-2 bg-pink-600 rounded-full"
                      style={{ width: `${(tournament.max_teams / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Botón de unirse al torneo */}
                <button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:bg-gradient-to-l hover:from-pink-700 hover:to-purple-700 transition duration-300 transform hover:scale-105"
                  onClick={() => handleJoinTournament(tournament.id)}
                >
                  Join Live Tournament
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
