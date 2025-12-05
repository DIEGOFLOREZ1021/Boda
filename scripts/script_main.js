// Cuenta regresiva para el 08 de mayo de 2026, 17:00 hs
const targetDate = new Date("May 08, 2026 17:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = `
      <h2>¡Llegó el gran día!</h2>
      <p>Gracias por acompañarnos en este momento tan especial.</p>
    `;
    clearInterval(timer);
    return;
  }

  // Calcular tiempo restante
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Mostrar en HTML
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Actualizar cada segundo
const timer = setInterval(updateCountdown, 1000);
updateCountdown();

/**********************************************************************************************/ 

// Ocultar la indicación "Desliza" después del primer scroll
const album = document.querySelector(".album");
const hint = document.querySelector(".swipe-hint");

if (album && hint) {
  let hasScrolled = false;
  album.addEventListener("scroll", () => {
    if (!hasScrolled) {
      hasScrolled = true;
      hint.style.transition = "opacity 0.5s ease";
      hint.style.opacity = "0";
      setTimeout(() => (hint.style.display = "none"), 500);
    }
  });
}

/********************************************************************************** */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rsvpForm");
  const btn = document.querySelector(".btn-enviar");
  const loader = document.getElementById("loader");
  const successMessage = document.getElementById("successMessage");
  const closeBtn = document.getElementById("closeMessage");

  // Función para mostrar / ocultar loader y estado del botón
  function setSending(isSending) {
    if (btn) {
      btn.disabled = isSending;
      btn.style.opacity = isSending ? "0.6" : "1";
    }
    if (loader) loader.style.display = isSending ? "flex" : "none";
  }

  // Manejo del submit (si ya lo tienes, sustituye por esto)
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      setSending(true);

      const data = {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        asistencia: document.getElementById("asistencia").value,
        alergias: document.getElementById("alergias").value,
        mensaje: document.getElementById("mensaje").value
      };

      try {
        await fetch("https://script.google.com/macros/s/AKfycbyJ8eoefs3p0yVSto-SNi2z558GRxwdfpXVj5KmULVDwquEMTzQrlp4J0WQIvV8_rTy/exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          mode: "no-cors"
        });

        // Mostrar mensaje bonito
        if (successMessage) {
          successMessage.style.display = "flex";
          // opcional: mover foco al botón cerrar para accesibilidad
          if (closeBtn) closeBtn.focus();
        }

        form.reset();

      } catch (err) {
        console.error(err);
        alert("Error al enviar el formulario. Inténtalo de nuevo.");
      } finally {
        setSending(false);
      }
    });
  }

  // Cerrar con botón
  if (closeBtn) {
    closeBtn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (successMessage) successMessage.style.display = "none";
    });
  }

  // Cerrar tocando fuera de la tarjeta
  if (successMessage) {
    successMessage.addEventListener("click", function (ev) {
      // si el clic fue en el overlay (no dentro de .success-card), cerrar
      if (ev.target === successMessage) {
        successMessage.style.display = "none";
      }
    });
  }
});

/****************************************************************************/

const audio = document.getElementById("musicaFondo");
const btnMusica = document.getElementById("btnMusica");

audio.volume = 0.2;

function iniciarSonido() {
  audio.muted = false;
  audio.play().then(() => {
    console.log("Sonido activado");
  }).catch(err => {
    console.warn("Bloqueado todavía:", err);
  });
}

["click", "touchstart", "scroll", "keydown", "pointerdown"].forEach(evt => {
  document.addEventListener(evt, iniciarSonido, { once: true });
});

btnMusica.addEventListener("click", () => {
  if (audio.paused) {
    iniciarSonido();
  } else {
    audio.pause();
  }
});
