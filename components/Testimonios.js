import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaGoogle, FaSignInAlt } from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Testimonios() {
  const { data: session, status } = useSession();
  const [comentarios, setComentarios] = useState([]);
  const [promedioCalificacion, setPromedioCalificacion] = useState(0);
  const [totalComentarios, setTotalComentarios] = useState(0);
  const [nuevoComentario, setNuevoComentario] = useState({
    nombre: '',
    comentario: '',
    calificacion: 5
  });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    cargarComentarios();
    // Actualizar nombre del usuario cuando inicia sesión
    if (session?.user?.name) {
      setNuevoComentario(prev => ({
        ...prev,
        nombre: session.user.name
      }));
    }
  }, [session]);

  const cargarComentarios = async () => {
    try {
      const response = await fetch('/api/comentarios');
      if (response.ok) {
        const data = await response.json();
        const comentariosAprobados = data.filter(comentario => comentario.aprobado);
        setComentarios(comentariosAprobados);
        setTotalComentarios(comentariosAprobados.length);

        if (comentariosAprobados.length > 0) {
          const promedio = comentariosAprobados.reduce((sum, comentario) => sum + comentario.calificacion, 0) / comentariosAprobados.length;
          setPromedioCalificacion(promedio);
        }
      }
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  const handleLoginWithGoogle = () => {
    signIn('google');
  };

  const handleLogout = () => {
    signOut();
    setShowForm(false);
  };

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('Debes iniciar sesión para comentar');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...nuevoComentario,
          email: session.user.email,
          usuario_id: session.user.email, // Usar email como ID único
          avatar: session.user.image,
          fecha: new Date().toISOString(),
          aprobado: false
        }),
      });

      if (response.ok) {
        alert('¡Comentario enviado exitosamente! Será revisado antes de publicarse.');
        setNuevoComentario({ 
          nombre: session.user.name, 
          comentario: '', 
          calificacion: 5 
        });
        setShowForm(false);
        cargarComentarios(); // Recargar comentarios
      } else {
        throw new Error('Error al enviar comentario');
      }
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      alert('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (calificacion) => {
    setNuevoComentario({
      ...nuevoComentario,
      calificacion
    });
  };

  const renderStars = (calificacion, interactive = false, onStarClick = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${
              i < calificacion ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-500' : ''}`}
            onClick={interactive && onStarClick ? () => onStarClick(i + 1) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Testimonios
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-2">
                {promedioCalificacion.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(promedioCalificacion))}
              </div>
              <p className="text-gray-600">
                Basado en {totalComentarios} reseñas
              </p>
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Lo que dicen nuestras familias sobre nosotros
          </p>

          {status === "loading" ? (
            <div className="flex items-center justify-center mb-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              <span className="ml-2 text-gray-600">Cargando...</span>
            </div>
          ) : !session ? (
            <motion.button
              onClick={handleLoginWithGoogle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto mb-8 transition duration-300 shadow-lg"
            >
              <FaGoogle className="w-5 h-5" />
              <span>Iniciar sesión con Google para comentar</span>
            </motion.button>
          ) : (
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-md">
                {session.user.image && (
                  <img 
                    src={session.user.image} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{session.user.name}</p>
                  <p className="text-sm text-gray-600">{session.user.email}</p>
                </div>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-red-600 transition duration-300"
                  title="Cerrar sesión"
                >
                  <FaSignInAlt className="w-4 h-4" />
                </motion.button>
              </div>
              <motion.button
                onClick={() => setShowForm(!showForm)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
              >
                {showForm ? 'Cancelar' : 'Escribir reseña'}
              </motion.button>
            </div>
          )}
        </motion.div>

        {showForm && session && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Escribir una reseña</h3>
            <form onSubmit={handleSubmitComentario}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nuevoComentario.nombre}
                  onChange={(e) => setNuevoComentario({...nuevoComentario, nombre: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Nombre obtenido de tu cuenta de Google</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación
                </label>
                <div className="flex items-center space-x-2">
                  {renderStars(nuevoComentario.calificacion, true, handleStarClick)}
                  <span className="text-gray-600 ml-2">
                    ({nuevoComentario.calificacion} estrella{nuevoComentario.calificacion !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentario
                </label>
                <textarea
                  value={nuevoComentario.comentario}
                  onChange={(e) => setNuevoComentario({...nuevoComentario, comentario: e.target.value})}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Comparte tu experiencia con The Candy House..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar reseña'}
              </button>
            </form>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comentarios.map((testimonio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 relative hover:shadow-xl transition-all duration-300"
            >
              <FaQuoteLeft className="text-amber-500 w-8 h-8 mb-4 opacity-20 absolute top-6 right-6" />

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  {testimonio.avatar ? (
                    <img 
                      src={testimonio.avatar} 
                      alt={testimonio.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonio.nombre.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonio.nombre}</h4>
                  <div className="flex items-center mt-1">
                    {renderStars(testimonio.calificacion)}
                  </div>
                  {testimonio.email && (
                    <div className="flex items-center mt-1">
                      <FaGoogle className="w-3 h-3 text-blue-500 mr-1" />
                      <span className="text-xs text-gray-500">Cuenta verificada</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 italic leading-relaxed">
                "{testimonio.mensaje || testimonio.texto}"
              </p>

              <div className="mt-4 text-sm text-gray-400">
                {new Date(testimonio.fecha).toLocaleDateString('es-AR')}
              </div>
            </motion.div>
          ))}
        </div>

        {comentarios.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-lg">Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!</p>
          </div>
        )}
      </div>
    </section>
  );
}
