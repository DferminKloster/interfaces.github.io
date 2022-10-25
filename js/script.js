"use strict";

document.querySelector(".barra_menu").addEventListener("click", animacionBarra);
document.getElementById("game_btn").addEventListener("click", redireccionar);;
document.getElementById("button2").addEventListener("click", redireccionar2);

let line1__barra = document.querySelector(".line1__barra_menu");
let line2__barra = document.querySelector(".line2__barra_menu");
let line3__barra = document.querySelector(".line3__barra_menu");
let desplegable = document.querySelector(".menu-navbar");
let btnMenu = document.querySelector(".barra_menu");


/*animacion del menu de hamburguesas*/ 
function animacionBarra(){
    line1__barra.classList.toggle("activeline1__barra_menu");
    line2__barra.classList.toggle("activeline2__barra_menu");
    line3__barra.classList.toggle("activeline3__barra_menu");

}

function redireccionar() {
    window.location.href = "juego.html";
}
function redireccionar2() {
    window.location.href = "proximojuego.html";
}

/*menu de hamburguesas*/ 
btnMenu.addEventListener("click", () => {
    desplegable.classList.toggle("menu-navbar-visible");
    
})
