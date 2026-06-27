// ⚡ MÓDULO DE SIMULACIÓN DE RITMOS CARDÍACOS (NATIVO CANVAS)

let canvas, ctx;
let x = 0; // Posición horizontal del barrido
let ultimaY = 150; // Punto vertical anterior para unir la línea
let ritmoActual = 'sinusal';
let iteracion = 0;
let animacionId = null;

// Descripciones e información clínica para el estudiante/enfermero
const infoRitmos = {
    sinusal: {
        nombre: "RITMO SINUSAL NORMAL",
        fc: "72",
        desc: "<strong>Descripción Clínica:</strong> Ritmo de base regular conducido por el nodo sinusal. Frecuencia cardíaca normal (60-100 lpm). Onda P positiva antes de cada complejo QRS con intervalo PR constante."
    },
    fa: {
        nombre: "FIBRILACIÓN AURICULAR (FA)",
        fc: "124",
        desc: "<strong>Descripción Clínica:</strong> Arritmia supraventricular caracterizada por una activación auricular caótica. Ausencia de ondas P (línea de base sustituida por ondas de fibrilación 'f') y respuesta ventricular totalmente irregular (intervalos R-R variables)."
    },
    tv: {
        nombre: "TAQUICARDIA VENTRICULAR (TV)",
        fc: "175",
        desc: "<strong>Descripción Clínica:</strong> Ritmo potencialmente mortal de origen ventricular. Tres o más complejos QRS sucesivos que son anchos (duración > 0.12s) y aberrantes con frecuencia elevada. ¡Alerta de compromiso hemodinámico!"
    },
    fv: {
        nombre: "FIBRILACIÓN VENTRICULAR (FV)",
        fc: "0",
        desc: "<strong>Descripción Clínica:</strong> Trazado completamente caótico, irregular y amorfo, sin ondas P ni complejos QRS identificables. Representa una actividad eléctrica desorganizada del ventrículo. ¡Situación de Paro Cardiorrespiratorio inmediato!"
    },
    asistolia: {
        nombre: "ASISTOLIA",
        fc: "0",
        desc: "<strong>Descripción Clínica:</strong> Ausencia completa de actividad eléctrica ventricular detectable (línea plana). Se deben verificar de inmediato las conexiones de los electrodos y el cable conductor. Protocolo de RCP activo."
    }
};

export function inicializarECG() {
    canvas = document.getElementById('canvas-ecg');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    // Iniciar bucle de renderizado interactivo
    if (animacionId) cancelAnimationFrame(animacionId);
    dibujarCuadricula();
    renderBarridoECG();
}

function dibujarCuadricula() {
    ctx.strokeStyle = '#0d2411';
    ctx.lineWidth = 0.5;

    // Líneas verticales finas (cuadrícula milimetrada simulada)
    for (let i = 0; i < canvas.width; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    // Líneas horizontales finas
    for (let j = 0; j < canvas.height; j += 15) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }
}

// 🧠 Generador matemático del pulso de ECG según patología
function calcularVoltajeECG(tipo, paso) {
    const centro = canvas.height / 2;
    
    switch (tipo) {
        case 'sinusal': {
            let p = paso % 120; // Ciclo cardíaco regular
            if (p > 20 && p < 35) return centro - 6 * Math.sin((p - 20) * Math.PI / 15); // Onda P
            if (p >= 40 && p < 43) return centro + (p - 40) * 8; // Onda Q
            if (p >= 43 && p < 47) return centro - 85 * Math.sin((p - 43) * Math.PI / 4); // Onda R (Complejo QRS alto)
            if (p >= 47 && p < 51) return centro + 25 * Math.sin((p - 47) * Math.PI / 4); // Onda S
            if (p > 70 && p < 95) return centro - 12 * Math.sin((p - 70) * Math.PI / 25); // Onda T
            return centro; // Línea isoeléctrica
        }
        case 'fa': {
            // Irregular y tembloroso
            let ruidoAuricular = 3 * Math.sin(paso * 0.8) * Math.cos(paso * 0.5);
            // Complejos QRS espaciados aleatoriamente (simulación)
            let esQRS = (paso % 73 === 0 || paso % 191 === 0 || paso % 243 === 0);
            if (esQRS) {
                return centro - 70; // Disparo rápido del ventrículo aberrante
            }
            return centro + ruidoAuricular;
        }
        case 'tv': {
            // Ondas monomórficas, anchas, consecutivas y rápidas
            return centro - 55 * Math.sin(paso * Math.PI / 12);
        }
        case 'fv': {
            // Caos total absoluto (ondas irregulares en amplitud y frecuencia)
            return centro - (25 * Math.sin(paso * 0.3) + 15 * Math.cos(paso * 0.75) * Math.sin(paso * 0.1));
        }
        case 'asistolia': {
            // Línea de base casi plana con un micro ruido eléctrico imperceptible
            return centro + (0.4 * Math.sin(paso * 0.2));
        }
        default:
            return centro;
    }
}

function renderBarridoECG() {
    if (!canvas || !ctx) return;

    iteracion++;
    
    // Dibujar una barra negra que camina borrando el trazo viejo antes de que llegue la línea brillante
    ctx.fillStyle = '#050f05';
    ctx.fillRect(x, 0, 15, canvas.height);
    
    // Redibujar la grilla milimetrada solo en el pedazo borrado para mantener la estética
    ctx.strokeStyle = '#0d2411';
    ctx.lineWidth = 0.5;
    if (x % 15 === 0) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Calcular la posición vertical actual del haz
    let actualY = calcularVoltajeECG(ritmoActual, iteracion);

    // Dibujar el haz brillante con efecto de fósforo verde
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 4;
    ctx.shadowColor = '#00ff41';
    
    ctx.beginPath();
    ctx.moveTo(x - 1, ultimaY);
    ctx.lineTo(x, actualY);
    ctx.stroke();
    
    // Resetear sombras para optimizar rendimiento de renderizado
    ctx.shadowBlur = 0;

    // Guardar coordenadas para el siguiente ciclo
    ultimaY = actualY;
    x++;

    // Si llega al final de la pantalla del monitor, reinicia de izquierda a derecha
    if (x >= canvas.width) {
        x = 0;
    }

    animacionId = requestAnimationFrame(renderBarridoECG);
}

// Función expuesta para cambiar de ritmo clínico mediante clics
window.cambiarRitmoECG = function(tipo, elemento) {
    if (!infoRitmos[tipo]) return;
    
    ritmoActual = tipo;

    // Sincronizar UI de los botones
    const grupo = elemento.closest('.grupo-opciones');
    if (grupo) {
        grupo.querySelectorAll('.btn-opcion').forEach(btn => btn.classList.remove('active'));
        elemento.classList.add('active');
    }

    // Actualizar datos digitales del monitor central en vivo
    document.getElementById('monitor-fc').innerText = infoRitmos[tipo].fc;
    document.getElementById('monitor-estado').innerText = infoRitmos[tipo].nombre;
    document.getElementById('info-clinica-ecg').innerHTML = infoRitmos[tipo].desc;
    // Actualizar el indicador del Home con un emoji alusivo al estado del monitor
const badgeHome = document.getElementById('home-val-ecg');
if (badgeHome) {
    badgeHome.innerText = tipo === 'sinusal' ? '🟢' : tipo === 'asistolia' ? '💀' : '🔴';
    }
};