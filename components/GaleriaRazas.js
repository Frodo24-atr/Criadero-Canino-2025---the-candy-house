import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPaw } from 'react-icons/fa';

export default function GaleriaRazas() {
  const razas = [
    {
      nombre: 'Schnauzer Miniatura',
      descripcion: 'Perros inteligentes, alertas y muy leales. Excelentes guardianes de tamaño compacto, perfectos para familias que buscan un compañero devoto y lleno de personalidad.',
      imagen: '/images/razas/schnauzer/schnauzer-main.jpg',
      ruta: '/razas/schnauzer',
      caracteristicas: ['Inteligente', 'Leal', 'Compacto', 'Guardián'],
      colores: ['Sal y Pimienta', 'Negro', 'Blanco', 'Negro y Plata']
    },
    {
      nombre: 'Cocker Spaniel Inglés',
      descripcion: 'Perros amigables, enérgicos y muy cariñosos. Su naturaleza alegre y su pelaje sedoso los convierten en compañeros ideales para familias activas.',
      imagen: '/images/razas/cocker/cocker-main.jpg',
      ruta: '/razas/cocker',
      caracteristicas: ['Amigable', 'Enérgico', 'Cariñoso', 'Juguetón'],
      colores: ['Dorado', 'Negro', 'Tricolor', 'Rojo']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Nuestras Razas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las características únicas de cada una de nuestras razas especializadas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {razas.map((raza, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Imagen */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={raza.imagen}
                    alt={raza.nombre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 text-white z-10">
                    <h3 className="text-xl font-bold">{raza.nombre}</h3>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                    {raza.nombre}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {raza.descripcion}
                  </p>

                  {/* Características */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Características:</h4>
                    <div className="flex flex-wrap gap-2">
                      {raza.caracteristicas.map((caracteristica, i) => (
                        <span
                          key={i}
                          className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colores */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-800 mb-3">Colores disponibles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {raza.colores.map((color, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botón */}
                  <Link href={raza.ruta}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span>Conocer más</span>
                      <FaArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}