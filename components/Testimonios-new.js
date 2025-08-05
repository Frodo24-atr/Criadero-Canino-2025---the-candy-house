import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa';

export default function Testimonios() {
  const [comentarios, setComentarios] = useState([]);
  const [promedioCalificacion, setPromedioCalificacion] = useState(0);
  const [totalComentarios, setTotalComentarios] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState({
    nombre: '',
    comentario: '',
    calificacion: 5
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarComentarios();
  }, []);

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
    // Simulación de login con Google
    setIsLoggedIn(true);
    setNuevoComentario({
      ...nuevoComentario,
      nombre: 'Usuario de Google'
    });
    alert('Login simulado exitoso. En producción, usar Google Auth.');
  };

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...nuevoComentario,
          fecha: new Date().toISOString(),
          aprobado: false // Requiere aprobación del admin
        }),
      });

      if (response.ok) {
        alert('Comentario enviado! Será revisado antes de publicarse.');
        setNuevoComentario({ nombre: 'Usuario de Google', comentario: '', calificacion: 5 });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  const renderStars = (calificacion, interactive = false, onStarClick = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-5 h-5 transition-colors duration-200 ${
              i < calificacion ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={interactive ? () => onStarClick && onStarClick(i + 1) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleStarClick = (rating) => {
    setNuevoComentario({
      ...nuevoComentario,
      calificacion: rating
    });
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
          
          {/* Estadísticas de calificación */}
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

          {/* Botón para agregar comentario */}
          {!isLoggedIn ? (
            <motion.button
              onClick={handleLoginWithGoogle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto mb-8 transition duration-300"
            >
              <FaGoogle className="w-5 h-5" />
              <span>Iniciar sesión con Google para comentar</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setShowForm(!showForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold mx-auto mb-8 transition duration-300"
            >
              {showForm ? 'Cancelar' : 'Escribir reseña'}
            </motion.button>
          )}
        </motion.div>

        {/* Formulario de nuevo comentario */}
        {showForm && isLoggedIn && (
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
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
              >
                Enviar reseña
              </button>
            </form>
          </motion.div>
        )}

        {/* Lista de comentarios */}
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
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonio.nombre.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">{testimonio.nombre}</h4>
                  <div className="flex items-center mt-1">
                    {renderStars(testimonio.calificacion)}
                  </div>
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
