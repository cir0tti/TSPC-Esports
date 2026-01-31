import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      // 🔥 Esto fuerza a Supabase a hidratar la sesión
      await supabase.auth.getSession();

      // 🔥 Le avisamos al App que venimos de login
      localStorage.setItem("tspc:fromLogin", "true");

      // 🔥 Volvemos a la home
      navigate("/", { replace: true });
    };

    finishLogin();
  }, []);

  return null;
}
