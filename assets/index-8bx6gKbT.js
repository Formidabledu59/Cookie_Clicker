(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const s="/Cookie_Clicker/assets/cookie-CWq7-coF.png";function u(c,o){let r=0;c.addEventListener("click",()=>{r++,o.innerText=`Vous avez cliqué ${r} fois`})}document.querySelector("#app").innerHTML=`
  <div>
    <h1>Mon Cookie Clicker</h1>
    <img src="${s}" id="cookie" alt="cookie" />
    <p id="counter-text">Vous avez cliqué 0 fois</p>
  </div>
`;u(document.querySelector("#cookie"),document.querySelector("#counter-text"));
