import "../styles/animations.css";
import goldenCookie from "../assets/action/golden_cookie.png";

export function createCookieRain(container, amount, clicPower) {
  const rainCount = Math.min(30, Math.floor(Math.log2(amount + 1) * clicPower)); // Ajusté au gain de clic
  for (let i = 0; i < rainCount; i++) {
    const img = document.createElement("img");
    img.src = `${goldenCookie}`;
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


export function randomSpawn(passiveGain = 1) {
  return new Promise((resolve) => {
    const reward = Math.floor(Math.random() * (passiveGain * 1000 - 1 + 1)) + 1;
    const img = document.createElement("img");
    img.src = goldenCookie;
    img.className = "golden-cookie fade-in";
    img.style.position = "absolute";
    img.style.top = `${Math.random() * 80 + 10}%`;
    img.style.left = `${Math.random() * 80 + 10}%`;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.cursor = "pointer";
    img.style.zIndex = 1000;
    img.style.transition = "opacity 1s";

    document.body.appendChild(img);

    let timeout = setTimeout(() => {
      img.classList.remove("fade-in");
      img.classList.add("fade-out");
      setTimeout(() => img.remove(), 1000);
      resolve(0);
    }, 5000);

    img.addEventListener("click", (e) => {
      clearTimeout(timeout);
      img.remove();
      resolve({
        reward,
        x: e.clientX,
        y: e.clientY
      });
    });
  });
}