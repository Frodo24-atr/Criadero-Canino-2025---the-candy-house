import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BotonWhatsApp from '../../components/BotonWhatsApp';

export default function Schnauzer() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Schnauzer Miniatura
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">Imagen del Schnauzer Miniatura</span>
              </div>
              
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Características Principales</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Temperamento</h3>
                    <p className="text-gray-600">
                      Los Schnauzers Miniatura son perros inteligentes, alertas y muy leales. 
                      Son excelentes perros guardianes y compañeros familiares devotos.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Tamaño</h3>
                    <p className="text-gray-600">
                      Altura: 30-35 cm<br/>
                      Peso: 4-8 kg<br/>
                      Tamaño compacto, ideal para apartamentos.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Cuidados</h3>
                    <p className="text-gray-600">
                      Su pelaje requiere cepillado regular y recorte profesional. 
                      Son activos y necesitan ejercicio diario moderado.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Esperanza de Vida</h3>
                    <p className="text-gray-600">
                      12-16 años. Son una raza generalmente saludable con pocos problemas hereditarios.
                    </p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mb-4">Historia de la Raza</h2>
                <p className="text-gray-600 mb-4">
                  El Schnauzer Miniatura fue desarrollado en Alemania en el siglo XIX cruzando 
                  Schnauzers Estándar con razas más pequeñas como el Caniche y el Affenpinscher. 
                  Originalmente fueron criados para ser perros de granja y cazadores de ratas.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Colores Disponibles</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm">Sal y Pimienta</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <div className="w-8 h-8 bg-black rounded-full mx-auto mb-2"></div>
                    <span className="text-sm">Negro</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm">Blanco</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-center">
                    <div className="w-8 h-8 bg-gray-800 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm">Negro y Plata</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 text-blue-800">¿Te interesa esta raza?</h3>
                  <p className="text-blue-700 mb-4">
                    Contáctanos para conocer más sobre nuestros Schnauzers Miniatura disponibles.
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