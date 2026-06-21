import { CONFIG_CLINICA } from './config-clinica.js';
import { mostrarAlerta, registrarEnHistorial, actualizarMonitorGeneral } from './utilidades.js';

export function inicializarIrox() {
    const guardado = localStorage.getItem('irox_inputs');
    if (guardado) {
        const inputs = JSON.parse(guardado);
        document.getElementById('irox-spo2').value = inputs.spo2;
        document.getElementById('irox-fio2').value = inputs.fio2;
        document.getElementById('irox-fr').value = inputs.fr;
        calcIrox(false);
    }
}

export function calcIrox(guardarHistorial = true) {
    const spo2 = parseFloat(document.getElementById('irox-spo2').value);
    const fio2 = parseFloat(document.getElementById('irox-fio2').value);
    const fr = parseFloat(document.getElementById('irox-fr').value);
    const alerta = document.getElementById('alerta-irox');

    // Validación defensiva primaria contra campos vacíos o letras erróneas
    if (isNaN(spo2) || isNaN(fio2) || isNaN(fr)) {
        limpiarInterfazIrox(alerta);
        return;
    }

    // Persistencia inmediata del texto tipeado para blindar ante caídas de F5
    localStorage.setItem('irox_inputs', JSON.stringify({ spo2, fio2, fr }));

    // Candado Clínico: Validar límites de la fisiología humana viva
    const conf = CONFIG_CLINICA.irox.RANGOS;
    const inputsValidos = (spo2 >= conf.SPO2.MIN && spo2 <= conf.SPO2.MAX) &&
                          (fio2 >= conf.FIO2.MIN && fio2 <= conf.FIO2.MAX) &&
                          (fr >= conf.FR.MIN && fr <= conf.FR.MAX);

    if (!inputsValidos) {
        document.getElementById('res-irox').innerText = "---";
        document.getElementById('home-val-irox').innerText = "---";
        mostrarAlerta(alerta, 'amarilla', '⚠️ ERROR DE CARGA CRÍTICO', `Verifique los rangos fisiológicos UCI:<br>• SpO2: 50 a 100%<br>• FiO2: 0.21 a 1.0 (en decimales)<br>• FR: 5 a 70 rpm`);
        actualizarMonitorGeneral('irox', 'amarillo'); // 🔮 Esfera se entera del error
        return;
    }

    // Algoritmia libre de riesgos
    const res = (spo2 / fio2) / fr;
    const formattedRes = res.toFixed(2);

    document.getElementById('res-irox').innerText = formattedRes;
    document.getElementById('home-val-irox').innerText = formattedRes;

    if (res < CONFIG_CLINICA.irox.CORTE_FRACASO_CNAF) {
        mostrarAlerta(alerta, `🔴 ALTO RIESGO DE FRACASO: IROX ${formattedRes}`, 'roja', 'Índice por debajo del corte. Alta probabilidad de requerir intubación.');
        actualizarMonitorGeneral('irox', 'rojo'); // 🔮 Esfera Crítica
    } else {
        mostrarAlerta(alerta, `🟢 BUENA EVOLUCIÓN: IROX ${formattedRes}`, 'verde', 'Evolución favorable con la Cánula Nasal de Alto Flujo.');
        actualizarMonitorGeneral('irox', 'verde'); // 🔮 Esfera Estable
    }

    registrarEnHistorial('irox', formattedRes);
}

function limpiarInterfazIrox(alerta) {
    if (alerta) alerta.style.display = 'none';
    document.getElementById('res-irox').innerText = "0.00";
    document.getElementById('home-val-irox').innerText = "0.00";
    localStorage.removeItem('irox_inputs');
}

export function resetIrox() {
    document.getElementById('irox-spo2').value = "";
    document.getElementById('irox-fio2').value = "";
    document.getElementById('irox-fr').value = "";
    localStorage.removeItem('irox_inputs');
    localStorage.removeItem('historial_irox');
    limpiarInterfazIrox(document.getElementById('alerta-irox'));
}