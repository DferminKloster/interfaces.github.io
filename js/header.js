"use strict";
let line1__barra = document.querySelector(".line1__barra_menu");
let line2__barra = document.querySelector(".line2__barra_menu");
let line3__barra = document.querySelector(".line3__barra_menu");
let desplegable = document.querySelector(".menu-navbar");
let btnMenu = document.querySelector(".barra_menu");
let lastpageYOffset = 0;

let header = document.getElementById("header");
let headerLogo = document.getElementById("logo");
let headerNav = document.getElementById("nav");
let headerPerfil = document.getElementById("perfil");
let arrowHeader = document.getElementById("arrowHeader");

document.querySelector(".barra_menu").addEventListener("click", animacionBarra);



/*animacion del menu de hamburguesas*/ 
function animacionBarra(){
    line1__barra.classList.toggle("activeline1__barra_menu");
    line2__barra.classList.toggle("activeline2__barra_menu");
    line3__barra.classList.toggle("activeline3__barra_menu");

}

/*menu de hamburguesas*/ 
btnMenu.addEventListener("click", showBarElements);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let toggle = false;
async function showBarElements() {
    if(!toggle) {
        desplegable.classList.toggle("menu-navbar-visible");
        let prueba = document.querySelectorAll(".navBarElement");
        prueba.forEach(element => {
            if(element.classList.contains("translateIn")) {
                element.classList.remove("translateIn");
                element.classList.add("translateOut");
            }
        });
        for(let i = 0; i < prueba.length; i++) {
            await sleep(300);
            prueba[i].classList.remove("translateOut");
            prueba[i].classList.toggle("translateIn");
        }
        toggle = true;
    }
    else {
        desplegable.classList.toggle("menu-navbar-visible");
        toggle = false;
    }
}

window.addEventListener("scroll", function() {
    let actualpageYOffset  = window.pageYOffset;

    if (actualpageYOffset > lastpageYOffset) {

        header.classList.remove("header_scroll_up");
        header.classList.add("header_scroll_down");
        
        headerLogo.classList.add("invisible");
        headerLogo.classList.remove("visible");

        headerNav.classList.add("invisible");
        headerNav.classList.remove("visible");
        
        headerPerfil.classList.add("invisible");
        headerPerfil.classList.remove("visible");

        arrowHeader.classList.add("visible");
        arrowHeader.classList.remove("invisible");
    }
    else {
        
        header.classList.remove("header_scroll_down");
        header.classList.add("header_scroll_up");

        headerLogo.classList.remove("invisible");
        headerLogo.classList.add("visible");

        headerNav.classList.remove("invisible");
        headerNav.classList.add("visible");

        headerPerfil.classList.remove("invisible");
        headerPerfil.classList.add("visible");

        arrowHeader.classList.remove("visible");
        arrowHeader.classList.add("invisible");
    }   
    lastpageYOffset = actualpageYOffset;
})
