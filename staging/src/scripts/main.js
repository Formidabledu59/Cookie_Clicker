import "../styles/style.css";
import "../styles/game.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Mon Cookie Clicker</h1>
    <div id="cookie"></div>
    <p id="counter-text">Vous avez cliqué 0 fois</p>
  </div>
`;

const cookieElement = document.querySelector("#cookie");

// Rebond au clic sans redémarrer la rotation
cookieElement.addEventListener("click", () => {
  cookieElement.classList.add("clicked");

  setTimeout(() => {
    cookieElement.classList.remove("clicked");
  }, 300); // Durée du bounce
});

// Configuration du compteur
setupCounter(cookieElement, document.querySelector("#counter-text"));
