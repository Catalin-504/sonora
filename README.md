# Sonora

Proyecto de la Parte 1 del curso. Sonora es una aplicación web de música estática construida con HTML, CSS y JavaScript Vanilla, que incluye un reproductor de audio funcional, un buscador dinámico y generación de contenido mediante el DOM.

## Cómo ejecutar el proyecto

Para ver y probar la aplicación:

1. Abre la carpeta del proyecto en tu editor de código.
2. Inicia un servidor local usando la extensión **Live Server** (recomendado para que las rutas de los audios y módulos funcionen sin bloqueos de seguridad del navegador).
3. Alternativamente, abre el archivo `index.html` directamente en tu navegador web.

## Características implementadas

- **HTML & CSS:** Estructura semántica validada en el W3C. La interfaz es totalmente responsiva y accesible (foco visible, áreas táctiles superiores a 44px, etiquetas `aria`). No hay desbordamientos horizontales ni estilos sobreescritos con `!important`.
- **Generación Dinámica:** Las tarjetas de la página de inicio y los resultados se generan desde `datos.js`, manteniendo el HTML limpio.
- **Buscador interactivo:** Filtrado en tiempo real por título, artista y álbum, resolviendo los tres estados de interfaz (vacío, sin resultados, con resultados).
- **Ficha Dinámica:** Lectura de parámetros de la URL (`?id=X`) para inyectar los datos correctos de cada canción en una plantilla única.
- **Reproductor de Audio:** Lógica centralizada (`estado`) para controlar la reproducción, actualizar la barra de progreso dinámicamente y avanzar de canción al terminar la pista.
- **Navegación:** Menú lateral accesible, con soporte de teclado (tecla `Escape`) y bloqueo de scroll (`no-scroll`) en el fondo.

## 🎵 Licencias y Procedencia de los Recursos

Todo el contenido multimedia utilizado en este proyecto (tanto las pistas de audio como las imágenes de las portadas) ha sido descargado íntegramente de **Pixabay** (https://pixabay.com).

De acuerdo con la [Licencia de Pixabay](https://pixabay.com/es/service/license-summary/), todo el material es libre de derechos (Royalty Free), gratuito para uso comercial y no comercial, y no requiere atribución o reconocimiento obligatorio al autor original, por lo que es perfectamente válido para este proyecto formativo.

### 🎧 Pistas de audio (Pixabay Music)

- `amanecer.mp3`
- `anden4.mp3`
- `cieloraso.mp3`
- `tramontana.mp3`

### 🖼️ Imágenes (Pixabay Images)

- `amanecer.jpg`
- `anden4.jpg`
- `cieloraso.jpg`
- `marea.jpg`
- `nieve.jpg`
- `tramontana.jpg`
