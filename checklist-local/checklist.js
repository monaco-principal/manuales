/* ==========================================================
   Checklist del local · lógica de la página
   Contenido = "Checklist de Viabilidad del Local" del dueño.
   Estado en localStorage (CLAVE). Se pinta todo desde DATOS.
   ========================================================== */
(function () {
  "use strict";

  var CLAVE = "monaco-checklist-local-v1";

  /* c: r = 🔴 obligatorio · a = 🟡 se resuelve con presupuesto · v = 🟢 mejora el negocio */
  var ALERTAS = [
    { id: "al-alcantarillado", t: "No tiene conexión al alcantarillado público." },
    { id: "al-piso", t: "El piso es de tierra o madera." },
    { id: "al-escalones", t: "La entrada tiene escalones altos y no se puede poner rampa." },
    { id: "al-residencial", t: "Es zona residencial exclusiva, donde NO permiten negocios." },
    { id: "al-agua", t: "No tiene agua potable con contador propio (independiente)." },
    { id: "al-dueno", t: "El dueño NO deja hacer adecuaciones (romper piso, instalar la trampa de grasas)." }
  ];

  var SECCIONES = [
    { id: "s1", n: 1, t: "Legalidad y uso del suelo",
      intro: "🔴 Si esto no se cumple, no arriendes.",
      items: [
        { id: "uso-suelo", c: "r", t: "Uso de suelo compatible",
          d: "¿Se permite en esa dirección un negocio de \"servicios\", \"limpieza\" o \"lavadero\"? Pregúntale primero al dueño y luego confírmalo en Planeación Municipal." },
        { id: "no-residencial", c: "r", t: "No es zona residencial exclusiva",
          d: "Confírmalo en Planeación Municipal o en el POT/PBOT del municipio." },
        { id: "servicios", c: "r", t: "Servicios públicos legales",
          d: "¿Tiene contadores de agua y luz propios (independientes)? ¿Son comerciales o residenciales?" }
      ],
      tips: [
        "El último recibo del impuesto predial dice si el local es comercial o residencial. Pídeselo al dueño.",
        "Ve en persona a Planeación Municipal o a la Curaduría Urbana a confirmarlo. Esto es obligatorio después de decidir que quieres el local."
      ],
      enlace: { url: "../uso-de-suelo/", t: "Cómo revisar el uso del suelo →" } },

    { id: "s2", n: 2, t: "Agua y desagües",
      items: [
        { id: "presion", c: "a", t: "Buena presión del agua",
          d: "Haz UNA de estas dos pruebas:",
          extra:
            '<div class="cl-prueba"><b>Prueba del balde</b><p>Abre la llave al máximo y llena un balde de 10 litros.</p>' +
            '<ul><li>⏱ Menos de 30 segundos = excelente</li><li>30 a 45 segundos = aceptable</li><li>60 segundos = mala presión</li></ul></div>' +
            '<div class="cl-prueba"><b>Prueba del pulgar</b><p>Abre la llave a toda potencia y trata de tapar la salida con el pulgar.</p>' +
            '<ul><li>No la puedes tapar y salpica = buena presión (30 PSI)</li><li>La tapas fácil = mala presión</li></ul></div>' },
        { id: "desagues", c: "a", t: "Desagües a la vista",
          d: "¿Hay rejillas o puntos de desagüe conectados al alcantarillado?" },
        { id: "trampa", c: "r", t: "Espacio para la trampa de grasas",
          d: "Mínimo 60 × 60 × 60 cm, donde se pueda excavar sin tapar el paso. Debe tener al menos 2 cámaras (una para sedimentos y otra para grasas)." },
        { id: "alcantarillado", c: "a", t: "Conexión al alcantarillado",
          d: "¿Conecta al sistema sanitario? Confírmalo con la empresa de acueducto de tu ciudad." },
        { id: "medidor", c: "a", t: "Tamaño del medidor de agua",
          d: "¿Es de ½\" o de ¾\"? El de ¾\" es mejor para la cantidad de agua que gasta un lavadero." },
        { id: "tanque", c: "v", t: "Espacio para tanque de reserva",
          d: "¿Hay dónde poner un tanque de 500 a 1.000 litros por si cortan el agua?" },
        { id: "tuberia", c: "v", t: "Tubería en buen estado",
          d: "¿Es PVC o galvanizada vieja? La galvanizada le baja la presión al agua." },
        { id: "humedades", c: "a", t: "Humedad en paredes o techo",
          d: "Busca manchas de agua, pintura inflada o moho. Si hay humedad vieja, puede haber daños escondidos en la tubería = gasto extra." }
      ],
      legal: '<b>⚠ Ley ambiental:</b> todo lavadero debe tener la trampa de grasas conectada al alcantarillado <b>ANTES de abrir</b>. ' +
        'En Bogotá se pide permiso de vertimientos ante la Secretaría de Ambiente (Decreto 1076 de 2015, Resolución 631 de 2015). ' +
        'En otras ciudades, ante la CAR o la corporación ambiental de la región. Si no cumples, te pueden poner multas o hasta cerrar el negocio (Ley 1333 de 2009).',
      enlace: { url: "../vertimientos-y-lodos/", t: "Ver la guía de vertimientos y lodos →" } },

    { id: "s3", n: 3, t: "Electricidad",
      items: [
        { id: "voltaje", c: "a", t: "Voltaje 110 V y 220 V",
          d: "¿Tiene acometida de 110 V y de 220 V? Lo ideal es tener las dos. Con 220 V la maquinaria industrial rinde más." },
        { id: "tomas", c: "a", t: "Tomas eléctricas",
          d: "Mínimo 5 tomas de 110 V y 2 tomas de 220 V. Si no las tiene, presupuesta el arreglo eléctrico." },
        { id: "breaker", c: "a", t: "Breaker principal",
          d: "¿De cuántos amperios es? Una hidrolavadora industrial gasta de 15 a 20 A. Lo mínimo recomendado es 40 A." },
        { id: "cableado", c: "a", t: "Estado del cableado",
          d: "¿Es nuevo o viejo? Cables viejos y delgados = riesgo de incendio con máquinas pesadas." },
        { id: "tierra", c: "a", t: "Polo a tierra",
          d: "¿El local tiene sistema de puesta a tierra? Es obligatorio por RETIE donde hay máquinas y agua." },
        { id: "iluminacion", c: "v", t: "Iluminación",
          d: "¿Tiene buena luz o hay que instalar? Hace falta para el detailing y para trabajar de noche." }
      ],
      legal: '<b>⚠ RETIE:</b> las tomas en zonas mojadas deben ser tipo <b>GFCI</b> (protegen contra electrocución). Es obligatorio por el Reglamento Técnico de Instalaciones Eléctricas.' },

    { id: "s4", n: 4, t: "Espacio y distribución",
      items: [
        { grupo: "Entrada (obligatorio)" },
        { id: "entrada-nivel", c: "r", t: "Entrada a nivel o con rampa suave",
          d: "Sin escalones que golpeen las motos." },
        { id: "entrada-ancho", c: "r", t: "Entrada de mínimo 3 metros de ancho",
          d: "Para que entren y salgan 2 motos al tiempo." },
        { grupo: "Zonas de trabajo" },
        { id: "zona-lavado", c: "a", t: "Zona de lavado",
          d: "Dos opciones:",
          extra:
            '<div class="cl-prueba"><b>Opción A · Por cubículos (recomendada)</b><p>3 × 2,20 m por cubículo, separados con cortinas plásticas impermeables.</p></div>' +
            '<div class="cl-prueba"><b>Opción B · Lavado y secado separados</b><p>Lavado: 3 × 2 m por punto (mínimo 3 × 6 m para 3 puntos). Secado: 4 × 3 m.</p></div>' +
            '<p>Cualquiera de las dos aguanta 1.000 motos al mes con 3 operarios.</p>' },
        { id: "cuarto-maquinas", c: "a", t: "Cuarto de máquinas",
          d: "Mínimo 2 × 2 m para tanques, bombas, hidrolavadoras, compresor y shampoocera." },
        { id: "espera", c: "v", t: "Zona de espera para clientes", d: "Mínimo 9 m², con sillas." },
        { id: "bano", c: "v", t: "Baño", d: "Sencillo y que funcione." },
        { id: "bodega", c: "v", t: "Bodega de insumos", d: "Espacio para guardar galones de champú, desengrasante, cera y toallas." },
        { id: "circulacion", c: "v", t: "Pasillo de circulación", d: "Debe tener 1,5 m de ancho." },
        { id: "entrega", c: "v", t: "Zona de entrega", d: "Para dejar las motos listas." },
        { id: "trabajadores", c: "v", t: "Zona de trabajadores", d: "4 m²." },
        { grupo: "Condiciones generales" },
        { id: "piso", c: "r", t: "Piso de concreto, cemento o baldosa antideslizante",
          d: "NO tierra ni madera.",
          nota: "⚠ Si es baldosa lisa, las motos se resbalan con el jabón y se caen. Toca picarla o echarle un producto antideslizante (gasto extra)." },
        { id: "pendiente", c: "a", t: "Piso inclinado hacia el desagüe",
          d: "Si es plano, hay que arreglarlo (presupuesto)." },
        { id: "ventilacion", c: "a", t: "Ventilación y techo alto",
          d: "Altura mínima recomendada: 3 metros. Es clave para evitar humedad, hongos y la nube de agua." }
      ] },

    { id: "s5", n: 5, t: "Ubicación y alrededores",
      items: [
        { id: "visibilidad", c: "v", t: "Se ve desde la calle",
          d: "¿Se ve el local desde la vía principal? Eso ayuda mucho a que lleguen clientes solos." },
        { id: "flujo", c: "v", t: "Pasan muchas motos",
          d: "¿Es vía principal, secundaria o de barrio? ¿Ves pasar muchas motos?" },
        { id: "parqueo", c: "v", t: "Parqueo para motos en espera",
          d: "¿Dónde se parquean las motos mientras esperan turno?" },
        { id: "competencia", c: "v", t: "Competencia cerca",
          d: "¿Cuántos lavaderos hay a 1 km a la redonda? ¿Qué precios cobran?" },
        { id: "internet", c: "v", t: "Internet",
          d: "¿Hay internet o fibra óptica? Lo necesitas para el sistema de gestión, las cámaras y los pagos digitales." },
        { id: "senal", c: "v", t: "Señal de celular",
          d: "Revisa que entre buena señal de datos dentro del local. Sin señal no funciona el datáfono y los clientes se aburren esperando." },
        { id: "vecinos", c: "v", t: "Vecinos",
          d: "¿Quién está al lado? Buenos vecinos: taller de motos, montallantas, venta de repuestos. Malos vecinos: oficinas, panadería fina, restaurante elegante (se van a quejar por el ruido de la hidrolavadora)." },
        { id: "seguridad", c: "v", t: "Seguridad de la zona",
          d: "¿Es seguro dejar motos? ¿Hay vigilancia? Piensa en cámaras y en un seguro." }
      ] },

    { id: "s6", n: 6, t: "Negociar el arriendo",
      items: [
        { grupo: "Antes de firmar" },
        { id: "permiso-obra", c: "r", t: "El dueño deja hacer adecuaciones",
          d: "Romper el piso para la trampa de grasas, pintar, hacer instalaciones eléctricas. Explícale claro lo que vas a hacer." },
        { id: "gracia", c: "a", t: "Tiempo de gracia",
          d: "Negocia mínimo 15 días sin pagar arriendo mientras haces las adecuaciones." },
        { id: "duracion", c: "a", t: "Contrato de mínimo 1 año",
          d: "Así alcanzas a recuperar lo que inviertes en adecuaciones." },
        { grupo: "Lo que debe decir el contrato" },
        { id: "renovacion", c: "a", t: "Renovación automática",
          d: "¿El contrato se renueva solo? ¿Cuánto sube el arriendo?" },
        { id: "mejoras", c: "a", t: "Mejoras al local",
          d: "Deja escrito quién se queda con las adecuaciones fijas si se acaba el contrato (Código de Comercio, artículos 516 a 524: mejoras útiles y necesarias)." },
        { id: "canon", c: "a", t: "Qué incluye el arriendo",
          d: "¿Incluye administración, vigilancia y aseo de zonas comunes?" },
        { id: "seguro", c: "v", t: "Seguro",
          d: "Piensa en un seguro de responsabilidad civil para las motos que te dejan." },
        { id: "aviso", c: "a", t: "Aviso en la fachada",
          d: "¿El dueño deja poner un aviso en la fachada? Es clave para que te vean." }
      ],
      tips: [
        "Para negociar: si el local te gusta, no muestres afán. Di algo como: \"Está interesante, tenemos que revisar los costos de adecuación porque vemos que falta X cosa, para ver si nos dan los números.\" Eso te da poder para negociar el precio después."
      ] }
  ];

  /* Los 7 requisitos mínimos (sección 7). Cada uno depende de estos puntos. */
  var MINIMOS = [
    { t: "Uso de suelo compatible", ids: ["uso-suelo", "no-residencial"] },
    { t: "Piso de concreto o cemento", ids: ["piso"] },
    { t: "Entrada sin escalones y de mínimo 3 m", ids: ["entrada-nivel", "entrada-ancho"] },
    { t: "Conexión al alcantarillado", ids: ["alcantarillado"] },
    { t: "Espacio para la trampa de grasas", ids: ["trampa"] },
    { t: "Servicios públicos independientes", ids: ["servicios"] },
    { t: "El dueño autoriza adecuaciones", ids: ["permiso-obra"] }
  ];

  var FOTOS = [
    { id: "f-panoramico", t: "Video panorámico desde la entrada (que se vea todo el local)" },
    { id: "f-tablero", t: "Foto del tablero eléctrico (caja de breakers)" },
    { id: "f-pisos", t: "Foto de los pisos y de los desagües o rejillas" },
    { id: "f-llaves", t: "Video de las llaves de agua abiertas (para ver la presión)" }
  ];

  var ESTADOS = [
    { v: "ok", t: "✅ Cumple", corto: "Cumple" },
    { v: "inv", t: "⚠️ Toca invertir", corto: "Toca invertir" },
    { v: "no", t: "❌ No cumple", corto: "No cumple" }
  ];
  var COLOR = { r: "Obligatorio", a: "Se arregla con plata", v: "Mejora el negocio" };

  /* ---------- Estado ---------- */
  function vacio() { return { nombre: "", alertas: {}, items: {}, fotos: {} }; }
  function leer() {
    try {
      var s = JSON.parse(localStorage.getItem(CLAVE));
      if (s && s.items) { s.alertas = s.alertas || {}; s.fotos = s.fotos || {}; s.nombre = s.nombre || ""; return s; }
    } catch (e) {}
    return vacio();
  }
  var E = leer();
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(E)); } catch (e) {} }

  var todosItems = [];
  SECCIONES.forEach(function (s) { s.items.forEach(function (it) { if (it.id) { it.sec = s; todosItems.push(it); } }); });
  function item(id) { for (var i = 0; i < todosItems.length; i++) if (todosItems[i].id === id) return todosItems[i]; }

  function $(id) { return document.getElementById(id); }
  function h(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- Pintar ---------- */
  function pintarAlertas() {
    var ul = $("cl-alertas");
    ALERTAS.forEach(function (a) {
      var li = h("li", "cl-alerta");
      li.setAttribute("data-id", a.id);
      li.appendChild(h("p", "cl-alerta-t", esc(a.t)));
      var g = h("div", "cl-sino");
      g.setAttribute("role", "group");
      g.setAttribute("aria-label", a.t);
      [["si", "Sí, pasa"], ["no", "No"]].forEach(function (op) {
        var b = h("button", "cl-btn cl-" + op[0], op[1]);
        b.type = "button";
        b.setAttribute("data-v", op[0]);
        b.addEventListener("click", function () {
          E.alertas[a.id] = E.alertas[a.id] === op[0] ? undefined : op[0];
          if (!E.alertas[a.id]) delete E.alertas[a.id];
          guardar(); refrescar();
        });
        g.appendChild(b);
      });
      li.appendChild(g);
      ul.appendChild(li);
    });
  }

  function pintarSecciones() {
    var cont = $("cl-secciones");
    SECCIONES.forEach(function (s, i) {
      var d = h("details", "cl-sec");
      d.id = "cl-" + s.id;
      if (i === 0) d.open = true;
      var sum = h("summary", null,
        '<span class="cl-sec-num">' + s.n + '</span>' +
        '<span><span class="cl-sec-t">' + esc(s.t) + '</span>' +
        '<span class="cl-sec-cuenta" data-cuenta="' + s.id + '"></span>' +
        '<span class="cl-mini"><span data-barra="' + s.id + '"></span></span></span>' +
        '<span class="paso-flecha" aria-hidden="true">›</span>');
      d.appendChild(sum);
      var cuerpo = h("div", "cl-sec-cuerpo");
      if (s.intro) cuerpo.appendChild(h("p", "cl-intro", esc(s.intro)));
      var ul = h("ul", "cl-items");
      s.items.forEach(function (it) {
        if (it.grupo) { ul.appendChild(h("li", "cl-grupo", esc(it.grupo))); return; }
        var li = h("li", "cl-item");
        li.setAttribute("data-id", it.id);
        li.appendChild(h("p", "cl-item-t",
          '<span class="cl-punto cl-' + it.c + '" title="' + COLOR[it.c] + '" aria-label="' + COLOR[it.c] + '"></span>' + esc(it.t)));
        li.appendChild(h("p", "cl-item-d", esc(it.d)));
        if (it.extra) li.appendChild(h("div", "cl-extra", it.extra));
        if (it.nota) li.appendChild(h("p", "cl-nota-alerta", esc(it.nota)));
        var g = h("div", "cl-tres");
        g.setAttribute("role", "group");
        g.setAttribute("aria-label", it.t);
        ESTADOS.forEach(function (st) {
          var b = h("button", "cl-btn cl-" + st.v, st.t);
          b.type = "button";
          b.setAttribute("data-v", st.v);
          b.addEventListener("click", function () {
            if (E.items[it.id] === st.v) delete E.items[it.id]; else E.items[it.id] = st.v;
            guardar(); refrescar();
          });
          g.appendChild(b);
        });
        li.appendChild(g);
        ul.appendChild(li);
      });
      cuerpo.appendChild(ul);
      (s.tips || []).forEach(function (t) { cuerpo.appendChild(h("p", "cl-tip", "💡 " + esc(t))); });
      if (s.legal) cuerpo.appendChild(h("p", "cl-legal", s.legal));
      if (s.enlace) {
        var a = h("a", "cl-enlace", esc(s.enlace.t));
        a.href = s.enlace.url;
        cuerpo.appendChild(a);
      }
      d.appendChild(cuerpo);
      cont.appendChild(d);
    });
  }

  function pintarFotos() {
    var ul = $("cl-fotos");
    FOTOS.forEach(function (f) {
      var li = h("li", null,
        '<label><input type="checkbox" data-foto="' + f.id + '"><span>' + esc(f.t) + '</span></label>');
      li.querySelector("input").addEventListener("change", function (e) {
        if (e.target.checked) E.fotos[f.id] = 1; else delete E.fotos[f.id];
        guardar(); refrescar();
      });
      ul.appendChild(li);
    });
  }

  /* ---------- Veredicto ---------- */
  function veredicto() {
    var alertasSi = ALERTAS.filter(function (a) { return E.alertas[a.id] === "si"; });
    var alertasFaltan = ALERTAS.filter(function (a) { return !E.alertas[a.id]; });
    var filas = MINIMOS.map(function (m) {
      var vals = m.ids.map(function (id) { return E.items[id]; });
      var est = vals.indexOf("no") > -1 ? "no" : vals.indexOf(undefined) > -1 ? "falta" : vals.indexOf("inv") > -1 ? "inv" : "ok";
      return { t: m.t, est: est };
    });
    var no = filas.filter(function (f) { return f.est === "no"; });
    var inv = filas.filter(function (f) { return f.est === "inv"; });
    var faltan = filas.filter(function (f) { return f.est === "falta"; }).length + alertasFaltan.length;
    var tipo, titulo, texto;
    if (alertasSi.length || no.length) {
      tipo = "no"; titulo = "❌ NO PASA";
      texto = "Descarta este local y busca otro. No vale la pena invertir.";
    } else if (faltan) {
      tipo = "falta"; titulo = faltan === 1 ? "⏳ Te falta 1 por revisar" : "⏳ Te faltan " + faltan + " por revisar";
      texto = "Revisa las señales de alerta y los 7 requisitos de abajo.";
    } else if (inv.length) {
      tipo = "inv"; titulo = "⚠️ PASA solo si arreglas esto";
      texto = "Estos requisitos mínimos todavía no se cumplen: " + inv.map(function (f) { return f.t.toLowerCase(); }).join(", ") + ". Presupuéstalos antes de firmar.";
    } else {
      tipo = "ok"; titulo = "✅ PASA";
      texto = "Cumple los 7 requisitos mínimos. Se puede arrendar.";
    }
    return { tipo: tipo, titulo: titulo, texto: texto, filas: filas, alertasSi: alertasSi };
  }

  /* ---------- Refrescar todo ---------- */
  function refrescar() {
    // Botones marcados
    Array.prototype.forEach.call(document.querySelectorAll(".cl-alerta"), function (li) {
      var v = E.alertas[li.getAttribute("data-id")];
      li.className = "cl-alerta" + (v ? " cl-hay-" + v : "");
      Array.prototype.forEach.call(li.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-v") === v ? "true" : "false");
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".cl-item"), function (li) {
      var v = E.items[li.getAttribute("data-id")];
      li.className = "cl-item" + (v ? " cl-hay-" + v : "");
      Array.prototype.forEach.call(li.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-v") === v ? "true" : "false");
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-foto]"), function (c) {
      c.checked = !!E.fotos[c.getAttribute("data-foto")];
    });

    // Banner rojo
    var hayAlerta = ALERTAS.some(function (a) { return E.alertas[a.id] === "si"; });
    $("cl-descarta").hidden = !hayAlerta;

    // Progreso total
    var total = ALERTAS.length + todosItems.length;
    var hechos = Object.keys(E.alertas).length + todosItems.filter(function (it) { return E.items[it.id]; }).length;
    $("cl-prog-texto").textContent = "Revisaste " + hechos + " de " + total + " puntos";
    $("cl-prog-barra").style.width = Math.round(hechos / total * 100) + "%";
    $("cl-prog-barra").parentNode.setAttribute("aria-valuenow", hechos);
    $("cl-prog-barra").parentNode.setAttribute("aria-valuemax", total);
    var invs = todosItems.filter(function (it) { return E.items[it.id] === "inv"; }).length;
    $("cl-prog-inv").textContent = invs ? "⚠️ " + invs : "";
    $("cl-alertas-cuenta").textContent = Object.keys(E.alertas).length + " de " + ALERTAS.length + " revisadas";

    // Mini progreso por sección
    SECCIONES.forEach(function (s) {
      var its = s.items.filter(function (it) { return it.id; });
      var ok = its.filter(function (it) { return E.items[it.id]; }).length;
      document.querySelector('[data-cuenta="' + s.id + '"]').textContent = ok + " de " + its.length + " revisados";
      document.querySelector('[data-barra="' + s.id + '"]').style.width = Math.round(ok / its.length * 100) + "%";
      $("cl-" + s.id).classList.toggle("cl-completa", ok === its.length);
    });

    // Sección 7
    var v = veredicto();
    var caja = $("cl-veredicto");
    caja.className = "cl-veredicto cl-v-" + v.tipo;
    caja.innerHTML = '<p class="cl-v-titulo">' + v.titulo + '</p><p>' + esc(v.texto) + '</p>';
    var ul = $("cl-minimos");
    ul.innerHTML = "";
    var ICON = { ok: "✅", inv: "⚠️", no: "❌", falta: "⏳" };
    v.filas.forEach(function (f) {
      ul.appendChild(h("li", "cl-min-" + f.est, '<span aria-hidden="true">' + ICON[f.est] + '</span> ' + esc(f.t)));
    });
    $("cl-presupuesto").textContent = invs === 1 ? "1 cosa para presupuestar (⚠️)" : invs + " cosas para presupuestar (⚠️)";

    var nf = Object.keys(E.fotos).length;
    $("cl-fotos-cuenta").textContent = nf + " de " + FOTOS.length + " listas";
  }

  /* ---------- Resumen para el asesor ---------- */
  function resumen() {
    var v = veredicto();
    var L = [];
    L.push("*Checklist del local · Mónaco*");
    if (E.nombre.trim()) L.push("Local: " + E.nombre.trim());
    L.push("Resultado: " + v.titulo);
    var total = ALERTAS.length + todosItems.length;
    var hechos = Object.keys(E.alertas).length + todosItems.filter(function (it) { return E.items[it.id]; }).length;
    L.push("Revisé " + hechos + " de " + total + " puntos.");
    L.push("");
    if (v.alertasSi.length) {
      L.push("*Señales de alerta:*");
      v.alertasSi.forEach(function (a) { L.push("- " + a.t); });
      L.push("");
    }
    var nos = todosItems.filter(function (it) { return E.items[it.id] === "no"; });
    var invs = todosItems.filter(function (it) { return E.items[it.id] === "inv"; });
    L.push("*❌ No cumple (" + nos.length + "):*");
    if (!nos.length) L.push("- Ninguno");
    nos.forEach(function (it) { L.push("- " + it.t + " (" + it.sec.t + ")"); });
    L.push("");
    L.push("*⚠️ Toca invertir (" + invs.length + "):*");
    if (!invs.length) L.push("- Ninguno");
    invs.forEach(function (it) { L.push("- " + it.t + " (" + it.sec.t + ")"); });
    L.push("");
    L.push("*📸 Fotos y videos (" + Object.keys(E.fotos).length + " de " + FOTOS.length + "):*");
    FOTOS.forEach(function (f) { L.push((E.fotos[f.id] ? "✔ " : "✘ ") + f.t); });
    return L.join("\n");
  }

  function copiar(texto, boton) {
    function listo() {
      var antes = boton.textContent;
      boton.textContent = "✔ Copiado";
      setTimeout(function () { boton.textContent = antes; }, 2000);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(listo, function () { copiarViejo(texto); listo(); });
    } else { copiarViejo(texto); listo(); }
  }
  function copiarViejo(texto) {
    var t = document.createElement("textarea");
    t.value = texto; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(t);
  }

  /* ---------- Barra de progreso fija debajo de "← Mapa" ---------- */
  function ajustarFija() {
    var barra = document.querySelector(".rm-barra");
    var alto = barra ? barra.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty("--cl-top", Math.round(alto) + "px");
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    pintarAlertas();
    pintarSecciones();
    pintarFotos();

    var nombre = $("cl-nombre");
    nombre.value = E.nombre;
    nombre.addEventListener("input", function () { E.nombre = nombre.value; guardar(); });

    $("cl-enviar").addEventListener("click", function () {
      window.open("https://wa.me/?text=" + encodeURIComponent(resumen()), "_blank", "noopener");
    });
    $("cl-copiar").addEventListener("click", function (e) { copiar(resumen(), e.currentTarget); });

    var confirma = $("cl-confirma");
    $("cl-reset").addEventListener("click", function () { confirma.hidden = false; $("cl-reset-si").focus(); });
    $("cl-reset-no").addEventListener("click", function () { confirma.hidden = true; });
    $("cl-reset-si").addEventListener("click", function () {
      E = vacio(); guardar();
      nombre.value = "";
      confirma.hidden = true;
      Array.prototype.forEach.call(document.querySelectorAll(".cl-sec"), function (d, i) { d.open = i === 0; });
      refrescar();
      window.scrollTo(0, 0);
    });

    refrescar();
    ajustarFija();
    window.addEventListener("resize", ajustarFija);
    window.addEventListener("load", ajustarFija);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
