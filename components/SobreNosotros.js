import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHeart, FaPaw, FaShieldAlt, FaStar } from 'react-icons/fa';

export default function SobreNosotros() {
  const valores = [
    {
      icon: <FaHeart className="w-8 h-8" />,
      titulo: "Amor y Cuidado",
      descripcion: "Cada cachorro recibe amor incondicional desde su nacimiento"
    },
    {
      icon: <FaPaw className="w-8 h-8" />,
      titulo: "Experiencia",
      descripcion: "Más de 15 años dedicados a la crianza responsable"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      titulo: "Salud Garantizada",
      descripcion: "Controles veterinarios completos y garantía de salud"
    },
    {
      icon: <FaStar className="w-8 h-8" />,
      titulo: "Excelencia",
      descripcion: "Cachorros de la más alta calidad con pedigrí"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen del criadero */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl h-96 overflow-hidden shadow-2xl">
              <Image
                src="/images/about/criadero-instalaciones.jpg"
                alt="The Candy House - Nuestro criadero"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-amber-500 text-white p-4 rounded-full shadow-lg"
            >
              <FaHeart className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* Contenido de texto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Sobre Nosotros
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              En <strong>The Candy House</strong>, nos dedicamos con pasión a la crianza responsable 
              de Schnauzer Miniatura y Cocker Spaniel Inglés. Ubicados en Argentina, 
              nuestro criadero se ha convertido en sinónimo de calidad, amor y compromiso.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Cada cachorro que nace en nuestro hogar es tratado como parte de nuestra familia. 
              Nos enfocamos en criar perros sanos, sociables y con excelente temperamento, 
              asegurando que lleguen a sus nuevas familias con todo el amor y cuidado que merecen.
            </p>

            {/* Valores */}
            <div className="grid md:grid-cols-2 gap-6">
              {valores.map((valor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-amber-50 transition duration-300"
                >
                  <div className="text-amber-500 mt-1">
                    {valor.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {valor.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {valor.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
