import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    // Simulación de envío
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
      
      setTimeout(() => setEnviado(false), 3000);
    }, 1000);
  };

  const abrirWhatsApp = () => {
    if (typeof window !== 'undefined') {
      // Número corregido para Argentina con formato correcto
      const numero = "5491164235420"; // 54 + 9 + 11 + número
      const mensaje = "Hola! Me interesa conocer más sobre los cachorros disponibles en The Candy House.";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      titulo: "Email",
      info: "mabelbeatrizgomez71@gmail.com",
      accion: () => {
        if (typeof window !== 'undefined') {
          window.location.href = "mailto:mabelbeatrizgomez71@gmail.com";
        }
      }
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      titulo: "WhatsApp",
      info: "+54 9 11 6423-5420",
      accion: abrirWhatsApp
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      titulo: "Ubicación",
      info: "Avellaneda, Buenos Aires",
      accion: () => {
        if (typeof window !== 'undefined') {
          window.open("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13126.942663614644!2d-58.377726666738184!3d-34.66137801693719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3335230bd052b%3A0x9d632a18eea90a31!2sAvellaneda%2C%20Buenos%20Aires%20Province!5e0!3m2!1sen!2sar!4v1754433388629!5m2!1sen!2sar", "_blank");
        }
      }
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Listo para darle la bienvenida a un nuevo miembro a tu familia? 
            Estamos aquí para ayudarte a encontrar el cachorro perfecto.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-800">
              Información de Contacto
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={item.accion}
                  className={`flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    item.accion ? 'cursor-pointer hover:bg-amber-50' : ''
                  }`}
                >
                  <div className="text-amber-500 mr-6">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {item.titulo}
                    </h4>
                    <p className="text-gray-600">
                      {item.info}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botón de WhatsApp destacado */}
            <motion.button
              onClick={abrirWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaWhatsapp className="w-6 h-6" />
              <span>Chatear por WhatsApp</span>
            </motion.button>

            {/* Mapa de Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 bg-gray-200 rounded-2xl h-64 overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13126.942663614644!2d-58.377726666738184!3d-34.66137801693719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3335230bd052b%3A0x9d632a18eea90a31!2sAvellaneda%2C%20Buenos%20Aires%20Province!5e0!3m2!1sen!2sar!4v1754433388629!5m2!1sen!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="The Candy House - Avellaneda, Buenos Aires"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-800">
              Envíanos un Mensaje
            </h3>

            {enviado && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"
              >
                ¡Mensaje enviado correctamente! Te contactaremos pronto.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300 resize-none"
                  placeholder="Cuéntanos qué tipo de cachorro estás buscando, tus preferencias, experiencia con mascotas, etc."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={enviando}
                whileHover={{ scale: enviando ? 1 : 1.05 }}
                whileTap={{ scale: enviando ? 1 : 0.95 }}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {enviando ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              * Campos obligatorios. Responderemos en menos de 24 horas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
