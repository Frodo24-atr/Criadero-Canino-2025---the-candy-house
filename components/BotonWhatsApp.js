import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaComment } from 'react-icons/fa';

export default function BotonWhatsApp() {
  const [showMenu, setShowMenu] = useState(false);
  const numeroWhatsApp = "5411642355420"; // Número real especificado
  
  const mensajesPredefinidos = [
    {
      texto: "Hola! Me interesa conocer más sobre los cachorros disponibles.",
      label: "Información general"
    },
    {
      texto: "¡Hola! Me gustaría saber sobre los Schnauzer Miniatura disponibles.",
      label: "Schnauzer Miniatura"
    },
    {
      texto: "¡Hola! Me interesa conocer sobre los Cocker Spaniel Inglés.",
      label: "Cocker Spaniel"
    },
    {
      texto: "Hola! ¿Podrían enviarme información sobre precios y disponibilidad?",
      label: "Precios y disponibilidad"
    }
  ];
  
  const abrirWhatsApp = (mensaje = null) => {
    const mensajeDefault = "Hola! Me interesa conocer más sobre The Candy House.";
    const mensajeAEnviar = mensaje || mensajeDefault;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeAEnviar)}`;
    window.open(url, '_blank');
    setShowMenu(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl p-3 sm:p-4 w-72 sm:w-80 max-w-[calc(100vw-2rem)] border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">¿En qué te podemos ayudar?</h3>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-400 hover:text-gray-600 transition duration-200 p-1"
              >
                <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {mensajesPredefinidos.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => abrirWhatsApp(item.texto)}
                  className="w-full text-left p-2 sm:p-3 rounded-lg hover:bg-green-50 border border-gray-100 hover:border-green-200 transition duration-200 group"
                >
                  <div className="flex items-center">
                    <FaComment className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 group-hover:scale-110 transition duration-200" />
                    <span className="text-xs sm:text-sm text-gray-700 group-hover:text-green-700 leading-tight">
                      {item.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
              <button
                onClick={() => abrirWhatsApp()}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition duration-300 text-sm sm:text-base"
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Mensaje personalizado</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <motion.button
        onClick={() => setShowMenu(!showMenu)}
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          showMenu 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1 
        }}
      >
        <AnimatePresence mode="wait">
          {showMenu ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaWhatsapp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Indicador de pulso cuando está cerrado */}
      {!showMenu && (
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
    </div>
  );
}