'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';

  // Estados de los Modales
  const [isBuzonOpen, setIsBuzonOpen] = useState(false);
  const [isAyudaOpen, setIsAyudaOpen] = useState(false);

  // Estados del Formulario de Buzón
  const [buzonTipo, setBuzonTipo] = useState('Comentario');
  const [buzonNombre, setBuzonNombre] = useState('');
  const [buzonMensaje, setBuzonMensaje] = useState('');
  const [buzonEnviado, setBuzonEnviado] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      router.push(`/dashboard?search=${encodeURIComponent(value)}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBuzonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buzonMensaje.trim()) return;

    // Aquí simularíamos el envío. Mostramos pantalla de éxito
    setBuzonEnviado(true);
    setTimeout(() => {
      // Limpiamos y cerramos
      setBuzonEnviado(false);
      setBuzonNombre('');
      setBuzonMensaje('');
      setBuzonTipo('Comentario');
      setIsBuzonOpen(false);
    }, 2500);
  };

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-fuchsia-500 border-b-2 border-fuchsia-500 pb-1 font-bold"
      : "text-gray-300 hover:text-cyan-400 transition-colors pb-1";
  };

  return (
    <>
      <nav className="bg-gray-900 border-b border-fuchsia-900 sticky top-0 z-50">
        {/* Barra superior de Elementos Adicionales */}
        <div className="bg-gray-950 px-4 py-1 text-xs flex justify-end gap-4 border-b border-gray-800 text-gray-400">
          <button 
            onClick={() => setIsAyudaOpen(true)}
            className="hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer text-xs"
          >
            Ayuda
          </button>
          <button 
            onClick={() => setIsBuzonOpen(true)}
            className="hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer text-xs"
          >
            Buzón
          </button>
          <Link href="/dashboard/mapa-del-sitio" className="hover:text-fuchsia-400 transition-colors">
            Mapa del Sitio
          </Link>
          <Link href="/" className="text-red-400 hover:text-red-300 transition-colors">
            Cerrar sesión
          </Link>
        </div>

        {/* Menú Principal */}
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* ID del Sitio */}
          <Link href="/dashboard">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 tracking-widest cursor-pointer hover:scale-105 transition-transform">
              PUMP IT UP FEST
            </div>
          </Link>

          {/* Secciones Principales */}
          <div className="hidden md:flex gap-6 font-bold text-sm tracking-wide items-center">
            <Link href="/dashboard" className={getLinkClass('/dashboard')}>
              Jugadores
            </Link>
            <Link href="/dashboard/categorias" className={getLinkClass('/dashboard/categorias')}>
              Categorías
            </Link>
          </div>

          {/* Búsqueda en el sitio */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar jugador..." 
              value={currentSearch}
              onChange={handleSearchChange}
              className="bg-gray-800 border border-gray-700 text-sm rounded-full pl-4 pr-10 py-1.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-all w-48 focus:w-64" 
            />
            <span className="absolute right-3 top-1.5 text-gray-400">🔍</span>
          </div>
        </div>
      </nav>

      {/* --- MODAL: AYUDA --- */}
      {isAyudaOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900 border border-cyan-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-cyan-500/10 relative">
            <button 
              onClick={() => setIsAyudaOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl font-bold cursor-pointer bg-transparent border-none"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider mb-4">
              Ayuda & Soporte
            </h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              ¿Tienes algún problema con el sistema de llaves, el registro de jugadores o la asignación de categorías del torneo? Ponte en contacto directamente con nuestro organizador:
            </p>
            <div className="bg-gray-950 p-4 border border-cyan-950 rounded-lg text-center mb-6">
              <span className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Correo del Organizador</span>
              <a href="mailto:ravg@gmail.com" className="text-lg font-black text-white hover:text-cyan-400 transition-colors">
                ravg@gmail.com
              </a>
            </div>
            <button
              onClick={() => setIsAyudaOpen(false)}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded uppercase tracking-wider transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL: BUZÓN --- */}
      {isBuzonOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900 border border-fuchsia-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-fuchsia-500/10 relative">
            <button 
              onClick={() => setIsBuzonOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl font-bold cursor-pointer bg-transparent border-none"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 uppercase tracking-wider mb-4">
              Buzón de Comentarios
            </h3>

            {buzonEnviado ? (
              <div className="text-center py-8 space-y-4">
                <span className="text-5xl block animate-bounce">📨</span>
                <h4 className="text-lg font-bold text-green-400">¡Mensaje Recibido!</h4>
                <p className="text-gray-300 text-sm">
                  Agradecemos tus sugerencias, quejas y comentarios para seguir mejorando el torneo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBuzonSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-450 uppercase tracking-wider mb-1">Tipo de Mensaje</label>
                  <select 
                    value={buzonTipo}
                    onChange={(e) => setBuzonTipo(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  >
                    <option value="Comentario">Comentario / Sugerencia</option>
                    <option value="Queja">Queja / Reclamación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-455 uppercase tracking-wider mb-1">Nombre (Opcional)</label>
                  <input 
                    type="text"
                    placeholder="Tu nombre o Nickname"
                    value={buzonNombre}
                    onChange={(e) => setBuzonNombre(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-455 uppercase tracking-wider mb-1">Tu Mensaje</label>
                  <textarea 
                    placeholder="Escribe tus quejas o comentarios aquí..."
                    rows={4}
                    required
                    value={buzonMensaje}
                    onChange={(e) => setBuzonMensaje(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-bold rounded uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
