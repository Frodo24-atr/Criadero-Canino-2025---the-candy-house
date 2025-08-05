export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { username, password } = req.body;

  // Credenciales de ejemplo (en producción, usar base de datos y hash de contraseñas)
  const validCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  if (username === validCredentials.username && password === validCredentials.password) {
    // En una implementación real, aquí generarías un JWT token
    res.status(200).json({ 
      success: true, 
      message: 'Login exitoso',
      user: { username: 'admin' }
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Credenciales incorrectas' 
    });
  }
}