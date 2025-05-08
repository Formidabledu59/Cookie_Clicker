import icon from "./accueil-hero.png";

// Liste des projets disponibles
const projets = {
  "Cookie_Clicker": () => import("./Cookie_Clicker/scripts/main.js"),
  "TTTS": () => import("./TTTS/scripts/main.js"),
};

// Création du bouton pour changer de projet
const button = document.getElementById("select-project");
button.style.position = "fixed";
button.style.top = "10px";
button.style.left = "50%";
button.style.transform = "translateX(-50%)";
button.style.zIndex = "9999";

// Pop-up de sélection de projet
const popup = document.createElement("div");
popup.style.position = "fixed";
popup.style.top = "50%";
popup.style.left = "50%";
popup.style.transform = "translate(-50%, -50%)";
popup.style.padding = "20px";
popup.style.backgroundColor = "white";
popup.style.border = "1px solid #ccc";
popup.style.display = "none";
popup.style.zIndex = "9999";

// Sélecteur de projet
const select = document.createElement("select");
Object.keys(projets).forEach((nom) => {
  const option = document.createElement("option");
  option.value = nom;
  option.textContent = nom;
  select.appendChild(option);
});
popup.appendChild(select);

const confirmBtn = document.createElement("button");
confirmBtn.textContent = "Lancer";
popup.appendChild(confirmBtn);

document.body.appendChild(popup);

button.onclick = () => {
  popup.style.display = "block";
};

confirmBtn.onclick = () => {
  const projet = select.value;
  window.location.search = `?projet=${projet}`;
};

// Zone principale
const app = document.getElementById("app");

// Gestionnaire global
class XClickerManager {
  constructor() {
    const saved = JSON.parse(localStorage.getItem("xclicker")) || {
      cookies: 0,
      ttts: 0,
      money: 0,
    };
    this.cookies = saved.cookies;
    this.ttts = saved.ttts;
    this.money = saved.money;
  }

  save() {
    localStorage.setItem("xclicker", JSON.stringify({
      cookies: this.cookies,
      ttts: this.ttts,
      money: this.money,
    }));
  }

  addCookies(n) {
    this.cookies += n;
    this.save();
  }

  removeCookies(n) {
    this.cookies = Math.max(0, this.cookies - n);
    this.save();
  }

  addTTTS(n) {
    this.ttts += n;
    this.save();
  }

  removeTTTS(n) {
    this.ttts = Math.max(0, this.ttts - n);
    this.save();
  }

  addMoney(n) {
    this.money += n;
    this.save();
  }

  removeMoney(n) {
    this.money = Math.max(0, this.money - n);
    this.save();
  }

  reset() {
    this.cookies = 0;
    this.ttts = 0;
    this.money = 0;
    this.save();
  }

  getState() {
    return {
      cookies: this.cookies,
      ttts: this.ttts,
      money: this.money,
    };
  }
}

export const manager = new XClickerManager();

// Mise à jour des stats visuelles
function updateStatsDisplay() {
  const state = manager.getState();

  const currentMoney = parseInt(document.getElementById("money").textContent, 10) || 0;

  if (currentMoney < state.money) {
    document.getElementById("money").style.color = "lightgreen";
  } else if (currentMoney > state.money) {
    document.getElementById("money").style.color = "red";
  } else {
    document.getElementById("money").style.color = "white";
  }

  document.getElementById("money").textContent = state.money.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
  document.getElementById("cookies").textContent = state.cookies.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
  document.getElementById("ttts").textContent = state.ttts.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
  

  console.log(`Updated Stats - Money: ${state.money.toFixed(1)}, Cookies: ${state.cookies.toFixed(1)}, TTTs: ${state.ttts.toFixed(1)}`);

  console.log(`Current State - Cookies: ${state.cookies}, TTTs: ${state.ttts}, Money: ${state.money}`);
}

// Rafraîchissement continu avec animation (meilleur que setInterval)
function loop() {
  updateStatsDisplay();
  requestAnimationFrame(loop);
}
loop();

// Page d’accueil par défaut
function showDefaultScreen() {
  app.innerHTML = `
    <div style="text-align: center; padding: 50px;">
      <img src="${icon}" alt="Hero" style="max-width: 300px; margin-bottom: 20px;" />
      <h1>Sélectionne ton <span style="color: #ff8800;">XClicker</span> !</h1>
      <p style="color: #666;">Clique sur 🎮 pour choisir un jeu</p>
      <footer style="margin-top: 40px;">
        <a href="https://github.com/formidabledu59" target="_blank">Mon GitHub</a>
        -
        <a href="https://github.com/Formidabledu59/Cookie_Clicker" target="_blank">Mon Projet</a>
      </footer>
    </div>
  `;
}

// Lecture de l'URL pour lancer un projet
const params = new URLSearchParams(window.location.search);
const projet = params.get("projet");

if (projet && projets[projet]) {
  projets[projet]().then(() => {
    console.log(`Projet ${projet} lancé depuis l'URL`);
  });
} else {
  showDefaultScreen();
}
