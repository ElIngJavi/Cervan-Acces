// Función para abrir WhatsApp con un mensaje predefinido
    function openWhatsApp() {
      // Número del vendedor al que se enviará el mensaje
      const phoneNumber = "6631012147"; // ¡Reemplaza esto con el número de tu vendedor!

      // Mensaje predefinido que se enviará al vendedor
      const message =
        "¡Hola! Estoy interesado en el paquete de Motor para puertas industriales. ¿Puedes proporcionarme más información?";

      // Generar el enlace de WhatsApp con el número y el mensaje
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      // Abrir WhatsApp en una nueva pestaña
      window.open(url, "_blank");
    }

    window.addEventListener('DOMContentLoaded', function() {
      // Obtener todos los enlaces dentro del elemento 'nav'
      var navLinks = document.querySelectorAll('nav a');

      // Iterar sobre cada enlace y agregar un evento de clic
      navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault(); // Evita el comportamiento predeterminado de los enlaces

          // Obtener el atributo 'href' del enlace para encontrar la sección correspondiente
          var target = this.getAttribute('href');
          var section = document.querySelector(target);

          // Comprobar si la sección tiene la clase 'fade-section'
          if (section.classList.contains('fade-section')) {
            // Si la sección tiene la clase 'fade-section', desplazarse suavemente utilizando la función 'scrollToSection'
            scrollToSection(section);
          } else {
            // Desplazamiento directo a la sección sin animación
            section.scrollIntoView({ behavior: 'smooth' });
          }

          // Remover la clase 'active' de todos los enlaces en 'nav'
          navLinks.forEach(function(navLink) {
            navLink.classList.remove('active');
          });

          // Agregar la clase 'active' al enlace que ha sido seleccionado
          this.classList.add('active');
        });
      });

      // Función para desplazarse suavemente a una sección con animación
      function scrollToSection(section) {
        var sectionPos = section.offsetTop;
        var startPos = window.pageYOffset;
        var distance = sectionPos - startPos;
        var duration = 1000; // Duración de la animación en milisegundos
        var startTime = null;

        function animation(currentTime) {
          if (startTime === null) {
            startTime = currentTime;
          }

          var elapsedTime = currentTime - startTime;
          var progress = Math.min(elapsedTime / duration, 1);
          var ease = easeOutQuart(progress);
          var newPosition = startPos + distance * ease;

          // Desplazarse suavemente a la nueva posición
          window.scrollTo(0, newPosition);

          if (elapsedTime < duration) {
            // Continuar la animación hasta que se alcance la duración especificada
            requestAnimationFrame(animation);
          }
        }

        // Función de aceleración suave (ease-out)
        function easeOutQuart(t) {
          return 1 - (--t) * t * t * t;
        }

        // Iniciar la animación
        requestAnimationFrame(animation);
      }

      // Datos de los productos
      const products = [
        {
          name: "Motor sencillo de garaje",
          price: 5122,
          image: "img/garaje1.jpg",
        },
        {
          name: "Abridor de puerta de garaje con respaldo de batería",
          price: 6980,
          image: "img/garaje2.png",
        },
        {
          name: "Motor para puerta de garaje residencial en CC, respaldo de batería, accionamiento por cadena y Wi-Fi en riel tubular para fijaciones más rígidas.",
          price: 7320,
          image: "img/garaje3.png",
        },
        {
          name: "Motor de gran capacidad de fuerza para garaje con Wi-Fi, montaje en la pared y respaldo de batería de CC.",
          price: 14892,
          image: "img/garaje4.jpg",
        },
        {
          name: "Motor de garaje de alto rendimiento en CC de gran fuerza.",
          price: 8344,
          image: "img/garaje5.jpg",
        },
        {
          name: "Operador de garaje industrial de alta potencia.",
          price: 23842,
          image: "img/garaje61.png",
        },
      ];
	  // Función para verificar si hay productos en el carrito
	  function hasProductsInCart() {
		const cartItems = document.querySelectorAll('.cart-item');
		return cartItems.length > 0;
		}
      // Función para agregar un producto al carrito
      function addToCart(product) {
        const cartItems = document.getElementById("cartItems");

        // Crear el elemento de lista para el producto
        const listItem = document.createElement("li");
        listItem.className = "cart-item";
        
        // Botón de eliminación
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", function () {
          cartItems.removeChild(listItem); // Eliminar el producto del carrito al hacer clic en el botón
          updateTotal(); // Recalcular el total después de eliminar un producto
        });
        listItem.appendChild(removeButton);

        // Agregar la imagen del producto
        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.className = "cart-product-image";
        listItem.appendChild(productImage);

        // Agregar el nombre del producto
        const productName = document.createElement("span");
        productName.textContent = product.name;
        productName.className = "cart-product-name";
        listItem.appendChild(productName);

        // Agregar el precio del producto
        const productPrice = document.createElement("span");
        productPrice.textContent = "MX$ " + product.price;
        productPrice.className = "cart-product-price";
        listItem.appendChild(productPrice);

        // Agregar el producto a la lista del carrito
        cartItems.appendChild(listItem);
      }

      // Función para manejar el clic en el botón de compra
      function handleBuyButtonClick(event) {
        const button = event.target;
        const productIndex = button.getAttribute("data-product-index");
        const product = products[productIndex];

        addToCart(product);
        updateTotal(); // Recalcula el total después de agregar un nuevo producto al carrito
      }

      // Asignar el manejador de eventos a los botones de compra
      const buyButtons = document.querySelectorAll(".buy-button");
      buyButtons.forEach((button, index) => {
        button.setAttribute("data-product-index", index);
        button.addEventListener("click", handleBuyButtonClick);
      });

      // Función para mostrar u ocultar el panel del carrito
      function toggleCartPanel() {
        const cartPanel = document.getElementById("cartPanel");
        cartPanel.classList.toggle("cart-panel-visible");
      }

      // Asignar el manejador de eventos al botón del carrito
      const cartButton = document.getElementById("cartButton");
      cartButton.addEventListener("click", toggleCartPanel);

      // Calcula el total y actualiza el elemento en el DOM
      function updateTotal() {
        const cartItems = document.querySelectorAll(".cart-item");
        let total = 0;

        cartItems.forEach((item) => {
          const priceText = item.querySelector(".cart-product-price").textContent;
          const price = parseFloat(priceText.replace("MX$ ", ""));
          total += price;
        });

        const totalElement = document.getElementById("cartTotal");
        totalElement.textContent = "Total: MX$ " + total.toFixed(2); // Mostrar el total con dos decimales
      }
  // Evento clic para mostrar el panel de pago o el mensaje si no hay productos en el carrito
