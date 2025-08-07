import fs from 'fs';
import path from 'path';

const comentariosFilePath = path.join(process.cwd(), 'data', 'comentarios.json');

// Función para leer comentarios
const leerComentarios = () => {
  try {
    const data = fs.readFileSync(comentariosFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer comentarios:', error);
    return [];
  }
};

// Función para escribir comentarios
const escribirComentarios = (comentarios) => {
  try {
    fs.writeFileSync(comentariosFilePath, JSON.stringify(comentarios, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error al escribir comentarios:', error);
    return false;
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener todos los comentarios
    try {
      const comentarios = leerComentarios();
      res.status(200).json(comentarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener comentarios' });
    }
  } 
  else if (req.method === 'POST') {
    // Crear nuevo comentario
    try {
      const { 
        nombre, 
        comentario, 
        calificacion, 
        fecha, 
        email,
        aprobado = false 
      } = req.body;
      
      if (!nombre || !comentario || !calificacion || !email) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const comentarios = leerComentarios();
      const nuevoId = comentarios.length > 0 ? Math.max(...comentarios.map(c => c.id)) + 1 : 1;
      
      const nuevoComentario = {
        id: nuevoId,
        nombre,
        mensaje: comentario,
        calificacion: parseInt(calificacion),
        fecha: fecha || new Date().toISOString(),
        email,
        aprobado
      };

      comentarios.push(nuevoComentario);
      
      if (escribirComentarios(comentarios)) {
        res.status(201).json({ success: true, comentario: nuevoComentario });
      } else {
        res.status(500).json({ error: 'Error al guardar comentario' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al procesar comentario' });
    }
  }
  else if (req.method === 'PUT') {
    // Actualizar comentario (aprobar/rechazar)
    try {
      const { id, accion, aprobado } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
      }

      const comentarios = leerComentarios();
      const index = comentarios.findIndex(c => c.id === parseInt(id) || c.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      // Manejar tanto el formato nuevo (accion) como el anterior (aprobado)
      if (accion) {
        comentarios[index].aprobado = accion === 'aprobar';
      } else if (typeof aprobado === 'boolean') {
        comentarios[index].aprobado = aprobado;
      } else {
        return res.status(400).json({ error: 'Acción o estado de aprobación requerido' });
      }
      
      if (escribirComentarios(comentarios)) {
        res.status(200).json({ success: true, comentario: comentarios[index] });
      } else {
        res.status(500).json({ error: 'Error al actualizar comentario' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar comentario' });
    }
  }
  else if (req.method === 'DELETE') {
    // Eliminar comentario
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
      }

      const comentarios = leerComentarios();
      const index = comentarios.findIndex(c => c.id === parseInt(id) || c.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      comentarios.splice(index, 1);
      
      if (escribirComentarios(comentarios)) {
        res.status(200).json({ success: true, message: 'Comentario eliminado' });
      } else {
        res.status(500).json({ error: 'Error al eliminar comentario' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar comentario' });
    }
  }
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
