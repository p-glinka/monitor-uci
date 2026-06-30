// ⚡ MÓDULO DE SIMULACIÓN DE RITMOS CARDÍACOS AVANZADO (NATIVO CANVAS)

let canvas, ctx;
let x = 0; 
let ultimaY = 150; 
let ritmoActual = 'sinusal';
let iteracion = 0;
let animacionId = null;

// Biblioteca completa de ritmos con enfoque académico de enfermería
const infoRitmos = {
    sinusal: {
        nombre: "RITMO SINUSAL NORMAL",
        fc: "75",
        desc: "<strong>Descripción Clínica:</strong> Conducción fisiológica normal del nodo sinusal. Frecuencia regular (60-100 lpm). Cada complejo QRS está precedido por una onda P normal y constante."
    },
    bradicardia: {
        nombre: "BRADICARDIA SINUSAL",
        fc: "45",
        desc: "<strong>Descripción Clínica:</strong> Ritmo de origen sinusal pero con una frecuencia cardíaca inferior a 60 lpm. Morfología de ondas normal. Común en atletas o por aumento del tono vagal, fármacos beta-bloqueantes o disfunción del nodo."
    },
    taquicardia: {
        nombre: "TAQUICARDIA SINUSAL",
        fc: "130",
        desc: "<strong>Descripción Clínica:</strong> Ritmo sinusal regular con frecuencia cardíaca superior a 100 lpm. Respuesta fisiológica común ante fiebre, dolor, hipovolemia, anemia o estimulación simpática. Ondas P y QRS normales pero muy juntos."
    },
    flutter: {
        nombre: "FLUTTER ATRIAL (ALETEO AURICULAR)",
        fc: "88",
        desc: "<strong>Descripción Clínica:</strong> Arritmia supraventricular por macro-reentrada auricular. Se caracteriza por la presencia de ondas de activación auricular rápidas y regulares en forma de <strong>'dientes de sierra' (ondas F)</strong>, típicamente a una frecuencia auricular de 250-350 lpm, con un bloqueo de conducción AV (ej. 3:1 o 4:1)."
    },
    fa: {
        nombre: "FIBRILACIÓN ATRIAL (FA)",
        fc: "124",
        desc: "<strong>Descripción Clínica:</strong> Activación auricular caótica y desorganizada sin contracción auricular efectiva. Ausencia de ondas P (reemplazadas por ondas de fibrilación 'f' irregulares). Respuesta ventricular (intervalos R-R) <strong>completamente irregular</strong>."
    },
    tsv: {
        nombre: "TAQUICARDIA SUPRAVENTRICULAR (TSV)",
        fc: "185",
        desc: "<strong>Descripción Clínica:</strong> Taquicardia de inicio y fin súbito originada por encima del haz de His (frecuentemente por reentrada nodal). Frecuencia muy elevada (150-250 lpm) con ritmo regular y <strong>complejos QRS angostos</strong>. La onda P suele quedar oculta o retrógrada."
    },
    tv: {
        nombre: "TAQUICARDIA VENTRICULAR (TV MONOMÓRFICA)",
        fc: "160",
        desc: "<strong>Descripción Clínica:</strong> Sucesión de tres o más complejos de origen ventricular. Ritmo regular con <strong>complejos QRS anchos (>0.12s) y aberrantes</strong>. Emergencia médica por alto riesgo de descompensación hemodinámica o degradación a FV."
    },
    torsades: {
        nombre: "TORSADES DE POINTES (TV POLIMÓRFICA)",
        fc: "210",
        desc: "<strong>Descripción Clínica:</strong> Forma específica de taquicardia ventricular polimórfica asociada a la prolongación del intervalo QT. Los complejos QRS anchos muestran una <strong>rotación continua del eje eléctrico</strong>, pareciendo girar o 'retorcerse' alrededor de la línea isoeléctrica. ¡Altamente inestable!"
    },
    fv: {
        nombre: "FIBRILACIÓN VENTRICULAR (FV)",
        fc: "0",
        desc: "<strong>Descripción Clínica:</strong> Actividad eléctrica ventricular totalmente caótica y amorfa. No existen complejos QRS ni ondas definibles. Provoca ausencia de gasto cardíaco y pulso. <strong>Paro Cardiorrespiratorio - Ritmo Desfibrilable</strong>."
    },
    asistolia: {
        nombre: "ASISTOLIA",
        fc: "0",
        desc: "<strong>Descripción Clínica:</strong> Ausencia completa de actividad eléctrica en el miocardio ventricular (línea plana). Confirmar conexiones y derivadas. Iniciar compresiones e insufleciones (RCP) y administración de Adrenalina según protocolo."
    }
};

