import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // AJUSTA ESTA RUTA

export function useUserPlan(user) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadPlan = async () => {
      const { data } = await supabase
        .from("user_plans")
        .select("*")
        .eq("user_id", user.id)
        .eq("active", true)
        .single();

      setPlan(data);
      setLoading(false);
    };

    loadPlan();
  }, [user]);

  return { plan, loading };
}
