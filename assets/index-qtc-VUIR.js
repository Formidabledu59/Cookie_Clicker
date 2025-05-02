(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function u(n,o){let r=0;n.addEventListener("click",()=>{r++,o.innerText=`Vous avez cliqué ${r} fois`})}document.querySelector("#app").innerHTML=`
  <div>
    <h1>Mon Cookie Clicker</h1>
    <div id="cookie"></div>
    <p id="counter-text">Vous avez cliqué 0 fois</p>
  </div>
`;const i=document.querySelector("#cookie");i.addEventListener("click",()=>{i.classList.add("clicked"),setTimeout(()=>{i.classList.remove("clicked")},300)});u(i,document.querySelector("#counter-text"));
