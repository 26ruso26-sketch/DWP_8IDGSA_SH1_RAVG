import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { SistemaTorneoDB } from '@/Lib/db';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ search?: string }> | { search?: string };
}

export default async function DashboardInicio(props: PageProps) {
  const resolvedSearchParams = await props.searchParams;
  const searchQuery = resolvedSearchParams?.search || '';

  const db = new SistemaTorneoDB();
  let jugadores = db.obtenerJugadores();

  // Filtrado de jugadores por nombre si hay búsqueda activa
  if (searchQuery.trim()) {
    const term = searchQuery.toLowerCase().trim();
    jugadores = jugadores.filter(j => j.nombre.toLowerCase().includes(term));
  }

  async function agregarJugadorAction(formData: FormData) {
    'use server';
    const nombre = formData.get('nombre') as string;
    const categoria = formData.get('categoria') as string;
    
    if (nombre && nombre.trim() !== '') {
      const database = new SistemaTorneoDB();
      try {
        database.agregarJugador(nombre.trim(), categoria || null);
      } catch (error) {
        console.error("Error al registrar jugador:", error);
      }
      revalidatePath('/dashboard');
      revalidatePath('/dashboard/categorias');
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Encabezado */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
            Registro y Búsqueda de Jugadores
          </h1>
          <p className="text-gray-400 mt-2">
            Aquí puedes ver y registrar a todos los que van a participar en el torneo. ¡Que empiece la competencia!
          </p>
        </div>
        
        {searchQuery && (
          <div className="bg-fuchsia-950/80 border border-fuchsia-800 rounded-lg px-4 py-2 flex items-center gap-3 w-fit mx-auto md:mx-0">
            <span className="text-xs text-fuchsia-300">
              Búsqueda activa: <strong className="text-white">"{searchQuery}"</strong>
            </span>
            <Link 
              href="/dashboard" 
              className="text-xs font-bold text-gray-450 hover:text-white bg-gray-800 hover:bg-gray-750 px-2 py-1 rounded transition-all"
            >
              Quitar filtro
            </Link>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulario de Registro */}
        <div className="md:col-span-1 bg-gray-900 border border-fuchsia-900/40 rounded-xl p-6 shadow-lg shadow-fuchsia-955/20 h-fit">
          <h2 className="text-xl font-bold text-fuchsia-400 mb-6 uppercase tracking-wider border-b border-gray-800 pb-2">
            Registrar Nuevo Competidor
          </h2>
          
          <form action={agregarJugadorAction} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Nombre Completo o Nickname
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                placeholder="Ej. FEFEMZ o Angel_PIU"
              />
            </div>

            <div>
              <label htmlFor="categoria" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Categoría Inicial
              </label>
              <select
                id="categoria"
                name="categoria"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              >
                <option value="Pro">Pro (Speed)</option>
                <option value="Freestyle">Freestyle</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-black rounded uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(217,70,239,0.3)] active:scale-95 cursor-pointer"
            >
              ¡Inscribir al Jugador!
            </button>
          </form>
        </div>

        {/* Listado y Búsqueda */}
        <div className="md:col-span-2 bg-gray-900 border border-cyan-900/40 rounded-xl p-6 shadow-lg shadow-cyan-955/20">
          <h2 className="text-xl font-bold text-cyan-400 mb-6 uppercase tracking-wider border-b border-gray-800 pb-2">
            Lista Oficial de Competidores ({jugadores.length})
          </h2>

          {jugadores.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <span className="text-4xl block mb-2">🔍</span>
              {searchQuery ? (
                <>¡Uy! No encontramos a ningún jugador que se llame <strong className="text-gray-300">"{searchQuery}"</strong>.</>
              ) : (
                <>¡Uy! Todavía no hay nadie inscrito en el torneo. ¡Sé el primero en agregar un jugador usando el formulario de al lado!</>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Nombre / Nickname</th>
                    <th className="py-3 px-4">Categoría</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  {jugadores.map((jugador) => (
                    <tr key={jugador.id} className="hover:bg-gray-800/30 transition-colors animate-fadeIn">
                      <td className="py-4 px-4 font-mono text-cyan-500">#{jugador.id}</td>
                      <td className="py-4 px-4 font-bold text-white">{jugador.nombre}</td>
                      <td className="py-4 px-4">
                        {jugador.categoria ? (
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            jugador.categoria === 'Pro' 
                              ? 'bg-fuchsia-950/80 text-fuchsia-400 border border-fuchsia-800/40' 
                              : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/40'
                          }`}>
                            {jugador.categoria}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 italic bg-gray-950 px-2 py-1 rounded border border-gray-800/40">
                            Pendiente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}