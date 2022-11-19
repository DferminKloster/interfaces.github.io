let bg = document.querySelector(".BG");
let title = document.querySelector(".CS-title");
let mercy = document.querySelector(".mercy");
let winston = document.querySelector(".winston");
let janzo = document.querySelector(".janzo");
let texto = document.querySelector(".texto-juego-coming-soon")
let img = document.querySelector(".imagenes");
let descript = document.querySelector(".descript");
let info = document.querySelector(".info");
let carrousel = document.querySelector(".carrousel-container");
let featuring = document.querySelector(".carrousel");
let hero = document.querySelector(".personajes");

window.addEventListener("scroll", () =>{
    var value = window.scrollY;

    img.style.animationName = "none";
    winston.style.animationName = "none";
    mercy.style.animationName = "none";
    janzo.style.animationName = "none";
    descript.style.animationName = "none";
    info.style.animationName = "none";
    carrousel.style.animationName = "none";
    featuring.style.animationName = "none";
    hero.style.animationName = "none";

    bg.style.left = -value * 0.5 + 'px';
    title.style.top = -value * 0.5  + 'px';
    texto.style.left= -value * 0.5 + 'px';

    setTimeout(() => {
        img.style.animationName = "imgoverwach";
        winston.style.animationName = "winston";
        mercy.style.animationName = "mercy";
        janzo.style.animationName = "janzo";
        descript.style.animationName = "descript";
        info.style.animationName = "info";
        carrousel.style.animationName = "carrousel";
        featuring.style.animationName = "featuring";
        hero.style.animationName = "hero";
    }, 0);
});





