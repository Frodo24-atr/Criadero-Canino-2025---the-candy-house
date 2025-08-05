# The Candy House - Criadero Canino

Sitio web profesional para criadero de perros especializado en Schnauzer Miniatura y Cocker Spaniel Inglés.

## Características

- ✨ Diseño moderno y responsivo con Tailwind CSS
- 🖼️ Galería de fotos interactiva con filtros por raza
- 📱 Totalmente optimizado para dispositivos móviles
- 🔐 Panel de administración protegido con Google OAuth
- 💬 Sistema de comentarios y testimonios
- 🌟 Animaciones suaves con Framer Motion
- 📞 Integración con WhatsApp para contacto directo

## Tecnologías utilizadas

- **Frontend:** Next.js 13+, React, Tailwind CSS
- **Animaciones:** Framer Motion
- **Autenticación:** NextAuth.js con Google OAuth
- **Iconos:** React Icons
- **Optimización de imágenes:** Next.js Image component

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Frodo24-atr/Criadero-Canino-2025---the-candy-house.git
cd the-candy-house
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.local.example .env.local
```

4. Configura Google OAuth (ver `GOOGLE_OAUTH_SETUP.md`)

5. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

## Configuración de autenticación

Para configurar la autenticación con Google, consulta el archivo `GOOGLE_OAUTH_SETUP.md` que contiene instrucciones detalladas.

## Estructura del proyecto

```
├── components/          # Componentes reutilizables
├── pages/              # Páginas y API routes
├── public/             # Archivos estáticos (imágenes)
├── styles/             # Estilos CSS globales
└── data/               # Datos JSON para galería y comentarios
```

## Administración

El panel de administración está disponible en `/admin` y requiere autenticación con Google. Solo los emails autorizados pueden acceder.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request