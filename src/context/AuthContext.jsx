import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado para saber si está cargando
  const [plan, setPlan] = useState(null);        // Estado para el plan del usuario
  const [isPreloading, setIsPreloading] = useState(true);  // Estado para el preloader

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error obteniendo la sesión:", error);
        setLoading(false);
        setIsPreloading(false);  // Terminar el preloader si hay error
        return;
      }

      if (session) {
        // Verifica la estructura de user_metadata
        console.log(session.user.user_metadata);

        setUser({
          ...session.user,
          user_metadata: session.user.user_metadata || {},
        });

        // Ahora obtenemos el plan del usuario
        await fetchUserPlan(session.user.id);
      } else {
        setUser(null);
      }

      setLoading(false);  // Finaliza el loading cuando la sesión está lista
      setIsPreloading(false);  // Finaliza el preloader después de cargar los datos
    };

    // Obtén la sesión inicial
    fetchSession();

    // Reacciona a cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchSession();
      } else {
        setUser(null);
        setPlan(null);  // Resetear el plan cuando el usuario se desconecte
        setIsPreloading(true);  // Mostrar el preloader cuando el usuario se desconecte
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Función para obtener el plan del usuario desde la tabla "user_plans"
  const fetchUserPlan = async (userId) => {
    const { data, error } = await supabase
      .from("user_plans")
      .select("plan_key, plan_name, active")
      .eq("user_id", userId)
      .eq("active", true)
      .single();

    if (error) {
      console.error("Error obteniendo el plan del usuario:", error);
      return;
    }

    setPlan(data);  // Guarda el plan en el estado
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPlan(null);  // Resetear el plan al hacer logout
    setIsPreloading(true);  // Mostrar el preloader nuevamente cuando el usuario cierre sesión
  };

  return (
    <AuthContext.Provider value={{ user, plan, loading, isPreloading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