export function inicializarECG() {
    canvas = document.getElementById('canvas-ecg');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    if (animacionId) cancelAnimationFrame(animacionId);
    dibujarCuadricula();
    renderBarridoECG();
}

function dibujarCuadricula() {
    ctx.strokeStyle = '#0d2411';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < canvas.width; i += 15) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 15) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
    }
}

// 🧠 CALCULADOR DE VOLTAJE: Simulación electrofisiológica exacta
function calcularVoltajeECG(tipo, paso) {
    const centro = canvas.height / 2;
    
    switch (tipo) {
        case 'sinusal': {
            let p = paso % 110; // Ciclo normal estándar
            if (p > 15 && p < 30) return centro - 6 * Math.sin((p - 15) * Math.PI / 15); // P
            if (p >= 35 && p < 38) return centro + (p - 35) * 6; // Q
            if (p >= 38 && p < 42) return centro - 85 * Math.sin((p - 38) * Math.PI / 4); // R
            if (p >= 42 && p < 46) return centro + 22 * Math.sin((p - 42) * Math.PI / 4); // S
            if (p > 65 && p < 85) return centro - 12 * Math.sin((p - 65) * Math.PI / 20); // T
            return centro;
        }
        case 'bradicardia': {
            let p = paso % 190; // Ciclo alargado deliberadamente (Frecuencia baja)
            if (p > 30 && p < 45) return centro - 6 * Math.sin((p - 30) * Math.PI / 15); // P
            if (p >= 50 && p < 53) return centro + (p - 50) * 6; // Q
            if (p >= 53 && p < 57) return centro - 85 * Math.sin((p - 53) * Math.PI / 4); // R
            if (p >= 57 && p < 61) return centro + 22 * Math.sin((p - 57) * Math.PI / 4); // S
            if (p > 80 && p < 100) return centro - 12 * Math.sin((p - 80) * Math.PI / 20); // T
            return centro;
        }
        case 'taquicardia': {
            let p = paso % 60; // Ciclo muy corto y veloz (Frecuencia alta)
            if (p > 5 && p < 15) return centro - 6 * Math.sin((p - 5) * Math.PI / 10); // P
            if (p >= 18 && p < 21) return centro + (p - 18) * 6; // Q
            if (p >= 21 && p < 25) return centro - 85 * Math.sin((p - 21) * Math.PI / 4); // R
            if (p >= 25 && p < 29) return centro + 22 * Math.sin((p - 25) * Math.PI / 4); // S
            if (p > 35 && p < 50) return centro - 12 * Math.sin((p - 35) * Math.PI / 15); // T
            return centro;
        }
        case 'flutter': {
            let p = paso % 80; 
            // Ondas F en serrucho continuas antes del QRS (Frecuencia auricular alta)
            if (p < 55) {
                return centro - 10 * ((paso % 15) / 15) + 5; 
            }
            // Complejo QRS conducido de forma regular (Bloqueo)
            if (p >= 55 && p < 58) return centro + (p - 55) * 6;
            if (p >= 58 && p < 62) return centro - 85 * Math.sin((p - 58) * Math.PI / 4);
            if (p >= 62 && p < 66) return centro + 22 * Math.sin((p - 62) * Math.PI / 4);
            return centro;
        }
        case 'fa': {
            // Línea de base temblorosa por micro-ruido caótico auricular
            let fWave = 4 * Math.sin(paso * 0.9) * Math.cos(paso * 0.4);
            // El QRS se dispara de forma completamente asincrónica (Simulación de R-R variable)
            let disparaQRS = (paso % 82 === 0 || paso % 143 === 0 || paso % 225 === 0 || paso % 291 === 0);
            if (disparaQRS) {
                return centro - 80; 
            }
            return centro + fWave;
        }
        case 'tsv': {
            let p = paso % 42; // Frecuencia extrema, complexes pegados
            if (p >= 5 && p < 8) return centro + (p - 5) * 6; // Q
            if (p >= 8 && p < 12) return centro - 85 * Math.sin((p - 8) * Math.PI / 4); // R
            if (p >= 12 && p < 16) return centro + 22 * Math.sin((p - 12) * Math.PI / 4); // S
            if (p >= 16 && p < 32) return centro - 15 * Math.sin((p - 16) * Math.PI / 16); // T gigante fusionada
            return centro;
        }
        case 'tv': {
            // Complejos ventriculares monomórficos anchos y profundos
            return centro - 65 * Math.sin(paso * Math.PI / 11);
        }
        case 'torsades': {
            // Taquicardia helicoidal: el voltaje se modula sinusoidalmente en el tiempo
            let modulacionEje = Math.sin(paso * 0.025); 
            let qrsAncho = 65 * Math.sin(paso * Math.PI / 9);
            return centro - (qrsAncho * modulacionEje);
        }
        case 'fv': {
            // Ondas caóticas amorfas desorganizadas de baja y alta amplitud
            return centro - (28 * Math.sin(paso * 0.35) + 14 * Math.cos(paso * 0.8) * Math.sin(paso * 0.15));
        }
        case 'asistolia': {
            // Línea isoeléctrica con un mínimo ruido parásito ambiental
            return centro + (0.3 * Math.sin(paso * 0.15));
        }
        default:
            return centro;
    }
}

