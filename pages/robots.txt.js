export default function Robots() {
  // Este componente no renderiza nada
  return null;
}

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.SITE_URL || 'https://tudominio.com';
  
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /auth/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay para ser amigable con los bots
Crawl-delay: 1`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}
