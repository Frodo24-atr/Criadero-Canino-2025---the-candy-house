import React from 'react';
import Hero from '../components/Hero';
import SobreNosotros from '../components/SobreNosotros';
import GaleriaRazas from '../components/GaleriaRazas';
import GaleriaFotos from '../components/GaleriaFotos';
import Testimonios from '../components/Testimonios';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';
import BotonWhatsApp from '../components/BotonWhatsApp';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tudominio.com/#organization",
        "name": "The Candy House",
        "description": "Criadero canino premium especializado en Cocker Spaniel y Schnauzer con más de 15 años de experiencia",
        "url": "https://tudominio.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tudominio.com/images/logo.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+54-11-1234-5678",
          "contactType": "customer service",
          "availableLanguage": "Spanish"
        },
        "sameAs": [
          "https://www.instagram.com/thecandyhouse",
          "https://www.facebook.com/thecandyhouse"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://tudominio.com/#website",
        "url": "https://tudominio.com",
        "name": "The Candy House - Criadero Canino Premium",
        "description": "Criadero especializado en cachorros de raza con pedigree y crianza responsable",
        "publisher": {
          "@id": "https://tudominio.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://tudominio.com/buscar?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://tudominio.com/#localbusiness",
        "name": "The Candy House",
        "image": "https://tudominio.com/images/criadero.jpg",
        "@id": "https://tudominio.com",
        "url": "https://tudominio.com",
        "telephone": "+54-11-1234-5678",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dirección del criadero",
          "addressLocality": "Buenos Aires",
          "addressRegion": "Buenos Aires",
          "postalCode": "1000",
          "addressCountry": "AR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -34.6037,
          "longitude": -58.3816
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
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="The Candy House - Criadero Canino Premium | Cocker Spaniel y Schnauzer Argentina"
        description="Criadero canino premium con +15 años de experiencia. Especializados en Cocker Spaniel y Schnauzer. Cachorros con pedigree, garantía de salud y crianza responsable en Buenos Aires, Argentina."
        keywords="criadero canino argentina, cocker spaniel cachorros, schnauzer miniatura, pedigree, cachorros buenos aires, crianza responsable, perros de raza, the candy house, criadero premium"
        schema={homeSchema}
      />

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <SobreNosotros />
          <GaleriaRazas />
          <GaleriaFotos />
          <Testimonios />
          <Contacto />
        </main>
        <Footer />
        <BotonWhatsApp />
      </div>
    </>
  );
}