function renderBarridoECG() {
    if (!canvas || !ctx) return;

    iteracion++;
    
    // Barrido estilo fósforo de monitor UCI
    ctx.fillStyle = '#050f05';
    ctx.fillRect(x, 0, 15, canvas.height);
    
    ctx.strokeStyle = '#0d2411';
    ctx.lineWidth = 0.5;
    if (x % 15 === 0) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }

    let actualY = calcularVoltajeECG(ritmoActual, iteracion);

    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 4;
    ctx.shadowColor = '#00ff41';
    
    ctx.beginPath();
    ctx.moveTo(x - 1, ultimaY);
    ctx.lineTo(x, actualY);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    ultimaY = actualY;
    x++;

    if (x >= canvas.width) x = 0;

    animacionId = requestAnimationFrame(renderBarridoECG);
}

window.cambiarRitmoECG = function(tipo, elemento) {
    if (!infoRitmos[tipo]) return;
    
    ritmoActual = tipo;

    const grupo = elemento.closest('.grupo-opciones');
    if (grupo) {
        grupo.querySelectorAll('.btn-opcion').forEach(btn => btn.classList.remove('active'));
        elemento.classList.add('active');
    }

    document.getElementById('monitor-fc').innerText = infoRitmos[tipo].fc;
    document.getElementById('monitor-estado').innerText = infoRitmos[tipo].nombre;
    document.getElementById('info-clinica-ecg').innerHTML = infoRitmos[tipo].desc;

    // Sincronizar el Badge del Home con el estado clínico
    const badgeHome = document.getElementById('home-val-ecg');
    if (badgeHome) {
        if (tipo === 'sinusal') badgeHome.innerText = '🟢';
        else if (tipo === 'bradicardia' || tipo === 'taquicardia') badgeHome.innerText = '🟡';
        else if (tipo === 'asistolia' || tipo === 'fv') badgeHome.innerText = '💀';
        else badgeHome.innerText = '🔴';
    }
    // Registrar la selección del ritmo en Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', 'seleccion_ritmo', {
            'ritmo_clinico': tipo,
            'nombre_ritmo': infoRitmos[tipo].nombre
        });
    }
}
// =========================================================================================
//  MINI-MONITOR ECG EN VIVO PARA EL BOTÓN DEL HOME (RENDERIZADO CONTINUO INTEGRADO)
// Dibuja un trazado fisiológico sutil en miniatura usando la misma tasa de refresco
// =========================================================================================

