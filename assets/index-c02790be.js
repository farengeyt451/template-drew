(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const f=`{
  "cc": "US",
  "city": "Pasadena",
  "country": "United States",
  "formatted_address": "8120 Jumpers Hole Road, Pasadena, MD, United States",
  "formatted_city": "Pasadena, MD, United States",
  "postal_code": "21122",
  "state": "MD",
  "street_address": "8120 Jumpers Hole Road"
}`,m=document.querySelector("#int-form"),u=document.querySelector("#int-template"),y=document.querySelector("#int-string"),i=document.querySelector("#int-result"),_=document.querySelectorAll(".c_int__btn--clear"),c=document.querySelector(".c_int__btn--copy");c.disabled=!0;const v=o=>{o.preventDefault(),i.value=S(u.value),l()},S=o=>{const n=JSON.parse(o),e=$(y.value);return`{
  "cc": "${n.cc}",
  "city": "${e.city}",
  "country": "${e.country}",
  "formatted_address": "${e.formatted_address}",
  "formatted_city": "${e.formatted_city}",
  "postal_code": "${e.postal_code}",
  "state": "${e.state}",
  "street_address": "${e.street_address}"
}`},$=o=>{const n=o.split(",").map(p=>p.trim()),e=n[2].split(" "),s=n[0],t=n[1],r=e[0],a=e[1],d=n[3];return{city:t,country:d,formatted_address:`${s}, ${t}, ${r}, ${d}`,formatted_city:`${t}, ${r}, ${d}`,postal_code:a,state:r,street_address:s}},g=async()=>{try{await navigator.clipboard.writeText(i.value),c.innerText="Done",console.log("Content copied to clipboard"),console.info(`${i.value}`)}catch(o){console.error("Failed to copy: ",o)}finally{setTimeout(()=>{c.innerText="Copy"},1e3)}},b=o=>{var s;o.preventDefault();const n=(s=o.target.attributes.getNamedItem("data-input"))==null?void 0:s.value,e=n&&document.getElementById(n);(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&(e.value="",l())};function l(){i.value.trim()?c.disabled=!1:c.disabled=!0}u.value=f;m.addEventListener("submit",v);c.addEventListener("click",g);_.forEach(o=>o.addEventListener("click",b));i.addEventListener("input",l);
