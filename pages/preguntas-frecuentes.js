import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BotonWhatsApp from '../components/BotonWhatsApp';
import SEO from '../components/SEO';

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta un cachorro Cocker Spaniel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El precio de nuestros cachorros Cocker Spaniel varía entre $150,000 y $250,000 pesos argentinos, dependiendo del pedigree y características específicas. Todos incluyen garantía de salud y documentación completa."
        }
      },
      {
        "@type": "Question", 
        "name": "¿Los cachorros vienen con pedigree?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, todos nuestros cachorros vienen con pedigree oficial registrado. También incluyen cartilla sanitaria completa, microchip y garantía de salud por 6 meses."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo visitar el criadero antes de comprar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Por supuesto. Recomendamos visitar nuestras instalaciones para conocer a los padres y ver las condiciones de crianza. Coordina tu visita contactándonos previamente."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué garantías ofrecen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos garantía de salud por 6 meses, reemplazo en caso de problemas genéticos hereditarios y soporte veterinario durante el primer año de vida del cachorro."
        }
      },
      {
        "@type": "Question",
        "name": "¿A qué edad entregan los cachorros?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entregamos los cachorros a partir de los 60 días de edad, completamente destetados, con primera vacuna aplicada y en perfecto estado de salud."
        }
      },
      {
        "@type": "Question",
        "name": "¿Hacen envíos al interior del país?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, realizamos envíos seguros a todo el país a través de empresas especializadas en transporte de mascotas. El costo varía según el destino."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "¿Cuánto cuesta un cachorro Cocker Spaniel?",
      answer: "El precio de nuestros cachorros Cocker Spaniel varía entre $150,000 y $250,000 pesos argentinos, dependiendo del pedigree y características específicas. Todos incluyen garantía de salud y documentación completa."
    },
    {
      question: "¿Los cachorros vienen con pedigree?", 
      answer: "Sí, todos nuestros cachorros vienen con pedigree oficial registrado. También incluyen cartilla sanitaria completa, microchip y garantía de salud por 6 meses."
    },
    {
      question: "¿Puedo visitar el criadero antes de comprar?",
      answer: "Por supuesto. Recomendamos visitar nuestras instalaciones para conocer a los padres y ver las condiciones de crianza. Coordina tu visita contactándonos previamente."
    },
    {
      question: "¿Qué garantías ofrecen?",
      answer: "Ofrecemos garantía de salud por 6 meses, reemplazo en caso de problemas genéticos hereditarios y soporte veterinario durante el primer año de vida del cachorro."
    },
    {
      question: "¿A qué edad entregan los cachorros?",
      answer: "Entregamos los cachorros a partir de los 60 días de edad, completamente destetados, con primera vacuna aplicada y en perfecto estado de salud."
    },
    {
      question: "¿Hacen envíos al interior del país?",
      answer: "Sí, realizamos envíos seguros a todo el país a través de empresas especializadas en transporte de mascotas. El costo varía según el destino."
    },
    {
      question: "¿Qué cuidados necesita un Schnauzer Miniatura?",
      answer: "Los Schnauzer Miniatura requieren cepillado regular, corte de pelo cada 2-3 meses, ejercicio diario moderado y alimentación de calidad premium. Son perros activos pero se adaptan bien a apartamentos."
    },
    {
      question: "¿Son buenos los Cocker con los niños?",
      answer: "Los Cocker Spaniel son excelentes con niños. Son perros dulces, pacientes y juguetones, lo que los convierte en compañeros ideales para familias con niños de todas las edades."
    }
  ];

  return (
    <div>
      <SEO
        title="Preguntas Frecuentes - The Candy House | FAQ Cachorros Cocker y Schnauzer"
        description="Respuestas a las preguntas más frecuentes sobre nuestros cachorros Cocker Spaniel y Schnauzer. Precios, garantías, pedigree, visitas al criadero y más información útil."
        keywords="preguntas frecuentes cachorros, precio cocker spaniel, precio schnauzer, pedigree cachorros, garantía salud, visita criadero, FAQ perros"
        schema={faqSchema}
      />
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              Encuentra respuestas a las consultas más comunes sobre nuestros cachorros
            </p>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                ¿No encontraste lo que buscabas?
              </h2>
              <p className="text-blue-600 mb-6">
                Contáctanos directamente y te responderemos todas tus dudas
              </p>
              <a
                href="/contacto"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Contactanos
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <BotonWhatsApp />
    </div>
  );
}
