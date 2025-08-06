# Configuración del Número de WhatsApp

## Problema Actual
El número actual `5491164235420` es un número de ejemplo que puede no existir.

## ¿Cómo configurar el número real?

### 1. Obtén el número real del criadero
- El número debe estar registrado en WhatsApp
- Debe poder recibir mensajes de WhatsApp Business

### 2. Formato correcto para Argentina
Para números de Argentina, el formato debe ser:
- **54** (código de país) 
- **9** (prefijo para móviles)
- **11** (código de área de Buenos Aires)
- **XXXXXXXX** (8 dígitos del número)

### 3. Ejemplo de conversión
Si el número es: **11 6423-5420**
- Formato completo: **54 9 11 6423 5420**
- Para el código: **"5491164235420"**

### 4. Dónde cambiar el número
Archivo: `lib/contactConfig.js`
Línea 8: Cambiar `number: "5491164235420"`

### 5. Números de ejemplo que funcionan (para testing)
- `5491123456789` (número de ejemplo de Argentina)
- `5491187654321` (otro número de ejemplo)

### 6. Verificar que funciona
1. Cambiar el número en el archivo
2. Refrescar la página
3. Hacer click en el botón de WhatsApp
4. Verificar que WhatsApp se abre correctamente

## Formato para mostrar al usuario
El número se muestra como: `+54 9 11 6423-5420`
Este se configura en `displayNumber` en el mismo archivo.

## Importante
- El número debe estar activo en WhatsApp
- El número debe poder recibir mensajes
- Si es WhatsApp Business, mejor para un criadero
