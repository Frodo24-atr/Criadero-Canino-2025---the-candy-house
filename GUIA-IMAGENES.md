# Guía de Integración de Imágenes - The Candy House

## 📸 Estructura de Carpetas Creada

```
public/
└── images/
    ├── hero/                 # Sección principal
    ├── razas/               
    │   ├── schnauzer/       # Imágenes de Schnauzer
    │   └── cocker/          # Imágenes de Cocker  
    ├── galeria/             # Galería general
    ├── about/               # Sección "Sobre Nosotros"
    ├── testimonios/         # Testimonios visuales
    └── logos/               # Logos y marca
```

## 🎯 Dónde Agregar Cada Tipo de Imagen

### 1. **Sección Hero (`/images/hero/`)**
- `hero-background.jpg` - Imagen principal de fondo (1920x1080px)
- `hero-cachorro-featured.jpg` - Cachorro destacado

**En el componente:** `components/Hero.js`
```jsx
<Image 
  src="/images/hero/hero-background.jpg" 
  alt="The Candy House - Criadero de cachorros" 
  fill
  style={{objectFit: 'cover'}}
  priority
/>
```

### 2. **Galería de Razas (`/images/razas/`)**

#### Para Schnauzer (`/images/razas/schnauzer/`):
- `schnauzer-main.jpg` - Imagen principal (800x600px)
- `schnauzer-características.jpg` - Mostrando características
- `schnauzer-cachorros-1.jpg`, `schnauzer-cachorros-2.jpg`
- `schnauzer-adulto.jpg` - Ejemplar adulto

#### Para Cocker (`/images/razas/cocker/`):
- `cocker-main.jpg` - Imagen principal (800x600px)
- `cocker-características.jpg` - Mostrando características  
- `cocker-cachorros-1.jpg`, `cocker-cachorros-2.jpg`
- `cocker-adulto.jpg` - Ejemplar adulto

**En el componente:** `components/GaleriaRazas.js`
```jsx
<Image 
  src="/images/razas/schnauzer/schnauzer-main.jpg" 
  alt="Schnauzer Miniatura" 
  width={400} 
  height={300}
  className="rounded-lg"
/>
```

### 3. **Sección Sobre Nosotros (`/images/about/`)**
- `criadero-exterior.jpg` - Vista externa del criadero
- `criadero-instalaciones.jpg` - Instalaciones internas
- `equipo-propietarios.jpg` - Foto de los propietarios
- `valores-cuidado.jpg` - Imagen representando valores

**En el componente:** `components/SobreNosotros.js`
```jsx
<Image 
  src="/images/about/criadero-exterior.jpg" 
  alt="Instalaciones The Candy House" 
  width={600} 
  height={400}
/>
```

### 4. **Galería General (`/images/galeria/`)**
- `cachorro-01.jpg` hasta `cachorro-20.jpg` - Fotos individuales (600x600px cuadradas)
- `familia-01.jpg` hasta `familia-10.jpg` - Familias con sus mascotas

**Para el archivo:** `data/galeria.json`
```json
{
  "imagenes": [
    {
      "src": "/images/galeria/cachorro-01.jpg",
      "alt": "Cachorro Schnauzer jugando",
      "raza": "schnauzer"
    }
  ]
}
```

### 5. **Testimonios (`/images/testimonios/`)**
- `familia-testimonio-1.jpg` - Familias felices con sus mascotas
- `adopcion-01.jpg` hasta `adopcion-10.jpg` - Momentos de adopción

### 6. **Logos y Marca (`/images/logos/`)**
- `logo-main.png` - Logo principal (300x300px, fondo transparente)
- `logo-white.png` - Logo en blanco para fondos oscuros
- `favicon.ico` - Icono del navegador (32x32px)

**En el componente:** `components/Navbar.js` y `components/Footer.js`
```jsx
<Image 
  src="/images/logos/logo-main.png" 
  alt="The Candy House Logo" 
  width={50} 
  height={50}
/>
```

## 🚀 Pasos para Agregar Imágenes

### 1. **Copiar las imágenes**
Simplemente arrastra y suelta tus imágenes en las carpetas correspondientes:
- Copia las fotos de cachorros a `/public/images/galeria/`
- Copia fotos específicas de razas a `/public/images/razas/schnauzer/` o `/public/images/razas/cocker/`
- Copia la imagen principal del criadero a `/public/images/hero/`

### 2. **Actualizar los componentes**
Los componentes ya están preparados con placeholders. Solo necesitas:
- Descomentar las líneas de código con `Image`
- Actualizar las rutas con los nombres reales de tus archivos
- Ajustar los textos `alt` con descripciones apropiadas

### 3. **Optimización automática**
Next.js optimizará automáticamente:
- ✅ Compresión de imágenes
- ✅ Formatos modernos (WebP)
- ✅ Carga diferida (lazy loading)
- ✅ Responsive images

## 📱 Ejemplo Completo - Galería de Razas

```jsx
// En components/GaleriaRazas.js
const razas = [
  {
    nombre: "Schnauzer Miniatura",
    imagen: "/images/razas/schnauzer/schnauzer-main.jpg",
    descripcion: "Inteligente, valiente y leal",
    link: "/razas/schnauzer"
  },
  {
    nombre: "Cocker Spaniel Inglés", 
    imagen: "/images/razas/cocker/cocker-main.jpg",
    descripcion: "Cariñoso, enérgico y gentil",
    link: "/razas/cocker"
  }
];

return (
  <div className="grid md:grid-cols-2 gap-8">
    {razas.map((raza) => (
      <div key={raza.nombre} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Image 
          src={raza.imagen}
          alt={raza.nombre}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{raza.nombre}</h3>
          <p className="text-gray-600">{raza.descripcion}</p>
        </div>
      </div>
    ))}
  </div>
);
```

## ✅ Lista de Verificación

- [x] Crear carpeta `/public/images/hero/` y agregar imagen principal
- [x] Agregar fotos de Schnauzer en `/public/images/razas/schnauzer/`
- [x] Agregar fotos de Cocker en `/public/images/razas/cocker/`
- [x] Llenar galería general en `/public/images/galeria/`
- [x] Agregar logo en `/public/images/logos/logo-main.png`
- [x] Agregar fotos del criadero en `/public/images/about/`
- [ ] Actualizar favicon.ico
- [x] Descomentar código de Image en componentes
- [x] Verificar que todas las rutas coincidan con nombres de archivos

## 🎉 Estado Actual - COMPLETADO

✅ **Hero**: hero-background.jpg integrada
✅ **Schnauzer**: schnauzer-main.jpg integrada  
✅ **Cocker**: cocker-main.jpg integrada
✅ **Galería**: 43 fotos de cachorros integradas
✅ **Logo**: logo-main.png integrada
✅ **About**: criadero-instalaciones.jpg integrada
✅ **Galería interactiva**: Modal y filtros funcionando

¡El sitio web está completamente funcional con todas las imágenes! 🐶✨
