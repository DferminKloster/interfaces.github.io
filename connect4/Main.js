let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

//OPCIONES DE JUEGO:
let difficulty = null;
let tokenPlayer1 = null;
let tokenPlayer2 = null;

let game = null;
let board = null;
let player1 = null;
let player2 = null;

//BOTONES DE MENÚ:
const easyDiff = document.getElementById("easy");
easyDiff.addEventListener("click", function() {
    easyDiff.classList.add("iluminateOption");
    mediumDiff.classList.remove("iluminateOption");
    hardDiff.classList.remove("iluminateOption");
    setDifficulty("easy");
});
const mediumDiff = document.getElementById("medium");
mediumDiff.addEventListener("click", function() {
    mediumDiff.classList.add("iluminateOption");
    hardDiff.classList.remove("iluminateOption");
    easyDiff.classList.remove("iluminateOption");
    setDifficulty("medium");
});
const hardDiff = document.getElementById("hard");
hardDiff.addEventListener("click", function() {
    hardDiff.classList.add("iluminateOption");
    easyDiff.classList.remove("iluminateOption");
    mediumDiff.classList.remove("iluminateOption");
    setDifficulty("hard");
});
function setDifficulty(diff) {
    switch (diff) {
        case "easy":
            difficulty = {
                "connect": 3,
                "columns": 4,
                "rows": 5
            };
            break;
        case "medium":
            difficulty = {
                "connect": 4,
                "columns": 5,
                "rows": 6
            };
            break;
        case "hard":
            difficulty = {
                "connect": 5,
                "columns": 6,
                "rows": 7
            };
            break;
        default:
            difficulty = {
                "connect": 4,
                "columns": 5,
                "rows": 6
            };
            break;
    }
}

//TOKENS POSIBLES:
const tokenP1 = document.getElementById("tokenP1");
tokenP1.addEventListener("click", function() {
    tokenP1.classList.add("iluminateOption");
    tokenP2.classList.remove("iluminateOption");
    setToken(1, 1);
});
const tokenP2 = document.getElementById("tokenP2");
tokenP2.addEventListener("click", function() {
    tokenP2.classList.add("iluminateOption");
    tokenP1.classList.remove("iluminateOption");
    setToken(1, 2);
});
const tokenZ1 = document.getElementById("tokenZ1");
tokenZ1.addEventListener("click", function() {
    tokenZ1.classList.add("iluminateOption");
    tokenZ2.classList.remove("iluminateOption");
    setToken(2, 1);
});
const tokenZ2 = document.getElementById("tokenZ2");
tokenZ2.addEventListener("click", function() {
    tokenZ2.classList.add("iluminateOption");
    tokenZ1.classList.remove("iluminateOption");
    setToken(2, 2);
});
function setToken(player, token) {
    let color = null;
    let image = null;
    switch (player) {
        case 1:
            switch (token) {
                case 1:
                    color = "green";
                    image = document.getElementById("tokenP1");
                    break;
                case 2:
                    color = "blue";
                    image = document.getElementById("tokenP2");
                    break;
                default:
                    break;
            }
            tokenPlayer1 = {
                "color": color,
                "image": image
            };
            break;
        case 2:
            switch (token) {
                case 1:
                    color = "gray";
                    image = document.getElementById("tokenZ1");
                    break;
                case 2:
                    color = "brown";
                    image = document.getElementById("tokenZ2");
                    break;
                default:
                    break;
            }
            tokenPlayer2 = {
                "color": color,
                "image": image
            };
            break;
        default:
            break;
    }
}

//BOTON DE PLAY:
let playButton = document.getElementById("play");
playButton.addEventListener("click", function() {
    if(allOptionsSelected()) {
        configureGame();
    }
});

function allOptionsSelected() {
    if (difficulty != null && tokenPlayer1 != null && tokenPlayer2 != null) {
        return true;
    }
    else {
        return false;
    }
}

function configureGame() {

    if (game != null) {
        game.init();
    }
    
    //INSTANCIA DE TABLERO
    board = new Board ( difficulty.connect, //CANTIDAD DE FICHAS A CONECTAR
                            difficulty.rows, //FILAS
                            difficulty.columns, //COLUMNAS
                            "red", //COLOR PRIMARIO (FONDO DE TABLERO) (OBSOLETO)
                            "rgba(0, 0, 0, 0.247)", //COLOR SECUNDARIO (ESPACIO DE FICHA)
                            document.getElementById("box"));

    //INSTANCIA DE JUGADORES (NOMBRE Y COLOR DE FICHA)
    player1 = new Player("Plants", tokenPlayer1.color, tokenPlayer1.image);
    player2 = new Player("Zombies", tokenPlayer2.color, tokenPlayer2.image);

    //INSTANCIA DE NUEVO JUEGO
    game = new Game(canvas, ctx, player1, player2, board);

    document.getElementById("game_menu").classList.remove("displayShow");
    document.getElementById("game_menu").classList.add("displayNone");

    document.getElementById("game_over").classList.remove("displayShow");
    document.getElementById("game_over").classList.add("displayNone");
    
    document.getElementById("reboot2").classList.remove("displayNone");
    document.getElementById("reboot2").classList.add("displayShow");
    
    canvas.classList.remove("displayNone");
    canvas.classList.add("displayShow");
    
    document.getElementById("game_tab").classList.remove("displayNone");
    document.getElementById("game_tab").classList.add("displayShow");

    //OTORGAR EVENTO DE REINICIO A BOTONES CORRESPONDIENTES
    document.getElementById("reboot1").addEventListener("click", function() {
        configureGame();
    });
    document.getElementById("reboot2").addEventListener("click", function() {
        configureGame();
    });

    //INICIAR EL JUEGO
    game.init();
}

