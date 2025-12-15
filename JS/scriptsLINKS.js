/*

- Un listado de links interesántes

  - Tendremos 2 inputs. Uno de ellos será el título que aparecerá en cada uno de nuestros elementos. 
    Al pulsar el botón de `añadir link` se añadirá en el DOM pero también en nuestro `localStorage` para poder recuperarlo siempre.
  - `CreateElement`, `appedChild`, ... o directamente un template con `innerHTML`.
  - `LocalStorage` para generar persistencia y guardar esos datos.


*/

const STORAGE_KEY = "dashboard_links_v1"; 
const linksList = document.getElementById("links-list");
const addBtn = document.getElementById("add-link-btn");
const form = document.getElementById("add-link-form");
const inputName = document.getElementById("link-name");
const inputUrl = document.getElementById("link-url");

let links = [];

// Cargar enlaces (desde localStorage)
  function loadLinks() {

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      links = [];
      return;
    }
    try {
      links = JSON.parse(raw);
      if (!Array.isArray(links)) links = [];
    } 
    catch (e) {
      console.error("Error parseando enlaces guardados:", e);
      links = [];
    }

  }

// Guardar enlaces (en localStorage)

  function saveLinks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }

// Crear un <li> dentro de la <ul> con el enlace y el botón borrar

  function LinkItem(link) {
    const li = document.createElement("li");
    li.className = "link-item";
    li.dataset.id = String(link.id);

    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.title;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.title = link.url;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "link-delete-btn";
    delBtn.ariaLabel = `Borrar ${link.title}`;
    delBtn.innerHTML = "✕";

    // estructura: <li><a>title</a> <button>✕</button></li>
    li.appendChild(a);
    li.appendChild(delBtn);

    return li;
  }

// Mensaje si no hay links

  function renderAll() {
    linksList.innerHTML = "";
    if (links.length === 0) {
      const empty = document.createElement("li");
      empty.className = "links-empty";
      empty.textContent = "No hay enlaces. Usa + para añadir uno.";
      linksList.appendChild(empty);
      return;
    }

    links.forEach(link => {
      const li = LinkItem(link);
      linksList.appendChild(li);
    });
  }

// Añadir / mostrar formulario

  addBtn.addEventListener("click", () => {
    form.hidden = !form.hidden;
    if (!form.hidden) {
      inputName.focus();
    }
  });

// SUBMIT: crear nuevo enlace

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = inputName.value.trim();
    const url = inputUrl.value.trim();

    if (!title || !url) return;

    // Crear objeto link con id único (timestamp)
    const newLink = {
      id: Date.now(),title,url
    };

    links.push(newLink);  // actualizar estado
    saveLinks();          // persistir
    renderAll();          // actualizar UI

    form.reset();
    form.hidden = true;
  });

// DELETE usando event delegation

  linksList.addEventListener("click", (e) => {
    const btn = e.target.closest(".link-delete-btn");
    if (!btn) return;

    const li = btn.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    // Filtrar el array para quitar el enlace con ese id
    links = links.filter(item => item.id !== id);
    saveLinks();
    renderAll();
  });

// Inicialización al cargar la página

  function init() {
    loadLinks();
    renderAll();
  }
  init();