payButton.addEventListener('click', () => {
  if (hasProductsInCart()) {
    cartPanel.style.display = 'none'; // Oculta el carrito de compras
    paymentPanel.style.display = 'block'; // Muestra el panel de pago
  } else {
    alert('No hay productos en el carrito. Agrega productos antes de proceder con el pago.');
  }
});

 // Evento clic para cerrar el panel de pago al hacer clic en el botón "X"
  closeButton.addEventListener('click', () => {
    cartPanel.style.display = 'block'; // Muestra el carrito de compras nuevamente
    paymentPanel.style.display = 'none'; // Oculta el panel de pago
  });
  
  // Evento clic para cerrar ambos paneles al hacer clic en el botón de carrito nuevamente
  cartButton.addEventListener('click', () => {
    if (paymentPanel.style.display === 'block') {
      cartPanel.style.display = 'block'; // Muestra el carrito de compras
      paymentPanel.style.display = 'none'; // Oculta el panel de pago
    } else if (cartPanel.style.display === 'block') {
      cartPanel.style.display = 'none'; // Oculta el carrito de compras
    } else {
      cartPanel.style.display = 'block'; // Muestra el carrito de compras
    }
  });
 // Evento clic para cerrar el panel de pago al hacer clic en el botón de carrito nuevamente
  cartButton.addEventListener('click', () => {
    if (paymentPanel.style.display === 'block') {
      cartPanel.style.display = 'block'; // Muestra el carrito de compras
      paymentPanel.style.display = 'none'; // Oculta el panel de pago
    }
  });
  // También puedes agregar un evento de envío de formulario para procesar el pago si lo necesitas
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Aquí puedes agregar código para procesar el pago si es necesario
    // Por ejemplo, enviar la información de pago a un servidor o procesador de pagos.
    alert('¡Gracias! El pago ha sido procesado.');
    paymentForm.reset(); // Limpia el formulario después de realizar el pago (puedes ajustar esto según tus necesidades)
  });
  
  // Evento clic para cerrar la ventana actual y abrir una nueva URL
  const collageLink = document.querySelector('nav a[href="index2.html"]');
  collageLink.addEventListener('click', function(e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace
    cerrarYAbrir('index2.html'); // Cierra la ventana actual y abre la nueva URL
  });

  // Función para cerrar la ventana actual y abrir una nueva URL
  function cerrarYAbrir(url) {
    window.location.href = url; // Redirige la ventana actual a la nueva URL
  }
  // Evento clic para navegar a la página index2.html
const goToIndex2Button = document.querySelector('nav a[href="index2.html"]');
goToIndex2Button.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Guarda los datos del carrito en el local storage
  const cartItems = document.getElementById("cartItems").innerHTML;
  localStorage.setItem("cartItems", cartItems);

  // Navega a la página index2.html
  window.location.href = 'index2.html';
});

});
    
	
