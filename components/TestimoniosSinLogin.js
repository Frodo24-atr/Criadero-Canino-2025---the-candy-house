import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaUser, FaPaperPlane, FaHeart } from 'react-icons/fa';

export default function TestimoniosSinLogin() {
  const [comentarios, setComentarios] = useState([]);
  const [promedioCalificacion, setPromedioCalificacion] = useState(0);
  const [totalComentarios, setTotalComentarios] = useState(0);
  const [nuevoComentario, setNuevoComentario] = useState({
    nombre: '',
    email: '',
    comentario: '',
    calificacion: 5
  });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    cargarComentarios();
  }, []);

  const cargarComentarios = async () => {
    try {
      const response = await fetch('/api/comentarios-sin-login');
      if (response.ok) {
        const data = await response.json();
        // Verificar que data.comentarios existe y es un array
        const comentariosData = data.comentarios || [];
        // Solo mostrar comentarios aprobados
        const comentariosAprobados = comentariosData.filter(c => c.estado === 'aprobado');
        setComentarios(comentariosAprobados);
        setTotalComentarios(comentariosAprobados.length);
        
        if (comentariosAprobados.length > 0) {
          const promedio = comentariosAprobados.reduce((sum, c) => sum + c.calificacion, 0) / comentariosAprobados.length;
          setPromedioCalificacion(Math.round(promedio * 10) / 10);
        }
      }
    } catch (error) {
      console.error('Error cargando comentarios:', error);
      // Establecer valores por defecto en caso de error
      setComentarios([]);
      setTotalComentarios(0);
      setPromedioCalificacion(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nuevoComentario.nombre.trim() || !nuevoComentario.comentario.trim()) {
      alert('Por favor completa al menos tu nombre y comentario');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comentarios-sin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...nuevoComentario,
          fecha: new Date().toISOString(),
          estado: 'pendiente' // Requiere moderación
        }),
      });

      if (response.ok) {
        setNuevoComentario({
          nombre: '',
          email: '',
          comentario: '',
          calificacion: 5
        });
        setShowForm(false);
        setMensajeExito('¡Gracias por tu comentario! Será revisado y publicado pronto.');
        setTimeout(() => setMensajeExito(''), 5000);
      } else {
        throw new Error('Error al enviar comentario');
      }
    } catch (error) {
      console.error('Error enviando comentario:', error);
      alert('Error al enviar el comentario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, size = 'text-lg', interactive = false, onStarClick = null) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${
          i < rating 
            ? 'text-yellow-400' 
            : 'text-gray-300'
        } ${size} ${interactive ? 'cursor-pointer hover:text-yellow-400 transition-colors' : ''}`}
        onClick={interactive ? () => onStarClick(i + 1) : undefined}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Testimonios de Nuestras Familias
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Lo que dicen quienes ya tienen un cachorro de The Candy House
          </p>
          
          {totalComentarios > 0 && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(promedioCalificacion))}
                <span className="text-2xl font-bold text-gray-800">{promedioCalificacion}</span>
              </div>
              <div className="text-gray-600">
                {totalComentarios} {totalComentarios === 1 ? 'testimonio' : 'testimonios'}
              </div>
            </div>
          )}
        </motion.div>

        {/* Mensaje de éxito */}
        {mensajeExito && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center"
          >
            {mensajeExito}
          </motion.div>
        )}

        {/* Botón para agregar comentario */}
        <div className="text-center mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <FaHeart className="text-lg" />
            {showForm ? 'Cerrar formulario' : 'Compartir tu experiencia'}
          </motion.button>
        </div>

        {/* Formulario de comentario */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-12 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Comparte tu experiencia con The Candy House
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nombre * <FaUser className="inline text-orange-500 ml-1" />
                  </label>
                  <input
                    type="text"
                    value={nuevoComentario.nombre}
                    onChange={(e) => setNuevoComentario({...nuevoComentario, nombre: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={nuevoComentario.email}
                    onChange={(e) => setNuevoComentario({...nuevoComentario, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Calificación
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(
                    nuevoComentario.calificacion, 
                    'text-2xl', 
                    true, 
                    (rating) => setNuevoComentario({...nuevoComentario, calificacion: rating})
                  )}
                  <span className="ml-2 text-gray-600">({nuevoComentario.calificacion} estrellas)</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Tu experiencia *
                </label>
                <textarea
                  value={nuevoComentario.comentario}
                  onChange={(e) => setNuevoComentario({...nuevoComentario, comentario: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-32 resize-none"
                  placeholder="Cuéntanos sobre tu experiencia con The Candy House..."
                  required
                />
              </div>

              <div className="text-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-colors flex items-center gap-2 mx-auto ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  <FaPaperPlane className="text-lg" />
                  {isSubmitting ? 'Enviando...' : 'Enviar testimonio'}
                </motion.button>
              </div>
            </form>
            
            <p className="text-sm text-gray-500 text-center mt-4">
              * Los comentarios serán revisados antes de publicarse
            </p>
          </motion.div>
        )}

        {/* Lista de comentarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comentarios.map((comentario, index) => (
            <motion.div
              key={comentario.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {renderStars(comentario.calificacion)}
                </div>
                <FaQuoteLeft className="text-orange-200 text-2xl" />
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {comentario.comentario}
              </p>
              
              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{comentario.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comentario.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {comentarios.length === 0 && (
          <div className="text-center py-12">
            <FaHeart className="text-6xl text-orange-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              ¡Sé el primero en compartir tu experiencia con The Candy House!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
