const images = document.querySelectorAll('.collage-image img');
const overlay = document.querySelector('.overlay');
const expandedImage = document.getElementById('expanded-image');

images.forEach(image => {
  image.addEventListener('click', () => {
    overlay.style.display = 'flex';
    expandedImage.src = image.src;
  });
});

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Restaura los datos del carrito desde el local storage cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    document.getElementById("cartItems").innerHTML = cartItems;
    updateTotal();
  }
});

// Evento clic para navegar a la página index.html
const returnLink = document.querySelector('nav a[href="index.html"]');
returnLink.addEventListener('click', function(e) {
  e.preventDefault(); // Evita el comportamiento predeterminado del enlace
  window.location.href = 'index.html'; // Navega a la página index.html en la ventana actual
  window.close(); // Cierra la ventana actual
});

// También puedes agregar un evento para cerrar la ventana después de navegar
returnLink.addEventListener('click', function() {
  window.close(); // Cierra la ventana actual
  
});

	
