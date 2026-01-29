import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tspc_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch {
      localStorage.removeItem("tspc_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    // 🔥 limpiar TODO lo del login
    localStorage.removeItem("tspc_token");
    localStorage.removeItem("tspc:fromLogin");

    setUser(null);

    // redirección limpia
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
