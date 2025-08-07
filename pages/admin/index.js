import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaSignOutAlt, FaCog, FaComments, FaChartBar, FaImages, FaCheck, FaTimes, FaEye, FaTrash, FaStar, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Admin() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [comentarios, setComentarios] = useState([]);
  const [loadingComentarios, setLoadingComentarios] = useState(false);

  useEffect(() => {
    // Verificar autenticación
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/admin-session');
        const data = await response.json();
        
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Cargar comentarios cuando se selecciona la sección de comentarios
  useEffect(() => {
    if (user && activeSection === 'comentarios') {
      const loadData = async () => {
        setLoadingComentarios(true);
        try {
          const response = await fetch('/api/comentarios-sin-login', {
            method: 'GET'
          });
          const data = await response.json();
          
          // El API de comentarios-sin-login devuelve un objeto con comentarios
          if (data.comentarios && Array.isArray(data.comentarios)) {
            setComentarios(data.comentarios);
          } else if (Array.isArray(data)) {
            setComentarios(data);
          } else {
            setComentarios([]);
          }
        } catch (error) {
          console.error('Error cargando comentarios:', error);
          setComentarios([]);
        } finally {
          setLoadingComentarios(false);
        }
      };
      loadData();
    }
  }, [activeSection, user]);

  // Aprobar comentario
  const aprobarComentario = async (id) => {
    try {
      const response = await fetch('/api/comentarios-sin-login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          accion: 'aprobar'
        }),
      });

      if (response.ok) {
        // Actualizar el estado local
        setComentarios(prev => 
          prev.map(c => c.id === id ? { ...c, aprobado: true, estado: 'aprobado' } : c)
        );
        
        // Mostrar mensaje de éxito
        alert('¡Comentario aprobado! Ahora aparecerá en la página principal.');
      }
    } catch (error) {
      console.error('Error aprobando comentario:', error);
      alert('Error al aprobar el comentario. Por favor intenta de nuevo.');
    }
  };

  // Eliminar comentario
  const eliminarComentario = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const response = await fetch('/api/comentarios-sin-login', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setComentarios(prev => prev.filter(c => c.id !== id));
        alert('Comentario eliminado exitosamente.');
      } else {
        alert('Error al eliminar el comentario. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error eliminando comentario:', error);
      alert('Error al eliminar el comentario. Por favor intenta de nuevo.');
    }
  };

  // Mientras se carga la sesión
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/admin-logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      router.push('/');
    }
  };

  // Renderizar sección de comentarios
  const renderComentarios = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Comentarios</h2>
        <button
          onClick={async () => {
            setLoadingComentarios(true);
            try {
              const response = await fetch('/api/comentarios-sin-login', {
                method: 'GET'
              });
              const data = await response.json();
              
              if (data.comentarios && Array.isArray(data.comentarios)) {
                setComentarios(data.comentarios);
              } else if (Array.isArray(data)) {
                setComentarios(data);
              } else {
                setComentarios([]);
              }
            } catch (error) {
              console.error('Error cargando comentarios:', error);
              setComentarios([]);
            } finally {
              setLoadingComentarios(false);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Actualizar
        </button>
      </div>

      {loadingComentarios ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando comentarios...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {comentarios.map((comentario) => {
            // Determinar estado del comentario
            const isApproved = comentario.aprobado === true || comentario.estado === 'aprobado';
            const isPending = comentario.estado === 'pendiente' || (!comentario.hasOwnProperty('aprobado') && !comentario.estado);
            
            return (
            <div key={comentario.id} className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${
              isApproved ? 'border-green-500' : 'border-yellow-500'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{comentario.nombre}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isApproved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {isApproved ? 'Aprobado' : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{comentario.email}</p>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < comentario.calificacion ? 'text-yellow-400' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({comentario.calificacion}/5)
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{comentario.comentario || comentario.mensaje}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comentario.fecha).toLocaleString('es-AR')}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  {!isApproved && (
                    <button
                      onClick={() => aprobarComentario(comentario.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition duration-300 flex items-center space-x-1"
                    >
                      <FaCheck className="w-3 h-3" />
                      <span>Aprobar</span>
                    </button>
                  )}
                  <button
                    onClick={() => eliminarComentario(comentario.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-300 flex items-center space-x-1"
                  >
                    <FaTrash className="w-3 h-3" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
            )
          })}
          {comentarios.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              <FaComments className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No hay comentarios disponibles</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Renderizar dashboard principal
  const renderDashboard = () => (
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
        <button 
          onClick={() => setActiveSection('contenido')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
        >
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
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            Total: {comentarios.length}
          </span>
          <span className="text-sm text-yellow-600">
            Pendientes: {comentarios.filter(c => !c.aprobado).length}
          </span>
        </div>
        <button 
          onClick={() => setActiveSection('comentarios')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 w-full"
        >
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
        <button 
          onClick={() => setActiveSection('estadisticas')}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 w-full"
        >
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
        <button 
          onClick={() => setActiveSection('galeria')}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition duration-300 w-full"
        >
          Gestionar Fotos
        </button>
      </motion.div>
    </div>
  );

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
                <span className="text-sm font-medium">{user?.username}</span>
                <span className="text-xs text-gray-400 bg-blue-100 px-2 py-1 rounded-full">
                  {user?.role}
                </span>
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

      {/* Navegación de secciones */}
      {activeSection !== 'dashboard' && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-2">
            <button
              onClick={() => setActiveSection('dashboard')}
              className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center space-x-2"
            >
              <span>← Volver al Dashboard</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'comentarios' && renderComentarios()}
        {activeSection === 'contenido' && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaCog className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-4">Gestión de Contenido</h2>
            <p className="text-gray-600">Esta funcionalidad estará disponible próximamente.</p>
          </div>
        )}
        {activeSection === 'estadisticas' && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaChartBar className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Comentarios Totales</h3>
                <p className="text-2xl font-bold text-blue-600">{comentarios.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Aprobados</h3>
                <p className="text-2xl font-bold text-green-600">
                  {comentarios.filter(c => c.aprobado).length}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800">Pendientes</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {comentarios.filter(c => !c.aprobado).length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">Calificación Promedio</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {comentarios.length > 0 
                    ? (comentarios.reduce((acc, c) => acc + c.calificacion, 0) / comentarios.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'galeria' && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaImages className="w-16 h-16 mx-auto mb-4 text-amber-600" />
            <h2 className="text-2xl font-bold mb-4">Gestión de Galería</h2>
            <p className="text-gray-600">Esta funcionalidad estará disponible próximamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}