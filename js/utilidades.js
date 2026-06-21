import { CONFIG_CLINICA } from './config-clinica.js';

// 🔋 Almacén estático de alertas actuales (Inicia todo el paciente estable)
let alertasActuales = { gcs: 'verde', irox: 'verde', rass: 'verde', braden: 'verde' };

// 1. REGISTRAR EN EL HISTORIAL (Guarda una sola vez por clic con hora fija congelada)
export function registrarEnHistorial(escala, puntaje) {
    let historial = JSON.parse(localStorage.getItem(`historial_${escala}`)) || [];
    
    // Obtenemos el tiempo del sistema en este instante exacto
    const ahora = new Date();
    const horaFija = String(ahora.getHours()).padStart(2, '0') + ':' + 
                     String(ahora.getMinutes()).padStart(2, '0') + ':' + 
                     String(ahora.getSeconds()).padStart(2, '0');

    // Armamos el registro guardando un texto plano (así el reloj no avanza)
    const nuevoRegistro = {
        fechaHora: horaFija,
        valor: parseFloat(puntaje)
    };
    
    historial.unshift(nuevoRegistro);
    
    if (historial.length > 5) {
        historial = historial.slice(0, 5);
    }
    
    localStorage.setItem(`historial_${escala}`, JSON.stringify(historial));
    
    actualizarLineaTiempoUI(escala);
}

// 2. DIBUJAR LA LÍNEA DE TIEMPO (Borra la pantalla antes de pintar para evitar bucles)
export function actualizarLineaTiempoUI(escala) {
    const contenedor = document.getElementById(`timeline-${escala}`);
    if (!contenedor) return;
    
    // 🧼 Limpieza profunda de la caja antes de dibujar
    contenedor.innerHTML = '';
    
    let historial = JSON.parse(localStorage.getItem(`historial_${escala}`)) || [];
    
    if (historial.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">Sin registros en el turno actual.</p>';
        return;
    }
    
    let htmlLista = '<ul style="list-style: none; padding-left: 5px; font-size: 0.9rem;">';
    
    historial.forEach((reg, index) => {
        let tendencia = '';
        let colorTendencia = '#4a5568';
        
        if (index < historial.length - 1) {
            const valorAnterior = historial[index + 1].valor;
            if (reg.valor > valorAnterior) {
                tendencia = ' 📈 Mejoría';
                colorTendencia = '#38a169';
            } else if (reg.valor < valorAnterior) {
                tendencia = ' 📉 Deterioro';
                colorTendencia = '#e53e3e';
            }
        }
        
        htmlLista += `
            <li style="margin-bottom: 8px; border-left: 3px solid ${colorTendencia}; padding-left: 8px;">
                <strong style="color: #718096;">⏰ ${reg.fechaHora} hs</strong><br>
                <span style="font-weight: bold; color: ${colorTendencia};">${reg.valor} pts</span>${tendencia}
            </li>
        `;
    });
    
    htmlLista += '</ul>';
    contenedor.innerHTML = htmlLista;
}

// 3. GESTIÓN DE ALERTAS VISUALES (Semáforos clínicos + Conexión esfera)
export function mostrarAlerta(idContenedor, mensaje, tipo, detalle = '', escala = '') {
    // Si pasás el elemento HTML directo, lo manejamos de forma segura
    const contenedor = (typeof idContenedor === 'string') ? document.getElementById(idContenedor) : idContenedor;
    if (!contenedor) return;

    if (!mensaje) {
        contenedor.style.display = 'none';
        return;
    }

    contenedor.className = 'alerta-clinica'; 
    
    // Estandarizamos el texto del tipo a minúsculas para evitar errores ('roja' -> 'rojo')
    let tipoLimpio = tipo.toLowerCase();
    if (tipoLimpio === 'roja') tipoLimpio = 'rojo';
    if (tipoLimpio === 'amarilla') tipoLimpio = 'amarillo';

    if (tipoLimpio === 'rojo') contenedor.classList.add('alerta-roja');
    if (tipoLimpio === 'amarillo') contenedor.classList.add('alerta-amarilla');
    if (tipoLimpio === 'verde') contenedor.classList.add('alerta-verde');

    // Inyecta el formato de texto médico (Titulado con detalle si existe)
    contenedor.innerHTML = detalle ? `<strong>${mensaje}</strong><br><small>${detalle}</small>` : mensaje;
    contenedor.style.display = 'block';

    // 🔮 DETECTOR AUTOMÁTICO DE ESCALAS PARA EL MONITOR 3D
    let nombreEscala = escala;
    // Si no vino la escala explícita, la deduce buscando la palabra clave en el ID de la caja
    if (!nombreEscala && typeof idContenedor === 'string') {
        const idLower = idContenedor.toLowerCase();
        if (idLower.includes('gcs') || idLower.includes('glasgow')) nombreEscala = 'gcs';
        else if (idLower.includes('irox')) nombreEscala = 'irox';
        else if (idLower.includes('rass')) nombreEscala = 'rass';
        else if (idLower.includes('braden')) nombreEscala = 'braden';
    }

    if (nombreEscala) {
        actualizarMonitorGeneral(nombreEscala.toLowerCase(), tipoLimpio);
    }
}

// 4. MONITOR GENERAL (Esfera Tridimensional con gradientes médicos UCI)
export function actualizarMonitorGeneral(escala, tipoAlerta) {
    // 1. Guardamos el estado de la escala que se acaba de tocar
    alertasActuales[escala] = tipoAlerta || 'verde';

    // 2. Buscamos el peor escenario clínico activo en la guardia
    const estados = Object.values(alertasActuales);
    let peorEstado = 'verde';

    if (estados.includes('rojo')) {
        peorEstado = 'rojo';
    } else if (estados.includes('amarillo')) {
        peorEstado = 'amarillo';
    }

    // 3. Modificamos la esfera y el texto dinámicamente con los renders 3D médicos
    const esfera = document.getElementById('esfera-clinica');
    const texto = document.getElementById('texto-estado');
    if (!esfera || !texto) return;

    if (peorEstado === 'rojo') {
        esfera.style.background = 'radial-gradient(circle at 30% 30%, #fc8181, #c53030 40%, #651a1a 90%)';
        texto.innerText = 'CRÍTICO';
        texto.style.color = '#c53030';
    } else if (peorEstado === 'amarillo') {
        esfera.style.background = 'radial-gradient(circle at 30% 30%, #f6e05e, #d69e2e 40%, #744210 90%)';
        texto.innerText = 'PRECAUCIÓN';
        texto.style.color = '#d69e2e';
    } else {
        esfera.style.background = 'radial-gradient(circle at 30% 30%, #48bb78, #2f855a 40%, #1a4d32 90%)';
        texto.innerText = 'ESTABLE';
        texto.style.color = '#2f855a';
    }
}