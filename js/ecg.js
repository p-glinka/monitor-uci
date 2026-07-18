// =========================================================================================
//  MÓDULO DE SIMULACIÓN DE RITMOS CARDÍACOS AVANZADO (NATIVO CANVAS) - CORREGIDO y modularizado
// =========================================================================================

const infoRitmos = {
    sinusal: { nombre: "RITMO SINUSAL NORMAL", fc: "75", desc: "<strong>Descripción Clínica:</strong> Conducción fisiológica normal del nodo sinusal. Frecuencia regular (60-100 lpm). Cada complejo QRS está precedido por una onda P normal y constante." },
    bradicardia: { nombre: "BRADICARDIA SINUSAL", fc: "45", desc: "<strong>Descripción Clínica:</strong> Ritmo de origen sinusal pero con una frecuencia cardíaca inferior a 60 lpm. Morfología de ondas normal. Común en atletas o por aumento del tono vagal, fármacos beta-bloqueantes o disfunción del nodo." },
    taquicardia: { nombre: "TAQUICARDIA SINUSAL", fc: "130", desc: "<strong>Descripción Clínica:</strong> Ritmo sinusal regular con frecuencia cardíaca superior a 100 lpm. Respuesta fisiológica común ante fiebre, dolor, hipovolemia, anemia o estimulación simpática. Ondas P y QRS normales pero muy juntos." },
    flutter: { nombre: "FLUTTER ATRIAL (ALETEO AURICULAR)", fc: "88", desc: "<strong>Descripción Clínica:</strong> Arritmia supraventricular por macro-reentrada auricular. Se caracteriza por la presencia de ondas de activación auricular rápidas y regulares en forma de <strong>'dientes de sierra' (ondas F)</strong>, típicamente a una frecuencia auricular de 250-350 lpm, con un bloqueo de conducción AV (ej. 3:1 o 4:1)." },
    fa: { nombre: "FIBRILACIÓN ATRIAL (FA)", fc: "124", desc: "<strong>Descripción Clínica:</strong> Activación auricular caótica y desorganizada sin contracción auricular efectiva. Ausencia de ondas P (reemplazadas por ondas de fibrilación 'f' irregulares). Respuesta ventricular (intervalos R-R) <strong>completamente irregular</strong>." },
    tsv: { nombre: "TAQUICARDIA SUPRAVENTRICULAR (TSV)", fc: "185", desc: "<strong>Descripción Clínica:</strong> Taquicardia de inicio y fin súbito originada por encima del haz de His (frecuentemente por reentrada nodal). Frecuencia muy elevada (150-250 lpm) con ritmo regular y <strong>complejos QRS angostos</strong>. La onda P suele quedar oculta o retrógrada." },
    tv: { nombre: "TAQUICARDIA VENTRICULAR (TV MONOMÓRFICA)", fc: "160", desc: "<strong>Descripción Clínica:</strong> Sucesión de tres o más complejos de origen ventricular. Ritmo regular con <strong>complejos QRS anchos (>0.12s) y aberrantes</strong>. Emergencia médica por alto riesgo de descompensación hemodinámica o degradación a FV." },
    torsades: { nombre: "TORSADES DE POINTES (TV POLIMÓRFICA)", fc: "210", desc: "<strong>Descripción Clínica:</strong> Forma específica de taquicardia ventricular polimórfica asociada a la prolongación del intervalo QT. Los complejos QRS anchos muestran una <strong>rotación continua del eje eléctrico</strong>, pareciendo girar o 'retorcerse' alrededor de la línea isoeléctrica. ¡Altamente inestable!" },
    fv: { nombre: "FIBRILACIÓN VENTRICULAR (FV)", fc: "0", desc: "<strong>Descripción Clínica:</strong> Actividad eléctrica ventricular totalmente caótica y amorfa. No existen complejos QRS ni ondas definibles. Provoca ausencia de gasto cardíaco y pulso. <strong>Paro Cardiorrespiratorio - Ritmo Desfibrilable</strong>." },
    asistolia: { nombre: "ASISTOLIA", fc: "0", desc: "<strong>Descripción Clínica:</strong> Ausencia completa de actividad eléctrica en el miocardio ventricular (línea plana). Confirmar conexiones y derivadas. Iniciar compresiones e insufleciones (RCP) y administración de Adrenalina según protocolo." }
};

