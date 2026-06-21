import { CONFIG_CLINICA } from './config-clinica.js';
import { mostrarAlerta, registrarEnHistorial, actualizarMonitorGeneral } from './utilidades.js';

let gcsValues = { ...CONFIG_CLINICA.gcs.VALORES_BASE };

export function inicializarGlasgow() {
    const datos = localStorage.getItem('gcs_values');
    if (datos) gcsValues = JSON.parse(datos);
    evaluarGlasgowUI();
}

export function calcularGlasgow(parte, valor, elemento) {
    // Protección contra fragilidad del DOM: busca la caja contenedora real
    const grupo = elemento.closest('.grupo-opciones');
    if (!grupo) return;

    // Filtrado estricto por clase: ignora spans, párrafos, etc.
    const botones = grupo.querySelectorAll('.btn-opcion');
    botones.forEach(btn => btn.classList.remove('active'));
    elemento.classList.add('active');

    gcsValues[parte] = valor;
    localStorage.setItem('gcs_values', JSON.stringify(gcsValues));
    
    evaluarGlasgowUI(); // Llama directo sin pasar flags viejos
}

export function evaluarGlasgowUI() {
    const total = gcsValues.o + gcsValues.v + gcsValues.m;
    
    // Sincronización cruzada con el Home Dashboard
    document.getElementById('res-gcs').innerText = total;
    document.getElementById('home-val-gcs').innerText = total;
   
    const alerta = document.getElementById('alerta-gcs');
    
    if (total <= CONFIG_CLINICA.gcs.UMBRAL_CRITICO) {
        mostrarAlerta(alerta, `🔴 ALERTA CRÍTICA: GCS ${total}/15`, 'roja', 'Paciente en coma neurológico o deterioro grave. Requiere protección inmediata de la vía aérea (Intubación).');
        actualizarMonitorGeneral('gcs', 'rojo'); // 🔮 Esfera Crítica
    } else if (total <= CONFIG_CLINICA.gcs.UMBRAL_MODERADO) {
        mostrarAlerta(alerta, `⚠️ DETERIORO MODERADO: GCS ${total}/15`, 'amarilla', 'Monitoreo neurológico estricto por turno. Evaluar reactividad pupilar.');
        actualizarMonitorGeneral('gcs', 'amarillo'); // 🔮 Esfera Precaución
    } else {
        mostrarAlerta(alerta, `🟢 ESTABLE: GCS ${total}/15`, 'verde', 'Estado neurológico conservado dentro de parámetros normales de control.');
        actualizarMonitorGeneral('gcs', 'verde'); // 🔮 Esfera Estable
    }

    registrarEnHistorial('gcs', total);
}

export function resetGlasgow() {
    gcsValues = { ...CONFIG_CLINICA.gcs.VALORES_BASE };
    localStorage.removeItem('gcs_values');
    localStorage.removeItem('historial_gcs'); // Corregido a minúscula para limpiar bien de raíz
    evaluarGlasgowUI();
}