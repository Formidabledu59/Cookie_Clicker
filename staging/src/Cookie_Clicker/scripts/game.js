import { ClickableArea } from "./clickable-area";
import "../styles/game.css";
import { handleCookieGain , createCookieRain} from "./animations";
import { manager } from "../../all.js"; // adapte le chemin selon le projet

// // Exemple :
// manager.addCookies(1);  // ajoute 1 cookie
// manager.addMoney(10);   // ajoute 10 pièces
// manager.addTTTS(10);   // ajoute 10 TTTs


export class Game {
  // Game Properties
  cookies = 0;

  // Game Elements
  gameElement = null;
  scoreElement = null;
  clicPower= 1;

  // Game Components
  clickableArea = null;

  constructor(config) {
    // Récupère le nombre de cookie de base via All.js.
    this.cookies = manager.getState().cookies;
    // Récupère l'élément avec l'id game.
    this.gameElement = document.querySelector("#game");
    // Crée le composant ClickableArea qui gère la logique de la zone cliquable.
    // On passe en argument l'élément Game pour permettre l'ajout d'HTML à l'intérieur.
    // Et une fonction Callback pour réagir à l'événement de clique.
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );
  }

  // Lance le jeu
  start() {
    this.render();
  }

  // Génère les éléments à afficher.
  render() {
    this.renderScore();
    this.clickableArea.render();
  }

  // Génère l'affichage du score.
  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  // Met à jour l'affichage du score.
  updateScore() {
    this.scoreElement.innerHTML = `
        <span>${manager.getState().cookies.toFixed(0)} cookies</span>
    `;
  }

  // modifie le score de cookie.
  changeClicPower(value) {
    this.clicPower += value;
  }

   // Ici on utilise une fonction fléchée pour avoir encore accès au this de Game.
  // Sans fonction fléchée, le this serait celui de l'élément lié au click.
  onClickableAreaClick = (event) => {
    // On ajoute PowerClic cookies pour chaque click.
    this.cookies += this.clicPower;
    manager.addCookies(this.clicPower);   // ajoute des cookies en fct de la puissance de clic
    // Par soucis de performance car les changements au DOM sont très lourd,
    // On demande à la Window d'attendre la prochaine frame d'animation
    // pour réaliser les changements.
    window.requestAnimationFrame(() => {
      this.updateScore();
      // Gère l'animation pour un clic
      const { clientX: x, clientY: y } = event;
      handleCookieGain(this.gameElement, x, y, this.clicPower, true);
    });
    // Déclenche la pluie de cookies
    createCookieRain(this.gameElement, this.cookies, this.clicPower); 
  };
}
