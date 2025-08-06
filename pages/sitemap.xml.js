export default function Sitemap() {
  // Este componente no renderiza nada, solo existe para el sitemap
  return null;
}

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.SITE_URL || 'https://criadero-canino-2025-the-candy-hous.vercel.app';
  
  // URLs estáticas del sitio con idiomas
  const staticPages = [
    {
      url: '',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0',
      languages: ['es', 'en']
    },
    {
      url: '/razas/cocker',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.9',
      languages: ['es', 'en']
    },
    {
      url: '/razas/schnauzer',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.9',
      languages: ['es', 'en']
    },
    {
      url: '/contacto',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8',
      languages: ['es', 'en']
    },
    {
      url: '/preguntas-frecuentes',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7',
      languages: ['es']
    }
  ];

  // Generar URLs para todos los idiomas
  const allUrls = [];
  staticPages.forEach(page => {
    page.languages.forEach(lang => {
      const url = lang === 'es' ? page.url : `/en${page.url}`;
      allUrls.push({
        ...page,
        url: url,
        fullUrl: `${baseUrl}${url}`
      });
    });
  });

  // Generar el XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
          xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${allUrls
      .map(
        (page) => `
        <url>
          <loc>${page.fullUrl}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
          ${staticPages.find(p => p.url === page.url.replace('/en', ''))?.languages.map(lang => {
            const hrefUrl = lang === 'es' ? page.url.replace('/en', '') : `/en${page.url.replace('/en', '')}`;
            return `<xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${hrefUrl}" />`;
          }).join('') || ''}
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
