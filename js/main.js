import { inicializarGlasgow, calcularGlasgow, resetGlasgow } from './glasgow.js';
import { calcIrox, inicializarIrox, resetIrox } from './irox.js';
import { inicializarRass, calcularRass, resetRass } from './rass.js'; // <--
import { inicializarBraden, calcularBraden, resetBraden } from './braden.js'; // <-- 
import { actualizarLineaTiempoUI } from './utilidades.js';
import { inicializarECG } from './ecg.js'; // <-- MÓDULO ECG
import './cefalo.js'; // <--  MÓDULO DE VALORACIÓN CÉFALO-CAUDAL
import './upp-dinamico.js'; // <--  MÓDULO DE ulceras por Presion

// Inicialización de la aplicación al cargar la ventana
window.onload = () => {
    // Arrancar la persistencia de datos local
    inicializarGlasgow();
    inicializarIrox();
    inicializarRass();   // <-- NUEVO
    inicializarBraden(); // <-- NUEVO
    inicializarECG(); // <-- NUEVA INICIALIZACIÓN DEL MONITOR ECG
    // =========================================================================================
// ⚡ MOTOR INTERNO: TRAZADO ECG EN VIVO PARA EL BOTÓN DEL HOME
// =========================================================================================
(function() {
    let miniCanvas = null;
    let miniCtx = null;
    let miniX = 0;
    let miniUltimaY = 50;
    let miniIteracion = 0;

    function arrancarMiniECG() {
        miniCanvas = document.getElementById('mini-canvas-ecg-home');
        if (!miniCanvas) return;

        miniCtx = miniCanvas.getContext('2d');
        
        // Forzamos el tamaño físico real del contenedor
        miniCanvas.width = miniCanvas.getBoundingClientRect().width || 300;
        miniCanvas.height = miniCanvas.getBoundingClientRect().height || 140;
        miniUltimaY = miniCanvas.height / 2;

        function dibujarMiniTrazado() {
            if (!miniCanvas || !miniCtx) return;

            let actualY = miniCanvas.height / 2;
            miniIteracion++;

            // Complejo P-QRS-T adaptado al tamaño de la tarjeta
            let fase = miniIteracion % 50; 
            if (fase === 12) actualY -= 5;   // Onda P
            if (fase === 16) actualY += 8;   // Onda Q
            if (fase === 18) actualY -= 35;  // Onda R (Latido alto)
            if (fase === 20) actualY += 15;  // Onda S
            if (fase === 26) actualY -= 8;   // Onda T

            // Efecto barrido de monitor de terapia (deja rastro verde)
            miniCtx.fillStyle = 'rgba(26, 32, 44, 0.12)'; 
            miniCtx.fillRect(miniX, 0, 10, miniCanvas.height);

            // Estética de la línea del electro
            miniCtx.strokeStyle = '#38a169'; // Verde quirúrgico
            miniCtx.lineWidth = 2;
            miniCtx.lineCap = 'round';

            miniCtx.beginPath();
            miniCtx.moveTo(miniX - 1, miniUltimaY);
            miniCtx.lineTo(miniX, actualY);
            miniCtx.stroke();

            miniUltimaY = actualY;
            miniX += 1.5;

            if (miniX >= miniCanvas.width) {
                miniX = 0;
            }

            requestAnimationFrame(dibujarMiniTrazado);
        }

        dibujarMiniTrazado();
    }

    // Acoplamos la ejecución al flujo de carga general para asegurar que el botón ya exista
    if (document.readyState === 'complete') {
        arrancarMiniECG();
    } else {
        window.addEventListener('load', arrancarMiniECG);
    }
})();
    window.inicializarSimuladorUPP(); //<-- llamo a la funcion para activar los sensores táctiles de la esfera de piel
    // Cargar visualmente las líneas de tiempo históricas
    actualizarLineaTiempoUI('GCS');
    actualizarLineaTiempoUI('IROX');
    actualizarLineaTiempoUI('RASS');   // <-- NUEVO
    actualizarLineaTiempoUI('Braden'); // <-- NUEVO

     

    // Inyectar accesibilidad WCAG al teclado de forma dinámica en los menús interactivos div
    configurarAccesibilidadTeclado();
};

// Exponer funciones críticas al objeto global window para que sigan respondiendo a tus onclick del HTML
window.calcularGlasgow = calcularGlasgow;
window.calcIrox = calcIrox;
window.calcularRass = calcularRass;   // <-- NUEVO
window.calcularBraden = calcularBraden; // <-- NUEVO

window.showView = function(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');
    window.scrollTo(0,0);
};

window.resetearTodoElSistema = function() {
    if(confirm("¿Desea restablecer los datos de monitoreo de este paciente? Se borrarán las tendencias históricas.")) {
        resetGlasgow();
        resetIrox();
        resetRass();   // <-- NUEVO
        resetBraden(); // <-- NUEVO
        window.showView('view-home');
    }
};

function configurarAccesibilidadTeclado() {
    // Busca todos los elementos con rol interactivo de botón para inyectarles soporte de teclado físico
    document.querySelectorAll('[role="button"]').forEach(elem => {
        elem.setAttribute('tabindex', '0'); // Entra en la ruta del Tabulador
        elem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                elem.click(); // Dispara el evento onclick mapeado en el elemento
            }
        });
    });
}