# Configuración de Vercel para Panel de Administración

## 🔗 URLs de Acceso

### Página Principal
```
https://tu-proyecto.vercel.app
```

### Panel de Administración
```
https://tu-proyecto.vercel.app/admin
```

### Login de Administración
```
https://tu-proyecto.vercel.app/admin/login
```

## 🔧 Variables de Entorno Requeridas en Vercel

Ve a **Settings → Environment Variables** en tu dashboard de Vercel y agrega:

### Variables Obligatorias
```bash
# NextAuth Configuration
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=genera-un-secret-muy-seguro-aqui

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=placeholder
GOOGLE_CLIENT_SECRET=placeholder
```

## 🔑 Credenciales de Administrador

**Usuario:** Mabel25TCH  
**Contraseña:** TCH2025!Admin#Secure

## 📋 Pasos para Acceder al Admin en Vercel

1. **Configura las variables de entorno** en Vercel
2. **Redespliega** el proyecto desde Vercel dashboard
3. **Accede a:** `https://tu-proyecto.vercel.app/admin`
4. **Inicia sesión** con las credenciales de arriba

## 🛠️ Troubleshooting

### Si no puedes acceder al admin:
1. Verifica que `NEXTAUTH_URL` esté configurado correctamente
2. Asegúrate de que `NEXTAUTH_SECRET` esté configurado
3. Verifica que el despliegue sea exitoso
4. Limpia la caché del navegador

### Si ves errores 404:
- La URL correcta es `/admin` no `/admin/`
- Asegúrate de que el proyecto se haya desplegado completamente

## 📝 Notas Adicionales

- El panel de admin está protegido con `X-Robots-Tag: noindex`
- Las APIs funcionan automáticamente en Vercel
- Los comentarios se almacenan en el sistema de archivos de Vercel
