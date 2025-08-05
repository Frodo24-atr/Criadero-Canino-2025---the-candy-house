import React from 'react';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaGoogle, FaLock, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminLogin({ providers }) {
  const router = useRouter();
  const { error } = router.query;

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/admin' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FaShieldAlt className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">The Candy House</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center"
          >
            <FaLock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {error === 'AccessDenied' ? 'Acceso denegado. Solo administradores autorizados.' :
               error === 'Signin' ? 'Error al iniciar sesión. Inténtalo de nuevo.' :
               'Error de autenticación.'}
            </span>
          </motion.div>
        )}

        {/* Google Sign In Button */}
        {providers?.google && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-3 shadow-sm"
          >
            <FaGoogle className="w-5 h-5 text-red-500" />
            <span className="font-medium">Continuar con Google</span>
          </motion.button>
        )}

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <div className="flex items-start space-x-3">
            <FaLock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">Acceso Seguro</h3>
              <p className="text-xs text-blue-600 leading-relaxed">
                Solo los administradores autorizados pueden acceder a este panel. 
                El acceso está protegido mediante autenticación OAuth2 con Google.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 The Candy House. Todos los derechos reservados.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  // Si ya está autenticado, redirigir al panel
  if (session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  
  return {
    props: {
      providers,
    },
  };
}
