"use strict";

document.querySelector(".barra_menu").addEventListener("click", animacionBarra);

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

/*menu de hamburguesas*/ 
btnMenu.addEventListener("click", () => {
    desplegable.classList.toggle("menu-navbar-visible");
    
})

/*carga al inicio de empezar*/ 

function calcularPorcentajeCarga() {
    let porcentaje = 0;
    const textPorcentaje = document.querySelector("#porcentaje-carga");
    if (textPorcentaje) {
        const contenedorCarga = document.querySelector("#contenedor-carga");
        const intervalo = setInterval(() => {
            if (porcentaje < 100) {
                porcentaje = porcentaje + 10;
                textPorcentaje.innerHTML = `${porcentaje}%`;
            }
        }, 500);
        setTimeout(() => {
            clearInterval(intervalo);
            contenedorCarga.classList.toggle("contenedor-carga-hidden");
        }, 0);
    }
}

calcularPorcentajeCarga();