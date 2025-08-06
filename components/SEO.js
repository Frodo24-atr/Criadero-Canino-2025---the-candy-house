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
  const { locale, defaultLocale } = router;
  const baseUrl = process.env.SITE_URL || 'https://criadero-canino-2025-the-candy-hous.vercel.app';
  
  // Construir URL actual sin el locale por defecto
  const currentPath = router.asPath;
  const cleanPath = currentPath.replace(/^\/[a-z]{2}/, ''); // Remover /es o /en
  const currentUrl = `${baseUrl}${locale === defaultLocale ? '' : `/${locale}`}${cleanPath}`;
  const canonicalUrl = canonical || `${baseUrl}${cleanPath}`;

  // URLs alternativas para hreflang
  const alternateUrls = {
    'es': `${baseUrl}${cleanPath}`,
    'en': `${baseUrl}/en${cleanPath}`,
    'x-default': `${baseUrl}${cleanPath}`
  };

  // Schema markup optimizado para idioma
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "name": "The Candy House",
    "description": description,
    "url": baseUrl,
    "telephone": "+54-11-6423-5420",
    "email": "mabelbeatrizgomez71@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Avellaneda",
      "addressRegion": "Buenos Aires",
      "addressCountry": "Argentina",
      "postalCode": "1870"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.6647,
      "longitude": -58.3649
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "image": `${baseUrl}${image}`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cachorros de Raza",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Cocker Spaniel Inglés",
            "description": "Cachorros Cocker Spaniel Inglés con pedigree",
            "brand": "The Candy House"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Schnauzer Miniatura",
            "description": "Cachorros Schnauzer Miniatura con pedigree",
            "brand": "The Candy House"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.instagram.com/thecandyhouse",
      "https://www.facebook.com/thecandyhouse"
    ],
    "areaServed": {
      "@type": "Country", 
      "name": "Argentina"
    },
    "currenciesAccepted": "ARS",
    "paymentAccepted": "Cash, Bank Transfer"
  };

  const schemaData = schema || defaultSchema;

  return (
    <Head>
      {/* Título y descripción */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Idioma y localización */}
      <meta httpEquiv="content-language" content={locale} />
      <meta name="language" content={locale === 'es' ? 'Spanish' : 'English'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang para SEO internacional */}
      <link rel="alternate" hrefLang="es" href={alternateUrls.es} />
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls['x-default']} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:site_name" content="The Candy House" />
      <meta property="og:locale" content={locale === 'es' ? 'es_AR' : 'en_US'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${baseUrl}${image}`} />
      
      {/* Datos geográficos para SEO local */}
      <meta name="geo.region" content="AR-B" />
      <meta name="geo.placename" content="Avellaneda, Buenos Aires" />
      <meta name="geo.position" content="-34.6647;-58.3649" />
      <meta name="ICBM" content="-34.6647, -58.3649" />
      
      {/* Información del negocio */}
      <meta name="author" content="The Candy House" />
      <meta name="business:contact_data:locality" content="Avellaneda" />
      <meta name="business:contact_data:region" content="Buenos Aires" />
      <meta name="business:contact_data:country_name" content="Argentina" />
      <meta name="business:contact_data:phone_number" content="+5411-6423-5420" />
      
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
      
      {/* Viewport y responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Tema de color para móviles */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-navbutton-color" content="#3B82F6" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
  );
};

export default SEO;
