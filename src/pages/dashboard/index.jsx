import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserPlan } from "../../hooks/useUserPlan";
import LockedDashboard from "../../components/dashboard/LockedDashboard";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function Dashboard() {
  const { user, plan, loading } = useAuth(); // Accedemos al plan desde el contexto

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Cargando dashboard...
      </div>
    );
  }

  if (!user || !plan?.active) {
    return <LockedDashboard />;
  }

  return <DashboardLayout plan={plan} />;
}
