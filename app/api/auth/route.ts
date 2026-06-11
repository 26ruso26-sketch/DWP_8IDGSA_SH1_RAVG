import { NextResponse } from 'next/server';
import { SistemaTorneoDB } from '../../../Lib/db';

const sistemaDB = new SistemaTorneoDB();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accion, correo, password, respuestaHumana } = body;

    // --- FLUJO DE REGISTRO ---
    if (accion === 'registrar') {
      if (respuestaHumana !== '12') {
        return NextResponse.json(
          { error: "Validación Humana Fallida: La respuesta es incorrecta." },
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
          { error: "Credenciales incorrectas o el usuario no existe." },
          { status: 401 }
        );
      }

      // CREAMOS LA RESPUESTA DE ÉXITO
      const response = NextResponse.json({ 
        success: true, 
        message: "Acceso concedido al Torneo." 
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