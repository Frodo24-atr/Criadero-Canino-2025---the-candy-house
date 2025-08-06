# 🚀 Guía de Despliegue en Hostinger

## 📋 Preparación para Producción

### 1. **Configuración de Google OAuth**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google OAuth
4. Configura la pantalla de consentimiento OAuth
5. Crea credenciales OAuth 2.0:
   - **Tipo:** Aplicación web
   - **URIs de origen autorizados:** `https://tudominio.com`
   - **URIs de redirección autorizados:** `https://tudominio.com/api/auth/callback/google`

### 2. **Variables de Entorno en Hostinger**

En el panel de Hostinger, configura estas variables:

```bash
# Producción
NEXTAUTH_URL=https://tudominio.com
NEXTAUTH_SECRET=tu-clave-super-secreta-unica
GOOGLE_CLIENT_ID=tu-google-client-id-real
GOOGLE_CLIENT_SECRET=tu-google-client-secret-real
JWT_SECRET=candy-house-secret-key-2025
NODE_ENV=production
```

### 3. **Estructura del Proyecto (Una sola aplicación)**

```
tudominio.com/
├── /                 → Página principal
├── /razas/           → Páginas de razas
├── /contacto         → Formulario de contacto
├── /auth/signin      → Login usuarios (Google)
└── /admin            → Panel administrativo (protegido)
```

## 🔒 Seguridad del Panel Admin

### **¿Por qué es seguro tener el admin en el mismo servidor?**

✅ **Autenticación JWT:** Solo usuarios con credenciales válidas pueden acceder
✅ **Rutas protegidas:** Middleware verifica la sesión en cada request
✅ **Cookies HttpOnly:** Previenen ataques XSS
✅ **Separación de roles:** Admin vs usuarios regulares

### **Credenciales de Administrador:**
- **Usuario:** `Mabel25TCH`
- **Contraseña:** `TCH2025!Admin#Secure`
- **Acceso:** `https://tudominio.com/admin`

## 📁 Archivos Importantes

### **Rutas del Admin (todas protegidas):**
- `/admin` → Redirige a login si no está autenticado
- `/admin/login` → Formulario de login administrativo
- `/api/auth/admin-*` → Endpoints de autenticación admin

### **Datos del Sistema:**
- `data/comentarios.json` → Base de datos de comentarios
- `data/galeria.json` → Imágenes de la galería

## 🌐 Despliegue en Hostinger

### **Opción 1: Deploy Automático (Recomendado)**
1. Conecta tu repositorio GitHub con Hostinger
2. Configura auto-deploy desde la rama `main`
3. Hostinger detectará automáticamente que es Next.js

### **Opción 2: Deploy Manual**
1. Ejecuta `npm run build` localmente
2. Sube la carpeta `.next` y archivos del proyecto
3. Configura las variables de entorno en el panel

## ⚡ Comandos de Build

```bash
# Instalar dependencias
npm install

# Build para producción
npm run build

# Iniciar en producción
npm start
```

## 🔧 Configuración Adicional

### **En package.json (ya configurado):**
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p 3000"
  }
}
```

### **En next.config.js (ya configurado):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración para Hostinger
  output: 'standalone', // Opcional: para contenedores
  compress: true,
  poweredByHeader: false
}
```

## 🛡️ Ventajas de una Sola Aplicación

✅ **Simplicidad:** Un solo proyecto para gestionar
✅ **Costo:** Solo un hosting en Hostinger
✅ **Seguridad:** JWT protege automáticamente las rutas admin
✅ **SEO:** Todas las páginas en el mismo dominio
✅ **Mantenimiento:** Actualizaciones centralizadas
✅ **Performance:** Recursos compartidos optimizados

## 🚨 Checklist Final

- [ ] Variables de entorno configuradas en Hostinger
- [ ] Google OAuth configurado con tu dominio real
- [ ] NEXTAUTH_URL apunta a tu dominio de producción
- [ ] Build exitoso sin errores
- [ ] Pruebas de login admin y usuario
- [ ] Verificación de rutas protegidas

## 📞 URLs Importantes

- **Sitio principal:** `https://tudominio.com`
- **Admin:** `https://tudominio.com/admin`
- **Login usuarios:** `https://tudominio.com/auth/signin`
- **API admin:** `https://tudominio.com/api/auth/admin-*`

---

**💡 Tip:** No necesitas servidor separado. Tu implementación actual es perfecta para un hosting compartido en Hostinger.
