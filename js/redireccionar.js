"use strict";

document.getElementById("game_btn").addEventListener("click", redireccionar);
document.getElementById("button2").addEventListener("click", redireccionar2);

function redireccionar() {
    window.location.href = "juego.html";
}
function redireccionar2() {
    window.location.href = "proximojuego.html";
}