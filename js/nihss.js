// js/nihss.js
import { CONFIG_CLINICA } from './config-clinica.js';
import { registrarEnHistorial, mostrarAlerta } from './utilidades.js';

// Base de datos de los 11 ítems de la escala oficial (con sus 15 sub-divisiones) - ¡Limpia de marcas de citas!
const ITEMS_NIHSS = [
    {
        id: "conciencia1a",
        titulo: "1a. Nivel de Conciencia (Alerta)",
        instrucciones: "Evaluar nivel de respuesta general. Se puntúa 3 (coma) únicamente si el paciente no realiza movimientos voluntarios ni de respuesta ante estímulos dolorosos (salvo reflejos).",
        opciones: [
            { valor: 0, texto: "0 - Alerta (Responde con prontitud)" },
            { valor: 1, texto: "1 - Somnoliento (Despierta con estímulos mínimos)" },
            { valor: 2, texto: "2 - Obnubilado / Estuporoso (Requiere estímulos vigorosos o dolorosos)" },
            { valor: 3, texto: "3 - Coma (Solo respuestas reflejas o nula respuesta)" }
        ]
    },
    {
        id: "conciencia1b",
        titulo: "1b. Nivel de Conciencia (Preguntas)",
        instrucciones: "Preguntar: ¿Qué mes es? y ¿Qué edad tiene? Evaluar solo el primer intento. Afásicos o intubados se puntúan según la guía.",
        opciones: [
            { valor: 0, texto: "0 - Responde correctamente ambas preguntas" },
            { valor: 1, texto: "1 - Responde correctamente una sola pregunta (o con IOT, barrera de idioma)" },
            { valor: 2, texto: "2 - No responde ninguna correctamente (afásicos, estuporosos o mudos)" }
        ]
    },
    {
        id: "conciencia1c",
        titulo: "1c. Nivel de Conciencia (Órdenes)",
        instrucciones: "Pedir que: 1. Cierre y abra los ojos. 2. Apriete y suelte la mano. Adaptar la orden si hay limitación física.",
        opciones: [
            { valor: 0, texto: "0 - Realiza ambas órdenes correctamente" },
            { valor: 1, texto: "1 - Realiza una sola orden correctamente" },
            { valor: 2, texto: "2 - No realiza ninguna orden correctamente" }
        ]
    },
    {
        id: "mirada",
        titulo: "2. Mirada Horizontal conjugada",
        instrucciones: "Evaluar movimientos oculares horizontales pidiendo que siga un objeto. Si hay ceguera o trauma, evaluar movimientos reflejos (óculo-cefálicos).",
        opciones: [
            { valor: 0, texto: "0 - Normal" },
            { valor: 1, texto: "1 - Parálisis parcial de la mirada horizontal (vencible por reflejo)" },
            { valor: 2, texto: "2 - Desviación forzada de la mirada (no vencible por reflejo)" }
        ]
    },
    {
        id: "visual",
        titulo: "3. Campo Visual",
        instrucciones: "Explorar campos visuales por confrontación. Si hay extinción al estímulo simultáneo bilateral se marca 1 pto.",
        opciones: [
            { valor: 0, texto: "0 - Sin pérdida visual" },
            { valor: 1, texto: "1 - Hemianopsia parcial o cuadrantanopsia" },
            { valor: 2, texto: "2 - Hemianopsia completa unilateral" },
            { valor: 3, texto: "3 - Hemianopsia bilateral (Ceguera cortical o ciego bilateral)" }
        ]
    },
    {
        id: "paralisisfacial",
        titulo: "4. Parálisis Facial",
        instrucciones: "Pedir que enseñe los dientes, levante las cejas y sople. En poco reactivos, evaluar simetría de mueca al dolor.",
        opciones: [
            { valor: 0, texto: "0 - Normal (Movimientos simétricos)" },
            { valor: 1, texto: "1 - Parálisis menor (asimetría leve, borramiento del surco)" },
            { valor: 2, texto: "2 - Parálisis parcial (parálisis de la parte inferior de la cara)" },
            { valor: 3, texto: "3 - Parálisis completa unilateral o bilateral" }
        ]
    },
    {
        id: "brazod",
        titulo: "5a. Motor de Miembro Superior Derecho",
        instrucciones: "Extender el brazo a 90° (sentado) o 45° (decúbito) con palmas abajo. Evaluar si claudica antes de 10 segundos.",
        opciones: [
            { valor: 0, texto: "0 - No cae (mantiene los 10 segundos en posición)" },
            { valor: 1, texto: "1 - Cae lentamente antes de 10s (sin tocar la cama)" },
            { valor: 2, texto: "2 - Esfuerzo contra gravedad, pero claudica antes de los 10s y toca la cama" },
            { valor: 3, texto: "3 - Movimiento sin vencer gravedad (desliza sobre la cama)" },
            { valor: 4, texto: "4 - Ausencia completa de movimiento" },
            { valor: 9, texto: "9 - Imposible de valorar (Amputación, fusión articular)" }
        ]
    },
    {
        id: "brazoi",
        titulo: "5b. Motor de Miembro Superior Izquierdo",
        instrucciones: "Extender brazo izquierdo a 90° (sentado) o 45° (decúbito). Evaluar si claudica antes de 10 segundos.",
        opciones: [
            { valor: 0, texto: "0 - No cae (mantiene los 10 segundos)" },
            { valor: 1, texto: "1 - Cae lentamente antes de 10s (sin tocar la cama)" },
            { valor: 2, texto: "2 - Esfuerzo contra gravedad, pero claudica y toca la cama antes de 10s" },
            { valor: 3, texto: "3 - Movimiento sin vencer gravedad" },
            { valor: 4, texto: "4 - Ausencia completa de movimiento" },
            { valor: 9, texto: "9 - Imposible de valorar (Amputación, fusión articular)" }
        ]
    },
    {
        id: "piernad",
        titulo: "6a. Motor de Miembro Inferior Derecho",
        instrucciones: "En decúbito supino, elevar la pierna derecha a 30°. Evaluar si claudica o cae antes de 5 segundos.",
        opciones: [
            { valor: 0, texto: "0 - No cae (mantiene los 5 segundos en posición)" },
            { valor: 1, texto: "1 - Cae lentamente antes de los 5s (sin tocar la cama)" },
            { valor: 2, texto: "2 - Esfuerzo contra gravedad, pero claudica antes de 5s" },
            { valor: 3, texto: "3 - Movimiento sin vencer gravedad" },
            { valor: 4, texto: "4 - Ausencia completa de movimiento" },
            { valor: 9, texto: "9 - Imposible de valorar (Amputación, fusión articular)" }
        ]
    },
    {
        id: "piernai",
        titulo: "6b. Motor de Miembro Inferior Izquierdo",
        instrucciones: "En decúbito supino, elevar pierna izquierda a 30°. Evaluar si claudica o cae antes de 5 segundos.",
        opciones: [
            { valor: 0, texto: "0 - No cae (mantiene los 5 segundos)" },
            { valor: 1, texto: "1 - Cae lentamente antes de los 5s (sin tocar la cama)" },
            { valor: 2, texto: "2 - Esfuerzo contra gravedad, pero claudica antes de 5s" },
            { valor: 3, texto: "3 - Movimiento sin vencer gravedad" },
            { valor: 4, texto: "4 - Ausencia completa de movimiento" },
            { valor: 9, texto: "9 - Imposible de valorar (Amputación, fusión articular)" }
        ]
    },
    {
        id: "ataxia",
        titulo: "7. Ataxia de Extremidades",
        instrucciones: "Pruebas dedo-nariz y talón-rodilla bilateral. Marcar ataxia solo si es desproporcionada a la debilidad muscular.",
        opciones: [
            { valor: 0, texto: "0 - No ataxia (o paciente paralizado / no comprende)" },
            { valor: 1, texto: "1 - Ataxia presente en una extremidad" },
            { valor: 2, texto: "2 - Ataxia presente en dos o más extremidades" },
            { valor: 9, texto: "9 - Imposible de valorar (Amputación o fusión articular)" }
        ]
    },
    {
        id: "sensitivo",
        titulo: "8. Sensibilidad",
        instrucciones: "Evaluar respuesta al pinchazo y estímulo táctil. En pacientes comatosos (GCS 3) o cuadriplejías se asigna un 2.",
        opciones: [
            { valor: 0, texto: "0 - Sensibilidad Normal" },
            { valor: 1, texto: "1 - Déficit sensitivo leve o moderado (siente menos nítido o agudo)" },
            { valor: 2, texto: "2 - Déficit total o bilateral (no siente el estímulo táctil o doloroso)" }
        ]
    },
    {
        id: "lenguaje",
        titulo: "9. Lenguaje (Afasia)",
        instrucciones: "Pedir que describa una lámina o lea palabras simples. En comas se adjudica directamente un 3.",
        opciones: [
            { valor: 0, texto: "0 - Normal (Sin afasia)" },
            { valor: 1, texto: "1 - Afasia leve a moderada (comprensión o expresión algo limitada)" },
            { valor: 2, texto: "2 - Afasia grave (comprensión muy reducida, imposible comunicación coherente)" },
            { valor: 3, texto: "3 - Afasia global, mutismo o paciente en coma" }
        ]
    },
    {
        id: "disartria",
        titulo: "10. Disartria (Articulación de la palabra)",
        instrucciones: "Pedir que lea o repita una lista de palabras. Si está intubado (IOT) o tiene barreras físicas, puntuar 9.",
        opciones: [
            { valor: 0, texto: "0 - Articulación normal" },
            { valor: 1, texto: "1 - Disartria leve o moderada (pronunciación arrastrada pero inteligible)" },
            { valor: 2, texto: "2 - Disartria grave (ininteligible, mudez sin afasia)" },
            { valor: 9, texto: "9 - Barrera física o paciente intubado (IOT)" }
        ]
    },
    {
        id: "extincion",
        titulo: "11. Extinción e Inatención (Negligencia)",
        instrucciones: "Se deduce de las pruebas previas. Evaluar si ignora estímulos del lado contralateral a la lesión de forma táctil, visual o espacial.",
        opciones: [
            { valor: 0, texto: "0 - Normal (Sin inatención)" },
            { valor: 1, texto: "1 - Inatención parcial en una modalidad (visual, táctil o auditiva)" },
            { valor: 2, texto: "2 - Inatención total o Extinción en más de una modalidad" }
        ]
    }
];

