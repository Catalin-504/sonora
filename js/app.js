// ---------- 1. MENÚ LATERAL ----------

const $btnMenu = document.querySelector("#btn-menu");
const $menu = document.querySelector("#menu");
const $menuCerrar = document.querySelector("#menu-cerrar");

function abrirMenu() {
  $menu.hidden = false;
  $btnMenu.setAttribute("aria-expanded", "true");
  $menuCerrar.focus();
  document.body.classList.add("no-scroll"); // ej 1
}

function cerrarMenu() {
  $menu.hidden = true;
  $btnMenu.setAttribute("aria-expanded", "false");
  $btnMenu.focus();
  document.body.classList.remove("no-scroll"); // ej 1
}

$btnMenu?.addEventListener("click", abrirMenu);

$menuCerrar?.addEventListener("click", cerrarMenu);

$menu?.addEventListener("click", (evento) => {
  if (evento.target === $menu) {
    cerrarMenu();
  }
}); // ej 2

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$menu.hidden) cerrarMenu();
});

// ---------- 2. CERRAR LA PROMOCIÓN ----------

const $promo = document.querySelector("#promo");
const $promoCerrar = document.querySelector("#promo-cerrar");

$promoCerrar?.addEventListener("click", () => {
  $promo.remove();
});

// ---------- 3. ME GUSTA ----------
const $btnGusta = document.querySelector("#btn-gusta");

$btnGusta?.addEventListener("click", () => {
  const activo = $btnGusta.getAttribute("aria-pressed") === "true";

  $btnGusta.setAttribute("aria-pressed", String(!activo));
  $btnGusta.textContent = activo ? "♡" : "♥";
});

// ---------- 4. RESULTADOS DE BÚSQUEDA ----------
const $lista = document.querySelector("#resultados");

$lista?.addEventListener("click", (evento) => {
  const $fila = evento.target.closest(".fila");

  if (!$fila) return;

  const id = Number($fila.dataset.cancionId);
  console.log("Han pulsado la canción", id);
});

/* ---------- PINTAR TARJETAS ---------- */

function crearTarjeta(cancion) {
  const $li = document.createElement("li");

  $li.dataset.cancionId = cancion.id;

  $li.innerHTML = `
    <article class="tarjeta">
      <a class="tarjeta-enlace" href="cancion.html?id=${cancion.id}">
        <img class="tarjeta-portada" src="${cancion.portada}" alt=""
             width="300" height="300" loading="lazy">
        <h3 class="tarjeta-titulo">${cancion.titulo}</h3>
      </a>
      <p class="tarjeta-artista">${cancion.artista}</p>
    </article>
  `;

  return $li;
}

function pintarLista($contenedor, canciones) {
  if (!$contenedor) return;

  const fragmento = document.createDocumentFragment();
  canciones.forEach((c) => fragmento.append(crearTarjeta(c)));

  $contenedor.replaceChildren(fragmento);
}

// Pintar las tendencias al cargar la página de inicio
const $tendencias = document.querySelector("#lista-tendencias");
pintarLista($tendencias, CANCIONES);

/* ---------- 5. BUSCADOR ---------- */

const $formBuscar = document.querySelector("#form-buscar");
const $campo = document.querySelector("#q");
const $resultados = document.querySelector("#resultados");
const $mensaje = document.querySelector("#mensaje");

/**
 * Devuelve las canciones cuyo título, artista o álbum
 * contengan el texto buscado.
 */
function buscarCanciones(texto) {
  // Normalizamos: sin espacios sobrantes y en minúsculas, para
  // que "MAREA" y "  marea " encuentren lo mismo.
  const t = texto.trim().toLowerCase();
  if (t === "") return [];

  return CANCIONES.filter(
    (c) =>
      c.titulo.toLowerCase().includes(t) ||
      c.artista.toLowerCase().includes(t) ||
      c.album.toLowerCase().includes(t),
  );
}

function mostrarBusqueda(texto) {
  const encontradas = buscarCanciones(texto);

  // ESTADO 1: todavía no ha escrito nada
  if (texto.trim() === "") {
    $resultados.replaceChildren();
    $mensaje.textContent = "Busca por canción, artista o álbum.";
    return;
  }

  // ESTADO 2: ha buscado y no hay nada. Nunca dejes la
  // pantalla en blanco: el usuario creerá que se ha roto.
  if (encontradas.length === 0) {
    $resultados.replaceChildren();
    $mensaje.textContent = `No hemos encontrado nada para "${texto}".`;
    return;
  }

  // ESTADO 3: hay resultados
  $mensaje.textContent = `${encontradas.length} resultado${encontradas.length === 1 ? "" : "s"}`;
  pintarLista($resultados, encontradas);
}

// input salta con cada tecla: se busca mientras se escribe.
$campo?.addEventListener("input", (e) => mostrarBusqueda(e.target.value));

// Y si pulsa Intro, evitamos que la página se recargue.
$formBuscar?.addEventListener("submit", (e) => {
  e.preventDefault();
  mostrarBusqueda($campo.value);
});

// Estado inicial al abrir la página de búsqueda
if ($campo) mostrarBusqueda("");
