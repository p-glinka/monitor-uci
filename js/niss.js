
export function inicializarNiss() {
    const form = document.getElementById('niss-form');
    const biblioContenedor = document.getElementById('biblio-niss');

    if (!form) return;

    // 1. Inyectamos la bibliografía de forma automática al iniciar el sistema
    if (biblioContenedor) {
        biblioContenedor.innerHTML = `
            <h3 class="bibliografia-titulo-eje">❓ ¿Cómo se construyó este módulo?</h3>
            <div class="biblio-seccion-bloque">
                <div class="biblio-seccion-encabezado"><span>🧬</span> Fundamento científico</div>
                <div class="biblio-seccion-contenido">La escala NISS fue diseñada para superar las limitaciones del Glasgow en pacientes neurocríticos en UCI, integrando reflejos de tronco, reactividad pupilar y patrones respiratorios.</div>
            </div>
            <div class="biblio-seccion-bloque">
                <div class="biblio-seccion-encabezado"><span>📖</span> Publicaciones originales</div>
                <div class="biblio-seccion-contenido">• Escudero, D., et al. (2020). "Neurological Intensive Care Score (NISS)". <em>Journal of Critical Care</em>, 56, 124-131. <strong>DOI: 10.1016/j.jcrc.2019.12.015</strong></div>
            </div>
            <div class="biblio-seccion-bloque">
                <div class="biblio-seccion-encabezado"><span>🏥</span> Guías internacionales</div>
                <div class="biblio-seccion-contenido">• Consenso SEMICYUC sobre el manejo del paciente neurocrítico.<br>• Neurocritical Care Society (NCS) Guidelines.</div>
            </div>
            <div class="biblio-seccion-bloque">
                <div class="biblio-seccion-encabezado"><span>💡</span> Aplicación clínica</div>
                <div class="biblio-seccion-contenido">Indicada en pacientes con injuria cerebral aguda (TEC grave, ACV extenso, HSA) bajo ARM en entornos de cuidados críticos.</div>
            </div>
        `;
    }

    // 2. Lógica reactiva de cálculo al interactuar con el formulario
    form.addEventListener('change', () => {
        const formData = new FormData(form);
        
        const motora = parseInt(formData.get('motora'));
        const tronco = parseInt(formData.get('tronco'));
        const pupilas = parseInt(formData.get('pupilas'));
        const respiracion = parseInt(formData.get('respiracion'));

        // Si falta marcar alguna opción, salimos sin romper nada
        if (isNaN(motora) || isNaN(tronco) || isNaN(pupilas) || isNaN(respiracion)) {
            return; 
        }

        const puntajeTotal = motora + tronco + pupilas + respiracion;
        
        // Capturas de UI de la ventana y de la Pantalla Principal
        const scoreDisplay = document.getElementById('niss-score');
        const homeDisplay = document.getElementById('home-val-niss');
        const cardContainer = document.getElementById('niss-resultado-card');
        const tituloDisplay = document.getElementById('niss-interpretacion-titulo');
        const txtDisplay = document.getElementById('niss-interpretacion-txt');

        // Actualizo los  números
        if (scoreDisplay) scoreDisplay.textContent = puntajeTotal;
        if (homeDisplay) homeDisplay.textContent = puntajeTotal;
        if (cardContainer) cardContainer.className = 'resultado-card';

        // Clasificación clínica e interpretaciones
        if (puntajeTotal >= 11 && puntajeTotal <= 13) {
            if (cardContainer) cardContainer.classList.add('estado-estable');
            if (tituloDisplay) tituloDisplay.textContent = "🟢 Disfunción Neurológica Leve / Moderada";
            if (txtDisplay) txtDisplay.innerHTML = `<strong>Riesgo bajo de progresión inmediata.</strong> Paciente con reflejos de tronco preservados. Continuar con el esquema de monitoreo de rutina y control evolutivo del foco neurológico.`;
        } 
        else if (puntajeTotal >= 7 && puntajeTotal <= 10) {
            if (cardContainer) cardContainer.classList.add('estado-alerta');
            if (tituloDisplay) tituloDisplay.textContent = "🟡 Disfunción Neurológica Grave - Monitoreo Estricto";
            if (txtDisplay) txtDisplay.innerHTML = `<strong>Compromiso estructural significativo.</strong> Alta probabilidad de requerir intervenciones para control de la PIC. Se sugiere optimizar sedoanalgesia, asegurar normocápnica y evaluar TC de control urgente si hay caída de puntos.`;
        } 
        else if (puntajeTotal >= 1 && puntajeTotal <= 6) {
            if (cardContainer) cardContainer.classList.add('estado-critico');
            if (tituloDisplay) tituloDisplay.textContent = "🔴 Disfunción Neurológica Crítica / Falla de Tronco";
            if (txtDisplay) txtDisplay.innerHTML = `<strong>Falla severa de tronco encefálico o herniación inminente.</strong> Requiere protección avanzada de la vía aérea, soporte hemodinámico agresivo y descarte inmediato de lesiones quirúrgicas por neurocirugía.`;
        }
    });
}

export function resetNiss() {
    const form = document.getElementById('niss-form');
    const scoreDisplay = document.getElementById('niss-score');
    const homeDisplay = document.getElementById('home-val-niss');
    const tituloInterp = document.getElementById('niss-interpretacion-titulo');
    const txtInterp = document.getElementById('niss-interpretacion-txt');

    if (form) form.reset();
    if (homeDisplay) homeDisplay.textContent = '--';
    if (scoreDisplay) scoreDisplay.textContent = '--';
    if (tituloInterp) tituloInterp.textContent = 'Seleccione todas las variables';
    if (txtInterp) txtInterp.textContent = 'Complete la evaluación clínica para ver el informe.';
}