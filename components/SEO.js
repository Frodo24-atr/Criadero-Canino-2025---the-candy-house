import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({
  title = 'The Candy House - Criadero Canino Premium | Cachorros de Calidad',
  description = 'Criadero canino profesional especializado en Cocker Spaniel y Schnauzer. Cachorros con pedigree, garantía de salud y crianza responsable. ¡Encuentra tu compañero ideal!',
  keywords = 'criadero canino, cachorros, cocker spaniel, schnauzer, pedigree, perros de raza, crianza responsable, cachorros premium, argentina, buenos aires',
  image = '/images/og-image.jpg',
  article = false,
  noindex = false,
  canonical,
  schema
}) => {
  const router = useRouter();
  const currentUrl = `${process.env.SITE_URL || 'https://tudominio.com'}${router.asPath}`;
  const canonicalUrl = canonical || currentUrl;

  // Schema markup por defecto para el criadero
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "name": "The Candy House",
    "description": description,
    "url": process.env.SITE_URL || 'https://tudominio.com',
    "telephone": "+54-11-1234-5678",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Argentina",
      "addressRegion": "Buenos Aires"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "image": image,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cachorros de Raza",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Cocker Spaniel",
            "description": "Cachorros Cocker Spaniel con pedigree"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Schnauzer",
            "description": "Cachorros Schnauzer con pedigree"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50"
    }
  };

  const schemaData = schema || defaultSchema;

  return (
    <Head>
      {/* Título y descripción */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="The Candy House" />
      <meta property="og:locale" content="es_AR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Datos adicionales para buscadores */}
      <meta name="author" content="The Candy House" />
      <meta name="language" content="es" />
      <meta name="geo.region" content="AR-B" />
      <meta name="geo.placename" content="Buenos Aires" />
      <meta name="geo.position" content="-34.6037;-58.3816" />
      <meta name="ICBM" content="-34.6037, -58.3816" />
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      
      {/* DNS Prefetch para mejor performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Preconnect para recursos críticos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

export default SEO;
