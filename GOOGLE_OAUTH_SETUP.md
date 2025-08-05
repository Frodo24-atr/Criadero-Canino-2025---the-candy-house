# Configuración de Google OAuth para The Candy House

## Pasos para configurar la autenticación con Google

### 1. Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+ o Google Identity

### 2. Configurar OAuth 2.0

1. Ve a "Credenciales" en el menú lateral
2. Haz clic en "Crear credenciales" > "ID de cliente OAuth 2.0"
3. Selecciona "Aplicación web"
4. Añade estos URIs de redirección autorizados:
   - `http://localhost:3000/api/auth/callback/google` (desarrollo)
   - `https://tu-dominio.com/api/auth/callback/google` (producción)

### 3. Configurar variables de entorno

1. Copia el archivo `.env.local.example` a `.env.local`
2. Reemplaza los valores con tus credenciales de Google:
   ```
   GOOGLE_CLIENT_ID=tu-client-id-de-google
   GOOGLE_CLIENT_SECRET=tu-client-secret-de-google
   ```

### 4. Configurar emails autorizados

En el archivo `pages/api/auth/[...nextauth].js`, modifica el array `allowedEmails` para incluir los emails que pueden acceder al panel de administración:

```javascript
const allowedEmails = [
  'admin@thecandyhouse.com',
  'info@thecandyhouse.com',
  'tu-email@gmail.com',
];
```

### 5. Seguridad en producción

- Cambia `NEXTAUTH_SECRET` por una clave segura aleatoria
- Configura `NEXTAUTH_URL` con tu dominio de producción
- Restringe los emails autorizados en el callback `signIn`

## Uso

1. Los administradores acceden a `/admin/login`
2. Hacen clic en "Continuar con Google"
3. Se autentican con su cuenta de Google
4. Si su email está autorizado, acceden al panel de administración

## Estructura de archivos de autenticación

```
pages/
  api/
    auth/
      [...nextauth].js     # Configuración de NextAuth
  admin/
    index.js              # Panel de administración protegido
    login.js              # Página de login con Google
    auth-error.js         # Página de error de autenticación
```
