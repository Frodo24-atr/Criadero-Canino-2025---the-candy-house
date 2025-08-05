import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BotonWhatsApp from '../../components/BotonWhatsApp';

export default function Cocker() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Cocker Spaniel Inglés
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">Imagen del Cocker Spaniel</span>
              </div>
              
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Características Principales</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Temperamento</h3>
                    <p className="text-gray-600">
                      Los Cocker Spaniels son perros alegres, amigables y muy enérgicos. 
                      Son excelentes compañeros familiares y se llevan bien con niños.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Tamaño</h3>
                    <p className="text-gray-600">
                      Altura: 38-41 cm (machos), 36-38 cm (hembras)<br/>
                      Peso: 13-16 kg (machos), 12-15 kg (hembras)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Cuidados</h3>
                    <p className="text-gray-600">
                      Requieren cepillado regular debido a su pelaje largo. 
                      Necesitan ejercicio diario y estimulación mental.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Esperanza de Vida</h3>
                    <p className="text-gray-600">
                      12-15 años con los cuidados apropiados y una buena alimentación.
                    </p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mb-4">Historia de la Raza</h2>
                <p className="text-gray-600 mb-4">
                  El Cocker Spaniel Inglés fue desarrollado en Inglaterra para la caza de becadas 
                  (woodcock en inglés, de donde deriva su nombre "cocker"). Son perros de trabajo 
                  convertidos en excelentes compañeros familiares.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-blue-800">¿Te interesa esta raza?</h3>
                  <p className="text-blue-700 mb-4">
                    Contáctanos para conocer más sobre nuestros Cocker Spaniels disponibles.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Contactar Ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BotonWhatsApp />
    </div>
  );
}