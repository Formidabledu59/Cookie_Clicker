import "../styles/shop.css";
import PassiveIMG from "../assets/shop/passive.png";
import { handleCookieGain , createCookieRain} from "./animations";
import { manager } from "../../all.js"; // adapte le chemin selon le projet

// // Exemple :
// manager.addttts(1);  // ajoute 1 cookie
// manager.addMoney(10);   // ajoute 10 pièces
// manager.addTTTS(10);   // ajoute 10 TTTs

export class Shop {
    constructor(game) {
      this.game = game;
      this.ttts = game.ttts;
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
        <p>ttts: <span id="shop-cookie-count">0</span></p>
        <p>Argent: <span id="shop-money-count">0</span></p>
        <input type="number" id="sell-amount" min="1" placeholder="Combien vendre" />
        <button id="sell-ttts">Vendre</button>
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
  
      this.shopElement.querySelector("#sell-ttts").addEventListener("click", () => this.sellttts());
      this.shopElement.querySelector("#sell-all").addEventListener("click", () => this.sellAllttts());
      this.shopElement.querySelector("#upgrade-passive").addEventListener("click", () => this.upgradePassive());
  
      this.updateDisplays();
    }
  
    updateDisplays() {
      this.cookieDisplay.innerText = manager.getState().ttts.toFixed(0);
      this.moneyDisplay.innerText = manager.getState().money.toFixed(0);
      this.shopElement.querySelector("#passive-lvl").innerText = this.passiveLevel;
      this.shopElement.querySelector("#passive-gain").innerText = this.passiveGain.toFixed(1);
      this.shopElement.querySelector("#passive-cost").innerText = this.getPassiveCost();
    }
  
    sellttts() {
      const input = this.shopElement.querySelector("#sell-amount");
      const amount = parseInt(input.value);
      if (!isNaN(amount) && amount > 0 && manager.getState().ttts >= amount) {
        manager.removeTTTS(amount); // Utilise la méthode de All.js pour retirer les ttts
        manager.addMoney(amount); // Utilise la méthode de All.js pour ajouter de l'argent
        this.updateDisplays();
        input.value = "";
      }
    }
  
    sellAllttts() {
      const all = Math.floor(manager.getState().ttts);
      if (all > 0) {
        manager.removeTTTS(all); // Utilise la méthode de All.js pour retirer les ttts
        manager.addMoney(all); // Utilise la méthode de All.js pour ajouter de l'argent
        this.updateDisplays();
      }
    }
  
    getPassiveCost() {
      return 10 + this.passiveLevel * 5;
    }
  
    upgradePassive() {
        const cost = this.getPassiveCost();
        if (this.money >= cost) {
          this.money -= cost;
          this.passiveLevel++;
          this.passiveGain = 0.5 + (this.passiveLevel - 0.5) * 0.1; // passe à 0.5 puis augmente de 0.1
          this.updateDisplays();
        }
      }
  
    startPassiveIncome() {
      setInterval(() => {
        this.game.ttts += this.passiveGain;
        this.game.updateScore();
        this.updateDisplays();
      }, 1000);
    }
  }