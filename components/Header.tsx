'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-fuchsia-500 border-b-2 border-fuchsia-500 pb-1 font-bold"
      : "text-gray-300 hover:text-cyan-400 transition-colors pb-1";
  };

  return (
    <nav className="bg-gray-900 border-b border-fuchsia-900 sticky top-0 z-50">
      
      {/* Barra superior de Elementos Adicionales */}
      <div className="bg-gray-950 px-4 py-1 text-xs flex justify-end gap-4 border-b border-gray-800 text-gray-400">
        <a href="#recuperar" className="hover:text-fuchsia-400 transition-colors">Recuperación de contraseña</a>
        <a href="#ayuda" className="hover:text-fuchsia-400 transition-colors">Ayuda</a>
        <a href="#buzon" className="hover:text-fuchsia-400 transition-colors">Buzón</a>
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
            Inicio
          </Link>
          <Link href="/dashboard/jugadores" className={getLinkClass('/dashboard/jugadores')}>
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
            placeholder="Búsqueda..." 
            className="bg-gray-800 border border-gray-700 text-sm rounded-full pl-4 pr-10 py-1.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-all w-48 focus:w-64" 
          />
          <span className="absolute right-3 top-1.5 text-gray-400">🔍</span>
        </div>
      </div>
    </nav>
  );
}
