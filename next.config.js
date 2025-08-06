const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimizaciones para producción en Hostinger
  compress: true,
  poweredByHeader: false,
  
  // Configuración de imágenes
  images: {
    domains: ['localhost'],
    // Agregar tu dominio de Hostinger aquí cuando lo tengas
    // domains: ['tudominio.com', 'localhost'],
  },
  
  // Variables de entorno públicas
  env: {
    SITE_NAME: 'The Candy House - Criadero Canino',
    SITE_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirecciones útiles
  async redirects() {
    return [
      {
        source: '/admin/dashboard',
        destination: '/admin',
        permanent: true,
      },
    ];
  },
};
