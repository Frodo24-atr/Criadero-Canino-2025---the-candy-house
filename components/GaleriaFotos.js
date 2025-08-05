import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import galeriaData from '../data/galeria.json';

export default function GaleriaFotos() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('todos');

  const filteredImages = galeriaData.filter(imagen => {
    if (filter === 'todos') return true;
    return imagen.raza === filter;
  });

  const openModal = (imagen, index) => {
    setSelectedImage({ ...imagen, index });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = selectedImage.index;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    }
    
    setSelectedImage({ ...filteredImages[newIndex], index: newIndex });
  };

  const filters = [
    { key: 'todos', label: 'Todos', count: galeriaData.length },
    { key: 'cachorro', label: 'Cachorros', count: galeriaData.filter(img => img.categoria === 'cachorro').length },
    { key: 'schnauzer', label: 'Schnauzer', count: galeriaData.filter(img => img.raza === 'schnauzer').length },
    { key: 'cocker', label: 'Cocker', count: galeriaData.filter(img => img.raza === 'cocker').length }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Galería de Fotos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce a nuestros adorables cachorros y perros adultos. Cada foto cuenta 
            una historia de amor, cuidado y la alegría que estos pequeños compañeros 
            traen a nuestras vidas.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-700 shadow-md'
              }`}
            >
              {filterOption.label}
              <span className="ml-2 text-sm opacity-75">({filterOption.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Grid de imágenes */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((imagen, index) => (
              <motion.div
                key={imagen.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => openModal(imagen, index)}
              >
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={imagen.imagen}
                      alt={imagen.titulo}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <FaHeart className="text-white text-2xl opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{imagen.titulo}</h3>
                    <p className="text-sm text-gray-600">{imagen.descripcion}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        imagen.raza === 'schnauzer' ? 'bg-blue-100 text-blue-800' :
                        imagen.raza === 'cocker' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {imagen.raza === 'schnauzer' ? 'Schnauzer' :
                         imagen.raza === 'cocker' ? 'Cocker' : 'Cachorro'}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{imagen.categoria}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No hay imágenes para mostrar con este filtro.</p>
          </motion.div>
        )}
      </div>

      {/* Modal de imagen */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-amber-500 transition-colors z-10"
            >
              <FaTimes />
            </button>

            {/* Navegación */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-amber-500 transition-colors z-10"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-amber-500 transition-colors z-10"
            >
              <FaChevronRight />
            </button>

            {/* Imagen modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.imagen}
                alt={selectedImage.titulo}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-lg"
              />
              
              {/* Info de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold mb-2">{selectedImage.titulo}</h3>
                <p className="text-gray-300">{selectedImage.descripcion}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