function calcularVoltajeECG(tipo, paso, alturaCanvas) {
    const centro = alturaCanvas / 2;
    switch (tipo) {
        case 'sinusal': {
            let p = paso % 110;
            if (p > 15 && p < 30) return centro - 6 * Math.sin((p - 15) * Math.PI / 15);
            if (p >= 35 && p < 38) return centro + (p - 35) * 6;
            if (p >= 38 && p < 42) return centro - 85 * Math.sin((p - 38) * Math.PI / 4);
            if (p >= 42 && p < 46) return centro + 22 * Math.sin((p - 42) * Math.PI / 4);
            if (p > 65 && p < 85) return centro - 12 * Math.sin((p - 65) * Math.PI / 20);
            return centro;
        }
        case 'bradicardia': {
            let p = paso % 190;
            if (p > 30 && p < 45) return centro - 6 * Math.sin((p - 30) * Math.PI / 15);
            if (p >= 50 && p < 53) return centro + (p - 50) * 6;
            if (p >= 53 && p < 57) return centro - 85 * Math.sin((p - 53) * Math.PI / 4);
            if (p >= 57 && p < 61) return centro + 22 * Math.sin((p - 57) * Math.PI / 4);
            if (p > 80 && p < 100) return centro - 12 * Math.sin((p - 80) * Math.PI / 20);
            return centro;
        }
        case 'taquicardia': {
            let p = paso % 60;
            if (p > 5 && p < 15) return centro - 6 * Math.sin((p - 5) * Math.PI / 10);
            if (p >= 18 && p < 21) return centro + (p - 18) * 6;
            if (p >= 21 && p < 25) return centro - 85 * Math.sin((p - 21) * Math.PI / 4);
            if (p >= 25 && p < 29) return centro + 22 * Math.sin((p - 25) * Math.PI / 4);
            if (p > 35 && p < 50) return centro - 12 * Math.sin((p - 35) * Math.PI / 15);
            return centro;
        }
        case 'flutter': {
            let p = paso % 80; 
            if (p < 55) return centro - 10 * ((paso % 15) / 15) + 5; 
            if (p >= 55 && p < 58) return centro + (p - 55) * 6;
            if (p >= 58 && p < 62) return centro - 85 * Math.sin((p - 58) * Math.PI / 4);
            if (p >= 62 && p < 66) return centro + 22 * Math.sin((p - 62) * Math.PI / 4);
            return centro;
        }
        case 'fa': {
            let fWave = 4 * Math.sin(paso * 0.9) * Math.cos(paso * 0.4);
            let disparaQRS = (paso % 82 === 0 || paso % 143 === 0 || paso % 225 === 0 || paso % 291 === 0);
            return disparaQRS ? centro - 80 : centro + fWave;
        }
        case 'tsv': {
            let p = paso % 42;
            if (p >= 5 && p < 8) return centro + (p - 5) * 6;
            if (p >= 8 && p < 12) return centro - 85 * Math.sin((p - 8) * Math.PI / 4);
            if (p >= 12 && p < 16) return centro + 22 * Math.sin((p - 12) * Math.PI / 4);
            if (p >= 16 && p < 32) return centro - 15 * Math.sin((p - 16) * Math.PI / 16);
            return centro;
        }
        case 'tv': return centro - 65 * Math.sin(paso * Math.PI / 11);
        case 'torsades': return centro - ((65 * Math.sin(paso * Math.PI / 9)) * Math.sin(paso * 0.025));
        case 'fv': return centro - (28 * Math.sin(paso * 0.35) + 14 * Math.cos(paso * 0.8) * Math.sin(paso * 0.15));
        case 'asistolia': return centro + (0.3 * Math.sin(paso * 0.15));
        default: return centro;
    }
}

const MonitorPrincipal = {
    canvas: null, ctx: null, x: 0, ultimaY: 0, iteracion: 0, ritmo: 'sinusal', animacionId: null,

    init(elementId) {
        this.canvas = document.getElementById(elementId);
        if (!this.canvas) return false;
        
        this.ctx = this.canvas.getContext('2d');
        this.x = 0;
        this.iteracion = 0;
        
        this.canvas.width = this.canvas.offsetWidth || 600;
        this.canvas.height = this.canvas.offsetHeight || 250;
        this.ultimaY = this.canvas.height / 2;
        
        this.dibujarCuadricula();
        return true;
    },
    ajustarPantalla() {
        if (this.canvas && this.canvas.width !== this.canvas.offsetWidth && this.canvas.offsetWidth > 0) {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight || 250;
            this.ultimaY = this.canvas.height / 2;
            this.dibujarCuadricula();
        }
    },
    dibujarCuadricula() {
        if (!this.ctx) return;
        this.ctx.strokeStyle = '#0d2411';
        this.ctx.lineWidth = 0.5;
        // 🟢 Corregido: Se agregaron los "this.ctx." que faltaban acá abajo
        for (let i = 0; i < this.canvas.width; i += 15) {
            this.ctx.beginPath(); 
            this.ctx.moveTo(i, 0); 
            this.ctx.lineTo(i, this.canvas.height); 
            this.ctx.stroke();
        }
        for (let j = 0; j < this.canvas.height; j += 15) {
            this.ctx.beginPath(); 
            this.ctx.moveTo(0, j); 
            this.ctx.lineTo(this.canvas.width, j); 
            this.ctx.stroke();
        }
    },
    render() {
        if (!this.canvas || !this.ctx) return;
        this.ajustarPantalla();
        this.iteracion++;

        this.ctx.fillStyle = '#050f05';
        this.ctx.fillRect(this.x, 0, 15, this.canvas.height);

        if (this.x % 15 === 0) {
            this.ctx.strokeStyle = '#0d2411';
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath(); 
            this.ctx.moveTo(this.x, 0); 
            this.ctx.lineTo(this.x, this.canvas.height); 
            this.ctx.stroke();
        }

        let actualY = calcularVoltajeECG(this.ritmo, this.iteracion, this.canvas.height);

        if (this.x === 0) {
            this.ultimaY = actualY;
        }

        this.ctx.strokeStyle = '#00ff41';
        this.ctx.lineWidth = 2.5;
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = '#00ff41';

        this.ctx.beginPath();
        this.ctx.moveTo(this.x - 1, this.ultimaY);
        this.ctx.lineTo(this.x, actualY);
        this.ctx.stroke();

        this.ctx.shadowBlur = 0;
        this.ultimaY = actualY;
        
        this.x = (this.x + 1) >= this.canvas.width ? 0 : this.x + 1;

        this.animacionId = requestAnimationFrame(() => this.render());
    }
};

