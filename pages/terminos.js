import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BotonWhatsApp from '../components/BotonWhatsApp';

export default function Terminos() {
  return (
    <>
      <Head>
        <title>Términos y Condiciones - The Candy House</title>
        <meta name="description" content="Términos y condiciones de uso del sitio web de The Candy House" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">
              Términos y Condiciones
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Última actualización: 5 de agosto de 2025
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Aceptación de Términos</h2>
              <p className="mb-6">
                Al acceder y utilizar el sitio web de The Candy House, usted acepta cumplir con estos 
                términos y condiciones. Si no está de acuerdo con alguno de estos términos, 
                no debe utilizar nuestro sitio web.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Información del Criadero</h2>
              <p className="mb-6">
                The Candy House es un criadero especializado en Schnauzer Miniatura y Cocker Spaniel Inglés, 
                ubicado en Argentina. Nos dedicamos a la crianza responsable y ética de estas razas.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Disponibilidad de Cachorros</h2>
              <p className="mb-6">
                La información sobre disponibilidad de cachorros se actualiza regularmente, 
                pero puede cambiar sin previo aviso. La reserva de un cachorro requiere confirmación 
                directa con nuestro equipo.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Garantías de Salud</h2>
              <p className="mb-6">
                Todos nuestros cachorros son entregados con controles veterinarios completos, 
                vacunas al día y certificado de salud. Ofrecemos garantía limitada de salud 
                según los términos específicos acordados en cada venta.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Proceso de Adopción</h2>
              <p className="mb-6">
                El proceso de adopción incluye una evaluación del hogar adoptivo para asegurar 
                el bienestar del cachorro. Nos reservamos el derecho de rechazar una adopción 
                si consideramos que no es en el mejor interés del animal.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Uso del Sitio Web</h2>
              <p className="mb-6">
                El contenido de este sitio web es para fines informativos únicamente. 
                Las imágenes y descripciones pueden no corresponder exactamente a los 
                cachorros disponibles en el momento de su consulta.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Privacidad</h2>
              <p className="mb-6">
                Respetamos su privacidad y protegemos la información personal que nos proporciona. 
                Consulte nuestra Política de Privacidad para obtener más detalles.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Limitación de Responsabilidad</h2>
              <p className="mb-6">
                The Candy House no será responsable por daños indirectos, incidentales o 
                consecuentes que surjan del uso de este sitio web o de la adopción de nuestros cachorros, 
                excepto donde la ley lo prohíba.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Modificaciones</h2>
              <p className="mb-6">
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                Los cambios entrarán en vigencia inmediatamente después de su publicación en el sitio web.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Contacto</h2>
              <p className="mb-6">
                Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través de:
              </p>
              <ul className="list-disc list-inside mb-6">
                <li>Email: mabelbeatrizgomez71@gmail.com</li>
                <li>WhatsApp: +54 11-6423-5420</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
                <p className="text-amber-800">
                  <strong>Importante:</strong> Estos términos y condiciones se rigen por las leyes de Argentina. 
                  Cualquier disputa será resuelta en los tribunales competentes de Argentina.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <BotonWhatsApp />
      </div>
    </>
  );
}
