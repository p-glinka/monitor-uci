// =========================================================================================
//  js/main.js - ORQUESTRADOR CENTRAL DE LA APLICACIÓN CLÍNICA
// =========================================================================================

import { inicializarGlasgow, calcularGlasgow, resetGlasgow } from './glasgow.js';
import { calcIrox, inicializarIrox, resetIrox } from './irox.js';
import { inicializarRass, calcularRass, resetRass } from './rass.js'; 
import { inicializarBraden, calcularBraden, resetBraden } from './braden.js';  
import { inicializarECG, inicializarMiniECGHome } from './ecg.js'; // 🟢 Se agregó la función explícitamente aquí
import { buscarFarmacos } from './farmacos.js';
import { inicializarNiss, resetNiss } from './niss.js'; 
import { inicializarTiss, resetTiss, calcularTISS28 } from './tiss.js'; 
import { actualizarLineaTiempoUI } from './utilidades.js';
import { inicializarNihss, resetNihss } from './nihss.js';
import './cefalo.js'; 
import './upp-dinamico.js';

window.onload = () => {
    // Inicialización de escalas y cálculos clínicos
    inicializarGlasgow();
    inicializarIrox();
    inicializarRass();   
    inicializarBraden(); 
    inicializarNiss();   
    inicializarTiss(); 
    inicializarNihss();

    // Enciende los dos monitores de ECG (Principal y Mini) una sola vez y sin colisiones
    inicializarECG(); 
    
    // Iniciar el renderizado y carga visual de los historiales en gráficos de tendencias
    actualizarLineaTiempoUI('nihss'); 
    actualizarLineaTiempoUI('GCS');
    actualizarLineaTiempoUI('IROX');
    actualizarLineaTiempoUI('RASS');   
    actualizarLineaTiempoUI('Braden'); 

    // Inicializar el Simulador de UPP Dinámico
    window.inicializarSimuladorUPP(); 
    
    // Inyectar accesibilidad WCAG al teclado para navegación por boxes interactivos
    configurarAccesibilidadTeclado();

    // Inicializar los buscadores del Vademécum PROA
    configurarBuscadoresPROA();
};

// =========================================================================================
// 🔍 BUSCADOR DE FÁRMACOS (Vademécum) - Soporte Multi-Buscador (Home y Sección)
// =========================================================================================
function configurarBuscadoresPROA() {
    const searchBoxes = document.querySelectorAll('.search-box');

    searchBoxes.forEach(box => {
        const input = box.querySelector('input');
        const btnBuscar = box.querySelector('#btn-buscar') || box.querySelector('button');
        const btnBorrar = box.querySelector('#btn-borrar');
        
        if (!input || !btnBuscar) return;

        const vistaPadre = box.closest('.view') || box.closest('section') || document;
        const contenedor = vistaPadre.querySelector('[id^="contenedor-tarjetas"]') || document.getElementById('contenedor-tarjetas');

        if (contenedor) {
            btnBuscar.addEventListener('click', () => {
                const textoUsuario = input.value.trim();
                if (textoUsuario === "") return;

                const resultados = buscarFarmacos(textoUsuario);
                renderizarMisTarjetas(resultados, contenedor);
                
                if (btnBorrar) {
                    btnBorrar.style.display = 'inline-flex';
                }
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    btnBuscar.click();
                }
            });

            if (btnBorrar) {
                btnBorrar.addEventListener('click', () => {
                    input.value = ""; 
                    contenedor.innerHTML = ""; 
                    btnBorrar.style.display = 'none'; 
                });
            }
        }
    });
}

function renderizarMisTarjetas(listaDeFarmacos, contenedorElemento) {
    if (!contenedorElemento) return;
    contenedorElemento.innerHTML = ""; 

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

// Exponer funciones clínicas e interacciones al alcance global (window)
window.calcularGlasgow = calcularGlasgow;
window.calcIrox = calcIrox;
window.calcularRass = calcularRass;   
window.calcularBraden = calcularBraden; 
window.calcularTISS28 = calcularTISS28; 
window.resetNihss = resetNihss; 

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
        resetTiss(); 
        resetNihss();
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