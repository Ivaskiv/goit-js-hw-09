//! Завдання 1 - перемикач кольорів
const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a=null;t.addEventListener("click",(()=>{a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.disabled=!0})),e.addEventListener("click",(()=>{clearInterval(a),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.fc4ccd69.js.map
