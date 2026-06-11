import { SistemaTorneoDB } from '@/Lib/db';

export const dynamic = 'force-dynamic';

export default function CategoriasPage() {
  const db = new SistemaTorneoDB();
  const jugadoresOriginales = db.obtenerJugadores();

  let huboAsignaciones = false;

  // Asignación aleatoria de categorías ('Pro' o 'Freestyle') mediante UPDATE
  for (const jugador of jugadoresOriginales) {
    if (!jugador.categoria) {
      const categoriaAleatoria = Math.random() < 0.5 ? 'Pro' : 'Freestyle';
      try {
        db.actualizarCategoriaJugador(jugador.id!, categoriaAleatoria);
        huboAsignaciones = true;
      } catch (error) {
        console.error(`Error al asignar categoría a jugador ID ${jugador.id}:`, error);
      }
    }
  }

  // Si hubo actualizaciones en la base de datos, volvemos a consultar para obtener la lista final
  const jugadores = huboAsignaciones ? db.obtenerJugadores() : jugadoresOriginales;

  // Estadísticas
  const totalJugadores = jugadores.length;
  const totalPro = jugadores.filter(j => j.categoria === 'Pro').length;
  const totalFreestyle = jugadores.filter(j => j.categoria === 'Freestyle').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Encabezado */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
          Categorización del Torneo
        </h1>
        <p className="text-gray-400 mt-2">
          Echa un vistazo a cómo van las categorías del torneo. Si algún jugador no tiene categoría, aquí se le asignará una al azar al instante. ¡Qué emoción!
        </p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md shadow-black/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-500"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total de Competidores</p>
          <p className="text-4xl font-black text-white mt-2 font-mono">{totalJugadores}</p>
        </div>

        <div className="bg-gray-900 border border-fuchsia-955 rounded-xl p-6 shadow-md shadow-fuchsia-950/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-fuchsia-505"></div>
          <p className="text-fuchsia-400 text-xs font-bold uppercase tracking-wider">Categoría Pro (Velocidad)</p>
          <p className="text-4xl font-black text-white mt-2 font-mono">{totalPro}</p>
        </div>

        <div className="bg-gray-900 border border-cyan-955 rounded-xl p-6 shadow-md shadow-cyan-950/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-505"></div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Categoría Freestyle (Estilo)</p>
          <p className="text-4xl font-black text-white mt-2 font-mono">{totalFreestyle}</p>
        </div>
      </div>

      {/* Listado Principal de Clasificación */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg shadow-black/40">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-gray-800 pb-2">
          Clasificación Actual de Jugadores
        </h2>

        {jugadores.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <span className="text-4xl block mb-2">🎮</span>
            ¡Uy! No tenemos jugadores registrados para clasificar todavía.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Columna Pro */}
            <div className="bg-gray-950 border border-fuchsia-900/30 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 border-b border-fuchsia-900/20 pb-2">
                <h3 className="text-lg font-black text-fuchsia-400 uppercase tracking-widest">
                  PRO (SPEED)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-900/50">
                  {totalPro} Jugadores
                </span>
              </div>
              <ul className="space-y-3">
                {jugadores.filter(j => j.categoria === 'Pro').map((j) => (
                  <li key={j.id} className="flex items-center justify-between bg-gray-900/60 p-3 rounded border border-gray-800/50 hover:border-fuchsia-500/20 transition-colors">
                    <span className="font-bold text-white">{j.nombre}</span>
                    <span className="text-xs font-mono text-gray-500">ID #{j.id}</span>
                  </li>
                ))}
                {totalPro === 0 && (
                  <p className="text-xs text-gray-500 italic text-center py-4">Todavía nadie anda en la categoría Pro.</p>
                )}
              </ul>
            </div>

            {/* Columna Freestyle */}
            <div className="bg-gray-950 border border-cyan-900/30 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 border-b border-cyan-900/20 pb-2">
                <h3 className="text-lg font-black text-cyan-400 uppercase tracking-widest">
                  FREESTYLE
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-900/50">
                  {totalFreestyle} Jugadores
                </span>
              </div>
              <ul className="space-y-3">
                {jugadores.filter(j => j.categoria === 'Freestyle').map((j) => (
                  <li key={j.id} className="flex items-center justify-between bg-gray-900/60 p-3 rounded border border-gray-800/50 hover:border-cyan-500/20 transition-colors">
                    <span className="font-bold text-white">{j.nombre}</span>
                    <span className="text-xs font-mono text-gray-500">ID #{j.id}</span>
                  </li>
                ))}
                {totalFreestyle === 0 && (
                  <p className="text-xs text-gray-500 italic text-center py-4">Todavía nadie anda en Freestyle.</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
