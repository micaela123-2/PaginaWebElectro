# Ener-Wave | Portal Web Premium & Telemetría Marina

¡Bienvenido al código fuente oficial del sitio web interactivo de **Ener-Wave**, la compañía líder en generación de energía renovable undimotriz y mareomotriz!

Este proyecto ha sido desarrollado con una estética futurista inspirada en el océano, usando tecnología web moderna y liviana (HTML5, CSS3, JavaScript ES6) sin frameworks pesados, garantizando un rendimiento y tiempos de respuesta ultra rápidos.

---

## 📁 Estructura del Proyecto

El espacio de trabajo se compone de los siguientes archivos y carpetas clave:

* **`index.html`**: Estructura semántica completa del portal, SEO optimizado y maquetación de secciones.
* **`styles.css`**: Hoja de estilos central con un diseño oscuro glassmorphic, layouts responsive en Flex/Grid, y animaciones de volteo 3D en formularios.
* **`app.js`**: Control de interactividad, transiciones de scroll, registro/login en `localStorage` y simulación de métricas del panel en tiempo real.
* **`assets/`**:
  * `logo.png`: Logotipo oficial circular de Ener-Wave, extraído de la captura del usuario y adaptado para el tema oscuro en cian neón.
  * `hero-bg.png`: Render de alta calidad en resolución completa de generadores undimotrices en altamar.

---

## ✨ Características Destacadas

1. **Portal Operativo Inteligente (Login y Registro)**:
   * Permite el registro de cuentas directamente guardándose en el almacenamiento del navegador (`localStorage`).
   * Al autenticarse, la interfaz realiza una transición fluida al **Portal del Operador**, simulando una conexión en vivo a turbinas oceánicas con valores de MW que oscilan en tiempo real.
   * Cuenta demo disponible para pruebas rápidas: `demo@enerwave.com` / `password123`.
2. **Animaciones Fluidas**:
   * **Contadores de Impacto**: Números que incrementan dinámicamente cuando el usuario navega a la sección de "Impacto".
   * **Efecto de Olas Dinámico**: Olas estilizadas en CSS flotando en el fondo de la sección de Historia.
   * **Boya undimotriz en SVG**: Un gráfico vectorial interactivo integrado en el Hero que se mueve y pulsa simulando la absorción de energía de las olas.

---

## 🚀 Cómo Ejecutar el Sitio Web

### Método Directo:
Simplemente haz doble clic sobre el archivo `index.html` en tu explorador de archivos para abrirlo en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

### Servidor Local Recomendado (para mejor experiencia con localStorage):

Si deseas simular un servidor real, puedes levantar uno rápidamente utilizando cualquiera de estas opciones:

#### Con Python (Preinstalado):
Ejecuta el siguiente comando en tu terminal dentro de la carpeta del proyecto:
```powershell
python -m http.server 8000
```
Luego, accede en tu navegador a: [http://localhost:8000](http://localhost:8000)

#### Con Node.js (Si cuentas con él):
Instala y ejecuta un servidor rápido:
```bash
npx serve
```
Luego, accede a la dirección que te indique la terminal (por defecto [http://localhost:3000](http://localhost:3000)).
