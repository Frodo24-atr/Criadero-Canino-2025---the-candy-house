import React, { useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaUser, FaSignOutAlt, FaCog, FaComments, FaChartBar, FaImages } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Mientras se carga la sesión
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (status === "unauthenticated") {
    router.push('/admin/login');
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
              <span className="text-sm text-gray-500">The Candy House</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaUser className="w-4 h-4" />
                <span className="text-sm">{session.user.name}</span>
                <span className="text-xs text-gray-400">({session.user.email})</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center space-x-2"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <FaCog className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold">Gestión de Contenido</h2>
            </div>
            <p className="text-gray-600 mb-4">Administra el contenido del sitio web</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full">
              Gestionar
            </button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <FaComments className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold">Comentarios</h2>
            </div>
            <p className="text-gray-600 mb-4">Revisa y modera los comentarios</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 w-full">
              Ver Comentarios
            </button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <FaChartBar className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold">Estadísticas</h2>
            </div>
            <p className="text-gray-600 mb-4">Visualiza las estadísticas del sitio</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 w-full">
              Ver Stats
            </button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <FaImages className="w-6 h-6 text-amber-600 mr-3" />
              <h2 className="text-xl font-semibold">Galería</h2>
            </div>
            <p className="text-gray-600 mb-4">Gestiona las imágenes de la galería</p>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition duration-300 w-full">
              Gestionar Fotos
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  // Si no está autenticado, redirigir al login
  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}