// Configuración de Google Analytics y Performance Monitoring
import Script from 'next/script';

const PerformanceMonitoring = () => {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `,
        }}
      />

      {/* Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Hotjar (opcional para heatmaps) */}
      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />

      {/* Schema markup para LocalBusiness */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://criadero-canino-2025-the-candy-hous.vercel.app/#organization",
            "name": "The Candy House",
            "image": "https://criadero-canino-2025-the-candy-hous.vercel.app/images/logo.png",
            "telephone": "+54-11-6423-5420",
            "email": "mabelbeatrizgomez71@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Avellaneda",
              "addressLocality": "Avellaneda",
              "addressRegion": "Buenos Aires",
              "postalCode": "1870",
              "addressCountry": "AR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -34.6647,
              "longitude": -58.3649
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification", 
                "dayOfWeek": ["Saturday"],
                "opens": "09:00",
                "closes": "16:00"
              }
            ],
            "priceRange": "$$",
            "servesCuisine": [],
            "acceptsReservations": true,
            "currenciesAccepted": "ARS",
            "paymentAccepted": "Cash, Bank Transfer",
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": -34.6647,
                "longitude": -58.3649
              },
              "geoRadius": "50000"
            },
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
                    "brand": "The Candy House",
                    "offers": {
                      "@type": "Offer",
                      "priceCurrency": "ARS",
                      "price": "200000",
                      "availability": "https://schema.org/InStock"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product", 
                    "name": "Schnauzer Miniatura",
                    "description": "Cachorros Schnauzer Miniatura con pedigree",
                    "brand": "The Candy House",
                    "offers": {
                      "@type": "Offer",
                      "priceCurrency": "ARS",
                      "price": "230000",
                      "availability": "https://schema.org/InStock"
                    }
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": 4.9,
              "reviewCount": 50,
              "bestRating": 5,
              "worstRating": 1
            }
          })
        }}
      />
    </>
  );
};

export default PerformanceMonitoring;
