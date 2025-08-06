import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function NavbarSimple() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false); // Cerrar menú INMEDIATAMENTE
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Inicio', id: 'hero' },
    { name: 'Sobre Nosotros', id: 'sobre-nosotros' },
    { name: 'Nuestras Razas', id: 'razas' },
    { name: 'Galería', id: 'galeria' },
    { name: 'Contacto', id: 'contacto' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <Image
                  src="/images/logos/logo-main.png"
                  alt="The Candy House Logo"
                  width={scrolled ? 40 : 50}
                  height={scrolled ? 40 : 50}
                  className="rounded-full transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <span className={`font-bold text-amber-600 transition-all duration-300 ${
                scrolled ? 'text-xl' : 'text-2xl'
              } group-hover:text-amber-700`}>
                The Candy House
              </span>
            </button>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium py-2 px-3 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Botón Hamburguesa Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 z-50"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-700" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Overlay de fondo para cerrar menú en mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Menú Mobile */}
        {isMenuOpen && (
          <div className="md:hidden overflow-hidden bg-white border-t border-gray-200 mt-4 relative z-50 shadow-lg">
            <div className="py-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-6 py-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-medium text-lg">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
