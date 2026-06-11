import React, { Suspense } from "react";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
      <Suspense fallback={
        <nav className="bg-gray-900 border-b border-fuchsia-900 h-16 animate-pulse flex items-center justify-between px-6">
          <div className="h-6 w-40 bg-gray-800 rounded"></div>
          <div className="h-6 w-64 bg-gray-800 rounded"></div>
        </nav>
      }>
        <Header />
      </Suspense>

      {/* CONTENIDO PRINCIPAL (Aquí se inyectará la página de inicio del torneo) */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}