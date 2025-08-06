import { NextResponse } from 'next/server';

export function middleware(request) {
  // Simplificar middleware temporalmente para evitar loops
  return NextResponse.next();
}

// Configurar qué rutas debe interceptar el middleware
export const config = {
  matcher: [
    // Interceptar solo rutas críticas temporalmente
    '/admin/:path*',
  ],
};
