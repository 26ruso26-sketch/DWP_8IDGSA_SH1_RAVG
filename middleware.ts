import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Esta función se ejecuta ANTES de que cargue cualquier página para validar que tengan sesion iniciada
export function middleware(request: NextRequest) {
  
  // Verificamos si el usuario intenta entrar a cualquier ruta dentro de /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    
    // Buscamos (Cookie) que le dimos en el login
    const sesion = request.cookies.get('sesion_torneo');

    // Si NO tiene la cookie, lo redirigimos a la fuerza a la pantalla de Login (/)
    if (!sesion) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Si tiene la cookie (o si no está intentando entrar al dashboard), lo dejamos pasar
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protege el dashboard y todo lo que esté adentro
};