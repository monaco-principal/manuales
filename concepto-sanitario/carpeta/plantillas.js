/* ==========================================================
   Plantillas de la carpeta sanitaria
   Fuente: Drive «PLANTILLAS MAESTRAS — Asesorados Monaco»
   - 7 documentos «PLANTILLA v2 —» (Google Docs, rev. 24-ago-2026)
   - 7 planillas: pestañas P- del «Libro_Maestro_Asesorados_MONACO_v2»
   El texto va tal cual. Los «CÓDIGO» son las casillas que se llenan
   con los datos del formulario (ver carpeta.js).
   ========================================================== */
(function () {
  "use strict";

  var L = "____/____/"; // fecha de emisión, como en las plantillas
  var RAYA = "____________________";
  var R6 = "______";

  function encabezado(codigo, opts) {
    opts = opts || {};
    var celdas =
      "<td><b>Código: " + codigo + "</b></td>" +
      "<td><b>Versión: 2.0</b></td>" +
      "<td><b>Fecha de emisión: " + L + "«AÑO»</b></td>" +
      (opts.pagina ? "<td><b>Página: control interno</b></td>" : "");
    var datos =
      "<p class=\"datos-neg\"><b>«NOMBRE_NEGOCIO»</b> — NIT: «NIT» — «DIRECCION», «BARRIO», «CIUDAD» — Tel: «TELEFONO»" +
      (opts.correo ? " — «CORREO»" : "") + " — Horario: «HORARIO»</p>";
    return "<table class=\"t-enc\"><tbody><tr>" + celdas + "</tr></tbody></table>" + datos;
  }

  function elaboro(vigia) {
    return "<table class=\"t-firmas\"><thead><tr><th>Elaboró</th><th>Aprobó</th></tr></thead><tbody>" +
      "<tr><td>«REPRESENTANTE» — " + (vigia || "Vigía") + "</td><td>«REPRESENTANTE» — Representante legal</td></tr>" +
      "<tr><td class=\"firma\">Firma:</td><td class=\"firma\">Firma:</td></tr></tbody></table>";
  }

  var CIERRE =
    "<div class=\"cierre-firma\"><hr><p><b>«REPRESENTANTE»</b> C.C. «CEDULA» · Representante Legal · «NOMBRE_NEGOCIO» Fecha: " + RAYA + "</p></div>";

  function tabla(cabecera, filas, clase) {
    var h = "<table" + (clase ? " class=\"" + clase + "\"" : "") + "><thead><tr>";
    cabecera.forEach(function (c) { h += "<th>" + c + "</th>"; });
    h += "</tr></thead><tbody>";
    filas.forEach(function (f) {
      h += "<tr>";
      f.forEach(function (c) { h += "<td>" + c + "</td>"; });
      h += "</tr>";
    });
    return h + "</tbody></table>";
  }

  function vacias(n, cols, prefijo) {
    var out = [];
    for (var i = 0; i < n; i++) {
      var f = [];
      for (var j = 0; j < cols; j++) f.push(prefijo && j < prefijo.length ? prefijo[j](i) : "&nbsp;");
      out.push(f);
    }
    return out;
  }

  /* Encabezado de las planillas (como en las pestañas P- del libro) */
  function encPlanilla(titulo) {
    return "<h1 class=\"pl-titulo\">" + titulo + "</h1>" +
      "<p class=\"pl-sub\">Documento del programa de asesoría · Año «AÑO»</p>" +
      "<table class=\"t-plenc\"><tbody>" +
      "<tr><td><b>«NOMBRE_NEGOCIO»</b></td><td>NIT / C.C.: «NIT»</td></tr>" +
      "<tr><td>Representante legal: «REPRESENTANTE» · C.C. «CEDULA»</td><td>Tel: «TELEFONO» · «CORREO»</td></tr>" +
      "<tr><td>Dirección: «DIRECCION», «BARRIO», «CIUDAD»</td><td>Horario: «HORARIO»</td></tr>" +
      "</tbody></table>";
  }

  var docs = [];

  /* ---------------- SST-PG-05 · Limpieza y desinfección ---------------- */
  docs.push({
    id: "limpieza", codigo: "SST-PG-05", tipo: "Documento",
    titulo: "Programa de Limpieza y Desinfección",
    para: "Qué se limpia, cada cuánto y con qué.",
    html:
      "<h1>PROGRAMA DE LIMPIEZA Y DESINFECCIÓN</h1>" +
      encabezado("SST-PG-05") + elaboro() +
      "<p><b>Control de cambios:</b> V1.0 — emisión inicial. V2.0 — ficha del desinfectante, lista de verificación mensual con criterio de aceptación e indicador.</p>" +
      "<h2>1. Objetivo, alcance y definiciones</h2>" +
      "<p><b>Objetivo:</b> mantener todas las áreas, equipos e instalaciones de «NOMBRE_NEGOCIO» en condiciones higiénicas verificables (art. 207 de la Ley 9 de 1979). <b>Alcance:</b> baño, zona de lavado, recepción, cuarto de insumos, punto ecológico, trampa de grasas y tanques de agua. <b>Limpieza (L):</b> remoción de suciedad visible con agua y jabón. <b>Desinfección (D):</b> eliminación de microorganismos con agente químico, siempre DESPUÉS de limpiar. <b>Recolección (R):</b> retiro de residuos del área.</p>" +
      "<h2>2. Ficha del desinfectante</h2>" +
      tabla(["Producto", "Concentración comercial", "Dilución de uso", "Tiempo de contacto"], [
        ["Hipoclorito de sodio", "5%–6% (comercial)", "20 ml por litro de agua (superficies y baño)", "10 minutos"],
        ["Hipoclorito de sodio", "5%–6% (comercial)", "Solución para tanques según Decreto 1575 de 2007", "30 minutos"]
      ]) +
      "<p>Preparar la dilución el mismo día de uso, en envase rotulado. No mezclar NUNCA con desengrasante ni jabones amoniacales (ver Matriz de Compatibilidad SST-RG-06).</p>" +
      "<h2>3. Áreas, frecuencias, productos y responsables</h2>" +
      tabla(["Área / elemento", "Frecuencia", "Producto", "Dilución / observación"], [
        ["Baño (sanitario, lavamanos)", "Diaria", "Jabón + hipoclorito", "20 ml de cloro por litro"],
        ["Pisos zona de lavado", "Diaria", "Jabón + hipoclorito", "20 ml por litro; enjuagar hacia la rejilla"],
        ["Recepción (pisos, muebles)", "Diaria", "Jabón / multiusos", "Paño húmedo"],
        ["Equipos (hidrolavadora, shampucera)", "Semanal", "Paño con jabón", "Nunca a chorro directo sobre motores"],
        ["Canecas del punto ecológico", "Semanal", "Jabón + hipoclorito", "Lavar, desinfectar y secar"],
        ["Cuarto de insumos", "Semanal", "Jabón", "Orden; revisar estado de envases"],
        ["Paredes y techos", "Mensual", "Jabón", "Remover polvo y salpicaduras"],
        ["Trampa de grasas", "Semanal (revisión)", "—", "Retirar lodos al contenedor RESPEL"],
        ["Tanques de agua («TANQUES»)", "Semestral", "Hipoclorito", "30 min de contacto; registrar en planilla P-TANQUES (Decreto 1575 de 2007)"]
      ]) +
      "<h2>4. Procedimiento general (5 pasos)</h2>" +
      "<p>1) Retirar residuos y barrer. 2) Lavar con agua y jabón restregando. 3) Enjuagar. 4) Aplicar la solución desinfectante y dejarla actuar el tiempo de contacto de la ficha (sección 2). 5) Registrar en la planilla de control diario (P-CONTROL) con la convención L / D / R y firma del responsable.</p>" +
      "<h2>5. Verificación mensual (lista de chequeo del Vigía)</h2>" +
      tabla(["Punto de verificación", "Criterio de aceptación", "Cumple (Sí/No)"], [
        ["Planilla P-CONTROL del mes", "Diligenciada todos los días operados, con firmas", "&nbsp;"],
        ["Baño", "Sin suciedad visible, dotado (jabón, papel)", "&nbsp;"],
        ["Zona de lavado", "Rejillas sin acumulación, sin charcos permanentes", "&nbsp;"],
        ["Punto ecológico", "Canecas lavadas, tapadas, con bolsa correcta", "&nbsp;"],
        ["Cuarto de insumos", "Ordenado, envases sanos y rotulados", "&nbsp;"],
        ["Trampa de grasas", "Sin rebose, lodos retirados con registro", "&nbsp;"]
      ]) +
      "<p><b>Criterio general de aceptación:</b> 6 de 6 puntos con \"Sí\". Cualquier \"No\" genera acción correctiva con responsable y fecha en observaciones. <b>Indicador:</b> verificaciones mensuales con 6/6 ÷ meses del periodo × 100 — meta ≥ 90%.</p>" +
      "<h2>6. Responsables y registros</h2>" +
      "<p>Ejecuta: personal operativo por turnos. Supervisa: «REPRESENTANTE» (verificación mensual, sección 5). Registros: Planilla de Control Diario (P-CONTROL) y Planilla de Lavado de Tanques (P-TANQUES), archivadas y disponibles para la autoridad sanitaria.</p>" +
      "<h2>7. Anexos</h2>" +
      "<p>Anexo 1: Planilla P-CONTROL del mes en curso. Anexo 2: Planilla P-TANQUES con soportes fotográficos. Anexo 3: FDS del hipoclorito.</p>" +
      CIERRE
  });

  /* ---------------- SST-PG-04 · Plagas ---------------- */
  docs.push({
    id: "plagas", codigo: "SST-PG-04", tipo: "Documento",
    titulo: "Programa de Manejo Integral de Plagas",
    para: "Fumigación, revisión semanal y cronograma.",
    html:
      "<h1>PROGRAMA DE MANEJO INTEGRAL DE PLAGAS</h1>" +
      encabezado("SST-PG-04") + elaboro() +
      "<p><b>Control de cambios:</b> V1.0 — emisión inicial. V2.0 — umbral de acción, plano de estaciones e indicador de cumplimiento.</p>" +
      "<h2>1. Objetivo y alcance</h2>" +
      "<p><b>Objetivo:</b> prevenir, monitorear y controlar la presencia de vectores y plagas (roedores, cucarachas, moscas y zancudos) en todas las áreas de «NOMBRE_NEGOCIO», con prioridad en cuarto de insumos, punto ecológico, trampa de grasas y drenajes. <b>Alcance:</b> todas las instalaciones del establecimiento.</p>" +
      "<h2>2. Marco legal</h2>" +
      tabla(["Norma", "Año", "Materia aplicable"], [
        ["Ley 9 — art. 201 y 593", "1979", "Control de vectores en establecimientos"],
        ["Resolución 5194 — art. 12", "2010", "La empresa de control de plagas debe tener concepto sanitario favorable"]
      ]) +
      "<h2>3. Medidas preventivas (control pasivo)</h2>" +
      "<ul>" +
      "<li>Rejillas y sifones con malla anti-roedor; grietas y orificios sellados.</li>" +
      "<li>Canecas siempre tapadas y desocupadas con la frecuencia necesaria.</li>" +
      "<li>Cuarto de insumos en orden, con estantería: nada directo sobre el piso ni contra la pared.</li>" +
      "<li>Sin agua estancada: trampa de grasas revisada semanalmente, tanques tapados, drenajes limpios.</li>" +
      "<li>Inspección semanal de evidencias: excrementos, roeduras, insectos vivos o muertos.</li>" +
      "</ul>" +
      "<h2>4. Monitoreo y umbral de acción</h2>" +
      "<p>La inspección semanal la realiza el operativo de turno y la registra en la tabla de la sección 7. <b>Umbral de acción:</b> UNA sola evidencia de roedores (excremento, roedura, avistamiento) o presencia repetida de insectos en 2 inspecciones seguidas activa una <b>visita extraordinaria</b> de la empresa fumigadora, sin esperar la fecha del cronograma.</p>" +
      "<h2>5. Control con empresa especializada</h2>" +
      "<p>Empresa contratada: «FUMIGADORA» — Tel «TEL_FUMIGADORA». Frecuencia: «FRECUENCIA_FUMIGACION». En cada visita la empresa entrega: (1) certificado del servicio con áreas tratadas, (2) productos aplicados con registro sanitario, (3) su <b>concepto sanitario favorable vigente</b> (Res. 5194 de 2010, art. 12) y (4) <b>plano o esquema de ubicación de cebos/estaciones</b> cuando aplique control de roedores. Todo se archiva en la carpeta del sistema — es lo primero que solicita la autoridad sanitaria.</p>" +
      "<h2>6. Cronograma anual — año «AÑO»</h2>" +
      tabla(["Periodo", "Fecha programada", "Fecha ejecutada", "N° certificado", "Firma"], [
        ["Trimestre 1", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
        ["Trimestre 2", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
        ["Trimestre 3", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
        ["Trimestre 4", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"]
      ], "t-llenar") +
      "<p><b>Indicador:</b> visitas ejecutadas ÷ visitas programadas × 100. Meta: 100%.</p>" +
      "<h2>7. Registro de inspección semanal de evidencias</h2>" +
      tabla(["Fecha", "¿Evidencia encontrada? (cuál)", "Acción tomada", "Responsable"], vacias(6, 4), "t-llenar") +
      "<h2>8. Anexos</h2>" +
      "<p>Anexo 1: Certificados de cada servicio. Anexo 2: Concepto sanitario favorable vigente de «FUMIGADORA». Anexo 3: Registros sanitarios de los productos aplicados. Anexo 4: Plano de estaciones de control (si aplica).</p>" +
      CIERRE
  });

  /* ---------------- SST-PL-02 · PGIRS ---------------- */
  docs.push({
    id: "pgirs", codigo: "SST-PL-02", tipo: "Documento",
    titulo: "Plan de Gestión Integral de Residuos (PGIRS)",
    para: "Canecas por color, lodos y quién se los lleva.",
    html:
      "<h1>PLAN DE GESTIÓN INTEGRAL DE RESIDUOS SÓLIDOS (PGIRS)</h1>" +
      encabezado("SST-PL-02") + elaboro() +
      "<p><b>Control de cambios:</b> V1.0 — emisión inicial. V2.0 — caracterización de residuos con cantidades, rutas internas, nota de generador RESPEL e indicadores.</p>" +
      "<h2>1. Objetivo y alcance</h2>" +
      "<p><b>Objetivo general:</b> garantizar la correcta separación en la fuente, almacenamiento temporal y disposición final de todos los residuos generados en «NOMBRE_NEGOCIO». <b>Objetivos específicos:</b> (1) aplicar el código de colores nacional; (2) manejar los residuos peligrosos con gestor autorizado y soporte documental; (3) mantener registros verificables para la autoridad sanitaria y ambiental. <b>Alcance:</b> todos los residuos generados en la operación del establecimiento.</p>" +
      "<h2>2. Marco legal</h2>" +
      tabla(["Norma", "Año", "Materia aplicable"], [
        ["Ley 9 — art. 198 y 199", "1979", "Manejo sanitario de residuos en establecimientos"],
        ["Decreto 351", "2014", "Gestión de residuos generados en actividades con riesgo"],
        ["Resolución 2184", "2019", "Código de colores nacional para separación en la fuente"],
        ["Decreto 1076 (recoge Decreto 4741 de 2005)", "2015", "Gestión de residuos peligrosos — obligaciones del generador"]
      ]) +
      "<h2>3. Caracterización de residuos (diagnóstico)</h2>" +
      tabla(["Residuo", "Tipo", "Generación estimada", "Destino"], [
        ["Botellas plásticas, cartón, papel", "Aprovechable", R6 + " kg/mes", "Reciclador de oficio / ruta de reciclaje"],
        ["Envolturas, servilletas, barrido", "No aprovechable", R6 + " bolsas/semana", "«EMPRESA_ASEO»"],
        ["Lodos de la trampa de grasas", "PELIGROSO", R6 + " kg/mes", "«GESTOR_RESPEL»"],
        ["Estopas y trapos con grasa/cera", "PELIGROSO", R6 + " kg/mes", "«GESTOR_RESPEL»"],
        ["Envases vacíos de químicos", "PELIGROSO", R6 + " unid/mes", "«GESTOR_RESPEL»"]
      ]) +
      "<p><b>Nota — categoría de generador RESPEL:</b> con la media móvil de los últimos 6 meses de generación de peligrosos se determina la categoría (micro &lt; 10 kg/mes; pequeño 10–100 kg/mes). Si supera 10 kg/mes, registrarse como generador RESPEL ante la autoridad ambiental (Decreto 1076 de 2015).</p>" +
      "<h2>4. Clasificación y código de colores (Res. 2184 de 2019)</h2>" +
      tabla(["Caneca", "Qué va aquí", "Manejo"], [
        ["BLANCA — Aprovechables", "Botellas plásticas, cartón limpio, papel", "Recicladores de oficio o ruta de reciclaje"],
        ["NEGRA — No aprovechables", "Envolturas, servilletas, barrido, papel higiénico", "Camión de «EMPRESA_ASEO» (días: " + R6 + ")"],
        ["VERDE — Orgánicos", "Restos de comida (si aplica)", "Camión recolector / compostaje"],
        ["CONTENEDOR RESPEL (rotulado)", "Lodos, estopas contaminadas, envases de químicos", "Cerrado, señalizado; NO va al punto ecológico. Recoge «GESTOR_RESPEL» — Tel «TEL_GESTOR»"]
      ]) +
      "<h2>5. Ruta interna y almacenamiento temporal</h2>" +
      "<p>Recolección interna: al cierre de cada jornada, el operativo de turno recoge las canecas de la zona de lavado y recepción y consolida en el punto ecológico. Los lodos de la trampa de grasas se retiran en la revisión semanal directamente al contenedor RESPEL con guantes y pala destinada solo a ese uso. El punto ecológico permanece señalizado y con canecas tapadas; el contenedor RESPEL permanece cerrado, rotulado \"RESIDUOS PELIGROSOS\", sobre superficie impermeable en la zona de lavado, lejos de la circulación de clientes.</p>" +
      "<h2>6. Gestión externa y soportes</h2>" +
      "<p>Recolección ordinaria: «EMPRESA_ASEO». Gestión de peligrosos: «GESTOR_RESPEL» — Tel «TEL_GESTOR», frecuencia mensual o según generación. <b>Soportes que se archivan (Anexos):</b> contrato o acuerdo con el gestor, manifiesto de cada recolección y Certificado de Disposición Final. Son los documentos que la autoridad sanitaria y ambiental solicita en visita.</p>" +
      "<h2>7. Indicadores</h2>" +
      tabla(["Indicador", "Fórmula", "Meta"], [
        ["Certificados de disposición final", "Certificados archivados ÷ recolecciones realizadas × 100", "100%"],
        ["Aprovechamiento", "kg reciclados ÷ kg totales estimados × 100", "Creciente"]
      ]) +
      "<h2>8. Registro de recolecciones RESPEL</h2>" +
      tabla(["Fecha", "Residuo entregado", "Cantidad (kg)", "N° manifiesto", "Firma"], vacias(5, 5), "t-llenar") +
      CIERRE
  });

  /* ---------------- SST-PT-03 · Químicos ---------------- */
  docs.push({
    id: "quimicos", codigo: "SST-PT-03", tipo: "Documento",
    titulo: "Protocolo de Manejo de Sustancias Químicas",
    para: "Cómo guardar y usar cada químico sin accidentes.",
    html:
      "<h1>PROTOCOLO DE MANEJO, ALMACENAMIENTO Y USO DE SUSTANCIAS QUÍMICAS</h1>" +
      encabezado("SST-PT-03") + elaboro() +
      "<p><b>Control de cambios:</b> V1.0 — emisión inicial. V2.0 — clasificación SGA/GHS (Decreto 1496 de 2018), EPP por producto y referencia cruzada al PON de derrames.</p>" +
      "<h2>1. Objetivo y alcance</h2>" +
      "<p><b>Objetivo:</b> prevenir accidentes, quemaduras e intoxicaciones asociados a la manipulación, dilución, almacenamiento y disposición de sustancias químicas en «NOMBRE_NEGOCIO». <b>Alcance:</b> todo el personal que manipule químicos y todo producto químico presente en el establecimiento. Proveedor principal: «PROVEEDOR_QUIMICOS» — se exige la Ficha de Datos de Seguridad (FDS) de cada producto como requisito de compra.</p>" +
      "<h2>2. Definiciones</h2>" +
      "<p><b>FDS:</b> Ficha de Datos de Seguridad (16 secciones, la entrega el fabricante). <b>SGA/GHS:</b> Sistema Globalmente Armonizado de clasificación y etiquetado de químicos, adoptado en Colombia por el Decreto 1496 de 2018. <b>Pictograma:</b> símbolo de peligro del SGA en la etiqueta. <b>Dilución:</b> mezcla del producto concentrado con agua según dosis del fabricante. <b>Matriz de compatibilidad:</b> tabla que indica qué productos pueden almacenarse juntos.</p>" +
      "<h2>3. Marco legal</h2>" +
      tabla(["Norma", "Año", "Materia aplicable"], [
        ["Ley 55", "1993", "Convenio 170 OIT — seguridad en el uso de químicos"],
        ["Ley 9 — art. 102 y 130", "1979", "Manejo de sustancias peligrosas"],
        ["Decreto 1496", "2018", "Adopción del SGA/GHS — etiquetado y FDS"],
        ["Resolución 2400 — art. 164 y ss.", "1979", "Almacenamiento de sustancias peligrosas"]
      ]) +
      "<h2>4. Inventario y clasificación SGA de sustancias</h2>" +
      tabla(["Producto", "Composición", "pH", "Pictograma SGA", "EPP requerido", "Dilución"], [
        ["Shampoo pH neutro", "Tensoactivos aniónicos biodegradables, base agua", "6.5–7.5", "Sin pictograma (no peligroso)", "Guantes", "100 ml / 900 ml agua"],
        ["Desengrasante activo", "Tensoactivos base agua, libre de soda cáustica", "9–10", "GHS07 Signo de exclamación (irritante)", "Guantes + gafas", "70% producto / 30% agua"],
        ["Hipoclorito de sodio (cloro)", "Desinfectante oxidante", "~12", "GHS05 Corrosión + GHS09 Medio ambiente", "Guantes + gafas, área ventilada", "20 ml por litro (desinfección)"],
        ["Restaurador partes negras", "Aceites naturales, polímeros", "N/D", "Sin pictograma", "Guantes", "Listo para usar"],
        ["Restaurador de motores", "Ceras vegetales, aceites naturales", "6.5–7.5", "Sin pictograma", "Guantes", "Listo para usar"]
      ], "t-ancha") +
      "<p>Todo envase conserva su <b>etiqueta original del fabricante</b>. Las diluciones se preparan en envases rotulados con: nombre del producto, dilución y fecha (Decreto 1496 de 2018).</p>" +
      "<h2>5. Reglas de oro</h2>" +
      "<ul>" +
      "<li>NUNCA mezclar cloro con desengrasante ni con aceites: genera GASES TÓXICOS. Mantener SIEMPRE separados.</li>" +
      "<li>Nunca re-envasar químicos en botellas de bebidas ni envases sin rotular.</li>" +
      "<li>EPP obligatorio según la tabla de la sección 4 antes de destapar cualquier producto.</li>" +
      "<li>Dosificar con jarra medidora, directo del envase original, según la tabla de diluciones.</li>" +
      "<li>Ante cualquier duda, consultar la FDS antes de manipular.</li>" +
      "</ul>" +
      "<h2>6. Almacenamiento</h2>" +
      "<p>Cuarto de insumos ventilado, lejos de fuentes de calor, con estantería (nada directamente sobre el piso). El cloro se almacena SEPARADO del desengrasante y de aceites/ceras, según la <b>Matriz de Compatibilidad (SST-RG-06)</b> impresa y pegada en el cuarto. Tapas siempre cerradas. Las FDS se archivan en la carpeta del sistema y una copia permanece al alcance del personal.</p>" +
      "<h2>7. Actuación ante derrames</h2>" +
      "<p>Aplicar el <b>PON 9.3 del Plan de Gestión del Riesgo (SST-PL-01)</b>: EPP → ventilar → consultar FDS → contener con el kit antiderrames (material absorbente + pala, ubicado en el cuarto de insumos) → recoger al contenedor RESPEL → lavar el área. El absorbente usado se dispone como residuo peligroso (PGIRS SST-PL-02).</p>" +
      "<h2>8. Primeros auxilios</h2>" +
      "<p><b>Ojos:</b> lavar con agua limpia 15 minutos abriendo los párpados; no frotar. <b>Piel:</b> retirar ropa impregnada, lavar con agua y jabón. <b>Inhalación:</b> trasladar al aire libre; si hay dificultad respiratoria, llamar al 123. <b>Ingestión:</b> NO inducir el vómito; llamar al 123 con la etiqueta o FDS del producto a la mano.</p>" +
      "<h2>9. Anexos</h2>" +
      "<p>Anexo 1: FDS de todos los productos (entregadas por «PROVEEDOR_QUIMICOS»). Anexo 2: Matriz de compatibilidad impresa (SST-RG-06). Anexo 3: Registro de capacitación en químicos (SST-RG-08). Anexo 4: Inventario actualizado (planilla P-INVENTARIO).</p>" +
      CIERRE
  });

  /* ---------------- SST-PL-01 · Plan de gestión del riesgo ---------------- */
  function vuln(filas, nombre) {
    return tabla(["Pregunta", "Respuesta", "Calif."], filas.concat([["<b>Promedio " + nombre + "</b>", "&nbsp;", "<b>____</b>"]]));
  }
  docs.push({
    id: "riesgo", codigo: "SST-PL-01", tipo: "Documento",
    titulo: "Plan de Gestión del Riesgo de Desastres y Emergencias",
    para: "Brigada, amenazas y qué hacer en cada emergencia.",
    html:
      "<h1>PLAN DE GESTIÓN DEL RIESGO DE DESASTRES Y EMERGENCIAS</h1>" +
      encabezado("SST-PL-01", { pagina: true, correo: true }) + elaboro("Vigía SST") +
      "<p><b>Control de cambios:</b> V1.0 — emisión inicial. V2.0 — actualización metodológica: análisis de vulnerabilidad (metodología del diamante), escala de calificación de amenazas, PON para las 5 amenazas y directorio de emergencias.</p>" +
      "<h2>1. Objetivo y alcance</h2>" +
      "<p><b>Objetivo general:</b> establecer la organización, los procedimientos y los recursos para prevenir, prepararse y responder ante emergencias en «NOMBRE_NEGOCIO», protegiendo la vida de trabajadores, contratistas y clientes, los bienes y la continuidad del servicio.</p>" +
      "<p><b>Objetivos específicos:</b> (1) identificar y calificar las amenazas del establecimiento; (2) analizar la vulnerabilidad en personas, recursos y sistemas; (3) definir la estructura de respuesta (brigada) y los procedimientos operativos normalizados; (4) programar actividades de preparación: capacitación y simulacro anual.</p>" +
      "<p><b>Alcance:</b> aplica a todas las personas presentes en las instalaciones («NUM_ADMIN» administrativo(s), «NUM_OPERATIVOS» operativo(s), visitantes y clientes) durante el horario de operación.</p>" +
      "<h2>2. Definiciones</h2>" +
      "<p><b>Amenaza:</b> peligro latente asociado a un fenómeno físico de origen natural, tecnológico o social que puede producir efectos adversos. <b>Vulnerabilidad:</b> susceptibilidad o fragilidad frente a una amenaza. <b>Riesgo:</b> daños o pérdidas potenciales, resultado de la combinación amenaza × vulnerabilidad. <b>Emergencia:</b> situación que altera la operación normal y exige respuesta inmediata. <b>PON:</b> Procedimiento Operativo Normalizado. <b>Brigada:</b> equipo interno organizado para la primera respuesta.</p>" +
      "<h2>3. Marco legal</h2>" +
      tabla(["Norma", "Año", "Materia aplicable"], [
        ["Ley 1523", "2012", "Política Nacional de Gestión del Riesgo de Desastres"],
        ["Decreto 2157", "2017", "Planes de gestión del riesgo de entidades públicas y privadas"],
        ["Ley 9 — Título III", "1979", "Código Sanitario Nacional — seguridad en establecimientos"],
        ["Resolución 2400", "1979", "Estatuto de Seguridad Industrial"],
        ["Decreto 1072", "2015", "Decreto Único Reglamentario del Sector Trabajo (SG-SST)"],
        ["NSR-10", "2010", "Norma Sismo Resistente"]
      ]) +
      "<h2>4. Descripción del establecimiento</h2>" +
      tabla(["Aspecto", "Descripción"], [
        ["Actividad", "Lavado y detailing profesional de motocicletas (CIIU 4542)"],
        ["Área y distribución", "«AREA_M2». «DESCRIPCION_LOCAL»"],
        ["Salidas", "«NUM_SALIDAS»"],
        ["Tanques de agua", "«TANQUES»"],
        ["Equipos", "«EQUIPOS»"],
        ["Personal", "«NUM_ADMIN» administrativo(s) + «NUM_OPERATIVOS» operativo(s)"]
      ]) +
      "<h2>5. Identificación y calificación de amenazas</h2>" +
      "<p><b>Escala:</b> POSIBLE (nunca ha ocurrido pero podría ocurrir — verde) · PROBABLE (ya ha ocurrido en condiciones similares — amarillo) · INMINENTE (evidente y detectable, ocurrirá — rojo).</p>" +
      tabla(["Tipo", "Amenaza", "Fuente", "Calificación", "Justificación"], [
        ["Tecnológico", "Incendio / cortocircuito", "Instalación eléctrica de hidrolavadoras y equipos", "PROBABLE", "Equipos eléctricos operando en ambiente húmedo a diario"],
        ["Tecnológico", "Derrame / fuga de químicos", "Ruptura de envases; residuos de aceite y grasa de motos", "PROBABLE", "Manipulación diaria de químicos y lubricantes"],
        ["Natural", "Sismo / terremoto", "Zona de amenaza sísmica intermedia", "POSIBLE", "Registro sísmico histórico regional"],
        ["Social", "Hurto / asonada", "Local sobre vía pública", "POSIBLE", "Contexto urbano; sin antecedentes en el local"],
        ["Tecnológico", "Inundación interna", "Falla en drenaje / trampa de grasas; rotura de tanques", "POSIBLE", "Volumen de agua almacenada y en uso constante"]
      ]) +
      "<h2>6. Análisis de vulnerabilidad (metodología del diamante)</h2>" +
      "<p><b>Escala:</b> 1.0 = se tiene / bueno · 0.5 = parcial · 0.0 = no se tiene. <b>Interpretación del promedio por elemento:</b> 0.00–0.49 vulnerabilidad ALTA (rojo) · 0.50–0.74 MEDIA (amarillo) · 0.75–1.00 BAJA (verde).</p>" +
      "<h3>6.1 Personas</h3>" +
      vuln([
        ["¿Existe brigada con roles asignados?", "Roles designados en este plan", "0.5"],
        ["¿Se cuenta con EPP?", "Guantes, gafas, botas", "1.0"],
        ["¿El personal sabe usar extintores?", "Conocimientos básicos; capacitación programada", "0.5"],
        ["¿Se conoce el punto de encuentro?", "«PUNTO_ENCUENTRO»", "1.0"]
      ], "Personas") +
      "<h3>6.2 Recursos</h3>" +
      vuln([
        ["¿Hay extintor(es) vigente(s)?", "Extintor ABC señalizado", "1.0"],
        ["¿Hay botiquín dotado?", "Tipo A", "1.0"],
        ["¿Hay alarma de emergencia?", "Instalada y audible", "1.0"],
        ["¿Hay señalización de evacuación?", "Señales fotoluminiscentes instaladas", "1.0"]
      ], "Recursos") +
      "<h3>6.3 Sistemas y procesos</h3>" +
      vuln([
        ["¿Hay agua alterna?", "«TANQUES»", "1.0"],
        ["¿Hay protocolos escritos?", "Este plan y sus PON", "1.0"],
        ["¿Hay directorio de emergencias visible?", "Publicado en recepción", "1.0"]
      ], "Sistemas") +
      "<p><b>Consolidación del diamante:</b> con los tres promedios se pinta el diamante (Personas / Recursos / Sistemas + la amenaza). Conclusión general de vulnerabilidad: __________. Los ítems calificados en 0.0 o 0.5 pasan al plan de mejoramiento (sección 10).</p>" +
      "<h2>7. Estructura de respuesta — brigada de emergencia</h2>" +
      tabla(["Rol", "Responsable", "Función principal"], [
        ["Comandante del incidente", "«COMANDANTE»", "Decide evacuar, llama al 123, ordena cortar la energía"],
        ["Suplente", "«SUPLENTE»", "Asume el mando en ausencia del comandante"],
        ["Brigadista de primeros auxilios", "«BRIGADISTA_PA»", "Toma el botiquín y atiende heridos"],
        ["Brigadista contra incendios", "«BRIGADISTA_INC»", "Toma el extintor ABC y ataca el conato"],
        ["Brigadista de evacuación", "«BRIGADISTA_EVA»", "Abre la puerta y guía a todos al punto de encuentro"]
      ]) +
      "<h2>8. Directorio de emergencias (publicar en recepción)</h2>" +
      tabla(["Entidad", "Teléfono"], [
        ["Línea única de emergencias", "123"],
        ["Bomberos del municipio", "«TEL_BOMBEROS»"],
        ["Policía (CAI más cercano)", "______________"],
        ["Ambulancia / secretaría de salud", "______________"],
        ["Empresa de energía", "______________"],
        ["Empresa de acueducto", "______________"],
        ["Representante legal", "«TELEFONO»"]
      ]) +
      "<h2>9. Procedimientos operativos normalizados (PON)</h2>" +
      "<p><b>9.1 Incendio / conato:</b> dar la voz de alarma → el Comandante evalúa → cortar la energía desde el tablero → si es conato, extintor ABC con técnica PASS → si no se controla en ~30 segundos, EVACUAR → llamar al 123 y a bomberos («TEL_BOMBEROS») → reunirse en «PUNTO_ENCUENTRO» → no reingresar sin autorización de bomberos.</p>" +
      "<p><b>9.2 Sismo:</b> calma, no salir durante el movimiento → agacharse y cubrirse junto a un muro estructural → alejarse de tanques, equipos pesados y tablero → al terminar, evacuar con calma → verificar fugas, derrames y cables sueltos → punto de encuentro → no reingresar hasta confirmar que la estructura es segura.</p>" +
      "<p><b>9.3 Derrame de químicos o lubricantes:</b> ponerse guantes y gafas → ventilar → consultar la FDS del producto → contener con material absorbente (aserrín / trapos) sin dejar que llegue al drenaje ni a la trampa de grasas → recoger y depositar en el contenedor RESPEL → lavar con abundante agua → NUNCA mezclar productos → contacto con ojos o piel: lavar 15 minutos; si persiste el malestar, llamar al 123.</p>" +
      "<p><b>9.4 Hurto / asonada:</b> no oponer resistencia ni confrontar → priorizar la integridad de personas sobre los bienes → memorizar rasgos y detalles sin arriesgarse → una vez seguro, llamar al 123 y a la Policía → preservar la escena → reportar al representante legal → denunciar ante la Fiscalía (denuncia virtual disponible).</p>" +
      "<p><b>9.5 Inundación interna:</b> cortar la energía desde el tablero ANTES de pisar zonas encharcadas → cerrar el registro de agua → identificar la fuente (tanque, manguera, drenaje taponado) → retirar equipos eléctricos del piso → drenar hacia las rejillas → revisar la trampa de grasas al finalizar → registrar el evento.</p>" +
      "<h2>10. Preparación, simulacros y plan de mejoramiento</h2>" +
      tabla(["Acción", "Descripción", "Responsable", "Plazo"], [
        ["Capacitación en emergencias", "Uso de extintores y primeros auxilios (Bomberos / asesor)", "«REPRESENTANTE»", R6],
        ["Simulacro de evacuación", "1 simulacro anual con acta, tiempos y registro fotográfico", "Comandante del incidente", R6],
        ["Señalización de ruta", "Mantener la ruta de evacuación señalizada y visible", "Vigía SST", "Inmediato"],
        ["Actualización del plan", "Revisión anual o después de cada emergencia real", "«REPRESENTANTE»", "Anual"]
      ]) +
      "<p><b>Indicador de preparación:</b> actividades ejecutadas ÷ actividades programadas × 100. Meta: ≥ 90% anual.</p>" +
      "<h2>11. Anexos</h2>" +
      "<p>Anexo 1: Croquis / plano de evacuación (publicado en recepción). Anexo 2: Acta del simulacro anual. Anexo 3: Registro de capacitación de la brigada. Anexo 4: Hojas de seguridad (FDS) de los químicos.</p>" +
      CIERRE
  });

  /* ---------------- SST-SG-01 · SG-SST ---------------- */
  docs.push({
    id: "sgsst", codigo: "SST-SG-01", tipo: "Documento",
    titulo: "Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST)",
    para: "Política, peligros, responsables y cronograma del año.",
    html:
      "<h1>SISTEMA DE GESTIÓN DE SEGURIDAD Y SALUD EN EL TRABAJO (SG-SST)</h1>" +
      encabezado("SST-SG-01") + elaboro() +
      "<p><b>Control de cambios:</b> V1.0 — emisión inicial. V2.0 — matriz de peligros con valoración (GTC 45 simplificada), objetivos medibles, responsabilidades por rol, cronograma anual, indicadores e investigación de incidentes.</p>" +
      "<h2>1. Objetivos, alcance y política</h2>" +
      "<p><b>Política:</b> en «NOMBRE_NEGOCIO», la gerencia se compromete a identificar y controlar los riesgos locativos, químicos, eléctricos y biomecánicos de la operación; a exigir el cumplimiento de las normas de seguridad a todo el personal, contratistas y terceros; a mantener los equipos de emergencia; y a promover la mejora continua bajo el ciclo PHVA (Planear–Hacer–Verificar–Actuar).</p>" +
      "<p><b>Objetivos medibles del año «AÑO»:</b> (1) Cero accidentes incapacitantes — indicador: N° de accidentes con incapacidad. (2) 100% del personal operativo con inducción de seguridad firmada y póliza vigente antes de operar equipos — indicador: inducciones firmadas ÷ personal activo. (3) Ejecutar ≥ 90% del cronograma anual de SST — indicador: actividades ejecutadas ÷ programadas.</p>" +
      "<p><b>Alcance:</b> administración, personal operativo (contratistas independientes) y visitantes, en todas las actividades desarrolladas en «DIRECCION», «CIUDAD». <b>Marco:</b> Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6) y Resolución 0312 de 2019 — estándares mínimos para empresas de menos de 10 trabajadores clasificadas en riesgo I, II o III.</p>" +
      "<h2>2. Definiciones</h2>" +
      "<p><b>Peligro:</b> fuente o situación con potencial de daño. <b>Riesgo:</b> combinación de la probabilidad de que ocurra un evento y la severidad de sus consecuencias. <b>Acto inseguro:</b> comportamiento que posibilita un accidente. <b>Condición insegura:</b> circunstancia física del entorno que posibilita un accidente. <b>Incidente:</b> evento que pudo generar lesión y no la generó (casi-accidente). <b>EPP:</b> elementos de protección personal. <b>Vigía SST:</b> persona que cumple las funciones de vigilancia del sistema en empresas de menos de 10 trabajadores.</p>" +
      "<h2>3. Marco legal</h2>" +
      tabla(["Norma", "Año", "Materia aplicable"], [
        ["Decreto 1072", "2015", "Decreto Único del Sector Trabajo — SG-SST"],
        ["Resolución 0312", "2019", "Estándares mínimos del SG-SST"],
        ["Ley 9", "1979", "Código Sanitario Nacional"],
        ["Ley 55", "1993", "Seguridad en el uso de productos químicos"],
        ["Resolución 1401", "2007", "Investigación de incidentes y accidentes de trabajo"],
        ["Resolución 2400", "1979", "Estatuto de Seguridad Industrial"],
        ["Decreto 1496", "2018", "Sistema Globalmente Armonizado (SGA/GHS) de etiquetado de químicos"]
      ]) +
      "<h2>4. Organización y responsabilidades</h2>" +
      tabla(["Rol", "Responsabilidades en SST"], [
        ["Representante legal («REPRESENTANTE»)", "Asignar recursos, aprobar documentos y cronograma, revisar el sistema anualmente"],
        ["Vigía SST («REPRESENTANTE»)", "Inspección mensual de extintor, botiquín y equipos; verificación de condiciones y actos seguros; supervisión de contratistas; reporte e investigación de incidentes; custodia de registros"],
        ["Contratistas operativos", "Cumplir normas y PON; usar EPP; mantener póliza vigente; reportar de inmediato incidentes, actos y condiciones inseguras"],
        ["Visitantes y clientes", "Permanecer en las áreas autorizadas (recepción / sala de espera)"]
      ]) +
      "<h2>5. Personal operativo (contratistas independientes)</h2>" +
      "<p>El personal operativo actúa como contratista independiente. Requisitos de ingreso y permanencia: (1) <b>Póliza de Accidentes Personales vigente</b> — protege al contratista y al establecimiento (Decreto 1072 de 2015, art. 2.2.4.6.28 — requisitos para contratistas); (2) firmar la <b>Inducción de Seguridad</b> (SST-RG-07) antes de operar equipos, con re-inducción anual; (3) usar el EPP definido en la matriz de peligros. Sin póliza vigente, ningún contratista opera equipos.</p>" +
      "<h2>6. Identificación de peligros y valoración de riesgos — metodología GTC 45 (simplificada)</h2>" +
      "<p><b>Valoración:</b> Probabilidad (B=Baja 2 / M=Media 6 / A=Alta 10) × Severidad (L=Leve 10 / G=Grave 25 / M=Mortal 60) = <b>Nivel de Riesgo (NR)</b>. <b>Aceptabilidad:</b> NR ≤ 120 Aceptable · 121–500 Tolerable (mejorar) · &gt; 500 No aceptable (intervención inmediata).</p>" +
      tabla(["Actividad", "Peligro (clasificación)", "Riesgo", "Prob.", "Sev.", "NR", "Aceptabilidad", "Controles (jerarquía)"], [
        ["Lavado y desengrase", "Químico — desengrasante alcalino pH 9-10", "Irritación de piel y ojos", "M (6)", "L (10)", "60", "Aceptable", "Sustitución: producto base agua sin soda · Adm.: FDS visible, no mezclar con cloro · EPP: guantes y gafas"],
        ["Desinfección", "Químico — hipoclorito de sodio", "Irritación respiratoria; quemadura", "M (6)", "G (25)", "150", "Tolerable", "Ingeniería: área ventilada · Adm.: almacenamiento separado, matriz de compatibilidad · EPP: guantes y gafas"],
        ["Operación de hidrolavadoras", "Eléctrico — equipos 110V en ambiente húmedo", "Electrocución, cortocircuito", "M (6)", "M (60)", "360", "Tolerable", "Ingeniería: circuitos con breaker, cableado entubado · Adm.: inspección pre-operacional de cables · EPP: botas dieléctricas/caucho"],
        ["Tránsito en zona de lavado", "Locativo — piso húmedo", "Caídas y golpes", "A (10)", "L (10)", "100", "Aceptable", "Ingeniería: piso antideslizante/rejillas · Adm.: señal de piso húmedo · EPP: botas antideslizantes"],
        ["Manipulación de motos y posturas", "Biomecánico — carga y postura", "Lesiones osteomusculares", "M (6)", "L (10)", "60", "Aceptable", "Ingeniería: caballetes de moto · Adm.: pausas activas, técnica de levantamiento"]
      ], "t-ancha") +
      "<p>La matriz se revisa anualmente o cuando cambien equipos, productos o procesos.</p>" +
      "<h2>7. Equipos de emergencia</h2>" +
      tabla(["Equipo", "Especificación", "Ubicación", "Inspección"], [
        ["Extintor", "ABC multipropósito 10 lb, cargado y señalizado", "Zona visible, a 1.50 m", "Mensual (Vigía)"],
        ["Botiquín", "Tipo A (Res. 705 de 2007)", "Recepción", "Mensual"],
        ["Alarma", "Timbre/sirena audible en todo el local", "Recepción", "Mensual"],
        ["Señalización", "Fotoluminiscente (evacuación, extintor, EPP)", "Todo el local", "Mensual"],
        ["Kit antiderrames", "Material absorbente + pala", "Cuarto de insumos", "Mensual"]
      ]) +
      "<h2>8. Reporte e investigación de incidentes y accidentes (Res. 1401 de 2007)</h2>" +
      "<p>Todo incidente o accidente se reporta de inmediato al Vigía SST. La investigación se realiza dentro de los <b>15 días siguientes</b>, por un equipo conformado por el Vigía y un testigo o conocedor del proceso, usando el formato del Anexo 3: datos del evento, descripción, causas inmediatas (actos y condiciones), causas básicas, medidas correctivas con responsable y fecha, y verificación de cierre. Las lecciones aprendidas se socializan con todo el personal en la siguiente reunión.</p>" +
      "<h2>9. Cronograma anual de actividades SST — año «AÑO»</h2>" +
      tabla(["Actividad", "Frecuencia", "Responsable", "Mes programado"], [
        ["Inspección de extintor, botiquín y equipos", "Mensual", "Vigía SST", "Todos"],
        ["Inducción / re-inducción de seguridad", "Al ingreso y anual", "Vigía SST", R6],
        ["Capacitación en manejo de químicos y EPP", "Anual", "Asesor / proveedor", R6],
        ["Capacitación en uso de extintores", "Anual", "Bomberos / asesor", R6],
        ["Simulacro de evacuación", "Anual", "Comandante brigada", R6],
        ["Lavado y desinfección de tanques", "Semestral", "Personal operativo", R6 + " / " + R6],
        ["Control de plagas con empresa", "«FRECUENCIA_FUMIGACION»", "«FUMIGADORA»", R6],
        ["Revisión por la dirección + actualización documental", "Anual", "Representante legal", R6]
      ]) +
      "<h2>10. Indicadores del sistema</h2>" +
      tabla(["Indicador", "Fórmula", "Meta", "Frecuencia"], [
        ["Accidentalidad", "N° de accidentes con incapacidad en el periodo", "0", "Trimestral"],
        ["Cobertura de inducción", "Inducciones firmadas ÷ personal operativo activo × 100", "100%", "Trimestral"],
        ["Cumplimiento del cronograma", "Actividades ejecutadas ÷ programadas × 100", "≥ 90%", "Semestral"]
      ]) +
      "<h2>11. Mejora continua (ciclo PHVA)</h2>" +
      "<p><b>Planear:</b> matriz de peligros, objetivos y cronograma. <b>Hacer:</b> controles, inducciones, inspecciones y capacitaciones. <b>Verificar:</b> indicadores, investigación de eventos y autoevaluación anual de estándares mínimos (Res. 0312 de 2019). <b>Actuar:</b> plan de mejoramiento con responsables y fechas, aprobado en la revisión anual por la dirección.</p>" +
      "<h2>12. Anexos</h2>" +
      "<p>Anexo 1: Matriz de peligros ampliada (esta tabla). Anexo 2: Registros de inducción firmados (SST-RG-07). Anexo 3: Formato de investigación de incidentes. Anexo 4: Registros de inspección mensual. Anexo 5: Pólizas de accidentes personales vigentes del personal.</p>" +
      CIERRE
  });

  /* ---------------- SST-RG-07 · Inducción ---------------- */
  docs.push({
    id: "induccion", codigo: "SST-RG-07", tipo: "Registro",
    titulo: "Inducción de Seguridad (terceros y contratistas)",
    para: "La firman los lavadores antes de empezar a trabajar.",
    html:
      "<h1>REGISTRO DE INDUCCIÓN Y RECOMENDACIONES DE SEGURIDAD (TERCEROS Y CONTRATISTAS)</h1>" +
      encabezado("SST-RG-07") +
      "<p><b>Fecha:</b> " + RAYA + " &nbsp;<b>Facilitador:</b> " + RAYA + " &nbsp;<b>Duración:</b> ____________</p>" +
      "<p><b>Objetivo:</b> socializar los riesgos prioritarios y las normas de seguridad a todo el personal externo que ingrese a «NOMBRE_NEGOCIO». <b>Periodicidad:</b> al ingreso de cada contratista y <b>re-inducción anual</b> (o cuando cambien equipos, productos o procesos).</p>" +
      "<h2>Temas tratados (marcar con X)</h2>" +
      "<ul class=\"marcar\">" +
      "<li>Riesgo químico: prohibido mezclar cloro + desengrasante (gases tóxicos). Guantes y gafas obligatorios. Ubicación de las FDS.</li>" +
      "<li>Riesgo locativo: precaución por pisos húmedos en la zona de lavado.</li>" +
      "<li>Riesgo eléctrico: inspección de cables de las hidrolavadoras antes de conectar; no manipular el tablero con manos mojadas.</li>" +
      "<li>Plan de emergencias: ubicación del extintor ABC, botiquín tipo A, alarma, ruta de evacuación y punto de encuentro («PUNTO_ENCUENTRO»).</li>" +
      "<li>Reporte de accidentes e incidentes: informar de inmediato al administrador — todo evento se investiga (Res. 1401 de 2007).</li>" +
      "<li>EPP obligatorio: botas antideslizantes, guantes de caucho, gafas de protección.</li>" +
      "<li>Manejo de residuos: código de colores y contenedor RESPEL.</li>" +
      "</ul>" +
      "<h2>Evaluación de comprensión (responde el asistente — mínimo 4 de 5 correctas)</h2>" +
      tabla(["Pregunta", "Respuesta (Sí/No)"], [
        ["¿Se puede mezclar cloro con desengrasante? (correcta: NO)", "&nbsp;"],
        ["¿Debo revisar el cable de la hidrolavadora antes de conectarla? (correcta: SÍ)", "&nbsp;"],
        ["¿Puedo operar equipos sin gafas y guantes? (correcta: NO)", "&nbsp;"],
        ["¿Sé dónde están el extintor y la salida? (correcta: SÍ)", "&nbsp;"],
        ["¿Debo reportar un incidente aunque nadie se haya lesionado? (correcta: SÍ)", "&nbsp;"]
      ]) +
      "<h2>Compromiso de los asistentes</h2>" +
      "<p>Con mi firma declaro que recibí y comprendí las normas de seguridad de «NOMBRE_NEGOCIO», aprobé la evaluación de comprensión, me comprometo a cumplir estos lineamientos y declaro contar con <b>Póliza de Accidentes Personales vigente</b> o cobertura de riesgos propia conforme a la ley.</p>" +
      tabla(["No.", "Nombre completo", "C.C.", "Rol", "Aprobó evaluación (Sí/No)", "Firma"],
        [1, 2, 3, 4, 5, 6].map(function (n) { return [String(n), "&nbsp;", "&nbsp;", "Contratista / Lavado", "&nbsp;", "&nbsp;"]; }), "t-llenar") +
      "<p><b>Certificación del facilitador:</b> certifico que en la fecha señalada socialicé los riesgos y normas de seguridad con el personal firmante y verifiqué la evaluación de comprensión.</p>" +
      "<p>Firma facilitador: " + RAYA + " &nbsp;C.C.: " + RAYA + "</p>" +
      CIERRE
  });

  /* ================= PLANILLAS (pestañas P- del libro) ================= */
  var planillas = [];

  var dias = [];
  for (var d = 1; d <= 31; d++) dias.push([String(d), "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"]);
  planillas.push({
    id: "p-control", codigo: "P-CONTROL", tipo: "Planilla",
    titulo: "Planilla · Control diario de aseo",
    para: "Se llena todos los días. Imprime una por mes.",
    html:
      encPlanilla("PLANILLA · CONTROL DIARIO DE ASEO") +
      "<p class=\"pl-nota\">Mes / Año: ____________.  CONVENCIONES: L = Limpieza (jabón) · D = Desinfección (cloro) · R = Recolección de residuos. Marcar la convención aplicada en cada casilla.</p>" +
      tabla(["Día", "Baño", "Pisos zona lavado", "Equipos", "Recepción", "Canecas / punto eco", "Cuarto insumos + trampa", "Responsable y firma"], dias, "t-llenar t-diaria") +
      "<p class=\"pl-pie\">Supervisión mensual — Responsable: ______________________  Firma: ______________________  Observaciones: ______________________</p>"
  });

  var filasTanques = [];
  for (var t = 0; t < 8; t++) filasTanques.push(["Tanque " + (t % 2 + 1), "&nbsp;", "Personal propio", "Hipoclorito de sodio", "5%", "30", "&nbsp;", "&nbsp;"]);
  planillas.push({
    id: "p-tanques", codigo: "P-TANQUES", tipo: "Planilla",
    titulo: "Planilla · Lavado de tanques",
    para: "Cada 6 meses, con foto. Solo si tienes tanque.",
    html:
      encPlanilla("PLANILLA · LAVADO DE TANQUES") +
      "<p class=\"pl-nota\">Capacidad: «TANQUES». Frecuencia: SEMESTRAL o cuando estén visiblemente sucios (Decreto 1575 de 2007). Producto: hipoclorito de sodio al 5%, 30 minutos de contacto. Registrar con evidencia fotográfica.</p>" +
      tabla(["Tanque", "Fecha lavado", "Realizado por", "Producto", "Concentr.", "Tiempo (min)", "Próxima fecha", "Firma"], filasTanques, "t-llenar") +
      "<p class=\"pl-pie\">Supervisión semestral — Responsable: ______________________  Firma: ______________________</p>"
  });

  planillas.push({
    id: "p-inventario", codigo: "P-INVENTARIO", tipo: "Planilla",
    titulo: "Planilla · Inventario de químicos",
    para: "La lista de químicos que tienes, con su hoja de seguridad.",
    html:
      encPlanilla("PLANILLA · INVENTARIO DE QUÍMICOS") +
      "<p class=\"pl-nota\">Proveedor: «PROVEEDOR_QUIMICOS».  Fecha de corte: ____________.  Ajustar a los productos reales del establecimiento; todo producto debe tener su FDS.</p>" +
      tabla(["Nombre comercial", "Composición (ver FDS)", "Estado", "Presentación", "Peligro", "¿FDS? (Sí/No)"], [
        ["Shampoo pH neutro", "Tensoactivos aniónicos biodegradables", "Líquido", "Garrafa 20 L", "No peligroso (GHS)", "&nbsp;"],
        ["Desengrasante activo", "Tensoactivos base agua, pH 9-10", "Líquido", "Garrafa 20 L", "Irritante (piel/ojos)", "&nbsp;"],
        ["Hipoclorito de sodio (cloro)", "Desinfectante oxidante, pH ~12", "Líquido", "Galón", "Corrosivo / oxidante", "&nbsp;"],
        ["Cera porcelanizadora", "Polímeros sintéticos, ceras", "Líq. cremoso", "Galón 4 L", "No peligroso (GHS)", "&nbsp;"],
        ["Restaurador partes negras", "Ceras naturales, polímeros", "Pasta", "1 kg", "No peligroso (GHS)", "&nbsp;"],
        ["Restaurador de motores", "Ceras vegetales, aceites naturales", "Líquido", "Galón 4 L", "No peligroso (GHS)", "&nbsp;"],
        ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"],
        ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"]
      ], "t-llenar")
  });

  planillas.push({
    id: "p-mantenim", codigo: "P-MANTENIM", tipo: "Planilla",
    titulo: "Planilla · Mantenimiento de equipos",
    para: "Cada arreglo o revisión de la hidrolavadora y demás equipos.",
    html:
      encPlanilla("PLANILLA · MANTENIMIENTO DE EQUIPOS") +
      "<p class=\"pl-nota\">Equipos registrados: «EQUIPOS». Registrar cada mantenimiento preventivo o correctivo y guardar las facturas como soporte (soporta el hallazgo de registros de mantenimiento en visitas de sanidad).</p>" +
      tabla(["Fecha", "Equipo", "Marca / modelo", "Tipo Mto. (P/C)", "Descripción del trabajo", "Técnico / firma", "Próximo Mto."], vacias(16, 7), "t-llenar") +
      "<p class=\"pl-pie\">P = Preventivo · C = Correctivo</p>"
  });

  planillas.push({
    id: "p-ingreso", codigo: "P-INGRESO", tipo: "Planilla",
    titulo: "Planilla · Ingreso de insumos",
    para: "Cada vez que llega un químico nuevo.",
    html:
      encPlanilla("PLANILLA · INGRESO DE INSUMOS") +
      "<p class=\"pl-nota\">Registro de ingreso y trazabilidad de insumos químicos — Ley 55 de 1993, art. 8. Verificar en cada llegada que el producto venga etiquetado.</p>" +
      tabla(["Fecha llegada", "Producto", "Marca / fabricante", "Lote (si aplica)", "Vencimiento", "¿Etiqueta? (Sí/No)", "Firma recibe"], vacias(17, 7), "t-llenar") +
      "<p class=\"pl-pie\">Responsable: ______________________  Firma: ______________________</p>"
  });

  planillas.push({
    id: "p-matriz", codigo: "P-MATRIZ", tipo: "Planilla",
    titulo: "Matriz de compatibilidad (SST-RG-06)",
    para: "Se imprime y se pega en el cuarto de insumos.",
    html:
      encPlanilla("MATRIZ DE COMPATIBILIDAD") +
      "<p class=\"pl-nota\"><b>IMPRIMIR Y PEGAR VISIBLE EN EL CUARTO DE INSUMOS.  REGLA #1: NUNCA MEZCLAR CLORO CON DESENGRASANTE NI CON ACEITES.</b></p>" +
      tabla(["Producto A", "Producto B", "¿Compatible?", "Razón / riesgo"], [
        ["CLORO", "DESENGRASANTE", "<b>NO (PELIGRO)</b>", "El cloro es oxidante fuerte: la mezcla genera GASES TÓXICOS. Mantener SIEMPRE separados."],
        ["CLORO", "ACEITES / GRASAS", "<b>NO (PELIGRO)</b>", "Reacción peligrosa: calor excesivo y gases tóxicos. Nunca almacenar juntos."],
        ["CLORO", "SHAMPOO", "CON CUIDADO", "Mejor separados: el cloro pierde efecto desinfectante. Sin riesgo de explosión."],
        ["DESENGRASANTE", "SHAMPOO", "SÍ", "Base agua con tensoactivos compatibles; se pueden mezclar en balde."],
        ["DESENGRASANTE", "ACEITES / CERAS", "SÍ", "Sin reacción peligrosa; misma zona de almacenamiento."],
        ["SHAMPOO", "ACEITES / CERAS", "SÍ", "Sin reacción peligrosa."],
        ["RESTAURADORES", "TODOS (excepto cloro)", "SÍ", "Base agua / ceras naturales; no generan reacciones peligrosas."]
      ]) +
      "<p class=\"pl-pie\">Aunque el desengrasante sea base agua y NO inflamable, su mezcla con cloro sigue siendo peligrosa por generación de gases tóxicos.</p>"
  });

  planillas.push({
    id: "p-capacita", codigo: "P-CAPACITA", tipo: "Planilla",
    titulo: "Capacitación en químicos (SST-RG-08)",
    para: "Firma de quienes recibieron la charla de químicos.",
    html:
      encPlanilla("PLANILLA · CAPACITACIÓN QUÍMICOS") +
      "<p class=\"pl-nota\">Fecha: ______________  Facilitador: ______________________  Duración: ____________  (Ley 55 de 1993, art. 12-17)</p>" +
      "<h2>Temas tratados (marcar con X)</h2>" +
      "<ul class=\"marcar\">" +
      "<li>Identificación de los productos químicos del establecimiento.</li>" +
      "<li>Lectura de Fichas de Datos de Seguridad (FDS).</li>" +
      "<li>Reglas de oro: no re-envasar, no mezclar cloro con desengrasante.</li>" +
      "<li>Matriz de compatibilidad y almacenamiento seguro (cloro SEPARADO).</li>" +
      "<li>Dosificación correcta de cada producto.</li>" +
      "<li>Primeros auxilios (ojos, piel, inhalación, ingestión) y derrames.</li>" +
      "<li>Uso correcto de EPP (guantes, gafas, botas).</li>" +
      "</ul>" +
      "<h2>Asistentes</h2>" +
      tabla(["No.", "Nombre completo", "C.C.", "Cargo / rol", "¿Leyó FDS?", "Firma"],
        [1, 2, 3, 4, 5, 6].map(function (n) { return [String(n), "&nbsp;", "&nbsp;", "Operativo / contratista", "&nbsp;", "&nbsp;"]; }), "t-llenar") +
      "<p class=\"pl-pie\">Firma facilitador: ______________________  C.C.: ______________________</p>"
  });

  window.CARPETA_PLANTILLAS = docs.concat(planillas);
})();
