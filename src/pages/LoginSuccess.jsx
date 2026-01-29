import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

export default function LoginSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    // ❌ si no hay token → fuera
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    // 🔐 guardar token
    localStorage.setItem("tspc_token", token);

    // 👤 decodificar usuario
    const decoded = jwtDecode(token);
    setUser(decoded);

    // 🚨 FLAG ÚNICO → activar preloader SOLO UNA VEZ
    localStorage.setItem("tspc:fromLogin", "true");

    // ➡️ volver al home (App se encarga del preloader)
    navigate("/", { replace: true });
  }, [navigate, params, setUser]);

  // 🖤 pantalla vacía mientras redirige
  return null;
}
