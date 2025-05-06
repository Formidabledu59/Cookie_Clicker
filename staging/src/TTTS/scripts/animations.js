import "../styles/animations.css";
import tttsahur from "../assets/action/tttsahur.png";

export function createCookieRain(container, amount,clicPower) {
  const rainCount = Math.min(30, Math.floor(Math.log2(amount + 1) * clicPower)); // Ajusté au gain de clic
  for (let i = 0; i < rainCount; i++) {
    const img = document.createElement("img");
    img.src = `${tttsahur}`;
    img.className = "cookie-rain";
    img.style.left = `${Math.random() * 100}%`;
    container.appendChild(img);

    setTimeout(() => {
      img.remove();
    }, 2000);
  } 
}

export function showFloatingText(x, y, text, container) {
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "floating-text";
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;
  container.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 1000);
}

export function handleCookieGain(container, x, y, amount, isClick) {
  if (isClick) {
    // Affiche le texte flottant pour un clic
    showFloatingText(x, y, `+${amount}`, container);
  } else {
    // Lance une pluie d'images pour un gain passif
    createCookieRain(container, amount);
  }
}