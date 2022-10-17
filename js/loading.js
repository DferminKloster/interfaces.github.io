"use strict";

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