import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error obteniendo la sesión:", error);
      setLoading(false);
      return;
    }

    if (session) {
      // Verifica la estructura de user_metadata
      console.log(session.user.user_metadata);  // Agrega esto para inspeccionar la estructura de los datos

      setUser({
        ...session.user,
        user_metadata: session.user.user_metadata || {},
      });
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  fetchSession();

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      fetchSession();
    } else {
      setUser(null);
    }
  });

  return () => subscription.unsubscribe();
}, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
