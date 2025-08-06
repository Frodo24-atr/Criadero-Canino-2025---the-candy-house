# 🚀 Guía de Despliegue en Hostinger + SEO

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

# SEO y Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
SITE_URL=https://tudominio.com
```

### 3. **Estructura del Proyecto SEO Optimizado**

```
tudominio.com/
├── /                           → Página principal (optimizada)
├── /razas/cocker              → Cocker Spaniel (schema markup)
├── /razas/schnauzer           → Schnauzer (schema markup)
├── /contacto                  → Contacto (local business schema)
├── /preguntas-frecuentes      → FAQ (FAQ schema)
├── /sitemap.xml               → Sitemap dinámico
├── /robots.txt                → Robots.txt optimizado
├── /auth/signin               → Login usuarios (Google)
└── /admin                     → Panel administrativo (protegido)
```

## 🎯 **OPTIMIZACIONES SEO IMPLEMENTADAS**

### ✅ **Technical SEO**
- **Sitemap XML automático** en `/sitemap.xml`
- **Robots.txt optimizado** en `/robots.txt` 
- **Meta tags completos** en todas las páginas
- **Canonical URLs** para evitar contenido duplicado
- **Schema.org markup** en todas las páginas
- **Open Graph** para redes sociales
- **Twitter Cards** para mejor compartido

### ✅ **Content SEO**
- **Títulos optimizados** con palabras clave locales
- **Meta descripciones únicas** para cada página
- **Headers estructurados** (H1, H2, H3)
- **Página FAQ** con preguntas frecuentes
- **Contenido geo-localizado** (Buenos Aires, Argentina)

### ✅ **Local SEO**
- **Google My Business schema** implementado
- **Información de contacto estructurada**
- **Horarios de atención** en schema markup
- **Coordenadas geográficas** en meta tags
- **Número de teléfono** en formato internacional

### ✅ **Performance SEO**
- **Next.js optimizado** para velocidad
- **Imágenes optimizadas** y lazy loading
- **Compresión automática** habilitada
- **Core Web Vitals** optimizados
- **Prefetch de recursos** críticos

## 🎯 **ESTRATEGIA SEO PARA PRIMERAS POSICIONES**

### **� Palabras Clave Objetivo (Argentina)**
```
Primarias:
- "criadero canino buenos aires"
- "cachorros cocker spaniel argentina" 
- "schnauzer miniatura pedigree"
- "crianza responsable perros"

Secundarias:
- "the candy house criadero"
- "cachorros con garantía salud"
- "cocker spaniel inglés cachorros"
- "schnauzer miniatura buenos aires"

Long-tail:
- "donde comprar cocker spaniel argentina"
- "criadero schnauzer miniatura confiable"
- "cachorros pedigree buenos aires zona"
```

### **🏆 Configuraciones Post-Deploy para Top Rankings**

#### **1. Google Search Console**
```bash
# Agregar tu sitio en: https://search.google.com/search-console
# Verificar propiedad con meta tag o archivo HTML
# Enviar sitemap: https://tudominio.com/sitemap.xml
# Solicitar indexación de páginas principales
```

#### **2. Google Analytics 4**
```bash
# Crear cuenta en: https://analytics.google.com
# Configurar conversiones: contacto, WhatsApp, testimonios
# Segmentar audiencia: familias, amantes perros, Buenos Aires
```

#### **3. Google My Business (CRÍTICO para Local SEO)**
```bash
# Crear perfil comercial en: https://business.google.com
# Categoría: "Criadero de mascotas"
# Agregar fotos del criadero y cachorros
# Recolectar reseñas de clientes satisfechos
# Responder a todas las reseñas
```

### **📈 Estrategia de Contenido SEO**

#### **Páginas Optimizadas Implementadas:**
- ✅ **Home:** Keywords principales + schema LocalBusiness
- ✅ **Cocker Spaniel:** Ficha técnica + precios + schema Product  
- ✅ **Schnauzer:** Características + disponibilidad + schema Product
- ✅ **Contacto:** Info local + horarios + schema ContactPage
- ✅ **FAQ:** Preguntas frecuentes + schema FAQPage

#### **Próximo Contenido a Crear:**
- **Blog de cuidados** (`/blog/cuidados-cocker-spaniel`)
- **Galería de cachorros** (`/galeria/disponibles`)
- **Testimonios clientes** (`/testimonios`)
- **Guía de razas** (`/guia/elegir-raza-perfecta`)

### **🔍 Schema Markup Implementado**
```json
✅ Organization (datos del criadero)
✅ LocalBusiness (SEO local)
✅ Product (páginas de razas)
✅ FAQPage (preguntas frecuentes)
✅ ContactPage (información contacto)
✅ WebSite (búsqueda interna)
✅ AggregateRating (valoraciones)
```

## 🌐 Despliegue en Hostinger

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

## 🚨 Checklist SEO Post-Deploy

### **Inmediatamente después del deploy:**
- [ ] Verificar que todas las páginas cargan correctamente
- [ ] Probar `/sitemap.xml` y `/robots.txt`
- [ ] Configurar Google Search Console
- [ ] Enviar sitemap a Google
- [ ] Configurar Google Analytics 4
- [ ] Crear perfil Google My Business
- [ ] Verificar schema markup con Rich Results Test

### **Primera semana:**
- [ ] Solicitar indexación de páginas principales en Search Console
- [ ] Configurar Google Ads campaign (opcional)
- [ ] Crear contenido en redes sociales linkendo al sitio
- [ ] Contactar influencers de mascotas locales
- [ ] Comenzar estrategia de link building local

### **Primer mes:**
- [ ] Analizar datos de Search Console
- [ ] Optimizar páginas con bajo CTR
- [ ] Crear blog con contenido relevante
- [ ] Pedir reseñas a clientes satisfechos
- [ ] Monitorear posiciones con herramientas SEO

## 📊 **Métricas SEO a Monitorear**

### **Google Search Console:**
- Impresiones para keywords objetivo
- CTR de páginas principales
- Posición promedio en SERPs
- Páginas con errores de indexación

### **Google Analytics:**
- Tráfico orgánico mensual
- Conversiones (formulario contacto)
- Tiempo de permanencia en sitio
- Páginas más visitadas

### **Herramientas Adicionales:**
- **SEMrush/Ahrefs:** Seguimiento de rankings
- **GTmetrix:** Velocidad de carga
- **Google PageSpeed:** Core Web Vitals

## 🏆 **Expectativas de Ranking**

### **Cronograma Realista:**
- **Mes 1-2:** Indexación completa, primeras apariciones
- **Mes 3-4:** Top 20 para keywords long-tail
- **Mes 6-8:** Top 10 para keywords principales locales  
- **Mes 9-12:** Top 5 para "criadero canino buenos aires"

### **Factores Críticos de Éxito:**
✅ **Contenido de calidad** (implementado)
✅ **SEO técnico perfecto** (implementado)
✅ **Schema markup completo** (implementado)
✅ **Experiencia de usuario** (implementado)
🔄 **Reseñas Google My Business** (por implementar)
🔄 **Link building local** (por implementar)
🔄 **Contenido regular** (por implementar)

## 📞 URLs Importantes

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
