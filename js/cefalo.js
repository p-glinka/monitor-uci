// 🩺 MÓDULO DE VALORACIÓN CÉFALO-CAUDAL INTERACTIVO

window.toggleAcordeonCefalo = function(idBloque) {
    const elemento = document.getElementById(idBloque);
    if (!elemento) return;

    // Verificar si ya está abierto
    const estaAbierto = elemento.style.display === 'block';

    // Opcional: Cerrar todos los demás para mantener la pantalla hiper-limpia
    document.querySelectorAll('.bloque-cefalo > div[id^="cc-"]').forEach(div => {
        div.style.display = 'none';
        // Resetear la flechita del encabezado hermano
        if (div.previousElementSibling) {
            div.previousElementSibling.lastElementChild.innerText = '▼';
        }
    });

    // Conmutar el estado del bloque cliqueado
    if (!estaAbierto) {
        elemento.style.display = 'block';
        elemento.previousElementSibling.lastElementChild.innerText = '▲';
        
        //  Enviar telemetría a Google Analytics para saber qué valoran más
        if (typeof gtag === 'function') {
            gtag('event', 'ver_bloque_cefalo', {
                'seccion_valoracion': idBloque
            });
        }
    } else {
        elemento.style.display = 'none';
        elemento.previousElementSibling.lastElementChild.innerText = '▼';
    }
};