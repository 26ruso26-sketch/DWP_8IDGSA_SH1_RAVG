import React from "react";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
      <Header />

      {/* CONTENIDO PRINCIPAL (Aquí se inyectará la página de inicio del torneo) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* WIDGET CHAT: Elemento adicional requerido */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-cyan-600 to-blue-600 w-14 h-14 flex items-center justify-center rounded-full text-2xl shadow-[0_0_15px_rgba(8,145,178,0.5)] hover:scale-110 transition-transform cursor-pointer">
          💬
        </button>
      </div>
    </div>
  );
}