import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useUserPlan(user) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlan = async () => {
      // 👉 Si no hay user, no hay plan
      if (!user) {
        setPlan(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("user_plans")
        .select("*")
        .eq("user_id", user.id)
        .eq("active", true)
        .maybeSingle();

      if (error) {
        console.error("Error cargando plan:", error);
      }

      setPlan(data || null);
      setLoading(false);
    };

    loadPlan();
  }, [user]);

  return { plan, loading };
}
