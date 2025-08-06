import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaArrowLeft, FaGoogle } from 'react-icons/fa';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = (error) => {
    switch (error) {
      case 'Configuration':
        return 'Hay un problema con la configuración del servidor.';
      case 'AccessDenied':
        return 'El acceso fue denegado. Verifica tus permisos.';
      case 'Verification':
        return 'El token de verificación ha expirado o ya fue usado.';
      case 'Default':
      default:
        return 'Ocurrió un error durante el proceso de autenticación.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icono de error */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaExclamationTriangle className="w-8 h-8 text-red-600" />
          </motion.div>

          {/* Mensaje de error */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Error de Autenticación
          </h1>
          <p className="text-gray-600 mb-8">
            {getErrorMessage(error)}
          </p>

          {/* Botones de acción */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/auth/signin')}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaGoogle className="w-5 h-5" />
              <span>Intentar de nuevo</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/')}
              className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </motion.button>
          </div>

          {/* Información de ayuda */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              ¿Necesitas ayuda?
            </p>
            <p className="text-xs text-gray-400">
              Si el problema persiste, contacta al administrador del sitio.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
