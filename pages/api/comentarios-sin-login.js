import fs from 'fs';
import path from 'path';

const comentariosPath = path.join(process.cwd(), 'data', 'comentarios.json');

// Función para leer comentarios
function leerComentarios() {
  try {
    if (fs.existsSync(comentariosPath)) {
      const data = fs.readFileSync(comentariosPath, 'utf8');
      const parsed = JSON.parse(data);
      
      // Si es un array directo, lo convertimos al formato esperado
      if (Array.isArray(parsed)) {
        return { comentarios: parsed };
      }
      
      // Si ya es un objeto con la propiedad comentarios, lo devolvemos tal como está
      return parsed;
    }
    return { comentarios: [] };
  } catch (error) {
    console.error('Error leyendo comentarios:', error);
    return { comentarios: [] };
  }
}

// Función para escribir comentarios
function escribirComentarios(data) {
  try {
    // Asegurar que el directorio data existe
    const dataDir = path.dirname(comentariosPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Escribir solo el array de comentarios para mantener el formato original
    const comentariosArray = data.comentarios || [];
    fs.writeFileSync(comentariosPath, JSON.stringify(comentariosArray, null, 2));
    return true;
  } catch (error) {
    console.error('Error escribiendo comentarios:', error);
    return false;
  }
}

// Función para validar y limpiar texto
function limpiarTexto(texto) {
  if (!texto || typeof texto !== 'string') return '';
  
  // Remover caracteres potencialmente peligrosos
  return texto
    .trim()
    .replace(/[<>\"'&]/g, '') // Remover caracteres HTML peligrosos
    .substring(0, 500); // Limitar longitud
}

// Función para validar email
function validarEmail(email) {
  if (!email) return true; // Email es opcional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = leerComentarios();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error obteniendo comentarios:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  if (req.method === 'POST') {
    try {
      const { nombre, email, comentario, calificacion, fecha, estado } = req.body;

      // Validaciones
      if (!nombre || !comentario) {
        return res.status(400).json({ 
          error: 'Nombre y comentario son requeridos' 
        });
      }

      if (!validarEmail(email)) {
        return res.status(400).json({ 
          error: 'Email no válido' 
        });
      }

      if (calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ 
          error: 'Calificación debe estar entre 1 y 5' 
        });
      }

      // Limpiar y preparar datos
      const nuevoComentario = {
        id: Date.now().toString(),
        nombre: limpiarTexto(nombre),
        email: email ? limpiarTexto(email) : '',
        comentario: limpiarTexto(comentario),
        calificacion: parseInt(calificacion),
        fecha: fecha || new Date().toISOString(),
        estado: 'pendiente', // Siempre pendiente para moderación
        fechaCreacion: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
      };

      // Validar longitud mínima
      if (nuevoComentario.nombre.length < 2) {
        return res.status(400).json({ 
          error: 'El nombre debe tener al menos 2 caracteres' 
        });
      }

      if (nuevoComentario.comentario.length < 10) {
        return res.status(400).json({ 
          error: 'El comentario debe tener al menos 10 caracteres' 
        });
      }

      // Leer comentarios existentes
      const data = leerComentarios();

      // Asegurar que comentarios es un array
      if (!data.comentarios || !Array.isArray(data.comentarios)) {
        data.comentarios = [];
      }

      // Verificar duplicados recientes (mismo nombre y comentario en las últimas 24 horas)
      const ahora = new Date();
      const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);
      
      const duplicado = data.comentarios.find(c => 
        c.nombre.toLowerCase() === nuevoComentario.nombre.toLowerCase() &&
        c.comentario.toLowerCase() === nuevoComentario.comentario.toLowerCase() &&
        new Date(c.fechaCreacion) > hace24h
      );

      if (duplicado) {
        return res.status(400).json({ 
          error: 'Ya has enviado este comentario recientemente' 
        });
      }

      // Agregar nuevo comentario
      data.comentarios.unshift(nuevoComentario);

      // Limitar a 1000 comentarios máximo
      if (data.comentarios.length > 1000) {
        data.comentarios = data.comentarios.slice(0, 1000);
      }

      // Guardar
      if (escribirComentarios(data)) {
        res.status(201).json({ 
          message: 'Comentario enviado exitosamente. Será revisado antes de publicarse.',
          id: nuevoComentario.id 
        });
      } else {
        throw new Error('Error guardando comentario');
      }

    } catch (error) {
      console.error('Error procesando comentario:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor. Por favor intenta de nuevo.' 
      });
    }
  }
  
  else if (req.method === 'PUT') {
    // Actualizar comentario (aprobar/rechazar)
    try {
      const { id, accion } = req.body;
      
      if (!id || !accion) {
        return res.status(400).json({ error: 'ID y acción son requeridos' });
      }

      const data = leerComentarios();
      if (!data.comentarios || !Array.isArray(data.comentarios)) {
        data.comentarios = [];
      }

      const index = data.comentarios.findIndex(c => c.id === id || c.id === parseInt(id));
      
      if (index === -1) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      // Actualizar estado según la acción
      if (accion === 'aprobar') {
        data.comentarios[index].estado = 'aprobado';
        data.comentarios[index].aprobado = true;
      } else if (accion === 'rechazar') {
        data.comentarios[index].estado = 'rechazado';
        data.comentarios[index].aprobado = false;
      } else {
        return res.status(400).json({ error: 'Acción no válida. Use "aprobar" o "rechazar"' });
      }
      
      if (escribirComentarios(data)) {
        res.status(200).json({ success: true, comentario: data.comentarios[index] });
      } else {
        res.status(500).json({ error: 'Error al actualizar comentario' });
      }
    } catch (error) {
      console.error('Error actualizando comentario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  else if (req.method === 'DELETE') {
    // Eliminar comentario
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
      }

      const data = leerComentarios();
      if (!data.comentarios || !Array.isArray(data.comentarios)) {
        data.comentarios = [];
      }

      const index = data.comentarios.findIndex(c => c.id === id || c.id === parseInt(id));
      
      if (index === -1) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      data.comentarios.splice(index, 1);
      
      if (escribirComentarios(data)) {
        res.status(200).json({ success: true, message: 'Comentario eliminado' });
      } else {
        res.status(500).json({ error: 'Error al eliminar comentario' });
      }
    } catch (error) {
      console.error('Error eliminando comentario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ error: 'Método no permitido' });
  }
}
