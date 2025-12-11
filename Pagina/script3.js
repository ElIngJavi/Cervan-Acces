document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------
     LIMPIAR TELÉFONO Y PERMITIR SOLO NÚMEROS
  ---------------------------------------------------- */

  const phone = document.querySelector("#phone");

  if (phone) {
    // Limpia todo lo que no sea número al escribir
    phone.addEventListener("input", () => {
      phone.value = phone.value.replace(/\D/g, "");
    });

    // Solo permitir teclas válidas
    phone.addEventListener("keydown", (e) => {
      const allowedKeys = [
        "Backspace", "Delete", "ArrowLeft", "ArrowRight",
        "ArrowUp", "ArrowDown", "Tab", "Home", "End"
      ];

      if (allowedKeys.includes(e.key)) return;

      // Solo números del 0 al 9
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    // Bloquear pegar letras
    phone.addEventListener("paste", (e) => {
      const text = (e.clipboardData || window.clipboardData).getData("text");
      if (!/^[0-9]+$/.test(text)) {
        e.preventDefault();
      }
    });

    // Compatibilidad extra
    phone.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  /* ----------------------------------------------------
     VALIDACIÓN DEL FORMULARIO COMPLETO
  ---------------------------------------------------- */

  const form = document.querySelector("form");
  if (!form) return;

  const fields = {
    name: {
      input: form.querySelector("#name"),
      validate: (value) => value.trim().length >= 3,
      message: "El nombre debe tener al menos 3 caracteres.",
    },
    phone: {
      input: form.querySelector("#phone"),
      validate: (value) => /^[0-9]{10,15}$/.test(value),
      message: "Ingresa un número de teléfono válido (10 a 15 dígitos).",
    },
    email: {
      input: form.querySelector("#email"),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Ingresa un correo electrónico válido.",
    },
    message: {
      input: form.querySelector("#message"),
      validate: (value) => value.trim().length >= 10,
      message: "El mensaje debe tener mínimo 10 caracteres.",
    },
  };

  /* ----------------------------------------------------
     SUBMIT DEL FORMULARIO
  ---------------------------------------------------- */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;
    let errors = [];

    Object.keys(fields).forEach((key) => {
      const field = fields[key];
      const value = field.input.value;

      if (!field.validate(value)) {
        valid = false;
        errors.push(field.message);
        field.input.classList.add("input-error");
      } else {
        field.input.classList.remove("input-error");
      }
    });

    if (!valid) {
      alert("Corrige los siguientes errores:\n\n" + errors.join("\n"));
      return;
    }

    alert("Formulario enviado correctamente ✔");

    form.requestSubmit();
  });

});
