"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Acceso() {
  const [isLogin, setIsLogin] = useState(true);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [respuestaHumana, setRespuestaHumana] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  // Genera una suma aleatoria para la comprobación humana
  const generarComprobacion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  };

  useEffect(() => {
    if (!isLogin) {
      generarComprobacion();
    }
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    // 1. VALIDACIÓN FRONTEND (Coloquial)
    if (!correo || !password) {
      setError("¡Hey! No te saltes campos, todos son necesarios.");
      return;
    }
    if (!correo.includes("@")) {
      setError("Ese correo se ve un poco raro, ¿podrías revisarlo?");
      return;
    }
    if (!isLogin && !respuestaHumana) {
      setError("No olvides responder la pregunta para comprobar que no eres un robot.");
      return;
    }

    // 2. ENVÍO DE DATOS A LA API
    const accion = isLogin ? "login" : "registrar";
    const body = isLogin 
      ? { accion, correo, password } 
      : { accion, correo, password, respuestaHumana, num1, num2 };

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error); // Muestra los errores del Backend o Humana
        if (!isLogin) generarComprobacion(); // Regenera en caso de fallo
        return;
      }

      setMensaje(data.message);

      // Si es login exitoso, redirigimos a la zona del torneo protegida
      if (isLogin) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        // Si se registró, lo pasamos a la pestaña de login
        setTimeout(() => {
          setIsLogin(true);
          setRespuestaHumana("");
          setMensaje("¡Súper! Ya te registraste. Ahora inicia sesión para entrar al torneo.");
        }, 2000);
      }
    } catch (err) {
      setError("¡Híjole! No pudimos conectar con el servidor. Revisa tu internet.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center font-sans text-white">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg shadow-fuchsia-600/20 p-8 border border-fuchsia-900">
        <h1 className="text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 mb-8 uppercase tracking-widest animate-pulse">
          Torneo PUMP IT UP
        </h1>

        <div className="flex justify-center mb-6 border-b border-gray-700">
          <button
            className={`pb-2 px-4 uppercase text-sm tracking-wider font-bold transition-colors ${isLogin ? 'text-fuchsia-500 border-b-2 border-fuchsia-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => { setIsLogin(true); setError(""); setMensaje(""); }}
          >
            Iniciar Sesión
          </button>
          <button
            className={`pb-2 px-4 uppercase text-sm tracking-wider font-bold transition-colors ${!isLogin ? 'text-fuchsia-500 border-b-2 border-fuchsia-500' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => { setIsLogin(false); setError(""); setMensaje(""); }}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="jugador@correo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div className="p-4 bg-gray-800/80 border border-cyan-800 rounded">
              <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wide mb-2">
                Comprobación humana: ¿Cuánto es {num1} + {num2}?
              </label>
              <input
                type="text"
                value={respuestaHumana}
                onChange={(e) => setRespuestaHumana(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-cyan-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Pon el resultado aquí"
              />
            </div>
          )}

          {error && <p className="text-red-400 text-xs text-center font-bold bg-red-950/50 border border-red-900 p-3 rounded">{error}</p>}
          {mensaje && <p className="text-green-400 text-xs text-center font-bold bg-green-950/50 border border-green-900 p-3 rounded">{mensaje}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 rounded font-black text-lg uppercase tracking-widest transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(217,70,239,0.3)] active:scale-95"
          >
            {isLogin ? "Entrar al Torneo" : "Completar Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}