const MonitorMini = {
    canvas: null, ctx: null, x: 0, ultimaY: 0, iteracion: 0, animacionId: null,

    init(elementId) {
        this.canvas = document.getElementById(elementId);
        if (!this.canvas) return false;
        
        this.ctx = this.canvas.getContext('2d');
        this.x = 0;
        this.iteracion = 0;
        
        this.canvas.width = this.canvas.offsetWidth || 300;
        this.canvas.height = this.canvas.offsetHeight || 140;
        this.ultimaY = this.canvas.height / 2;
        return true;
    },
    ajustarPantalla() {
        if (this.canvas && this.canvas.width !== this.canvas.offsetWidth && this.canvas.offsetWidth > 0) {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight || 140;
            this.ultimaY = this.canvas.height / 2;
        }
    },
    render() {
        if (!this.canvas || !this.ctx) return;
        this.ajustarPantalla();
        this.iteracion++;

        let actualY = this.canvas.height / 2;
        let fase = this.iteracion % 40;
        if (fase === 10) actualY -= 4;
        if (fase === 14) actualY += 6;
        if (fase === 16) actualY -= 28;
        if (fase === 18) actualY += 12;
        if (fase === 24) actualY -= 6;

        if (this.x === 0) {
            this.ultimaY = actualY;
        }

        this.ctx.fillStyle = 'rgba(26, 32, 44, 0.12)';
        this.ctx.fillRect(this.x, 0, 8, this.canvas.height);

        this.ctx.strokeStyle = '#38a169';
        this.ctx.lineWidth = 1.8;
        this.ctx.lineCap = 'round';

        this.ctx.beginPath();
        this.ctx.moveTo(this.x - 1, this.ultimaY);
        this.ctx.lineTo(this.x, actualY);
        this.ctx.stroke();

        this.ultimaY = actualY;
        this.x = (this.x + 1.2) >= this.canvas.width ? 0 : this.x + 1.2;

        this.animacionId = requestAnimationFrame(() => this.render());
    }
};

window.cambiarRitmoECG = function(tipo, elemento) {
    if (!infoRitmos[tipo]) return;
    
    MonitorPrincipal.ritmo = tipo;

    const grupo = elemento.closest('.grupo-opciones');
    if (grupo) {
        grupo.querySelectorAll('.btn-opcion').forEach(btn => btn.classList.remove('active'));
        elemento.classList.add('active');
    }

    const fcElem = document.getElementById('monitor-fc');
    const estadoElem = document.getElementById('monitor-estado');
    const descElem = document.getElementById('info-clinica-ecg');
    
    if (fcElem) fcElem.innerText = infoRitmos[tipo].fc;
    if (estadoElem) estadoElem.innerText = infoRitmos[tipo].nombre;
    if (descElem) descElem.innerHTML = infoRitmos[tipo].desc;

    const badgeHome = document.getElementById('home-val-ecg');
    if (badgeHome) {
        if (tipo === 'sinusal') badgeHome.innerText = '🟢';
        else if (tipo === 'bradicardia' || tipo === 'taquicardia') badgeHome.innerText = '🟡';
        else if (tipo === 'asistolia' || tipo === 'fv') badgeHome.innerText = '💀';
        else badgeHome.innerText = '🔴';
    }
};

// =========================================================================================
//  PUNTOS DE EXPORTACIÓN EXCLUSIVOS UNIFICADOS
// =========================================================================================

export function inicializarMiniECGHome() {
    if (MonitorMini.animacionId) cancelAnimationFrame(MonitorMini.animacionId);
    if (MonitorMini.init('mini-canvas-ecg-home')) {
        MonitorMini.render();
    }
}

export function inicializarECG() {
    // 1. Monitor Grande
    if (MonitorPrincipal.animacionId) cancelAnimationFrame(MonitorPrincipal.animacionId);
    if (MonitorPrincipal.init('canvas-ecg')) {
        MonitorPrincipal.render();
    }
    // 2. Monitor Chico
    inicializarMiniECGHome();
}