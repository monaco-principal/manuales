/* ==========================================================
   ruta.js · El mapa Mónaco
   Única fuente de verdad de la ruta. Lo usan el inicio (mapa) y
   cada página de tarea. Sin cuentas: el progreso queda guardado
   en el celular (localStorage).

   CÓMO AGREGAR O ACTIVAR UNA PÁGINA
   1. Busca la tarea en ROUTE (o agrégala en el orden en que se hace).
   2. Pon url: "carpeta/" (relativa a la raíz del sitio, sin "/" al inicio).
      Con url: null sale como "Próximamente" (gris, sin enlace).
   3. En la página nueva pon:
        <body data-tarea="ID-DE-LA-TAREA">
        ... <div id="ruta-hice"></div> ... <div id="ruta-siguiente"></div> ...
      (o un solo <div id="ruta-cierre"></div> con los dos juntos)
        <script src="../assets/ruta.js" defer></script>
      ruta.js pinta solo el botón "Lo hice ✔" y "Siguiente paso →".
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Los 4 pasos ---------- */
  var PASOS = [
    { n: 1, title: "Escoger el local" },
    { n: 2, title: "Sacar los papeles" },
    { n: 3, title: "Montar y comprar" },
    { n: 4, title: "Conseguir clientes" }
  ];

  /* ---------- La ruta (en orden) ----------
     id:       único, no cambiarlo después (es la llave del progreso)
     title:    nombre corto
     verb:     frase corta de qué haces
     paso:     1 a 4 (grupo del mapa)
     url:      carpeta relativa a la raíz, o null = Próximamente
     keywords: palabras con que alguien lo buscaría (sin importar tildes) */
  var ROUTE = [
    { id: "checklist-local", paso: 1, url: "checklist-local/",
      title: "Checklist del local", verb: "Revisa si el local sirve antes de arrendar",
      keywords: ["local", "arriendo", "viabilidad", "revisar", "lista"] },
    { id: "uso-de-suelo", paso: 1, url: "uso-de-suelo/",
      title: "Uso del suelo", verb: "Mira si se puede tener un lavadero ahí",
      keywords: ["suelo", "arriendo", "local", "pot", "ciiu", "alcaldía", "planeación", "permitido"] },

    { id: "rut-y-camara", paso: 2, url: "rut-y-camara/",
      title: "RUT y Cámara de Comercio", verb: "Registra tu negocio en línea",
      keywords: ["rut", "dian", "cámara", "camara", "comercio", "matrícula", "registro", "nit", "empresa"] },
    { id: "aviso-de-apertura", paso: 2, url: "aviso-de-apertura/",
      title: "Aviso de apertura", verb: "Avísale a la Policía que abriste (gratis)",
      keywords: ["aviso", "apertura", "policía", "policia", "abrir"] },
    { id: "rit-ica", paso: 2, url: "rit-ica/",
      title: "ICA (RIT)", verb: "Inscríbete en Hacienda en los 2 meses después de abrir",
      keywords: ["ica", "rit", "hacienda", "impuesto", "industria", "comercio", "secretaría"] },
    { id: "bomberos", paso: 2, url: "bomberos/",
      title: "Permiso de Bomberos", verb: "Haz el curso virtual y saca el concepto",
      keywords: ["bomberos", "concepto técnico", "extintor", "señalización", "incendio", "curso", "riesgo"] },
    { id: "sayco-acinpro", paso: 2, url: "sayco-acinpro/",
      title: "Sayco y Acinpro", verb: "Saca la licencia de música y TV",
      keywords: ["sayco", "acinpro", "música", "musica", "tv", "televisión", "derechos de autor", "osa"] },
    { id: "concepto-sanitario", paso: 2, url: "concepto-sanitario/",
      title: "Concepto sanitario", verb: "Prepárate para la visita de Salud",
      keywords: ["sanidad", "sanitario", "salud", "secretaría de salud", "visita", "higiene", "carpeta", "planillas", "plagas", "limpieza", "residuos", "PGIRS", "químicos"] },
    { id: "vertimientos-y-lodos", paso: 2, url: "vertimientos-y-lodos/",
      title: "Vertimientos y lodos", verb: "El agua sucia, la trampa y quién se lleva el lodo",
      keywords: ["vertimientos", "lodos", "agua", "trampa", "grasas", "ambiente", "residuos", "car"] },

    { id: "adecuaciones", paso: 3, url: null,
      title: "Adecuaciones por zonas", verb: "Arma cada zona del local",
      keywords: ["adecuaciones", "obra", "zonas", "piso", "desagüe", "montar"] },
    { id: "maquinaria", paso: 3, url: "maquinaria/",
      title: "Qué máquinas compro", verb: "Hidrolavadoras, compresor, espumadora y bomba",
      keywords: ["maquinaria", "máquinas", "maquinas", "hidrolavadora", "compresor", "espumadora", "bomba", "aspiradora", "comprar"] },
    { id: "herramientas-kit-arrastre", paso: 3, url: "herramientas-kit-arrastre/",
      title: "Kit de arrastre", verb: "Las herramientas de cada puesto de lavado",
      keywords: ["herramientas", "kit", "arrastre", "puesto", "pistola", "manguera"] },
    { id: "insumos-lavadero", paso: 3, url: "insumos-lavadero/",
      title: "Insumos del lavadero", verb: "Químicos y elementos para el primer mes",
      keywords: ["insumos", "químicos", "quimicos", "shampoo", "jabón", "desengrasante", "toallas", "wash riders"] },
    { id: "proveedores", paso: 3, url: "proveedores/",
      title: "Proveedores", verb: "A quién comprarle todo, en un solo lugar",
      keywords: ["proveedores", "dónde comprar", "contacto", "tienda"] },

    { id: "pauta-meta", paso: 4, url: "pauta-meta/",
      title: "Pauta en Meta", verb: "Anuncios en Facebook e Instagram, de cero a publicado",
      keywords: ["pauta", "meta", "facebook", "instagram", "anuncios", "publicidad", "ads"] },
    { id: "descripcion-videos", paso: 4, url: "descripcion-videos/",
      title: "Descripción de los videos", verb: "Qué escribir debajo de cada video",
      keywords: ["descripción", "videos", "redes", "reels", "tiktok", "copy", "comenta"] }
  ];

  /* Botones grandes del inicio (en este orden) */
  var ACCESOS = [
    { id: "bomberos", label: "Bomberos" },
    { id: "sayco-acinpro", label: "Sayco" },
    { id: "rut-y-camara", label: "Cámara de Comercio" },
    { id: "concepto-sanitario", label: "Sanidad" },
    { id: "maquinaria", label: "Qué máquinas compro" }
  ];

  /* TODO: poner el link real de WhatsApp (ej. https://wa.me/57XXXXXXXXXX). Se cambia solo aquí. */
  var WHATSAPP = "#whatsapp";

  var CLAVE = "monaco-ruta-v1";

  /* ---------- Rutas relativas a donde vive este script ---------- */
  var script = document.currentScript || (function () {
    var s = document.querySelectorAll('script[src*="ruta.js"]');
    return s[s.length - 1];
  })();
  var RAIZ = new URL("../", script.src); // assets/ruta.js -> raíz del sitio
  function enlace(url) { return new URL(url, RAIZ).href; }

  /* ---------- Progreso ---------- */
  function leer() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return {}; }
  }
  var hechos = leer();
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(hechos)); } catch (e) {}
  }
  function hecho(id) { return !!hechos[id]; }
  function alternar(id) {
    if (hechos[id]) delete hechos[id]; else hechos[id] = 1;
    guardar();
  }
  var disponibles = ROUTE.filter(function (t) { return t.url; });
  function primeraPendiente() {
    for (var i = 0; i < disponibles.length; i++) if (!hecho(disponibles[i].id)) return disponibles[i];
    return null;
  }
  function porId(id) {
    for (var i = 0; i < ROUTE.length; i++) if (ROUTE[i].id === id) return ROUTE[i];
    return null;
  }
  function paso(n) { return PASOS[n - 1]; }

  /* Búsqueda sin tildes: "camara" encuentra "Cámara" */
  function normal(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }

  function el(tag, attrs, hijos) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (hijos || []).forEach(function (h) { if (h) n.appendChild(typeof h === "string" ? document.createTextNode(h) : h); });
    return n;
  }

  /* ---------- Fila de tarea (mapa y buscador) ---------- */
  function filaTarea(t, conPaso) {
    var listo = hecho(t.id);
    var li = el("li", { class: "tarea" + (t.url ? "" : " pronto") + (listo ? " listo" : "") });
    li.setAttribute("data-id", t.id);
    var check = el("button", {
      type: "button", class: "tarea-check", text: "✔",
      "aria-label": (listo ? "Quitar marca: " : "Marcar como hecho: ") + t.title,
      "aria-pressed": listo ? "true" : "false"
    });
    if (t.url) {
      check.addEventListener("click", function () { alternar(t.id); pintarInicio(); });
    } else {
      check.disabled = true;
      check.setAttribute("aria-label", t.title + ": próximamente");
    }
    var cuerpo = [
      conPaso ? el("span", { class: "paso-de", text: "Paso " + t.paso + " · " + paso(t.paso).title }) : null,
      el("b", { text: t.title }),
      el("span", { text: t.verb }),
      t.url ? null : el("span", { class: "etiqueta", text: "Próximamente" })
    ];
    var link = t.url
      ? el("a", { class: "tarea-link", href: enlace(t.url) }, cuerpo)
      : el("div", { class: "tarea-link", "aria-disabled": "true" }, cuerpo);
    li.appendChild(check);
    li.appendChild(link);
    return li;
  }

  /* ---------- INICIO (mapa) ---------- */
  var abiertos = null; // recuerda qué pasos abrió la persona

  function pintarInicio() {
    var siguiente = primeraPendiente();
    var total = disponibles.length;
    var hechas = disponibles.filter(function (t) { return hecho(t.id); }).length;

    var prog = document.getElementById("ruta-progreso");
    if (prog) {
      prog.innerHTML = "";
      prog.className = "progreso";
      var pct = total ? Math.round(hechas / total * 100) : 0;
      prog.appendChild(el("p", { class: "progreso-texto" }, [
        "Llevas " + hechas + " de " + total + " ✔",
        el("span", { text: pct + "%" })
      ]));
      var barra = el("div", { class: "barra", role: "progressbar", "aria-valuemin": "0",
        "aria-valuemax": String(total), "aria-valuenow": String(hechas), "aria-label": "Tu avance" });
      var relleno = el("span");
      relleno.style.width = pct + "%";
      barra.appendChild(relleno);
      prog.appendChild(barra);
    }

    var seguir = document.getElementById("ruta-seguir");
    if (seguir) {
      seguir.innerHTML = "";
      if (siguiente) {
        seguir.appendChild(el("a", { class: "boton boton-seguir azul", href: enlace(siguiente.url) }, [
          el("span", { text: (hechas ? "Sigue donde ibas →" : "Empieza aquí →") }),
          el("small", { text: "Paso " + siguiente.paso + " · " + siguiente.title })
        ]));
      } else {
        seguir.appendChild(el("p", { class: "boton boton-seguir", text: "¡Hiciste todo! ✔" }));
      }
    }

    var acc = document.getElementById("ruta-accesos");
    if (acc) {
      acc.innerHTML = "";
      acc.className = "accesos";
      ACCESOS.forEach(function (a) {
        var t = porId(a.id);
        if (!t || !t.url) return;
        acc.appendChild(el("li", null, [
          el("a", { href: enlace(t.url), class: hecho(t.id) ? "listo" : "" , text: a.label })
        ]));
      });
    }

    var mapa = document.getElementById("ruta-mapa");
    if (mapa) {
      if (abiertos === null) abiertos = siguiente ? [siguiente.paso] : [];
      mapa.innerHTML = "";
      mapa.className = "ruta";
      PASOS.forEach(function (p) {
        var tareas = ROUTE.filter(function (t) { return t.paso === p.n; });
        var disp = tareas.filter(function (t) { return t.url; });
        var ok = disp.filter(function (t) { return hecho(t.id); }).length;
        var completo = disp.length && ok === disp.length;
        var d = el("details", { class: "paso" + (completo ? " completo" : "") });
        if (abiertos.indexOf(p.n) > -1) d.open = true;
        d.addEventListener("toggle", function () {
          var i = abiertos.indexOf(p.n);
          if (d.open && i < 0) abiertos.push(p.n);
          if (!d.open && i > -1) abiertos.splice(i, 1);
        });
        d.appendChild(el("summary", null, [
          el("span", { class: "paso-num", text: completo ? "✔" : String(p.n), "aria-hidden": "true" }),
          el("span", null, [
            el("span", { class: "paso-titulo", text: "Paso " + p.n + " · " + p.title }),
            el("span", { class: "paso-cuenta", text: ok + " de " + disp.length + " listos" +
              (tareas.length > disp.length ? " · " + (tareas.length - disp.length) + " próximamente" : "") })
          ]),
          el("span", { class: "paso-flecha", text: "›", "aria-hidden": "true" })
        ]));
        var ul = el("ul", { class: "tareas" });
        tareas.forEach(function (t) {
          var fila = filaTarea(t, false);
          if (siguiente && t.id === siguiente.id) fila.className += " siguiente";
          ul.appendChild(fila);
        });
        d.appendChild(ul);
        mapa.appendChild(d);
      });
    }

    buscar();
  }

  /* ---------- Buscador ---------- */
  var entrada, resultados;
  function buscar() {
    if (!entrada || !resultados) return;
    var q = normal(entrada.value);
    resultados.innerHTML = "";
    var aviso = document.getElementById("ruta-sin-resultados");
    if (aviso) aviso.hidden = true;
    if (!q) return;
    var palabras = q.split(/\s+/);
    var hallados = ROUTE.filter(function (t) {
      var texto = normal([t.title, t.verb, paso(t.paso).title].concat(t.keywords).join(" "));
      return palabras.every(function (w) { return texto.indexOf(w) > -1; });
    });
    hallados.forEach(function (t) { resultados.appendChild(filaTarea(t, true)); });
    if (!hallados.length && aviso) aviso.hidden = false;
  }

  function montarBuscador() {
    entrada = document.getElementById("ruta-buscar");
    resultados = document.getElementById("ruta-resultados");
    if (!entrada || !resultados) return;
    entrada.addEventListener("input", buscar);
    entrada.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var primero = resultados.querySelector("a.tarea-link");
        if (primero) location.href = primero.href;
      }
    });
  }

  /* ---------- PÁGINA DE TAREA ---------- */
  function tareaActual() {
    var id = document.body.getAttribute("data-tarea");
    if (id) return porId(id);
    var aqui = location.pathname.replace(/index\.html$/, "");
    for (var i = 0; i < disponibles.length; i++) {
      if (new URL(disponibles[i].url, RAIZ).pathname === aqui) return disponibles[i];
    }
    return null;
  }

  function pintarTarea(t) {
    var ubic = document.getElementById("ruta-ubicacion");
    if (ubic) {
      var delPaso = disponibles.filter(function (x) { return x.paso === t.paso; });
      ubic.textContent = "Paso " + t.paso + " de " + PASOS.length + " · " + paso(t.paso).title +
        (delPaso.length > 1 ? " · " + (delPaso.indexOf(t) + 1) + " de " + delPaso.length : "");
    }

    // Dos huecos: #ruta-hice (botón) y #ruta-siguiente (enlace).
    // O uno solo, #ruta-cierre, con los dos juntos.
    var cierre = document.getElementById("ruta-cierre");
    var hueco1 = document.getElementById("ruta-hice") || cierre;
    var hueco2 = document.getElementById("ruta-siguiente") || cierre;
    if (!hueco1 && !hueco2) return;

    var boton = el("button", { type: "button", class: "boton boton-hice" });
    var nota = el("p", { class: "hice-nota" });
    function refrescar() {
      var listo = hecho(t.id);
      boton.setAttribute("aria-pressed", listo ? "true" : "false");
      boton.textContent = listo ? "✔ Ya lo hiciste" : "Lo hice ✔";
      nota.textContent = listo ? "Toca otra vez si te equivocaste." : "Márcalo cuando ya lo tengas en la mano.";
    }
    boton.addEventListener("click", function () { alternar(t.id); refrescar(); });
    refrescar();

    var i = disponibles.indexOf(t);
    var sig = disponibles[i + 1];
    var link = sig
      ? el("a", { class: "boton boton-siguiente", href: enlace(sig.url) }, [
          el("span", { text: "Siguiente paso →" }),
          el("small", { text: sig.title })
        ])
      : el("a", { class: "boton boton-siguiente", href: enlace("./") }, [
          el("span", { text: "Volver al mapa →" }),
          el("small", { text: "Este era el último" })
        ]);

    [hueco1, hueco2].forEach(function (h) { if (h) { h.innerHTML = ""; h.className = "cierre"; } });
    if (hueco1) { hueco1.appendChild(boton); hueco1.appendChild(nota); }
    if (hueco2) hueco2.appendChild(link);
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    Array.prototype.forEach.call(document.querySelectorAll("a[data-whatsapp]"), function (a) {
      a.href = WHATSAPP;
    });
    // Al imprimir, abre los plegables para que salga todo en papel
    window.addEventListener("beforeprint", function () {
      Array.prototype.forEach.call(document.querySelectorAll("details"), function (d) { d.open = true; });
    });

    if (document.getElementById("ruta-mapa")) {
      montarBuscador();
      pintarInicio();
      // Si vuelve con el botón "atrás", refresca el progreso
      window.addEventListener("pageshow", function () { hechos = leer(); pintarInicio(); });
      return;
    }
    barraVolver();
    var t = tareaActual();
    if (t) {
      // Páginas viejas sin huecos: se agrega el cierre al final
      if (!document.getElementById("ruta-hice") && !document.getElementById("ruta-siguiente") &&
          !document.getElementById("ruta-cierre")) {
        var auto = el("div", { id: "ruta-cierre" });
        var envoltura = el("div", { class: "rm-auto" }, [auto]);
        var main = document.querySelector("main") || document.body;
        main.appendChild(envoltura);
      }
      pintarTarea(t);
    }
  }

  /* ---------- Barra fija "← Mapa" en todas las páginas (menos el inicio) ---------- */
  function tareaPadre() {
    // Para /bomberos/completo/ o /concepto-sanitario/carpeta/: la tarea que la contiene
    var aqui = location.pathname.replace(/index\.html$/, "");
    for (var i = 0; i < disponibles.length; i++) {
      var p = new URL(disponibles[i].url, RAIZ).pathname;
      if (aqui !== p && aqui.indexOf(p) === 0) return disponibles[i];
    }
    return null;
  }
  function barraVolver() {
    if (document.querySelector(".rm-barra")) return;
    var estilo = document.createElement("style");
    estilo.textContent =
      ".rm-barra{position:sticky;top:0;z-index:50;display:flex;gap:8px;align-items:center;" +
      "padding:8px max(12px,env(safe-area-inset-left,0px));background:#fff;border-bottom:1px solid #e6e4dd;" +
      "font:700 15px/1.2 'Helvetica Neue',Helvetica,Arial,system-ui,sans-serif;margin:0 0 12px}" +
      ".rm-barra a{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:4px;" +
      "text-decoration:none;color:#fff;background:#1f6fb2}" +
      ".rm-barra a.rm-sec{background:#fff;color:#1f6fb2;border:1px solid #1f6fb2}" +
      ".migas{display:none!important}" +
      ".rm-auto{margin:32px 0 8px;padding-top:16px;border-top:2px solid #16161a;" +
      "font-family:'Helvetica Neue',Helvetica,Arial,system-ui,sans-serif}" +
      ".rm-auto .cierre{display:grid;gap:12px}" +
      ".rm-auto .boton{display:flex;flex-direction:column;justify-content:center;min-height:52px;width:100%;" +
      "padding:10px 16px;border-radius:4px;font:700 17px/1.2 inherit;text-decoration:none;cursor:pointer;box-sizing:border-box}" +
      ".rm-auto .boton-hice{background:#fff;color:#1d7a46;border:2px solid #1d7a46}" +
      ".rm-auto .boton-hice[aria-pressed=true]{background:#1d7a46;color:#fff}" +
      ".rm-auto .boton-siguiente{background:#1f6fb2;color:#fff;border:0}" +
      ".rm-auto .boton-siguiente small{font-weight:400;font-size:13px;opacity:.9}" +
      ".rm-auto .hice-nota{margin:0;font-size:13px;color:#6b6b70}" +
      "@media print{.rm-barra,.rm-auto{display:none!important}}";
    document.head.appendChild(estilo);

    var barra = el("nav", { class: "rm-barra", "aria-label": "Volver" });
    barra.appendChild(el("a", { href: enlace("./"), text: "← Mapa" }));
    var padre = tareaPadre();
    if (padre) barra.appendChild(el("a", { class: "rm-sec", href: enlace(padre.url), text: "← " + padre.title }));
    document.body.insertBefore(barra, document.body.firstChild);
  }

  // Disponible para otras páginas o pruebas: window.RutaMonaco.ROUTE
  window.RutaMonaco = { PASOS: PASOS, ROUTE: ROUTE, ACCESOS: ACCESOS, enlace: enlace, hecho: hecho };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
