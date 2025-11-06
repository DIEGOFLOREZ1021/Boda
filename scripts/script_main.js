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

