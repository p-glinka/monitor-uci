import { inicializarGlasgow, calcularGlasgow, resetGlasgow } from './glasgow.js';
import { calcIrox, inicializarIrox, resetIrox } from './irox.js';
import { inicializarRass, calcularRass, resetRass } from './rass.js'; // <-- NUEVO
import { inicializarBraden, calcularBraden, resetBraden } from './braden.js'; // <-- NUEVO
import { actualizarLineaTiempoUI } from './utilidades.js';

// Inicialización de la aplicación al cargar la ventana
window.onload = () => {
    // Arrancar la persistencia de datos local
    inicializarGlasgow();
    inicializarIrox();
    inicializarRass();   // <-- NUEVO
    inicializarBraden(); // <-- NUEVO
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