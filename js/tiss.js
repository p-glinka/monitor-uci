// js/tiss.js

export function inicializarTiss() {
    const form = document.getElementById('tiss-form');
    if (form) {
        form.addEventListener('change', calcularTISS28);
    }
}

export function resetTiss() {
    const form = document.getElementById('tiss-form');
    if (form) form.reset();
    
    const scoreElement = document.getElementById('tiss-score');
    const homeValTiss = document.getElementById('home-val-tiss');
    const alertaTiss = document.getElementById('alerta-tiss');
    const tituloInterpretacion = document.getElementById('tiss-interpretacion-titulo');
    const descInterpretacion = document.getElementById('tiss-interpretacion-txt');

    if (scoreElement) scoreElement.innerText = "0 pts";
    if (homeValTiss) homeValTiss.innerText = "--";
    if (alertaTiss) {
        alertaTiss.style.display = 'none';
        alertaTiss.innerHTML = "";
    }
    if (tituloInterpretacion) tituloInterpretacion.innerText = "Sin intervenciones seleccionadas";
    if (descInterpretacion) descInterpretacion.innerText = "Marque los cuidados que recibe el paciente para evaluar el impacto de la carga laboral.";
}

export function calcularTISS28() {
    const checkboxes = document.querySelectorAll('input[name="tiss"]:checked');
    let totalScore = 0;

    checkboxes.forEach(cb => {
        totalScore += parseInt(cb.value);
    });

    const scoreElement = document.getElementById('tiss-score');
    const homeValTiss = document.getElementById('home-val-tiss');
    const alertaTiss = document.getElementById('alerta-tiss');
    const tituloInterpretacion = document.getElementById('tiss-interpretacion-titulo');
    const descInterpretacion = document.getElementById('tiss-interpretacion-txt');

    if (scoreElement) scoreElement.innerText = `${totalScore} pts`;
    if (homeValTiss) homeValTiss.innerText = `${totalScore}`;

    if (totalScore === 0) {
        if (alertaTiss) alertaTiss.style.display = 'none';
        if (tituloInterpretacion) tituloInterpretacion.innerText = "Sin intervenciones seleccionadas";
        if (descInterpretacion) descInterpretacion.innerText = "Marque los cuidados que recibe el paciente para evaluar el impacto de la carga laboral.";
        return;
    }

    let nivelCarga = "";
    let colorFondo = "";
    let colorTexto = "";
    let mensajeAlerta = "";

    if (totalScore < 20) {
        nivelCarga = "Carga de Trabajo Baja / Adecuada";
        descInterpretacion.innerText = "El paciente requiere cuidados básicos y estables. Permite una asignación de enfermería de 1 enfermero para 2 o 3 pacientes bajo este mismo estado.";
        if (alertaTiss) alertaTiss.style.display = 'none';
    } 
    else if (totalScore >= 20 && totalScore <= 35) {
        nivelCarga = "Carga de Trabajo Moderada";
        descInterpretacion.innerText = "Paciente de complejidad media. Se aconseja una relación óptima de 1 enfermero por cada 2 pacientes (1:2).";
        if (alertaTiss) alertaTiss.style.display = 'none';
    } 
    else if (totalScore > 35 && totalScore <= 45) {
        nivelCarga = "Carga de Trabajo Elevada (Al límite)";
        colorFondo = "#feebc8"; // Naranja pastel
        colorTexto = "#c05621";
        mensajeAlerta = "⚠️ <strong>Alerta de Carga Crítica:</strong> Este paciente está consumiendo casi la totalidad del tiempo de un solo enfermero en su turno. Se desaconseja asignarle un segundo paciente.";
        
        if (alertaTiss) {
            alertaTiss.style.backgroundColor = colorFondo;
            alertaTiss.style.color = colorTexto;
            alertaTiss.innerHTML = mensajeAlerta;
            alertaTiss.style.display = 'block';
        }
        descInterpretacion.innerText = "El paciente demanda cuidados altamente demandantes. Al borde de requerir atención exclusiva 1:1.";
    } 
    else { // Mayor a 45 puntos
        nivelCarga = "🚨 SOBRECARGA LABORAL DETECTADA (Turno Saturado)";
        colorFondo = "#fed7d7"; // Rojo pastel
        colorTexto = "#9b2c2c";
        mensajeAlerta = "🚨 <strong>ALERTA DE SEGURIDAD:</strong> El puntaje supera el límite seguro para un solo operador (>46 pts). Este paciente REQUIERE atención exclusiva 1:1. Mantener esta carga de trabajo aumenta exponencialmente el riesgo de eventos adversos (LPP, extubaciones accidentales, errores de medicación). ¡Notifica a tu superior y evoluciona!";
        
        if (alertaTiss) {
            alertaTiss.style.backgroundColor = colorFondo;
            alertaTiss.style.color = colorTexto;
            alertaTiss.innerHTML = mensajeAlerta;
            alertaTiss.style.display = 'block';
        }
        descInterpretacion.innerText = "Carga inaceptable para ser compartida. Exige reasignación inmediata de recursos para garantizar cuidados seguros.";
    }

    if (tituloInterpretacion) tituloInterpretacion.innerText = nivelCarga;
}

// Exponer globalmente para eventos inline en el HTML si es necesario
window.calcularTISS28 = calcularTISS28;