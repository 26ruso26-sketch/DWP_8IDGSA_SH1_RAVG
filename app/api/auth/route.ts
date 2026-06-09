import { NextResponse } from 'next/server';
import { SistemaTorneoDB } from '../../../lib/db';

// Instanciamos la clase de la base de datos (Aplicando POO)
const sistemaDB = new SistemaTorneoDB();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accion, correo, password, respuestaHumana } = body;

    // --- FLUJO DE REGISTRO ---
    if (accion === 'registrar') {
      if (respuestaHumana !== '12') {
        return NextResponse.json(
          { error: "Validación Humana Fallida: La respuesta es incorrecta. Demuestra que eres humano." },
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

      return NextResponse.json({ 
        success: true, 
        message: "Acceso concedido al Torneo de Pump It Up." 
      });
    }

    return NextResponse.json({ error: "Acción no permitida." }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}