import { CONFIG_CLINICA } from './config-clinica.js';
import { mostrarAlerta, registrarEnHistorial, actualizarMonitorGeneral } from './utilidades.js';

let bradenValues = { ...CONFIG_CLINICA.braden.VALORES_BASE };

export function inicializarBraden() {
    const datos = localStorage.getItem('braden_values');
    if (datos) bradenValues = JSON.parse(datos);
    evaluarBradenUI();
}

export function calcularBraden(subescala, valor, elemento) {
    const grupo = elemento.closest('.grupo-opciones');
    if (!grupo) return;

    const botones = grupo.querySelectorAll('.btn-opcion');
    botones.forEach(btn => btn.classList.remove('active'));
    elemento.classList.add('active');

    bradenValues[subescala] = valor;
    localStorage.setItem('braden_values', JSON.stringify(bradenValues));
    
    evaluarBradenUI(); 
}

export function evaluarBradenUI() {
    const total = bradenValues.s + bradenValues.h + bradenValues.a + bradenValues.m + bradenValues.n + bradenValues.r;
    
    document.getElementById('res-braden').innerText = total;
    document.getElementById('home-val-braden').innerText = total;

    const alerta = document.getElementById('alerta-braden');
    
    if (total <= CONFIG_CLINICA.braden.RIESGO_ALTO) {
        mostrarAlerta(alerta, `🔴 RIESGO ALTO DE UPP: ${total} pts`, 'roja', 'Protocolo estricto: Colchón de presión alterna y cambios de decúbito.');
        actualizarMonitorGeneral('braden', 'rojo'); // 🔮 Esfera Crítica
    } else if (total <= CONFIG_CLINICA.braden.RIESGO_MODERADO) {
        mostrarAlerta(alerta, `⚠️ RIESGO MODERADO: ${total} pts`, 'amarilla', 'Optimizar la protección de talones y control de humedad.');
        actualizarMonitorGeneral('braden', 'amarillo'); // 🔮 Esfera Precaución
    } else {
        mostrarAlerta(alerta, `🟢 RIESGO BAJO / SIN RIESGO: ${total} pts`, 'verde', 'Mantener cuidados generales de la piel.');
        actualizarMonitorGeneral('braden', 'verde'); // 🔮 Esfera Estable
    }

    registrarEnHistorial('braden', total);
}

export function resetBraden() {
    bradenValues = { ...CONFIG_CLINICA.braden.VALORES_BASE };
    localStorage.removeItem('braden_values');
    localStorage.removeItem('historial_braden');
    evaluarBradenUI();
}