// Esperar a que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', function() {
    // Variables para el control de productos y lectura
    let indiceProductoActual = 0;
    const productos = document.querySelectorAll('.product-card');

    // Función para leer el producto actual
    function leerProducto(indice) {
        if (productos.length === 0) return;
        const producto = productos[indice];
        if (!producto) return;
        const titulo = producto.querySelector('.product-title')?.textContent || '';
        const descripcion = producto.querySelector('.product-description')?.textContent || '';
        const precio = producto.querySelector('.product-price')?.textContent || '';
        const texto = `Producto ${indice + 1}: ${titulo}. ${descripcion}. Precio: ${precio}.`;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-ES';
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);

        // Resaltar el producto seleccionado visualmente
        productos.forEach(p => p.classList.remove('seleccionado'));
        producto.classList.add('seleccionado');
    }

    // Evento al hacer clic en "Productos" en la barra de navegación
    const linkProductos = document.querySelector('a[data-translate="Productos"]');
    if (linkProductos) {
        linkProductos.addEventListener('click', function(e) {
            e.preventDefault();
            indiceProductoActual = 0;
            leerProducto(indiceProductoActual);
            document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Evento para cambiar de producto con flechas y añadir al carrito con Enter
    document.addEventListener('keydown', function(e) {
        if (!document.querySelector('.product-card.seleccionado')) return;
        if (e.key === 'ArrowRight') {
            if (indiceProductoActual < productos.length - 1) {
                indiceProductoActual++;
                leerProducto(indiceProductoActual);
            }
        } else if (e.key === 'ArrowLeft') {
            if (indiceProductoActual > 0) {
                indiceProductoActual--;
                leerProducto(indiceProductoActual);
            }
        } else if (e.key === 'f' || e.key === 'F') {
            // Añadir al carrito el producto seleccionado con la tecla 'f'
            const producto = productos[indiceProductoActual];
            const btn = producto.querySelector('.add-to-cart');
            if (btn) btn.click();
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance('Producto agregado exitosamente');
            utter.lang = 'es-ES';
            utter.rate = 1;
            window.speechSynthesis.speak(utter);
        }
    });

    // Opcional: estilos para resaltar el producto seleccionado
    const style = document.createElement('style');
    style.textContent = `
    .product-card.seleccionado {
        outline: 3px solid #ff9800;
        box-shadow: 0 0 10px #ff9800;
    }
    `;
    document.head.appendChild(style);

    // Carrito de compras
    const cartButton = document.querySelector('.nav-cart');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');

    if (cartButton && cartOverlay && closeCart) {
        cartButton.addEventListener('click', function() {
            cartOverlay.classList.add('active');
        });
        closeCart.addEventListener('click', function() {
            cartOverlay.classList.remove('active');
        });
        cartOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
    // Preguntar si desea agregar más productos después de añadir uno al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                const pregunta = new SpeechSynthesisUtterance('¿Desea agregar otro producto? Presione 1 para sí o 2 para no');
                pregunta.lang = 'es-ES';
                pregunta.rate = 1;
                window.speechSynthesis.speak(pregunta);
            }, 1000);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === '1') {
            const continuar = new SpeechSynthesisUtterance('Puede seguir comprando. Use las flechas para navegar entre productos');
            continuar.lang = 'es-ES';
            continuar.rate = 1;
            window.speechSynthesis.speak(continuar);
        } else if (e.key === '2') {
            cartButton.click();
        }
    });
    // Leer resumen del carrito cuando se muestre el carrito
    if (cartOverlay) {
        const leerResumenCarrito = () => {
            const items = cartItems.querySelectorAll('div');
            let resumen = '';
            if (items.length === 0) {
                resumen = 'El carrito está vacío.';
            } else {
                resumen = `Tienes ${items.length} producto${items.length > 1 ? 's' : ''} en el carrito. `;
                items.forEach((item, idx) => {
                    resumen += `Producto ${idx + 1}: ${item.textContent}. `;
                });
                resumen += '¿Quiere finalizar la compra? Pulse la tecla J.';
            }
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(resumen);
            utter.lang = 'es-ES';
            utter.rate = 1;
            window.speechSynthesis.speak(utter);
        };

        // Leer resumen al abrir el carrito
        cartButton && cartButton.addEventListener('click', function() {
            cartOverlay.classList.add('active');
            setTimeout(leerResumenCarrito, 350); // Espera a que el overlay sea visible
        });

        // Leer resumen si se abre el overlay por otro medio
        const observer = new MutationObserver(() => {
            if (cartOverlay.classList.contains('active')) {
                setTimeout(leerResumenCarrito, 350);
            }
        });
        observer.observe(cartOverlay, { attributes: true, attributeFilter: ['class'] });

        // Decir "Finalizar compra" con la tecla 'j' cuando el carrito está abierto
        document.addEventListener('keydown', function(e) {
            if (
            cartOverlay.classList.contains('active') &&
            (e.key === 'j' || e.key === 'J')
            ) {
            window.speechSynthesis.cancel();
            const finalizar = new SpeechSynthesisUtterance('Finalizar compra');
            finalizar.lang = 'es-ES';
            finalizar.rate = 1;
            finalizar.onend = function() {
                window.location.href = 'compra.html';
            };
            window.speechSynthesis.speak(finalizar);
            }
        });
    }
});