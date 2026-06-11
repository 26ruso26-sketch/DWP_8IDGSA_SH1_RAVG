import { NextResponse } from 'next/server';
import { SistemaTorneoDB } from '../../../Lib/db';

const sistemaDB = new SistemaTorneoDB();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accion, correo, password, respuestaHumana, num1, num2 } = body;

    // --- FLUJO DE REGISTRO ---
    if (accion === 'registrar') {
      const sumCorrecta = parseInt(num1) + parseInt(num2);
      if (parseInt(respuestaHumana) !== sumCorrecta) {
        return NextResponse.json(
          { error: "¡Ups! Esa no es la respuesta correcta de la suma. Inténtalo de nuevo." },
          { status: 400 }
        );
      }
      const mensajeExito = sistemaDB.registrarUsuario(correo, password);
      return NextResponse.json({ success: true, message: mensajeExito });
    }

    // --- FLUJO DE INICIO DE SESIÓN ---
    if (accion === 'login') {
      const usuario = sistemaDB.validarLogin(correo, password);
      
      if (!usuario) {
        return NextResponse.json(
          { error: "Híjole, el correo o la contraseña no coinciden. Revisa bien tus datos." },
          { status: 401 }
        );
      }

      // CREAMOS LA RESPUESTA DE ÉXITO
      const response = NextResponse.json({ 
        success: true, 
        message: "Acceso concedido" 
      });

      // ESTO ES LO NUEVO: Creamos una Cookie de seguridad HTTP (El gafete)
      response.cookies.set('sesion_torneo', 'activa', {
        httpOnly: true, // Evita que los hackers la lean con JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 // Dura 1 día
      });

      return response;
    }

    return NextResponse.json({ error: "Acción no permitida." }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}