let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");


//INSTANCIA DE TABLERO
let board = new Board ( 3, //CANTIDAD DE FICHAS A CONECTAR
                        6, //FILAS
                        5, //COLUMNAS
                        "red", //COLOR PRIMARIO (FONDO DE TABLERO)
                        "white"); //COLOR SECUNDARIO (ESPACIO DE FICHA)

//INSTANCIA DE JUGADORES (NOMBRE Y COLOR DE FICHA)
let player1 = new Player("pedrito", "blue");
let player2 = new Player("manusito", "green");

//INSTANCIA DE NUEVO JUEGO
let game = new Game(canvas, ctx, player1, player2, board);
//INICIAR EL JUEGO
game.init();