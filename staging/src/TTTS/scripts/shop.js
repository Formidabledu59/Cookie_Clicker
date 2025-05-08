import "../styles/shop.css";
import PassiveIMG from "../assets/shop/passive.png";
import { handleCookieGain, createCookieRain } from "./animations";
import { manager } from "../../all.js"; // adapte le chemin selon ton projet

export class Shop {
  constructor(game) {
    this.game = game;
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
      <h2>Shop TTTS</h2>
      <p>TTTS: <span id="shop-cookie-count">0</span></p>
      <p>Argent: <span id="shop-money-count">0</span></p>
      <input type="number" id="sell-amount" min="1" placeholder="Combien vendre" />
      <button id="sell-ttts">Vendre</button>
      <button id="sell-all">Tout vendre</button>
      <div class="upgrade">
        <h3>Click passif</h3>
        <img src="${PassiveIMG}" alt="Click Passif" class="shop-item-image" />
        <p>Niveau: <span id="passive-lvl">0</span></p>
        <p>Gain: <span id="passive-gain">1</span> TTTS/s</p>
        <p>Prix: <span id="passive-cost">10</span> $</p>
        <button id="upgrade-passive">Acheter/Améliorer</button>
      </div>
    `;

    this.cookieDisplay = this.shopElement.querySelector("#shop-cookie-count");
    this.moneyDisplay = this.shopElement.querySelector("#shop-money-count");

    this.shopElement.querySelector("#sell-ttts").addEventListener("click", () => this.sellTTTS());
    this.shopElement.querySelector("#sell-all").addEventListener("click", () => this.sellAllTTTS());
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

  sellTTTS() {
    const input = this.shopElement.querySelector("#sell-amount");
    const amount = parseInt(input.value);
    if (!isNaN(amount) && amount > 0 && manager.getState().ttts >= amount) {
      manager.removeTTTS(amount);
      manager.addMoney(amount);
      this.updateDisplays();
      input.value = "";
    }
  }

  sellAllTTTS() {
    const all = Math.floor(manager.getState().ttts);
    if (all > 0) {
      manager.removeTTTS(all);
      manager.addMoney(all);
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
      manager.addTTTS(this.passiveGain);
      this.game.updateScore(); // assure-toi que cette méthode lit bien depuis manager.getState()
      this.updateDisplays();
    }, 1000);
  }
}
