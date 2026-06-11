import React from "react";

export default function MapaDelSitio() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gray-900/80 border border-fuchsia-900 rounded-xl p-8 shadow-lg shadow-fuchsia-900/20">
        
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 mb-2 uppercase tracking-widest">
          Mapa del Sitio
        </h1>
        <p className="text-gray-400 mb-8 text-sm">Estructura general de la plataforma del Torneo Pump It Up.</p>

        <div className="space-y-6 font-mono text-sm">
          
          {/* Nivel 1: Acceso Público */}
          <div className="border-l-2 border-fuchsia-500 pl-4">
            <h2 className="text-fuchsia-400 font-bold text-lg mb-2">📁 Zona Pública (Raíz)</h2>
            <ul className="space-y-2 text-gray-300 ml-4">
              <li>📄 <span className="text-white">/</span> (Pantalla de Inicio)</li>
              <ul className="ml-6 space-y-1 text-gray-500">
                <li>↳ Formulario de Inserción de Moneda (Login)</li>
                <li>↳ Formulario de Nuevo Retador (Registro)</li>
                <li>↳ Validación Humana</li>
              </ul>
              <li>📄 <span className="text-white">/not-found</span> (Página de Error 404)</li>
            </ul>
          </div>

          {/* Nivel 2: Zona Protegida */}
          <div className="border-l-2 border-cyan-500 pl-4 mt-6">
            <h2 className="text-cyan-400 font-bold text-lg mb-2">📁 Zona Privada (Dashboard)</h2>
            <ul className="space-y-2 text-gray-300 ml-4">
              <li>📄 <span className="text-white">/dashboard</span> (Registro y Búsqueda de Jugadores)</li>
              <ul className="ml-6 space-y-1 text-gray-500">
                <li>↳ Formulario de Inscripción (Con opción Pro o Freestyle)</li>
                <li>↳ Búsqueda de jugadores por nombre</li>
                <li>↳ Lista Oficial de Competidores</li>
              </ul>

              <li className="pt-2">📄 <span className="text-white">/dashboard/categorias</span> (Categorización del Torneo)</li>
              <ul className="ml-6 space-y-1 text-gray-500">
                <li>↳ Asignación Automática Aleatoria ('Pro' o 'Freestyle')</li>
                <li>↳ Estadísticas por Categoría</li>
                <li>↳ Jugadores agrupados por clasificación</li>
              </ul>
              
              <li className="pt-2">📄 <span className="text-white">/dashboard/jugadores</span></li>
              <ul className="ml-6 space-y-1 text-gray-500">
                <li>↳ Redirección automática a /dashboard</li>
              </ul>

              <li className="pt-2">📄 <span className="text-white">Elementos Adicionales (Interactivos)</span></li>
              <ul className="ml-6 space-y-1 text-gray-500">
                <li>↳ Recuperación de contraseña</li>
                <li>↳ Ayuda (Modal de contacto al organizador: ravg@gmail.com)</li>
                <li>↳ Buzón (Modal con formulario de comentarios y quejas)</li>
                <li>↳ Barra de Búsqueda de Jugadores en cabecera</li>
              </ul>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}