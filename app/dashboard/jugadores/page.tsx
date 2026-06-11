import { revalidatePath } from 'next/cache';
import { SistemaTorneoDB } from '@/Lib/db';

export const dynamic = 'force-dynamic';

export default function JugadoresPage() {
  const db = new SistemaTorneoDB();
  const jugadores = db.obtenerJugadores();

  async function agregarJugadorAction(formData: FormData) {
    'use server';
    const nombre = formData.get('nombre') as string;
    
    if (nombre && nombre.trim() !== '') {
      const database = new SistemaTorneoDB();
      try {
        database.agregarJugador(nombre.trim());
      } catch (error) {
        console.error("Error al registrar jugador:", error);
      }
      revalidatePath('/dashboard/jugadores');
      revalidatePath('/dashboard/categorias');
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Encabezado de la Sección */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
          Registro de Jugadores
        </h1>
        <p className="text-gray-400 mt-2">
          Agrega nuevos competidores al Torneo Pump It Up Fest y visualiza la lista oficial de inscritos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulario (1/3 de pantalla) */}
        <div className="md:col-span-1 bg-gray-900 border border-fuchsia-900/40 rounded-xl p-6 shadow-lg shadow-fuchsia-950/20 h-fit">
          <h2 className="text-xl font-bold text-fuchsia-400 mb-6 uppercase tracking-wider border-b border-gray-800 pb-2">
            Nuevo Participante
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

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-black rounded uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(217,70,239,0.3)] active:scale-95 cursor-pointer"
            >
              Inscribir Jugador
            </button>
          </form>
        </div>

        {/* Tabla/Lista de Jugadores (2/3 de pantalla) */}
        <div className="md:col-span-2 bg-gray-900 border border-cyan-900/40 rounded-xl p-6 shadow-lg shadow-cyan-950/20">
          <h2 className="text-xl font-bold text-cyan-400 mb-6 uppercase tracking-wider border-b border-gray-800 pb-2">
            Lista de Competidores ({jugadores.length})
          </h2>

          {jugadores.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <span className="text-4xl block mb-2">🎮</span>
              No hay jugadores inscritos en este momento. Utiliza el formulario de la izquierda para agregar uno.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Nombre / Nickname</th>
                    <th className="py-3 px-4">Categoría Inicial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  {jugadores.map((jugador) => (
                    <tr key={jugador.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 font-mono text-cyan-500">#{jugador.id}</td>
                      <td className="py-4 px-4 font-bold text-white">{jugador.nombre}</td>
                      <td className="py-4 px-4">
                        {jugador.categoria ? (
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            jugador.categoria === 'Pro' 
                              ? 'bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-800/50' 
                              : 'bg-cyan-950 text-cyan-400 border border-cyan-800/50'
                          }`}>
                            {jugador.categoria}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 italic">Pendiente de asignación</span>
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
