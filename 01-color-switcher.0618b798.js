!function(){var t=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),e=document.body,r=null,o=!1;function a(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.addEventListener("click",(function(){if(o)return;o=!0,r=setInterval(a,1e3)})),n.addEventListener("click",(function(){if(!o)return;o=!1,clearInterval(r)}))}();
//# sourceMappingURL=01-color-switcher.0618b798.js.map