let miniCanvas = null;
let miniCtx = null;
let miniX = 0;
let miniUltimaY = 40; // Centrado verticalmente en base al tamaño del botón
let miniIteracion = 0;

// Esta función será llamada desde el inicio para activar el motor gráfico en el botón
// =========================================================================================
//  MOTOR GRÁFICO SECUNDARIO: RENDERIZADOR ASINCRÓNICO PARA EL MENÚ PRINCIPAL
// =========================================================================================

function inicializarMiniECGHome() {
    miniCanvas = document.getElementById('mini-canvas-ecg-home');
    if (!miniCanvas) return;

    miniCtx = miniCanvas.getContext('2d');
    
    // Si el offset es 0 por estar oculto, le asignamos un tamaño base por defecto
    miniCanvas.width = miniCanvas.offsetWidth || 300;
    miniCanvas.height = miniCanvas.offsetHeight || 140;

    // Sincronizamos la variable de altura inicial a la mitad exacta del lienzo
    miniUltimaY = miniCanvas.height / 2;

    // Encendemos el ciclo de animación a 60 FPS
    renderMiniBarridoECG();
}

function renderMiniBarridoECG() {
    if (!miniCanvas || !miniCtx) return;

    // Simulación del complejo QRS en miniatura adaptado al tamaño del botón
    let actualY = miniCanvas.height / 2; // Línea isoeléctrica base
    miniIteracion++;

    // Ciclo matemático de ondas cardíacas P-QRS-T comprimido para el botón
    let fase = miniIteracion % 40; 
    if (fase === 10) actualY -= 4;   // Onda P sutil
    if (fase === 14) actualY += 6;   // Onda Q
    if (fase === 16) actualY -= 28;  // R de alta tensión (El latido)
    if (fase === 18) actualY += 12;  // Onda S profunda
    if (fase === 24) actualY -= 6;   // Onda T de repolarización Ventricular

    // Efecto de desvanecimiento progresivo (Estilo fósforo verde de monitor UCI)
    miniCtx.fillStyle = 'rgba(247, 250, 252, 0.08)'; // Fondo gris/blanco sutil que limpia la línea anterior
    miniCtx.fillRect(miniX, 0, 8, miniCanvas.height);

    // Configuración estética de la línea del electro dentro del botón
    miniCtx.strokeStyle = '#38a169'; // Verde alerta institucional de salud
    miniCtx.lineWidth = 1.8;
    miniCtx.lineCap = 'round';
    miniCtx.shadowBlur = 0; // Sin brillo excesivo para que no tape el texto del botón

    // Dibujo del vector en el plano cartesiano del canvas
    miniCtx.beginPath();
    miniCtx.moveTo(miniX - 1, miniUltimaY);
    miniCtx.lineTo(miniX, actualY);
    miniCtx.stroke();

    miniUltimaY = actualY;
    miniX += 1.2; // Velocidad del barrido horizontal

    // Ciclo infinito: cuando la línea llega al borde derecho del botón, vuelve a empezar por la izquierda
    if (miniX >= miniCanvas.width) {
        miniX = 0;
    }

    requestAnimationFrame(renderMiniBarridoECG);
}

//  EXPOSICIÓN EN EL INICIALIZADOR EXISTENTE

const copiaInicializarECGOriginal = window.inicializarECG;
window.inicializarECG = function() {
    if (typeof copiaInicializarECGOriginal === 'function') copiaInicializarECGOriginal();
    inicializarMiniECGHome(); // Encendemos el mini monitor del home
};