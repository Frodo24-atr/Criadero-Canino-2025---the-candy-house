# Estructura de Imágenes - The Candy House

## 📁 Organización de Carpetas

### `/public/images/hero/`
**Para la sección principal (Hero)**
- `hero-background.jpg` - Imagen de fondo principal
- `hero-cachorro-1.jpg` - Cachorro destacado
- `hero-cachorro-2.jpg` - Cachorro secundario

### `/public/images/razas/`
**Para las secciones de razas específicas**

#### `/razas/schnauzer/`
- `schnauzer-main.jpg` - Imagen principal de Schnauzer
- `schnauzer-caracteristicas.jpg` - Para mostrar características
- `schnauzer-cachorros-1.jpg` - Camada de cachorros
- `schnauzer-cachorros-2.jpg` - Cachorros individuales
- `schnauzer-adulto.jpg` - Ejemplar adulto

#### `/razas/cocker/`
- `cocker-main.jpg` - Imagen principal de Cocker
- `cocker-caracteristicas.jpg` - Para mostrar características
- `cocker-cachorros-1.jpg` - Camada de cachorros
- `cocker-cachorros-2.jpg` - Cachorros individuales
- `cocker-adulto.jpg` - Ejemplar adulto

### `/public/images/galeria/`
**Para la galería general de cachorros**
- `cachorro-01.jpg` hasta `cachorro-20.jpg` - Fotos individuales
- `familia-01.jpg` hasta `familia-10.jpg` - Fotos familiares
- `camadas/` - Subcarpeta para fotos de camadas específicas

### `/public/images/about/`
**Para la sección "Sobre Nosotros"**
- `criadero-exterior.jpg` - Vista del criadero
- `criadero-interior.jpg` - Instalaciones internas
- `equipo-1.jpg` - Foto del equipo/propietarios
- `valores-1.jpg` - Imagen para la sección de valores

### `/public/images/testimonios/`
**Para la sección de testimonios (opcional)**
- `familia-testimonio-1.jpg` - Familias con sus mascotas
- `familia-testimonio-2.jpg` - Más testimonios visuales

### `/public/images/logos/`
**Para logos y elementos de marca**
- `logo-main.png` - Logo principal (fondo transparente)
- `logo-white.png` - Logo en blanco
- `favicon.ico` - Icono del sitio web
- `logo-social.jpg` - Para redes sociales

## 📋 Recomendaciones de Formato

### Tamaños Recomendados:
- **Hero Background**: 1920x1080px (Full HD)
- **Imágenes de Razas**: 800x600px
- **Galería de Cachorros**: 600x600px (cuadradas)
- **Testimonios**: 400x400px
- **Logo Principal**: 300x300px (PNG transparente)

### Formatos:
- **JPG**: Para fotografías
- **PNG**: Para logos con transparencia
- **WebP**: Para mejor optimización (recomendado)

## 🔧 Cómo usar en el código:

```jsx
// Ejemplo de uso en componentes
import Image from 'next/image'

// Imagen de la galería
<Image 
  src="/images/galeria/cachorro-01.jpg" 
  alt="Cachorro Schnauzer" 
  width={600} 
  height={600} 
/>

// Imagen del hero
<Image 
  src="/images/hero/hero-background.jpg" 
  alt="The Candy House" 
  fill 
  style={{objectFit: 'cover'}} 
/>
```

## 📝 Notas:
- Todas las rutas comienzan con `/images/` desde el código
- Next.js optimiza automáticamente las imágenes
- Usar nombres descriptivos y consistentes
- Mantener archivos organizados por sección
