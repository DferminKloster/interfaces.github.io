class Game {

    //CONSTRUCTOR
    constructor(canvas, ctx, player1, player2, board) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;

        //CANTIDAD DE FICHAS QUE UTILIZA EL TABLERO
        this.totalTokens = this.board.getColumns() * this.board.getRows();
        //FICHA SELECCIONADA POR EL JUGADOR
        this.selectedToken = null;
        //TURNO CORRESPONDIENTE
        this.turn = null;
    }

    init() {
        //TAMAÑO DEL TABLERO (PROPORCIONAL AL CANVAS)
        this.board.setSize(
                            this.canvas.width*0.60,
                            this.canvas.width*0.60
        );
        //UBICACION DEL TABLERO EN EL CANVAS (CENTRADO)
        this.board.setPosX((canvas.width-this.board.getWidth())/2);
        this.board.setPosY((canvas.height-this.board.getHeight())/2);
        //LLENA EL TABLERO CON CASILLAS
        this.board.fillBoard();
        //DIBUJA EL TABLERO EN PANTALLA
        this.board.write(this.ctx);

        //INSTANCIA LAS FICHAS NECESARIAS PARA CADA JUGADOR
        //(LA MITAD DE FICHAS TOTALES DEL TABLERO PARA C/U)
        this.player1.setTokens(this.totalTokens/2);
        //DIBUJA FICHAS SEGUN JUGADOR Y SU UBICACION
        this.generatePlayerTokens(player1, this.board.getPosX() + this.board.getWidth() + this.board.getPosX() * 0.35, 150);
        this.player2.setTokens(this.totalTokens/2);
        this.generatePlayerTokens(player2, (canvas.width-this.board.getHeight())/4 * 1.25, 150);

        //INICIA LOS EVENTOS DEL CURSOR
        this.initEvents();

        //SELECCIONA EL TURNO ALEATORIAMENTE
        this.selectRandomTurn();
        console.log(this.turn);
    }

    //DIBUJA LAS FICHAS EN PANTALLA
    generatePlayerTokens(player, posX, posY) {
        let tokens = player.getTokens();
        let actualY = posY;
        let size = this.board.getTokenSize().size;
        for(let t = 0; t < tokens.length; t++) {
            tokens[t].setPosX(posX);
            tokens[t].setPosY(actualY);
            tokens[t].setSize(size);
            tokens[t].write(this.ctx);
            //DISTANCIA Y SOLAPAMIENTO ENTRE FICHAS (MODIFICABLE):
            //LAS FICHAS SE DIBUJAN EN FILA Y HACIA ABAJO
            actualY += 50;
        }
    }

    // LIMPIA EL CANVAS CON CADA ACTUALIZACION DE PANTALLA
    clean(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //REFRESCA LOS ELEMENTOS DESPUES DE CADA ACCION
    reDraw(){
        this.clean();
        //LLAMA NUEVAMENTE A DIBUJAR TABLERO Y FICHAS DE JUGADORES
        this.board.write(this.ctx);
        this.generatePlayerTokens(player1, this.board.getPosX() + this.board.getWidth() + this.board.getPosX() * 0.35, 150);
        this.generatePlayerTokens(player2, (canvas.width-this.board.getHeight())/4 * 1.25, 150);
    }

    //OBTIENE LA UBICACION DEL CURSOR AL INTERACTUAR CON EL CANVAS
    getMousePosition(event){
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return {x, y};
    }

    //ACCION AL HACER CLICK SOBRE EL CANVAS
    mouseDown(event) {
        let pos = this.getMousePosition(event);
        this.selectedToken = this.turn.getTokenByPosition(pos.x,pos.y);
    }

    //ACCION AL MOVER EL CURSOR SOBRE EL CANVAS
    mouseMove(event){
        if (this.selectedToken) {
        this.reDraw();
        let pos = this.getMousePosition(event);
        this.selectedToken.setPosX(pos.x);
        this.selectedToken.setPosY(pos.y);
        this.selectedToken.write(this.ctx);
        }
    }

    //ACCION AL LEVANTAR EL CLICK SOBRE EL CANVAS
    //(LA ACCION MAS IMPORTANTE DURANTE EL JUEGO)
    mouseUp(event){
        if(this.selectedToken) {
            let pos = this.getMousePosition(event);
            let column = this.board.getColumn(pos.x, pos.y);
            if(column !== null){
                let space = this.board.hasPlacesInColumn(column);
                if (space !== null) {
                    this.selectedToken.setPositionInBoard(column, space);
                    this.board.addToken(column, space, this.selectedToken);
                    this.board.increaseFilledBoxes();
                    this.reDraw();
                    //VERIFICA SI HAY GANADOR LUEGO DE JUGADA
                    if (this.verifyIfWinner(this.selectedToken)) {
                        //AQUI SE APLICA ACCION CORRESPONDIENTE
                        //AQUI SE APLICA ACCION CORRESPONDIENTE
                        //AQUI SE APLICA ACCION CORRESPONDIENTE
                        //CON this.selectedToken.getPlayer() PUEDE OBTENERSE EL JUGADOR GANADOR
                        //CON .getName() SOBRE EL JUGADOR PARA OBTENER SU NOMBRE
                        console.log("hubo ganador: " + this.selectedToken.getPlayer().getName());
                        this.selectedToken = null;
                        this.reDraw();
                    }
                    else {
                        this.selectedToken = null;
                        this.changeTurn();
                    }
                }
                else {
                    console.log("devolver");
                    this.returnTokenToInitPosition(this.selectedToken);
                    this.selectedToken = null;
                }
                /*
                if(this.player1.getCoins().length ===0) {
                    setTimeout(this.notify,10);
                }
                */
            }
            else {
                console.log("devolver");
                this.returnTokenToInitPosition(this.selectedToken);
                this.selectedToken = null;
            }
        }
    }

    //ACCION AL LLEVAR EL CURSOR FUERA DEL CANVAS
    mouseOut(event){
        if(this.selectedToken) {
           this.returnTokenToInitPosition(this.selectedToken);
           this.selectedToken = null;
        }
    }

    //DEVUELVE LA FICHA A SU LUGAR INICIAL (SI NO SE APLICÓ NINGUNA ACCION)
    returnTokenToInitPosition(token) {
        let player = token.getPlayer();
        player.addToken(token);
        this.reDraw();
    }

    //VERIFICA SI EXISTE UN GANADOR EN CADA JUGADA EN TODAS LAS POSIBILIDADES
    verifyIfWinner(token) {
        //VERIFICA GANADOR EN VERTICAL
        if (this.board.verifyOnColumn(token)) {
            console.log("winner on column");
            return true;
        }
        //VERIFICA GANADOR EN HORIZONTAL
        else if (this.board.verifyOnRow(token)) {
            console.log("winner on row");
            return true;
        }
        //VERIFICA GANADOR EN DIAGONALES
        else if (this.board.verifyOnDiagonal(token)) {
            console.log("winner on diagonal");
            return true;
        }
        else {
            return false;
        }
    }

    //LLAMA A LOS EVENTOS DEL CURSOR
    initEvents() {
        this.canvas.addEventListener("mousedown", (e)=> {
            this.mouseDown(e);
        })
        this.canvas.addEventListener("mousemove", (e)=> {
            this.mouseMove(e);
        });
        this.canvas.addEventListener("mouseup", (e)=> {
            this.mouseUp(e);
        });
        this.canvas.addEventListener("mouseout", (e)=> {
            this.mouseOut(e)
        });
    }

    //ESTABLECER TURNO DE JUGADOR ALEATORIAMENTE AL INICIO DE LA PARTIDA
    selectRandomTurn() {
        let random = Math.floor(Math.random() * 2);
        if(random==0) {
            this.turn = this.player1;
        }
        else {
            this.turn = this.player2;
        }
    }

    //CAMBIA EL TURNO AL JUGADOR OPUESTO DESPUES DE UNA JUGADA
    changeTurn() {
        if(this.turn == this.player1) {
            this.turn = this.player2;
        }
        else if(this.turn == this.player2) {
            this.turn = this.player1;
        }
    }
}