// ---------- Elementos ----------
const $repPortada = document.querySelector("#rep-portada");
const $repTitulo = document.querySelector("#rep-titulo");
const $repArtista = document.querySelector("#rep-artista");
const $btnPlay = document.querySelector("#btn-play");
const $avance = document.querySelector("#rep-avance");

// ---------- Estado ----------
const audio = new Audio();
const estado = {
  cola: [],
  indice: -1,
};

// ---------- Funciones principales ----------

function cargarCola(canciones, desde = 0) {
  estado.cola = canciones;
  reproducirIndice(desde);
}

function reproducirIndice(i) {
  if (i < 0 || i >= estado.cola.length) return;

  estado.indice = i;
  const cancion = estado.cola[i];

  audio.src = cancion.audio;
  audio.play().catch(() => {
    // Reproducción automática bloqueada: no es un fallo,
    // simplemente esperamos a que el usuario pulse.
    pintarEstadoPlay();
  });

  pintarCancionActual(cancion);
}

function alternarPlay() {
  // Si aún no hay nada cargado, empezamos por la primera
  if (estado.indice === -1) return cargarCola(CANCIONES, 0);

  if (audio.paused) audio.play();
  else audio.pause();
}

function siguiente() {
  // El resto (%) hace que después de la última vuelva a la primera
  reproducirIndice((estado.indice + 1) % estado.cola.length);
}

// ---------- Pintado ----------

function pintarCancionActual(cancion) {
  $repPortada.src = cancion.portada;
  $repTitulo.textContent = cancion.titulo;
  $repArtista.textContent = cancion.artista;
  document.title = `${cancion.titulo} · Sonora`;
}

function pintarEstadoPlay() {
  $btnPlay.textContent = audio.paused ? "▶" : "⏸";
  $btnPlay.setAttribute("aria-label", audio.paused ? "Reproducir" : "Pausar");
}

// ---------- Conexiones ----------

$btnPlay?.addEventListener("click", alternarPlay);

document.addEventListener("click", (e) => {
  const $item = e.target.closest("[data-cancion-id]");
  if (!$item) return;

  if (!e.target.closest(".btn-play-tarjeta")) return;
  e.preventDefault();

  const id = Number($item.dataset.cancionId);
  const indice = CANCIONES.findIndex((c) => c.id === id);
  cargarCola(CANCIONES, indice);
});

// ---------- Lo que nos cuenta el audio ----------

audio.addEventListener("play", pintarEstadoPlay);
audio.addEventListener("pause", pintarEstadoPlay);
audio.addEventListener("ended", siguiente);

audio.addEventListener("timeupdate", () => {
  // Sin esta comprobación, al principio se calcula 0/NaN
  // y la barra hace cosas raras.
  if (!Number.isFinite(audio.duration)) return;

  const porcentaje = (audio.currentTime / audio.duration) * 100;
  $avance.style.width = `${porcentaje}%`;
});

audio.addEventListener("error", () => {
  $repTitulo.textContent = "No se pudo cargar esta canción";
});

// ---------- Atajo de teclado ----------
document.addEventListener("keydown", (e) => {
  // Si el usuario está escribiendo en el buscador, el espacio
  // debe escribir un espacio, no pausar la música.
  const escribiendo = ["INPUT", "TEXTAREA"].includes(
    document.activeElement.tagName,
  );

  if (e.code === "Space" && !escribiendo) {
    e.preventDefault();
    alternarPlay();
  }
});
