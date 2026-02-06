import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error obteniendo sesión:", error);
      }

      navigate("/", { replace: true });
    };

    finishLogin();
  }, []);

  return null;
}
