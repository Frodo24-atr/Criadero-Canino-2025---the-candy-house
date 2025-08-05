import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'candy-house-secret-key-2025';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const token = req.cookies['admin-token'];

    if (!token) {
      return res.status(401).json({ 
        authenticated: false, 
        error: 'No hay sesión activa' 
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({ 
      authenticated: true,
      user: {
        username: decoded.username,
        role: decoded.role,
        loginTime: decoded.loginTime
      }
    });

  } catch (error) {
    console.error('Error verificando sesión:', error);
    
    // Si el token es inválido, limpiar cookie
    res.setHeader('Set-Cookie', [
      `admin-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
    ]);

    return res.status(401).json({ 
      authenticated: false, 
      error: 'Sesión inválida o expirada' 
    });
  }
}
