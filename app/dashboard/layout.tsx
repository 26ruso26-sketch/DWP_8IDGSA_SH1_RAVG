import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
      {/* NAVBAR: Requisito de la rúbrica escolar */}
      <nav className="bg-gray-900 border-b border-fuchsia-900 sticky top-0 z-50">
        
        {/* Barra superior de Elementos Adicionales */}
        <div className="bg-gray-950 px-4 py-1 text-xs flex justify-end gap-4 border-b border-gray-800 text-gray-400">
          <a href="#recuperar" className="hover:text-fuchsia-400 transition-colors">Recuperación de contraseña</a>
          <a href="#ayuda" className="hover:text-fuchsia-400 transition-colors">Ayuda</a>
          <a href="#buzon" className="hover:text-fuchsia-400 transition-colors">Buzón</a>
          <a href="/dashboard/mapa-del-sitio" className="hover:text-fuchsia-400 transition-colors">Mapa del Sitio</a>
          <a href="/" className="text-red-400 hover:text-red-300 transition-colors">Cerrar sesión</a>
        </div>

        {/* Menú Principal */}
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          
          {/* ID del Sitio */}
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 tracking-widest cursor-pointer hover:scale-105 transition-transform">
            PUMP IT UP FEST
          </div>

          {/* Secciones Principales */}
          <div className="hidden md:flex gap-6 font-bold text-sm tracking-wide">
            <a href="/dashboard" className="text-fuchsia-500 border-b-2 border-fuchsia-500">Inicio</a>
            <a href="#torneo" className="hover:text-cyan-400 transition-colors">Torneo</a>
            <a href="#participantes" className="hover:text-cyan-400 transition-colors">Participantes</a>
            <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contáctanos</a>
          </div>

          {/* Búsqueda en el sitio */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Búsqueda..." 
              className="bg-gray-800 border border-gray-700 text-sm rounded-full pl-4 pr-10 py-1.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-all w-48 focus:w-64" 
            />
            <span className="absolute right-3 top-1.5 text-gray-400">🔍</span>
          </div>
        </div>
      </nav>

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