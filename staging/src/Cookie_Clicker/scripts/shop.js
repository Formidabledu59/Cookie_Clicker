import "../styles/shop.css";
import PassiveIMG from "../assets/shop/passive.png";
import { handleCookieGain , createCookieRain} from "./animations";
import { manager } from "../../all.js"; // adapte le chemin selon le projet

// // Exemple :
// manager.addCookies(1);  // ajoute 1 cookie
// manager.addMoney(10);   // ajoute 10 pièces
// manager.addTTTS(10);   // ajoute 10 TTTs

export class Shop {
    constructor(game) {
      this.game = game;
      this.cookies = game.cookies;
      this.money = 0;
      this.passiveLevel = 0;
      this.passiveGain = 0;
  
      this.shopElement = null;
      this.toggleButton = null;
      this.cookieDisplay = null;
      this.moneyDisplay = null;
  
      this.render();
      this.startPassiveIncome();
    }
  
    render() {
      this.createToggleButton();
      this.createShopPanel();
      document.body.append(this.toggleButton, this.shopElement);
    }
  
    createToggleButton() {
      this.toggleButton = document.createElement("button");
      this.toggleButton.id = "shop-toggle";
      this.toggleButton.innerText = "🛒";
      this.toggleButton.addEventListener("click", () => {
        this.shopElement.classList.toggle("open");
      });
    }
  
    createShopPanel() {
      this.shopElement = document.createElement("aside");
      this.shopElement.id = "shop";
      this.shopElement.innerHTML = `
        <h2>Shop à Cookie</h2>
        <p>Cookies: <span id="shop-cookie-count">0</span></p>
        <p>Argent: <span id="shop-money-count">0</span></p>
        <input type="number" id="sell-amount" min="1" placeholder="Combien vendre" />
        <button id="sell-cookies">Vendre</button>
        <button id="sell-all">Tout vendre</button>
        <div class="upgrade">
          <h3>Click passif</h3>
          <img src="${PassiveIMG}" alt="Click Passif" class="shop-item-image" />
          <p>Niveau: <span id="passive-lvl">0</span></p>
          <p>Gain: <span id="passive-gain">1</span> cookie/s</p>
          <p>Prix: <span id="passive-cost">10</span> $</p>
          <button id="upgrade-passive">Acheter/Améliorer</button>
        </div>
      `;
  
      this.cookieDisplay = this.shopElement.querySelector("#shop-cookie-count");
      this.moneyDisplay = this.shopElement.querySelector("#shop-money-count");
  
      this.shopElement.querySelector("#sell-cookies").addEventListener("click", () => this.sellCookies());
      this.shopElement.querySelector("#sell-all").addEventListener("click", () => this.sellAllCookies());
      this.shopElement.querySelector("#upgrade-passive").addEventListener("click", () => this.upgradePassive());
  
      this.updateDisplays();
    }
  
    updateDisplays() {
      this.cookieDisplay.innerText = manager.getState().cookies.toFixed(0);
      this.moneyDisplay.innerText = manager.getState().money.toFixed(0);
      this.shopElement.querySelector("#passive-lvl").innerText = this.passiveLevel;
      this.shopElement.querySelector("#passive-gain").innerText = this.passiveGain.toFixed(1);
      this.shopElement.querySelector("#passive-cost").innerText = this.getPassiveCost();
    }
  
    sellCookies() {
      const input = this.shopElement.querySelector("#sell-amount");
      const amount = parseInt(input.value);
      if (!isNaN(amount) && amount > 0 && manager.getState().cookies >= amount) {
        manager.removeCookies(amount); // Utilise la méthode de All.js pour retirer les cookies
        manager.addMoney(amount); // Utilise la méthode de All.js pour ajouter de l'argent
        this.updateDisplays();
        input.value = "";
      }
    }
  
    sellAllCookies() {
      const all = Math.floor(manager.getState().cookies);
      if (all > 0) {
        manager.removeCookies(all); // Utilise la méthode de All.js pour retirer les cookies
        manager.addMoney(all); // Utilise la méthode de All.js pour ajouter de l'argent
        this.updateDisplays();
      }
    }
  
    getPassiveCost() {
      return 10 + this.passiveLevel * 5;
    }
  
    upgradePassive() {
      const cost = this.getPassiveCost();
      const currentMoney = manager.getState().money;
    
      if (currentMoney >= cost) {
        manager.removeMoney(cost);
        this.passiveLevel++;
        this.passiveGain = 0.5 + (this.passiveLevel - 0.5) * 0.1;
        this.updateDisplays();
      } else {
        console.log("Pas assez d'argent pour améliorer le click passif !");
      }
    }
    
  
    startPassiveIncome() {
      setInterval(() => {
        manager.addCookies(this.passiveGain); // met à jour les cookies globalement
        this.game.updateScore(); // rafraîchit l'affichage côté jeu
        this.updateDisplays();   // rafraîchit l'affichage côté shop
      }, 1000);
    }
  }