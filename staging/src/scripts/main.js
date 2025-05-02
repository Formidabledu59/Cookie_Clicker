import "../styles/style.css";
import cookieImg from "../assets/cookie.png";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Mon Cookie Clicker</h1>
    <img src="${cookieImg}" id="cookie" alt="cookie" />
    <p id="counter-text">Vous avez cliqué 0 fois</p>
  </div>
`;

setupCounter(document.querySelector("#cookie"), document.querySelector("#counter-text"));