let respuestasNihss = {};

// Inicializador del módulo (Correcto)
export function inicializarNihss() {
    const contenedor = document.getElementById("nihss-carousel-container");
    if (!contenedor) return;

    // Recupera respuestas anteriores o carga el valor por defecto configurado
    respuestasNihss = JSON.parse(localStorage.getItem("ultimo_nihss")) || { ...CONFIG_CLINICA.nihss.VALORES_BASE };
    dibujarTarjetasClinicas(contenedor);
    calcularPuntajeNihss(false);
}

function dibujarTarjetasClinicas(contenedor) {
    contenedor.innerHTML = "";

    ITEMS_NIHSS.forEach((item, index) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-clinica-nihss";
        tarjeta.style.border = "1px solid #e2e8f0";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.padding = "15px";
        tarjeta.style.marginBottom = "20px";
        tarjeta.style.background = "#ffffff";
        tarjeta.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";

        let opcionesHTML = "";
        item.opciones.forEach(op => {
            const esSeleccionado = respuestasNihss[item.id] === op.valor ? "checked" : "";
            opcionesHTML += `
                <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #edf2f7; border-radius: 6px; margin-bottom: 8px; cursor: pointer; transition: background 0.2s;">
                    <input type="radio" name="${item.id}" value="${op.valor}" ${esSeleccionado} style="margin-right: 12px; transform: scale(1.1);" onchange="registrarRespuestaNIHSS('${item.id}', ${op.valor})">
                    <span style="color: #2d3748; font-size: 0.95rem;">${op.texto}</span>
                </label>
            `;
        });

        tarjeta.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 8px; margin-bottom: 10px;">
                <h4 style="margin: 0; color: #2b6cb0; font-size: 1.1rem; font-weight: bold;">${item.titulo}</h4>
                <span style="background: #ebf8ff; color: #2b6cb0; font-size: 0.8rem; font-weight: bold; padding: 3px 8px; border-radius: 12px;">Paso ${index + 1}/${ITEMS_NIHSS.length}</span>
            </div>
            <p style="margin: 0 0 12px 0; color: #4a5568; font-size: 0.88rem; line-height: 1.4; border-left: 3px solid #cbd5e0; padding-left: 8px; font-style: italic;">
                <strong>Instrucciones:</strong> ${item.instrucciones}
            </p>
            <div class="grupo-opciones-radio" style="display: flex; flex-direction: column;">
                ${opcionesHTML}
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Vinculada de forma global para capturar cada click dinámico
window.registrarRespuestaNIHSS = function(itemId, valor) {
    respuestasNihss[itemId] = valor;
    localStorage.setItem("ultimo_nihss", JSON.stringify(respuestasNihss));
    calcularPuntajeNihss(true);
};

function calcularPuntajeNihss(guardarHistorial = true) {
    let total = 0;
    let itemsRespondidos = 0;

    ITEMS_NIHSS.forEach(item => {
        const val = respuestasNihss[item.id];
        if (val !== undefined && val !== null) {
            // Un valor de 9 indica "no valorable" en la escala oficial y no acumula puntos en el total[cite: 11]
            if (val !== 9) {
                total += val;
            }
            itemsRespondidos++;
        }
    });

    // Actualizar barra de porcentaje
    const porcentajeProgreso = Math.round((itemsRespondidos / ITEMS_NIHSS.length) * 100);
    const barra = document.getElementById("nihss-progreso-barra");
    if (barra) barra.style.width = `${porcentajeProgreso}%`;

    // Actualizar puntajes en pantalla
    const scoreText = document.getElementById("nihss-score");
    const homeText = document.getElementById("home-val-nihss");
    if (scoreText) scoreText.innerText = `${total}`;
    if (homeText) homeText.innerText = `${total}`;

    // Determinar la severidad clínica e interpretación didáctica
    let tituloInterpretacion = "Examen en curso...";
    let descripcionInterpretacion = "Complete todos los ítems para procesar el algoritmo de simulación clínica.";
    let tipoAlerta = "verde"; // verde (fisiológico), amarillo (moderado/alerta), rojo (grave)[cite: 8]

    if (itemsRespondidos === ITEMS_NIHSS.length) {
        if (total === 0) {
            tituloInterpretacion = "Sin déficit neurológico (0 puntos)";
            descripcionInterpretacion = "Paciente clínicamente normal en este momento. Sin signos focalizados de compromiso de hemisferio cerebral.";
            tipoAlerta = "verde";
        } else if (total <= CONFIG_CLINICA.nihss.UMBRAL_LEVE) {
            tituloInterpretacion = "Ictus Leve (1 - 6 puntos)";
            descripcionInterpretacion = "Déficit menor. Alta probabilidad de recuperación funcional satisfactoria. Mantener monitoreo clínico estrecho.";
            tipoAlerta = "amarillo";
        } else if (total < CONFIG_CLINICA.nihss.UMBRAL_CRITICO) {
            tituloInterpretacion = "Ictus Moderado (7 - 15 puntos)";
            descripcionInterpretacion = "Compromiso neurológico establecido. Requiere valoración inmediata por neurología/equipo de stroke y análisis de terapias de reperfusión (trombolisis/trombectomía).";
            tipoAlerta = "rojo";
        } else {
            tituloInterpretacion = "Ictus Severo / Crítico (≥ 16 puntos)";
            descripcionInterpretacion = "Déficit neurológico severo masivo. Alto riesgo de complicaciones agudas y mortalidad. Evaluar aseguramiento de vía aérea y monitorización intensiva de la presión de perfusión cerebral.";
            tipoAlerta = "rojo";
        }

        if (guardarHistorial) {
            registrarEnHistorial("nihss", total);
        }
    }

    const resTitulo = document.getElementById("nihss-interpretacion-titulo");
    const resTxt = document.getElementById("nihss-interpretacion-txt");
    if (resTitulo) resTitulo.innerText = tituloInterpretacion;
    if (resTxt) resTxt.innerText = descripcionInterpretacion;

    // Disparar semáforo de alertas generales de tu plataforma[cite: 8]
    mostrarAlerta(
        "alerta-nihss", 
        `NIHSS: ${total} Puntos - ${tituloInterpretacion}`, 
        tipoAlerta, 
        itemsRespondidos < ITEMS_NIHSS.length ? "Evaluación parcial incompleta." : "Simulador NIHSS procesado.",
        "nihss"
    );
}

// Reseteador corregido
export function resetNihss() {
    respuestasNihss = { ...CONFIG_CLINICA.nihss.VALORES_BASE };
    localStorage.removeItem("ultimo_nihss");
    localStorage.removeItem("historial_nihss");
    
    const contenedor = document.getElementById("nihss-carousel-container");
    if (contenedor) dibujarTarjetasClinicas(contenedor);
    calcularPuntajeNihss(false);
}