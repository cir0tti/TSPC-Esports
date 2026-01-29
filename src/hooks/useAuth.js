import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("tspc_token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("tspc_token");
    window.location.href = "/";
  };

  return { user, logout };
}
