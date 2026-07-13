import { inicializarGlasgow, calcularGlasgow, resetGlasgow } from './glasgow.js';
import { calcIrox, inicializarIrox, resetIrox } from './irox.js';
import { inicializarRass, calcularRass, resetRass } from './rass.js'; 
import { inicializarBraden, calcularBraden, resetBraden } from './braden.js';  
import { inicializarNiss, resetNiss } from './niss.js'; 
import { actualizarLineaTiempoUI } from './utilidades.js';
import { inicializarECG } from './ecg.js'; 
import './cefalo.js'; 
import './upp-dinamico.js'; 
import { buscarFarmacos } from './farmacos.js';

window.onload = () => {
    inicializarGlasgow();
    inicializarIrox();
    inicializarRass();   
    inicializarBraden(); 
    inicializarNiss();   
    inicializarECG(); 

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

    window.inicializarSimuladorUPP(); 
    
    // Cargar visualmente las líneas de tiempo históricas
    actualizarLineaTiempoUI('GCS');
    actualizarLineaTiempoUI('IROX');
    actualizarLineaTiempoUI('RASS');   
    actualizarLineaTiempoUI('Braden'); 

    // Inyectar accesibilidad WCAG al teclado de forma dinámica en los menús interactivos div
    configurarAccesibilidadTeclado();

    // =========================================================================================
    // 🔍 BUSCADOR DE FÁRMACOS (Vademécum) - Soporte Multi-Buscador (Home y Sección)
    // =========================================================================================
    configurarBuscadoresPROA();
};

function configurarBuscadoresPROA() {
    // Buscamos todas las parejas de inputs y botones que puedan existir en la página
    const searchBoxes = document.querySelectorAll('.search-box');

    searchBoxes.forEach(box => {
        const input = box.querySelector('input');
        const btn = box.querySelector('button');
        
        if (!input || !btn) return;

        // Intentamos encontrar el contenedor de tarjetas más cercano
        // (Ya sea dentro de la misma vista o buscando globalmente)
        const vistaPadre = box.closest('.view') || box.closest('section') || document;
        const contenedor = vistaPadre.querySelector('[id^="contenedor-tarjetas"]') || document.getElementById('contenedor-tarjetas');

        if (contenedor) {
            btn.addEventListener('click', () => {
                const textoUsuario = input.value;
                const resultados = buscarFarmacos(textoUsuario);
                renderizarMisTarjetas(resultados, contenedor);
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    btn.click();
                }
            });
        }
    });
}

// Función auxiliar para dibujar las tarjetas con la información clínica completa del Vademécum
function renderizarMisTarjetas(listaDeFarmacos, contenedorElemento) {
    if (!contenedorElemento) return;
    contenedorElemento.innerHTML = ""; // Limpiamos la pantalla anterior

    if (listaDeFarmacos.length === 0) {
        contenedorElemento.innerHTML = `
            <div class="sin-resultados-card">
                ⚠️ No se encontraron antimicrobianos con ese criterio.
            </div>`;
        return;
    }

    listaDeFarmacos.forEach(farmaco => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-medicamento-proa';
        
        tarjeta.innerHTML = `
            <div class="tarjeta-proa-header">
                <h3>${farmaco.nombre}</h3>
                <span class="badge-presentacion">${farmaco.presentacion}</span>
            </div>
            
            <div class="tarjeta-proa-detalles">
                <p><strong> Reconstitución:</strong> ${farmaco.reconstitucion || 'No especifica'}</p>
                <p><strong> Dilución:</strong> ${farmaco.dilucion || 'No especifica'}</p>
                <p><strong> Vía de Admisión:</strong> ${farmaco.via || 'No especifica'}</p>
                <p><strong> Estabilidad:</strong> ${farmaco.estabilidad || 'No especifica'}</p>
                <p><strong> Observaciones:</strong> ${farmaco.observaciones || 'Sin observaciones'}</p>
                <p><strong> Solventes:</strong> ${farmaco.solventes || 'No especifica'}</p>
            </div>

            <div class="semaforo-clinico">
                <div class="semaforo-item semaforo-prohibido">
                    <span class="semaforo-icono">🔴</span>
                    <p><strong>PROHIBIDO:</strong> ${farmaco.semaforo.prohibido || 'Sin restricciones críticas registradas'}</p>
                </div>
                <div class="semaforo-item semaforo-precaucion">
                    <span class="semaforo-icono">🟡</span>
                    <p><strong>PRECAUCIÓN:</strong> ${farmaco.semaforo.precaucion || 'Sin precauciones especiales descritas'}</p>
                </div>
                <div class="semaforo-item semaforo-seguro">
                    <span class="semaforo-icono">🟢</span>
                    <p><strong>SEGURO:</strong> ${farmaco.semaforo.seguro || 'Dilución estándar segura habitual'}</p>
                </div>
            </div>
        `;
        contenedorElemento.appendChild(tarjeta);
    });
}

// Exponer funciones críticas al objeto global window para que sigan respondiendo a los onclick del HTML
window.calcularGlasgow = calcularGlasgow;
window.calcIrox = calcIrox;
window.calcularRass = calcularRass;   
window.calcularBraden = calcularBraden; 

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
        resetRass();   
        resetBraden(); 
        resetNiss();

        window.showView('view-home');
    }
};

function configurarAccesibilidadTeclado() {
    document.querySelectorAll('[role="button"]').forEach(elem => {
        elem.setAttribute('tabindex', '0'); 
        elem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                elem.click(); 
            }
        });
    });
}