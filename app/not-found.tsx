export default function NotFound() {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center font-sans p-4">
        <h1 className="text-6xl md:text-8xl font-black text-red-500 mb-4 tracking-widest animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">
          GAME OVER
        </h1>
        <h2 className="text-2xl text-gray-300 mb-8 font-bold uppercase tracking-wide">
          Error 404 - Ruta no encontrada en el sistema
        </h2>
        <a 
          href="/" 
          className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white px-8 py-3 uppercase font-black tracking-widest transition-all rounded shadow-[0_0_15px_rgba(217,70,239,0.3)] cursor-pointer"
        >
          Insert Coin (Regresar al Inicio)
        </a>
      </div>
    );
  }