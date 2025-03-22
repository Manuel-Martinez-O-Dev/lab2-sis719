(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const p="https://pokeapi.co/api/v2/";async function f(e,n){const r=`${p}${e}/${n.toLowerCase()}`,i=await fetch(r);if(!i.ok)throw new Error(`No se pudo obtener ${e} con identificador "${n}"`);return await i.json()}function m(e){return f("pokemon",e)}function y(e){const n=document.getElementById("result");n.innerHTML=`
    <h2>${e.name.toUpperCase()}</h2>
    <p>ID: ${e.id}</p>
    <p>Peso: ${e.weight/10} kg</p>
    <p>Tipos: ${e.types.map(r=>r.type.name).join(", ")}</p>
    <p>Habilidades: ${e.abilities.map(r=>r.ability.name).join(", ")}</p>
    <div>
      ${Object.entries(e.sprites).filter(([r,i])=>typeof i=="string"&&i!==null).map(([r,i])=>`<img src="${i}" alt="${r}" title="${r}" />`).join("")}
    </div>

  `}const g=document.getElementById("searchInput"),h=document.getElementById("searchBtn"),l=document.getElementById("nextBtn"),u=document.getElementById("prevBtn"),a=document.getElementById("result");a.before(u,l);let s=null;h.addEventListener("click",async()=>{const e=g.value.trim();e&&d(e)});u.addEventListener("click",()=>{s&&s>1&&d((s-1).toString())});l.addEventListener("click",()=>{s&&d((s+1).toString())});async function d(e){a.innerHTML="🔄 Buscando...";try{const n=await m(e);s=n.id,y(n)}catch(n){a.innerHTML=`<p style="color:red;">${n.message}</p>`}}
