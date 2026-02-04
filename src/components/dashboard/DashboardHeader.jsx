import React from "react";

export default function DashboardHeader({ plan }) {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white p-8 sm:p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mt-16 sm:mt-24">
      <div className="flex flex-col items-center text-center">
        {/* Título principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight sm:leading-snug tracking-tight text-shadow-lg">
          Bienvenido al Dashboard
        </h1>
        
        {/* Subtítulo con plan actual */}
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300">
          <strong className="font-bold text-white">Plan actual:</strong> {plan.plan_name}
        </p>
      </div>
    </header>
  );
}
