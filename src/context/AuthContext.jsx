import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("tspc_token");
  if (!token) return setUser(null);

  fetch("https://api.tspcsport.com/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.ok ? res.json() : null)
    .then(setUser)
    .catch(() => setUser(null));
}, []);

  const logout = async () => {
    await fetch("https://api.tspcsport.com/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
