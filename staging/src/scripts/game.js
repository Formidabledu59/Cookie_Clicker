import "../styles/game.css";
import CookieIMG from "../assets/cookie.png";

export class Game {
  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
    this.clickableAreaElement = null;
  }

  render() {
    // Crée un nouvel élément du DOM
    this.clickableAreaElement = document.createElement("section");
    this.clickableAreaElement.id = "game-clickable-area";

    // Modifie son HTML
    this.clickableAreaElement.innerHTML = `
      <img id="cookie" src=${CookieIMG} width="256px" height="256px" alt="An awesome cookie." />
    `;

    // Ajoute un listener sur l'événement "click"
    this.clickableAreaElement.addEventListener("click", () => {
      // Logique d'animation pour la réaction au clic
      window.requestAnimationFrame(() => {
        this.clickableAreaElement.classList.add("active");
        setTimeout(() => {
          window.requestAnimationFrame(() => {
            this.clickableAreaElement.classList.remove("active");
          });
        }, 100);
      });
      this.onClick();
    });

    // Ajoute l'élément au DOM
    this.gameElement.append(this.clickableAreaElement);
  }
}