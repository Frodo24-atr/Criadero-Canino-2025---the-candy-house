import jwt from 'jsonwebtoken';

// Credenciales del administrador (en producción, estas deberían estar en variables de entorno)
const ADMIN_CREDENTIALS = {
  username: 'Mabel25TCH',
  password: 'TCH2025!Admin#Secure'
};

const JWT_SECRET = process.env.JWT_SECRET || 'candy-house-secret-key-2025';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { username, password } = req.body;

    // Validar credenciales
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    // Verificar credenciales
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { 
        username: username,
        role: 'admin',
        loginTime: new Date().toISOString()
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Configurar cookie segura
    res.setHeader('Set-Cookie', [
      `admin-token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Inicio de sesión exitoso',
      user: {
        username: username,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Error en login admin:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
