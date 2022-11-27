let bg = document.querySelector(".BG");
let title = document.querySelector(".CS-title");
let texto = document.querySelector(".texto-juego-coming-soon")
const mercy = document.querySelector(".mercy");
const winston = document.querySelector(".winston");
const janzo = document.querySelector(".janzo");
const img = document.querySelector(".imagenes");
const descript = document.querySelector(".descript");
const info = document.querySelector(".info");
const carrousel = document.querySelector(".carrousel-container");
const featuring = document.querySelector(".carrousel");
const hero = document.querySelector(".personajes");

window.addEventListener("scroll", () =>{
    var value = window.scrollY;

    /*winston.style.animationName = "none";
    mercy.style.animationName = "none";
    janzo.style.animationName = "none";*/
    hero.style.animationName = "none";

    title.style.top = value * 0.5  + 'px';
    texto.style.left= -value * 0.5 + 'px';

    setTimeout(() => {
        /*winston.style.animationName = "winston";
        mercy.style.animationName = "mercy";
        janzo.style.animationName = "janzo";*/
        hero.style.animationName = "hero"; 
    }, 0);
});


const cargarImagen = (entradas, observador) => {
    console.log(entradas)
    console.log(observador)

	entradas.forEach((entrada) => {
		if(entrada.isIntersecting){
			entrada.target.classList.add('visible');
		} else {
			// entrada.target.classList.remove('visible');
		}
	});
}

const observador = new IntersectionObserver(cargarImagen, {
	root: null,
	rootMargin: '0px 0px 0px 0px',
	threshold: 0.5
});

observador.observe(img);
observador.observe(descript);
observador.observe(info);
observador.observe(carrousel);
observador.observe(featuring);













