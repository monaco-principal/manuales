/* Arma tu carpeta sanitaria · formulario, vista previa e impresión.
   Todo pasa en el navegador: los datos se guardan solo en este equipo (localStorage). */
(function () {
  "use strict";

  var CLAVE = "monaco.carpetaSanitaria.v1";
  var VACIO = "________";
  var PLANTILLAS = window.CARPETA_PLANTILLAS || [];
  var anio = String(new Date().getFullYear());

  /* ---------- Campos ---------- */
  var GRUPOS = [
    { id: "negocio", titulo: "Tu negocio", abierto: true, campos: [
      { k: "NOMBRE_NEGOCIO", l: "Nombre del lavadero", p: "Igual que en la Cámara de Comercio.", e: "Ej.: Lavadero La 30 Motos", ancho: true, ac: "organization" },
      { k: "NIT", l: "NIT (o cédula si eres persona natural)", p: "Está en el RUT o en la Cámara de Comercio.", e: "Ej.: 901.234.567-8" },
      { k: "REPRESENTANTE", l: "Nombre del dueño o representante legal", p: "Es quien firma todos los documentos.", e: "Ej.: Carlos Andrés Pérez", ac: "name" },
      { k: "CEDULA", l: "Cédula del representante", p: "Sin puntos también sirve.", e: "Ej.: 1.020.345.678", im: "numeric" },
      { k: "TELEFONO", l: "Celular del negocio", p: "Al que te pueden llamar.", e: "Ej.: 300 123 4567", t: "tel", ac: "tel" },
      { k: "DIRECCION", l: "Dirección del local", p: "Cópiala del recibo de luz o agua.", e: "Ej.: Calle 10 # 20-30, local 2", ancho: true, ac: "street-address" },
      { k: "BARRIO", l: "Barrio", p: "Si sabes la localidad, ponla entre paréntesis.", e: "Ej.: Kennedy Central (Kennedy)" },
      { k: "CIUDAD", l: "Ciudad o municipio", p: "Donde queda el local.", e: "Ej.: Bogotá D.C.", ac: "address-level2" },
      { k: "CORREO", l: "Correo del negocio", p: "Uno que revises. Sale en el Plan de Riesgo y en las planillas.", e: "Ej.: milavadero@gmail.com", t: "email", ac: "email" },
      { k: "HORARIO", l: "Horario de atención", p: "Días y horas en que abres.", e: "Ej.: Lunes a sábado, 8:00 a. m. a 6:00 p. m." },
      { k: "AÑO", l: "Año de los documentos", p: "Ya viene puesto. Cámbialo solo si vas a imprimir los del año siguiente.", e: anio, im: "numeric", def: anio }
    ] },
    { id: "local", titulo: "Solo si los tienes · El local", campos: [
      { k: "AREA_M2", l: "Tamaño del local", p: "Más o menos, en metros cuadrados.", e: "Ej.: 80 m²" },
      { k: "NUM_SALIDAS", l: "Salidas a la calle", p: "Cuántas puertas sirven para salir.", e: "Ej.: 2", im: "numeric" },
      { k: "DESCRIPCION_LOCAL", l: "Cómo es el local", p: "En una o dos frases: pisos y zonas que tiene.", e: "Ej.: Local de un piso con 3 puestos de lavado, cuarto de insumos, recepción, sala de espera y baño", ancho: true, area: true },
      { k: "TANQUES", l: "Tanques de agua", p: "Cuántos y de qué tamaño. Si no tienes, escribe “No tiene”.", e: "Ej.: 1 tanque de 1.000 litros con tapa", ancho: true },
      { k: "EQUIPOS", l: "Equipos principales", p: "Las máquinas con las que trabajas.", e: "Ej.: 2 hidrolavadoras, 1 shampucera, 1 compresor de 50 L", ancho: true },
      { k: "NUM_ADMIN", l: "Personas en oficina o caja", p: "Contándote a ti si atiendes.", e: "Ej.: 1", im: "numeric" },
      { k: "NUM_OPERATIVOS", l: "Lavadores", p: "Cuántos lavan motos.", e: "Ej.: 3", im: "numeric" }
    ] },
    { id: "emergencias", titulo: "Solo si los tienes · Emergencias", campos: [
      { k: "PUNTO_ENCUENTRO", l: "Punto de encuentro", p: "Lugar seguro afuera donde se reúnen todos si toca salir.", e: "Ej.: Andén frente al local", ancho: true },
      { k: "TEL_BOMBEROS", l: "Teléfono de Bomberos", p: "Si no lo sabes, pon 123.", e: "Ej.: 123", t: "tel" },
      { k: "COMANDANTE", l: "Quién manda en una emergencia", p: "Normalmente el dueño o el encargado.", e: "Ej.: Carlos Pérez" },
      { k: "SUPLENTE", l: "Quién manda si esa persona no está", p: "Puede ser un cargo, no un nombre.", e: "Ej.: Lavador más antiguo en turno" },
      { k: "BRIGADISTA_PA", l: "Quién atiende heridos (botiquín)", p: "Nombre o cargo.", e: "Ej.: Laura Gómez" },
      { k: "BRIGADISTA_INC", l: "Quién usa el extintor", p: "Nombre o cargo.", e: "Ej.: Lavador en turno" },
      { k: "BRIGADISTA_EVA", l: "Quién saca a todos del local", p: "Nombre o cargo.", e: "Ej.: Persona de caja" }
    ] },
    { id: "proveedores", titulo: "Solo si los tienes · Proveedores", campos: [
      { k: "FUMIGADORA", l: "Empresa que fumiga", p: "La que te da el certificado de fumigación.", e: "Ej.: Fumigaciones El Sol S.A.S." },
      { k: "TEL_FUMIGADORA", l: "Teléfono de la fumigadora", p: "", e: "Ej.: 310 000 0000", t: "tel" },
      { k: "FRECUENCIA_FUMIGACION", l: "Cada cuánto fumigan", p: "Como dice el contrato o el certificado.", e: "Ej.: Trimestral (cada 3 meses)" },
      { k: "EMPRESA_ASEO", l: "Empresa que recoge la basura", p: "La del camión de la basura de tu zona; sale en el recibo.", e: "Ej.: la empresa de aseo de tu ciudad" },
      { k: "GESTOR_RESPEL", l: "Empresa que recoge los lodos", p: "Con licencia para residuos peligrosos (lodos, trapos con grasa, envases).", e: "Ej.: Gestión Ambiental XYZ S.A.S." },
      { k: "TEL_GESTOR", l: "Teléfono de esa empresa", p: "", e: "Ej.: 320 000 0000", t: "tel" },
      { k: "PROVEEDOR_QUIMICOS", l: "Quién te vende los químicos", p: "Nombre y teléfono. Pídele las hojas de seguridad.", e: "Ej.: Químicos La 80, 315 000 0000", ancho: true }
    ] }
  ];

  var CAMPOS = {};
  GRUPOS.forEach(function (g) { g.campos.forEach(function (c) { CAMPOS[c.k] = c; }); });

  /* ---------- Guardado ---------- */
  function leer() {
    try { return JSON.parse(localStorage.getItem(CLAVE) || "{}") || {}; } catch (e) { return {}; }
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); return true; } catch (e) { return false; }
  }
  var estado = leer();
  if (!estado.datos) estado.datos = {};
  if (!estado.docs) estado.docs = {};
  Object.keys(CAMPOS).forEach(function (k) {
    if (estado.datos[k] == null && CAMPOS[k].def) estado.datos[k] = CAMPOS[k].def;
  });

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function $(sel) { return document.querySelector(sel); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (a) { n.setAttribute(a, attrs[a]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* ---------- Formulario ---------- */
  function pintarFormulario() {
    var cont = $("#cs-form");
    GRUPOS.forEach(function (g, i) {
      var grupo;
      var campos = el("div", { "class": "cs-campos" });
      g.campos.forEach(function (c) {
        var id = "f-" + c.k;
        var caja = el("div", { "class": "cs-campo" + (c.ancho ? " ancho" : "") });
        caja.appendChild(el("label", { "for": id }, esc(c.l)));
        if (c.p) caja.appendChild(el("span", { "class": "cs-pista", id: id + "-p" }, esc(c.p)));
        var input = el(c.area ? "textarea" : "input", {
          id: id, name: c.k, placeholder: c.e, autocomplete: c.ac || "off", spellcheck: "true"
        });
        if (!c.area) input.setAttribute("type", c.t || "text");
        if (c.im) input.setAttribute("inputmode", c.im);
        if (c.p) input.setAttribute("aria-describedby", id + "-p");
        input.value = estado.datos[c.k] || "";
        input.addEventListener("input", function () {
          estado.datos[c.k] = input.value;
          cambio();
        });
        caja.appendChild(input);
        campos.appendChild(caja);
      });
      if (g.abierto) {
        grupo = el("fieldset", { "class": "cs-grupo" });
        grupo.appendChild(el("legend", null, esc(g.titulo)));
        grupo.appendChild(campos);
      } else {
        grupo = el("details", { "class": "cs-grupo", "data-grupo": g.id });
        var llenos = g.campos.filter(function (c) { return (estado.datos[c.k] || "").trim(); }).length;
        if (llenos) grupo.setAttribute("open", "");
        var s = el("summary", null, esc(g.titulo.replace("Solo si los tienes · ", "")) + " <small data-cuenta></small>");
        grupo.appendChild(s);
        grupo.appendChild(campos);
      }
      if (i === 1) cont.appendChild(el("p", { "class": "cs-sub" }, "Solo si los tienes"));
      cont.appendChild(grupo);
    });
  }

  function contarGrupos() {
    GRUPOS.forEach(function (g) {
      var s = document.querySelector('[data-grupo="' + g.id + '"] [data-cuenta]');
      if (!s) return;
      var llenos = g.campos.filter(function (c) { return (estado.datos[c.k] || "").trim(); }).length;
      s.textContent = llenos + " de " + g.campos.length;
    });
  }

  /* ---------- Lista de documentos ---------- */
  function marcado(id) { return estado.docs[id] !== false; }

  function pintarLista() {
    var tipos = [["Documentos", function (p) { return p.tipo !== "Planilla"; }], ["Planillas para llenar a mano", function (p) { return p.tipo === "Planilla"; }]];
    var cont = $("#cs-docs");
    tipos.forEach(function (t) {
      cont.appendChild(el("p", { "class": "cs-sub" }, t[0]));
      var ul = el("ul", { "class": "cs-lista" });
      PLANTILLAS.filter(t[1]).forEach(function (p) {
        var li = el("li");
        var lab = el("label");
        var cb = el("input", { type: "checkbox", "data-doc": p.id });
        cb.checked = marcado(p.id);
        cb.addEventListener("change", function () { estado.docs[p.id] = cb.checked; cambio(true); });
        lab.appendChild(cb);
        lab.appendChild(el("div", null, "<b>" + esc(p.titulo) + "</b><span>" + esc(p.para) + " <code>" + esc(p.codigo) + "</code></span>"));
        li.appendChild(lab);
        ul.appendChild(li);
      });
      cont.appendChild(ul);
    });
    $("#cs-marcar-todos").addEventListener("click", function () { todos(true); });
    $("#cs-marcar-ninguno").addEventListener("click", function () { todos(false); });
  }
  function todos(v) {
    PLANTILLAS.forEach(function (p) { estado.docs[p.id] = v; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-doc]"), function (cb) { cb.checked = v; });
    cambio(true);
  }

  /* ---------- Vista previa ---------- */
  function llenar(html) {
    return html.replace(/«([A-ZÑ_0-9]+)»/g, function (m, k) {
      var v = (estado.datos[k] || "").trim();
      if (!v) return '<span class="cs-v vacio" data-k="' + k + '">' + VACIO + "</span>";
      return '<span class="cs-v" data-k="' + k + '">' + esc(v).replace(/\n/g, "<br>") + "</span>";
    });
  }

  function pintarPrevia() {
    var cont = $("#cs-previa");
    cont.innerHTML = "";
    PLANTILLAS.forEach(function (p) {
      var art = el("article", { "class": "cs-doc", id: "doc-" + p.id, "data-id": p.id });
      var barra = el("div", { "class": "cs-doc-barra" });
      barra.appendChild(el("b", null, esc(p.codigo + " · " + p.titulo)));
      var btn = el("button", { type: "button" }, "Imprimir solo este");
      btn.addEventListener("click", function () { imprimir(p.id); });
      barra.appendChild(btn);
      art.appendChild(barra);
      art.appendChild(el("div", { "class": "folio" }, llenar(p.html)));
      cont.appendChild(art);
    });
    visibilidad();
  }

  function actualizarCasillas() {
    Array.prototype.forEach.call(document.querySelectorAll(".cs-v"), function (s) {
      var v = (estado.datos[s.getAttribute("data-k")] || "").trim();
      if (v) { s.className = "cs-v"; s.innerHTML = esc(v).replace(/\n/g, "<br>"); }
      else { s.className = "cs-v vacio"; s.textContent = VACIO; }
    });
  }

  function visibilidad() {
    var n = 0;
    PLANTILLAS.forEach(function (p) {
      var a = document.getElementById("doc-" + p.id);
      var on = marcado(p.id);
      if (a) a.hidden = !on;
      if (on) n++;
    });
    $("#cs-cuantos").textContent = n === 0 ? "No marcaste ningún documento" :
      (n === 1 ? "1 documento marcado" : n + " documentos marcados");
    $("#cs-btn-imprimir").disabled = n === 0;
  }

  function resumen() {
    var faltan = [];
    var usados = {};
    PLANTILLAS.forEach(function (p) {
      if (!marcado(p.id)) return;
      p.html.replace(/«([A-ZÑ_0-9]+)»/g, function (m, k) { usados[k] = 1; return m; });
    });
    Object.keys(usados).forEach(function (k) { if (!(estado.datos[k] || "").trim() && CAMPOS[k]) faltan.push(CAMPOS[k].l); });
    var out = $("#cs-faltan");
    if (!faltan.length) {
      out.innerHTML = "<b>Todos los datos están llenos.</b> Revisa la vista previa y luego imprime.";
    } else {
      out.innerHTML = "<b>Te faltan " + faltan.length + " dato" + (faltan.length === 1 ? "" : "s") + ".</b> " +
        "Saldrán como una línea en blanco (" + VACIO + ") para que los escribas a mano: " + esc(faltan.join(", ")) + ".";
    }
  }

  /* ---------- Cambios ---------- */
  var tGuardar = null;
  function cambio(soloLista) {
    if (soloLista) visibilidad(); else actualizarCasillas();
    resumen();
    contarGrupos();
    clearTimeout(tGuardar);
    tGuardar = setTimeout(function () {
      var ok = guardar();
      var g = $("#cs-guardado");
      g.textContent = ok ? "Guardado en este equipo." : "No se pudo guardar en este navegador; no cierres la página hasta imprimir.";
      g.className = ok ? "cs-guardado" : "";
    }, 300);
  }

  /* ---------- Impresión ---------- */
  function prepararSaltos(soloId) {
    document.body.classList.toggle("uno", !!soloId);
    var primero = true;
    PLANTILLAS.forEach(function (p) {
      var a = document.getElementById("doc-" + p.id);
      if (!a) return;
      var sale = soloId ? p.id === soloId : marcado(p.id);
      a.classList.toggle("solo", soloId ? p.id === soloId : false);
      a.classList.toggle("salto", sale && !primero);
      if (sale) primero = false;
    });
  }
  function limpiarImpresion() {
    document.body.classList.remove("uno");
    Array.prototype.forEach.call(document.querySelectorAll(".cs-doc.solo"), function (a) { a.classList.remove("solo"); });
  }
  var tUno = 0; // momento en que se pidió "Imprimir solo este"
  function imprimir(soloId) {
    if (soloId) {
      // si el documento estaba desmarcado, se muestra solo para imprimirlo
      var a = document.getElementById("doc-" + soloId);
      if (a) a.hidden = false;
    }
    tUno = soloId ? Date.now() : 0;
    prepararSaltos(soloId);
    window.print();
  }
  // Ctrl+P / menú del navegador: imprime todo lo marcado (salvo que venga de "Imprimir solo este")
  window.addEventListener("beforeprint", function () { if (Date.now() - tUno > 3000) prepararSaltos(null); });
  window.addEventListener("afterprint", function () { limpiarImpresion(); tUno = 0; visibilidad(); });

  /* ---------- Arranque ---------- */
  function iniciar() {
    if (!PLANTILLAS.length) {
      $("#cs-previa").innerHTML = "<p>No se pudieron cargar las plantillas. Recarga la página.</p>";
      return;
    }
    pintarFormulario();
    pintarLista();
    pintarPrevia();
    resumen();
    contarGrupos();
    $("#cs-btn-imprimir").addEventListener("click", function () { imprimir(null); });
    $("#cs-borrar").addEventListener("click", function () {
      if (!window.confirm("¿Borrar todos los datos que escribiste en este equipo?")) return;
      try { localStorage.removeItem(CLAVE); } catch (e) { /* nada */ }
      estado = { datos: {}, docs: {} };
      Object.keys(CAMPOS).forEach(function (k) {
        if (CAMPOS[k].def) estado.datos[k] = CAMPOS[k].def;
        var f = document.getElementById("f-" + k);
        if (f) f.value = estado.datos[k] || "";
      });
      Array.prototype.forEach.call(document.querySelectorAll("[data-doc]"), function (cb) { cb.checked = true; });
      visibilidad();
      actualizarCasillas();
      resumen();
      contarGrupos();
      $("#cs-guardado").textContent = "Datos borrados.";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
