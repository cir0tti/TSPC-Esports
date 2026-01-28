import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("tspc_token", token);
      navigate("/"); // vuelve al home
    } else {
      navigate("/login-error");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-lg tracking-widest uppercase text-[#7B2CFF] animate-pulse">
        Iniciando sesión...
      </p>
    </div>
  );
}
