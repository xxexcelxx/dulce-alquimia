// ==========================================================================
// SCRIPT.JS - ESTADO FINAL DEFINITIVO COMPATIBLE CON ADOBE DREAMWEAVER
// ==========================================================================

// --- LÓGICA GLOBAL: Filtrado de productos en tiempo real ---
function filtrarProductos(categoriaSeleccionada) {
    var tarjetas = document.querySelectorAll('.producto-card');
    for (var i = 0; i < tarjetas.length; i++) {
        var tarjeta = tarjetas[i];
        var elementoCategoria = tarjeta.querySelector('.categoria');
        if (elementoCategoria) {
            var textoCategoria = elementoCategoria.textContent || elementoCategoria.innerText;
            if (categoriaSeleccionada === 'todos' || textoCategoria === categoriaSeleccionada) {
                tarjeta.classList.remove('tarjeta-oculta');
            } else {
                tarjeta.classList.add('tarjeta-oculta');
            }
        }
    }
}

// --- LÓGICA GLOBAL: Activación del Lightbox con mini-galería ---
function abrirModal(imgSrc1, imgSrc2, titulo, precio, ingredientes) {
    var modal = document.getElementById('modal-producto');
    if (modal) {
        document.getElementById('modal-img').src = imgSrc1;
        document.getElementById('modal-titulo').textContent = titulo;
        document.getElementById('modal-precio').textContent = precio;
        document.getElementById('modal-ingredientes').textContent = ingredientes;
        document.getElementById('thumb1').src = imgSrc1;
        document.getElementById('thumb2').src = imgSrc2;
        modal.classList.remove('modal-oculto');
        modal.classList.add('modal-activo');
    }
}

// --- LÓGICA GLOBAL: Intercambio dinámico de fotos en galería ---
function cambiarFotoModal(nuevoSrc) {
    var fotoGrande = document.getElementById('modal-img');
    if (fotoGrande) {
        fotoGrande.src = nuevoSrc;
    }
}

// Vinculación explícita al objeto Window para resolver alertas de "defined but never used"
window.filtrarProductos = filtrarProductos;
window.abrirModal = abrirModal;
window.cambiarFotoModal = cambiarFotoModal;

// Bloque de eventos al cargar el DOM (Compatibilidad clásica)
document.addEventListener('DOMContentLoaded', function() {
    var botonModo = document.getElementById('toggle-mode');
    var body = document.body;
    var modoGuardado = localStorage.getItem('background-mode');

    if (modoGuardado === 'dark') {
        body.classList.add('dark-mode');
        if (botonModo) botonModo.textContent = 'Modo Diurno';
    } else {
        if (botonModo) botonModo.textContent = 'Modo Alquimia';
    }

    if (botonModo) {
        botonModo.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('background-mode', 'dark');
                botonModo.textContent = 'Modo Diurno';
            } else {
                localStorage.setItem('background-mode', 'light');
                botonModo.textContent = 'Modo Alquimia';
            }
        });
    }

    var formulario = document.querySelector('.formulario-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            var nombreCliente = document.getElementById('nombre').value;
            var mensajeConfirmacion = document.createElement('div');
            mensajeConfirmacion.className = 'alerta-exito';
            mensajeConfirmacion.innerHTML = '<h3>¡Pedido Recibido, ' + nombreCliente + '!</h3><p>Nuestros alquimistas del sabor están revisando tu solicitud. Te contactaremos muy pronto.</p>';
            formulario.insertBefore(mensajeConfirmacion, formulario.firstChild);
            formulario.reset();
            setTimeout(function() {
                mensajeConfirmacion.style.opacity = '0';
                setTimeout(function() { mensajeConfirmacion.remove(); }, 500);
            }, 5000);
        });
    }

    var botonesFiltro = document.querySelectorAll('.btn-filtro');
    for (var j = 0; j < botonesFiltro.length; j++) {
        botonesFiltro[j].addEventListener('click', function() {
            for (var k = 0; k < botonesFiltro.length; k++) {
                botonesFiltro[k].classList.remove('activo');
            }
            this.classList.add('activo');
        });
    }

    var modalProducto = document.getElementById('modal-producto');
    var btnCerrarModal = document.querySelector('.cerrar-modal');
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', function() {
            if (modalProducto) {
                modalProducto.classList.remove('modal-activo');
                modalProducto.classList.add('modal-oculto');
            }
        });
    }

    window.addEventListener('click', function(evento) {
        if (evento.target === modalProducto) {
            modalProducto.classList.remove('modal-activo');
            modalProducto.classList.add('modal-oculto');
        }
    });
});