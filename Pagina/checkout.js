// Configura tu clave pública de Stripe
const stripe = Stripe('tu_clave_publica_de_stripe');

// Crea un elemento de Stripe para recopilar los detalles de la tarjeta
const elements = stripe.elements();
const cardElement = elements.create('card');

// Monta el elemento de la tarjeta en el DOM
cardElement.mount('#card-element');

// Maneja el envío del formulario y procesa el pago
const form = document.getElementById('payment-form');
form.addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada
  
  const {token, error} = await stripe.createToken(cardElement); // Crea un token de pago con los detalles de la tarjeta

  if (error) {
    // Si hay un error al crear el token, muestra un mensaje de error al usuario
    const paymentResult = document.getElementById('payment-result');
    paymentResult.textContent = error.message;
  } else {
    // Si el token se crea correctamente, envía el token y el monto al servidor para procesar el pago
    const amount = document.getElementById('amount').value;
    procesarPago(token.id, amount);
  }
});

// Función para procesar el pago en el servidor
async function procesarPago(token, amount) {
  try {
    const respuesta = await fetch('/procesar-pago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        amount: amount
      })
    });

    if (respuesta.ok) {
      // Si el pago se procesa correctamente, muestra un mensaje de éxito al usuario
      const paymentResult = document.getElementById('payment-result');
      paymentResult.textContent = '¡El pago se ha realizado con éxito!';
    } else {
      // Si hay un error al procesar el pago, muestra un mensaje de error al usuario
      const paymentResult = document.getElementById('payment-result');
      paymentResult.textContent = 'Hubo un problema al procesar el pago. Por favor, inténtalo de nuevo más tarde.';
    }
  } catch (error) {
    // Si hay un error en la solicitud, muestra un mensaje de error al usuario
    console.error('Error al procesar el pago:', error);
    const paymentResult = document.getElementById('payment-result');
    paymentResult.textContent = 'Hubo un problema al procesar el pago. Por favor, inténtalo de nuevo más tarde.';
  }
}
