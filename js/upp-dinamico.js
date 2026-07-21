// =========================================================================================
// 🔬 SIMULADOR INTERACTIVO LPP - ADAPTACIÓN EXCLUSIVA CON IMÁGENES DE FOLLETO LOCALES
// Basado en Directrices NPUAP/EPUAP y Evidencia de Isquemia Tisular por Decúbito
// =========================================================================================

let tiempoPresion = 0;           // Cronómetro de segundos reales de presión sostenida.
let intervaloPresion = null;     // ID del bucle asincrónico para la oclusión capilar.
let regionSeleccionada = 'sacro';// Ubicación anatómica actual elegida por el alumno.

// 📚 BIBLIOTECA CLÍNICA ASOCIADA A LAS IMÁGENES LOCALES (Carpeta img/upp/)
const estadiosUPP = [
    { 
        fase: "Piel Sana", 
        horas: 0, 
        imagen: "img/upp/upp0.jpg", 
        desc: "<strong>Estado Fisiológico:</strong> Tejido íntegro. Perfusión capilar adecuada (Microcirculación conservada).", 
        accion: "Mantener rotación cada 2 horas y protección con ácidos grasos hiperoxigenados." 
    },
    { 
        fase: "Estadio I: Eritema No Blanqueable", 
        horas: 2, 
        imagen: "img/upp/upp1.jpg", 
        desc: "<strong>Fisiopatología:</strong> Piel intacta con eritema que no palidece a la presión. Alteración de la microcirculación por decúbito.", 
        accion: "🔴 Alerta: Alivio inmediato de la presión. Colocar apósito de espuma de poliuretano." 
    },
    { 
        fase: "Estadio II: Pérdida de Espesor Parcial", 
        horas: 6, 
        imagen: "img/upp/upp2.jpg", 
        desc: "<strong>Clínica:</strong> Epitelización perdida. Úlcera abierta con lecho rosado, sin esfacelos. Puede presentarse como ampolla.", 
        accion: "Curación húmeda estéril. Evitar fricción hidrodinámica absoluta en sábanas." 
    },
    { 
        fase: "Estadio III: Pérdida Total del Espesor", 
        horas: 12, 
        imagen: "img/upp/upp3.jpg", 
        desc: "<strong>Severidad:</strong> Tejido celular subcutáneo (grasa) visible. Presencia de esfacelos y posible tunelización subdérmica.", 
        accion: "Desbridamiento autolítico o enzimático. Valorar carga bacteriana e infección." 
    },
    { 
        fase: "Estadio IV: Exposición de Tejidos Profundos", 
        horas: 24, 
        imagen: "img/upp/upp4.jpg", 
        desc: "<strong>Destrucción Masiva:</strong> Exposición directa de músculo, tendón o hueso. Alto riesgo de Osteomielitis activa.", 
        accion: "Intervención quirúrgica urgente. Control de exudado severo y terapia VAC." 
    },
    { 
        fase: "No Clasificable: Escara Necrótica", 
        horas: 36, 
        imagen: "img/upp/upp5.jpg", 
        desc: "<strong>Oclusión Total:</strong> Lecho cubierto por esfacelos (amarillo/marrón) o escara necrótica (negra). Imposible estadificar fondo.", 
        accion: "No desbridar escaras secas estables en talones. Mantener seco y monitorizado." 
    }
];

// 🌐 UNIFICACIÓN Y EXPOSICIÓN GLOBAL DEL INICIALIZADOR
window.inicializarSimuladorUPP = function() {
    const piel = document.getElementById('zona-piel-simulada');
    if (!piel) return;

    // Configuración de la primera imagen por defecto
    piel.style.backgroundImage = `url('${estadiosUPP[0].imagen}')`;

    // Detectores de eventos táctiles y puntero
    piel.addEventListener('pointerdown', iniciarCompresionIsquemica);
    piel.addEventListener('pointerup', detenerCompresionIsquemica);
    piel.addEventListener('pointerleave', detenerCompresionIsquemica);

    // Genera el QR del aula automáticamente
    generarQrSimulador();
};

function iniciarCompresionIsquemica(e) {
    e.preventDefault();
    const piel = document.getElementById('zona-piel-simulada');
    if (!piel) return;
    piel.classList.add('presionando');

    // Visor RA/3D visible al presionar
    const visorRA = document.getElementById('contenedor-ra-upp');
    if (visorRA) {
        visorRA.classList.add('ra-activa');
    }

    if (intervaloPresion) clearInterval(intervaloPresion);

    // Bucle cronológico
    intervaloPresion = setInterval(() => {
        tiempoPresion++;
        actualizarFisiopatologiaUI();
    }, 1000); 
}

function detenerCompresionIsquemica() {
    const piel = document.getElementById('zona-piel-simulada');
    if (piel) piel.classList.remove('presionando');

    // Oculta el visor al soltar
    const visorRA = document.getElementById('contenedor-ra-upp');
    if (visorRA) {
        visorRA.classList.remove('ra-activa');
    }

    if (intervaloPresion) {
        clearInterval(intervaloPresion);
        intervaloPresion = null;
    }
}

function actualizarFisiopatologiaUI() {
    let estadioActual = estadiosUPP[0];
    
    for (let i = estadiosUPP.length - 1; i >= 0; i--) {
        if (tiempoPresion >= estadiosUPP[i].horas) {
            estadioActual = estadiosUPP[i];
            break;
        }
    }

    const piel = document.getElementById('zona-piel-simulada');
    const indicadorFase = document.getElementById('upp-fase-actual');
    const indicadorHoras = document.getElementById('upp-horas-reales');
    const panelDesc = document.getElementById('upp-descripcion-clinica');
    const panelAccion = document.getElementById('upp-accion-enfermeria');

    if (piel) {
        piel.style.setProperty('background-image', `url('${estadioActual.imagen}')`, 'important');
    }

    if (indicadorFase) indicadorFase.innerText = estadioActual.fase;
    if (indicadorHoras) indicadorHoras.innerText = `${tiempoPresion} hs`;
    if (panelDesc) panelDesc.innerHTML = estadioActual.desc;
    if (panelAccion) panelAccion.innerHTML = `<strong>Plan de Cuidados:</strong> ${estadioActual.accion}`;
}

window.cambiarRegionAnatomica = function(region, elemento) {
    regionSeleccionada = region;
    const grupo = elemento.closest('.grupo-opciones');
    if (grupo) {
        grupo.querySelectorAll('.btn-opcion').forEach(btn => btn.classList.remove('active'));
        elemento.classList.add('active');
    }
    window.resetearSimuladorPiel();
};

window.resetearSimuladorPiel = function() {
    tiempoPresion = 0;
    detenerCompresionIsquemica();
    actualizarFisiopatologiaUI();
};

function generarQrSimulador() {
    const contenedorQR = document.getElementById('contenedor-qr-aula');
    if (!contenedorQR) return;

    contenedorQR.innerHTML = "";
    const urlSimulador = window.location.href; 

    if (typeof QRCode !== 'undefined') {
        new QRCode(contenedorQR, {
            text: urlSimulador,
            width: 140,
            height: 140,
            colorDark: "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}