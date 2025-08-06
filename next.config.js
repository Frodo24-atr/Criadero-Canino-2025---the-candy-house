/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  
  images: {
    domains: ['localhost', 'criadero-canino-2025-the-candy-hous.vercel.app'],
  },
  
  env: {
    SITE_NAME: 'The Candy House - Criadero Canino',
  },
  
  // No necesitamos redirects aquí ya que están en vercel.json
}
