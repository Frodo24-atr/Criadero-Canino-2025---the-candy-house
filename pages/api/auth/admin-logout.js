import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'candy-house-secret-key-2025';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Limpiar cookie
    res.setHeader('Set-Cookie', [
      `admin-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    console.error('Error en logout admin:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
