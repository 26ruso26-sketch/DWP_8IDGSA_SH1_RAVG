export default function DashboardInicio() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-gray-900 border border-cyan-900 rounded-xl p-10 text-center shadow-lg shadow-cyan-900/20 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500"></div>
          <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] relative z-10">
            Acceso Concedido
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Has superado la validación del sistema. Prepárate para la competencia de baile arcade más intensa del año. Revisa las reglas y únete a los participantes.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 px-8 rounded uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(217,70,239,0.5)] cursor-pointer">
              Ver Categorías
            </button>
          </div>
        </div>
  
        {/* Secciones de Contenido */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-lg text-center hover:border-fuchsia-500/50 transition-colors cursor-pointer">
            <h2 className="text-2xl font-bold text-fuchsia-400 mb-3 uppercase tracking-wide">Categoría Speed</h2>
            <p className="text-gray-400">Competencia de velocidad pura enfocada en canciones de alta dificultad.</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-lg text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
            <h2 className="text-2xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">Categoría Freestyle</h2>
            <p className="text-gray-400">Creatividad y coreografía en el escenario con el mejor performance.</p>
          </div>
        </div>
      </div>
    );
  }