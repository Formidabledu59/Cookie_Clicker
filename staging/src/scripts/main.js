import "../styles/style.css";
import { Game } from "./game";
import { setupCounter } from "./counter";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Mon Cookie Clicker</h1>
    <div id="game"></div>
    <p id="counter-text">Vous avez cliqué 0 fois</p>
  </div>
`;

const game = new Game({
  cookies: 0,
});

// Démarrer le jeu
game.start();

// Configurer le compteur après que le cookie a été rendu
setTimeout(() => {
  const cookieElement = document.querySelector("#cookie"); // Sélectionne l'image du cookie
  const counterTextElement = document.querySelector("#counter-text"); // Sélectionne le texte du compteur

  if (cookieElement && counterTextElement) {
    setupCounter(cookieElement, counterTextElement);
  }
}, 0);