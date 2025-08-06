import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaGoogle, FaComments, FaArrowLeft } from 'react-icons/fa';

export default function UserSignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { callbackUrl = '/' } = router.query;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: callbackUrl 
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaComments className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Iniciar Sesión para Comentar
            </h1>
            <p className="text-gray-600">
              Inicia sesión con Google para dejar tu comentario sobre nuestro servicio
            </p>
          </div>

          {/* Botón de Google */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-all duration-300 flex items-center justify-center space-x-3 mb-6"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <>
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span>Continuar con Google</span>
              </>
            )}
          </motion.button>

          {/* Información adicional */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">¿Por qué necesitas iniciar sesión?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Para verificar que eres una persona real</li>
              <li>• Para poder responder a tu comentario</li>
              <li>• Para mantener la calidad de los testimonios</li>
            </ul>
          </div>

          {/* Botón de regreso */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </motion.button>

          {/* Separador visual */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              ¿Eres administrador?{' '}
              <button
                onClick={() => router.push('/admin')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Acceso administrativo
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
