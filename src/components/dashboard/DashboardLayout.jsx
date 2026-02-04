import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import CreateTournamentCard from "./CreateTournamentCard";
import MyTournaments from "./MyTournaments";

export default function DashboardLayout({ plan }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader plan={plan} />
        <main className="p-8 space-y-8">
          <StatsCards />
          <CreateTournamentCard />
          <MyTournaments />
        </main>
      </div>
    </div>
  );
}
