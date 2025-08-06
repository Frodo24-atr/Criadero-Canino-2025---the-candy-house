export default function Sitemap() {
  // Este componente no renderiza nada, solo existe para el sitemap
  return null;
}

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.SITE_URL || 'https://tudominio.com';
  
  // URLs estáticas del sitio
  const staticPages = [
    {
      url: '',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: '/razas/cocker',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      url: '/razas/schnauzer',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      url: '/contacto',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    }
  ];

  // Generar el XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        (page) => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
      )
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
