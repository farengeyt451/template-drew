(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const m=`{
  "cc": "US",
  "city": "Pasadena",
  "country": "United States",
  "formatted_address": "8120 Jumpers Hole Road, Pasadena, MD, United States",
  "formatted_city": "Pasadena, MD, United States",
  "postal_code": "21122",
  "state": "MD",
  "street_address": "8120 Jumpers Hole Road"
}`,y=document.querySelector("#int-form"),u=document.querySelector("#int-template"),_=document.querySelector("#int-string"),i=document.querySelector("#int-result"),v=document.querySelectorAll(".c_int__btn--clear"),c=document.querySelector(".c_int__btn--copy");c.disabled=!0;const S=n=>{n.preventDefault(),i.value=$(u.value),l()},$=n=>{const e=JSON.parse(n),r=b(_.value),s=`{
  "cc": "${e.cc}",
  "city": "${r.city}",
  "country": "${r.country}",
  "formatted_address": "${r.formatted_address}",
  "formatted_city": "${r.formatted_city}",
  "postal_code": "${r.postal_code}",
  "state": "${r.state}",
  "street_address": "${r.street_address}"
}`;return p(s),s},b=n=>{const e=n.split(",").map(f=>f.trim()),r=e[2].split(" "),s=e[0],t=e[1],o=r[0],a=r[1],d=e[3];return{city:t,country:d,formatted_address:`${s}, ${t}, ${o}, ${d}`,formatted_city:`${t}, ${o}, ${d}`,postal_code:a,state:o,street_address:s}},p=async n=>{try{const e=n||i.value;await navigator.clipboard.writeText(e),c.innerText="Done",console.log("Content copied to clipboard"),console.info(`${i.value}`)}catch(e){console.error("Failed to copy: ",e)}finally{setTimeout(()=>{c.innerText="Copy"},1e3)}},g=n=>{var s;n.preventDefault();const e=(s=n.target.attributes.getNamedItem("data-input"))==null?void 0:s.value,r=e&&document.getElementById(e);(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement)&&(r.value="",l())};function l(){i.value.trim()?c.disabled=!1:c.disabled=!0}u.value=m;y.addEventListener("submit",S);c.addEventListener("click",p.bind(null,""));v.forEach(n=>n.addEventListener("click",g));i.addEventListener("input",l);
