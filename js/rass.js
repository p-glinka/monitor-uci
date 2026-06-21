import { CONFIG_CLINICA } from './config-clinica.js';
import { mostrarAlerta, registrarEnHistorial, actualizarMonitorGeneral } from './utilidades.js';

let currentRass = CONFIG_CLINICA.rass.VALOR_BASE;

export function inicializarRass() {
    const datos = localStorage.getItem('rass_value');
    if (datos !== null) currentRass = parseInt(datos);
    evaluarRassUI();
}

export function calcularRass(valor, elemento) {
    const grupo = elemento.closest('.grupo-opciones');
    if (!grupo) return;

    const botones = grupo.querySelectorAll('.btn-opcion');
    botones.forEach(btn => btn.classList.remove('active'));
    elemento.classList.add('active');

    currentRass = valor;
    localStorage.setItem('rass_value', currentRass);
    
    evaluarRassUI(); 
}

export function evaluarRassUI() {
    const textoPuntaje = (currentRass > 0 ? `+${currentRass}` : currentRass);
    document.getElementById('res-rass').innerText = textoPuntaje;
    document.getElementById('home-val-rass').innerText = textoPuntaje;

    const alerta = document.getElementById('alerta-rass');
    
    // 🔌 Ajustamos los parámetros para que coincidan exacto con tu utilidades.js
    if (currentRass >= CONFIG_CLINICA.rass.UMBRAL_ALERTA_POSITIVO) {
        mostrarAlerta('alerta-rass', `🔴 PACIENTE AGITADO (RASS +${currentRass}): Riesgo elevado de auto-extubación. Evaluar titulación de sedación.`, 'rojo');
        actualizarMonitorGeneral('rass', 'rojo'); 
    } else if (currentRass <= CONFIG_CLINICA.rass.UMBRAL_ALERTA_NEGATIVO) {
        mostrarAlerta('alerta-rass', `⚠️ SEDACIÓN PROFUNDA (RASS ${currentRass}): Monitoreo de ventana de sedación diaria.`, 'amarillo');
        actualizarMonitorGeneral('rass', 'amarillo'); 
    } else {
        mostrarAlerta('alerta-rass', `🟢 RANGO META (RASS ${currentRass}): Paciente en rango óptimo de sedación/alerta.`, 'verde');
        actualizarMonitorGeneral('rass', 'verde'); 
    }

    registrarEnHistorial('rass', currentRass);
}

export function resetRass() {
    currentRass = CONFIG_CLINICA.rass.VALOR_BASE;
    localStorage.removeItem('rass_value');
    localStorage.removeItem('historial_rass');
    evaluarRassUI();
}