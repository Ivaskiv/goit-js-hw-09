!function(){
//! Завдання 1 - перемикач кольорів
var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;t.addEventListener("click",(function(){n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.b18ea641.js.map
