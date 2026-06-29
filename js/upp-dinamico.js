// =========================================================================================
// 🔬 SIMULADOR INTERACTIVO LPP - ADAPTACIÓN EXCLUSIVA CON IMÁGENES DE FOLLETO LOCALES
// Basado en Directrices NPUAP/EPUAP y Evidencia de Isquemia Tisular por Decúbito
// =========================================================================================

let tiempoPresion = 0;           // Cronómetro de segundos reales de presión sostenida.
let intervaloPresion = null;     // ID del bucle asincrónico para la oclusión capilar.
let regionSeleccionada = 'sacro';// Ubicación anatómica actual elegida por el alumno.

// 📚 BIBLIOTECA CLÍNICA ASOCIADA A LAS IMÁGENES DEL FLIER DEL USUARIO (Carpeta local img/)
const estadiosUPP = [
    { 
        fase: "Piel Sana", 
        horas: 0, 
        imagen: "img/upp/upp0.jpg", // 📁 Ruta local a la imagen de piel sana de tu folleto
        desc: "<strong>Estado Fisiológico:</strong> Tejido íntegro. Perfusión capilar adecuada (Microcirculación conservada).", 
        accion: "Mantener rotación cada 2 horas y protección con ácidos grasos hiperoxigenados." 
    },
    { 
        fase: "Estadio I: Eritema No Blanqueable", 
        horas: 2, 
        imagen: "img/upp/upp1.jpg", // 📁 Tu imagen del folleto para Estadio I
        desc: "<strong>Fisiopatología:</strong> Piel intacta con eritema que no palidece a la presión. Alteración de la microcirculación por decúbito.", 
        accion: "🔴 Alerta: Alivio inmediato de la presión. Colocar apósito de espuma de poliuretano." 
    },
    { 
        fase: "Estadio II: Pérdida de Espesor Parcial", 
        horas: 6, 
        imagen: "img/upp/upp2.jpg", // 📁 Tu imagen del folleto para Estadio II
        desc: "<strong>Clínica:</strong> Epitelización perdida. Úlcera abierta con lecho rosado, sin esfacelos. Puede presentarse como ampolla.", 
        accion: "Curación húmeda estéril. Evitar fricción hidrodinámica absoluta en sábanas." 
    },
    { 
        fase: "Estadio III: Pérdida Total del Espesor", 
        horas: 12, 
        imagen: "img/upp/upp3.jpg", // 📁 Tu imagen del folleto para Estadio III
        desc: "<strong>Severidad:</strong> Tejido celular subcutáneo (grasa) visible. Presencia de esfacelos y posible tunelización subdérmica.", 
        accion: "Desbridamiento autolítico o enzimático. Valorar carga bacteriana e infección." 
    },
    { 
        fase: "Estadio IV: Exposición de Tejidos Profundos", 
        horas: 24, 
        imagen: "img/upp/upp4.jpg", // 📁 Tu imagen del folleto para Estadio IV
        desc: "<strong>Destrucción Masiva:</strong> Exposición directa de músculo, tendón o hueso. Alto riesgo de Osteomielitis activa.", 
        accion: "Intervención quirúrgica urgente. Control de exudado severo y terapia VAC." 
    },
    { 
        fase: "No Clasificable: Escara Necrótica", 
        horas: 36, 
        imagen: "img/upp/upp5.jpg", // 📁 Tu imagen del folleto para Tejido Necrótico/Escara
        desc: "<strong>Oclusión Total:</strong> Lecho cubierto por esfacelos (amarillo/marrón) o escara necrótica (negra). Imposible estadificar fondo.", 
        accion: "No desbridar escaras secas estables en talones. Mantener seco y monitorizado." 
    }
];

// 🌐 EXPOSICIÓN GLOBAL PARA RESPONDER AL HTML
window.inicializarSimuladorUPP = function() {
    const piel = document.getElementById('zona-piel-simulada');
    if (!piel) return;

    // Configuración de la primera imagen por defecto al cargar el módulo
    piel.style.backgroundImage = `url('${estadiosUPP[0].imagen}')`;

    // Detectores de eventos táctiles unificados
    piel.addEventListener('pointerdown', iniciarCompresionIsquemica);
    piel.addEventListener('pointerup', detenerCompresionIsquemica);
    piel.addEventListener('pointerleave', detenerCompresionIsquemica);
};

function iniciarCompresionIsquemica(e) {
    e.preventDefault();
    const piel = document.getElementById('zona-piel-simulada');
    if (!piel) return;
    piel.classList.add('presionando');

    if (intervaloPresion) clearInterval(intervaloPresion);

    // Bucle cronológico en tiempo real
    intervaloPresion = setInterval(() => {
        tiempoPresion++;
        actualizarFisiopatologiaUI();
    }, 1000); 
}

function detenerCompresionIsquemica() {
    const piel = document.getElementById('zona-piel-simulada');
    if (piel) piel.classList.remove('presionando');
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

    // Inyección dinámica de la imagen del flier guardada localmente
    if (piel) {
        piel.style.setProperty('background-image', `url('${estadioActual.imagen}')`, 'important');
    }

    if (indicadorFase) indicadorFase.innerText = estadioActual.fase;
    if (indicadorHoras) indicadorHoras.innerText = `${tiempoPresion} hs`;
    if (panelDesc) panelDesc.innerHTML = estadioActual.desc;
    if (panelAccion) panelAccion.innerHTML = `<strong>Plan de Cuidados:</strong> ${estadioActual.accion}`;

    const homeBadge = document.getElementById('home-val-upp-dinamico');
    if (homeBadge) homeBadge.innerText = estadioActual.fase.split(':')[0];
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