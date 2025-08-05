import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaHeart, FaPaw } from 'react-icons/fa';

export default function Footer() {
  const abrirWhatsApp = () => {
    const numero = "5411642355420";
    const mensaje = "Hola! Me interesa conocer más sobre The Candy House.";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const enviarEmail = () => {
    window.location.href = "mailto:mabelbeatrizgomez71@gmail.com";
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección principal del footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información del criadero */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/images/logos/logo-main.png"
                alt="The Candy House Logo"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <h3 className="text-2xl font-bold">The Candy House</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Criadero especializado en Schnauzer Miniatura y Cocker Spaniel Inglés. 
              Más de 15 años dedicados a la crianza responsable y amorosa de cachorros 
              de la más alta calidad en Argentina.
            </p>
            
            {/* Redes sociales */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-pink-600 p-3 rounded-full transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <button
                onClick={abrirWhatsApp}
                className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-500 transition duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/razas/schnauzer" className="text-gray-300 hover:text-amber-500 transition duration-300">
                  Schnauzer Miniatura
                </Link>
              </li>
              <li>
                <Link href="/razas/cocker" className="text-gray-300 hover:text-amber-500 transition duration-300">
                  Cocker Spaniel Inglés
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-amber-500 transition duration-300">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-amber-500 transition duration-300">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="w-4 h-4 text-amber-500 mr-3" />
                <a 
                  href="mailto:mabelbeatrizgomez71@gmail.com"
                  className="text-gray-300 hover:text-amber-500 transition duration-300 text-sm"
                >
                  mabelbeatrizgomez71@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <FaWhatsapp className="w-4 h-4 text-amber-500 mr-3" />
                <button
                  onClick={abrirWhatsApp}
                  className="text-gray-300 hover:text-amber-500 transition duration-300 text-sm"
                >
                  +54 11-6423-5420
                </button>
              </div>
              <div className="text-gray-300 text-sm">
                📍 Argentina
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 The Candy House. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/terminos" className="text-gray-400 hover:text-amber-500 transition duration-300">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-gray-400 hover:text-amber-500 transition duration-300">
                Política de Privacidad
              </Link>
              <Link href="/aviso-legal" className="text-gray-400 hover:text-amber-500 transition duration-300">
                Aviso Legal
              </Link>
            </div>
            
            <div className="flex items-center text-gray-400 text-sm">
              <span>Hecho con</span>
              <FaHeart className="w-4 h-4 text-red-500 mx-2" />
              <span>en Argentina</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}