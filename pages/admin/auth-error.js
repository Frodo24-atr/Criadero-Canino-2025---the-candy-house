import React from 'react';
import Link from 'next/link';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AuthError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FaExclamationTriangle className="w-8 h-8 text-red-600" />
        </motion.div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Acceso Denegado</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          No tienes permisos para acceder al panel de administración. 
          Solo los administradores autorizados pueden acceder a esta área.
        </p>

        {/* Contact Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            Si necesitas acceso administrativo, contacta con el propietario del criadero.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/admin/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Intentar de nuevo</span>
            </motion.button>
          </Link>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
