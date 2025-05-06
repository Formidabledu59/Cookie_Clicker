import icon from "./accueil-hero.png";

// Liste des projets disponibles
const projets = {
    "Cookie_Clicker": () => import("./Cookie_Clicker/scripts/main.js"),
    "TTTS": () => import("./TTTS/scripts/main.js"),
  };
  
  // Création du menu minimal pour changer de projet
  const button = document.getElementById("select-project");
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.left = "50%";
  button.style.transform = "translateX(-50%)";
  button.style.zIndex = "9999";
  
  // Pop-up simple
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
  
  // Selecteur
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

const app = document.getElementById("app");
  // Lire le projet depuis l'URL
  const params = new URLSearchParams(window.location.search);
  const projet = params.get("projet");

if (projet && projets[projet]) {
  projets[projet]();
} else {
  showDefaultScreen();
}

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


// Lancer le bon projet au démarrage
if (projet && projets[projet]) {
  projets[projet]().then(() => {
    console.log(`Projet ${projet} lancé depuis l'URL`);
  });
}

  
  