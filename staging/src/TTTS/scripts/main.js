import "../styles/style.css";
import { Game } from "./game";
import { setupCounter } from "./counter";
import { Shop } from "./shop";
import tttsahur from "../assets/action/tttsahur.png";

function updateFavicon(iconUrl) {
  let favicon = document.querySelector("link[rel~='icon']");
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.href = iconUrl;
}
updateFavicon(tttsahur);

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Tung Tung Tung Tung Sahur</h1>
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

// Initialise la boutique avec un accès au jeu
const shop = new Shop(game);