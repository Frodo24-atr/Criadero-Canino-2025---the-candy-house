import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Rutas que requieren autenticación de administrador
const ADMIN_ROUTES = ['/admin'];
const ADMIN_API_ROUTES = ['/api/auth/admin-session'];

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ['/', '/razas', '/contacto', '/auth', '/api/auth/admin-login'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Permitir rutas públicas
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Verificar autenticación para rutas de admin
  if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      // Redirigir a login si no hay token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      // Verificar validez del token
      const JWT_SECRET = process.env.JWT_SECRET || 'candy-house-secret-key-2025';
      jwt.verify(token, JWT_SECRET);
      
      // Token válido, continuar
      return NextResponse.next();
    } catch (error) {
      // Token inválido, redirigir a login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      
      // Limpiar cookie inválida
      response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      });
      
      return response;
    }
  }
  
  // Para todas las demás rutas, continuar normalmente
  return NextResponse.next();
}

// Configurar qué rutas debe interceptar el middleware
export const config = {
  matcher: [
    /*
     * Interceptar todas las rutas excepto:
     * - api (API routes)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     * - public (archivos públicos)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
