class Board {

    constructor (goal, rows, columns, primary, secondary) {
        this.boxes = new Array();
        this.connectGoal = goal;
        this.posX = null;
        this.posY = null;
        this.height = null;
        this.width = null;
        this.rows = rows;
        this.columns = columns;
        this.filledBoxes = 0;
        this.primaryColor = primary;
        this.secondaryColor = secondary;
    }

    getColumns() {
        return this.columns;
    }
    getRows() {
        return this.rows;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getFilledBoxes() {
        return this.filledBoxes;
    }
    increaseFilledBoxes() {
        this.filledBoxes++;
    }
    setPosX(x) {
        this.posX = x;
    }
    setPosY(y) {
        this.posY = y;
    }
    setSize(height, width) {
        this.height = height;
        this.width = width;
    }
    getBoxes() {
        return this.boxes;
    }
    getTokenSize() {
        return this.boxes[0][0].getTokenData();
    }

    getColumn(x,y) {
        if(x > this.posX && x < this.posX+this.width && y < this.posY && y > this.posY-100) {
            let column = null;
            for(let c = 0; c < this.columns; c++) {
                let boxWidth = this.boxes[c][0].getWidth();
                let boxPosX = this.boxes[c][0].getPosX();
                if(x > boxPosX && x < boxPosX+boxWidth) {
                    column = c;
                    break;
                }
            }
            return column;
        }
        return null;
    }

    hasPlacesInColumn(column) {
        let row = null;
        for(let r = 0; r < this.rows; r++) {
            if (this.boxes[column][r].getState() == null) {
                row = r;
            }
        }
        return row;
    }

    addToken(column, row, token) {
        this.boxes[column][row].changeState(token.getPlayer());
    }

    verifyOnRow(token) {
        let row = token.getPositionInBoard().y;
        let tokenSummatory = 0;
        for(let column = 0; column < this.columns; column++) {
            if (this.boxes[column][row].getState() == token.getPlayer()) {
                tokenSummatory++;
            }
            if(column+1 < this.columns) {
                if(this.boxes[column+1][row].getState() != null && this.boxes[column+1][row].getState() != token.getPlayer()) {
                    tokenSummatory = 0;
                }
            }
        }
        console.log(tokenSummatory);
        if(tokenSummatory == this.connectGoal) {
            return true;
        }
        else {
            return false;
        }
    }

    verifyOnColumn(token) {
        let column = token.getPositionInBoard().x;
        let tokenSummatory = 0;
        for(let row = 0; row < this.rows; row++) {
            if (this.boxes[column][row].getState() == token.getPlayer()) {
                tokenSummatory++;
            }
            if(row+1 < this.rows) {
                if(this.boxes[column][row+1].getState() != null && this.boxes[column][row+1].getState() != token.getPlayer()) {
                    tokenSummatory = 0;
                }
            }
        }
        if(tokenSummatory == this.connectGoal) {
            return true;
        }
        else {
            return false;
        }
    }

    verifyOnDiagonal(token) {
        return (this.verifyOnLeftDiagonal(token) || this.verifyOnRightDiagonal(token));
    }

    verifyOnLeftDiagonal(token) {
        let positionInBoard = token.getPositionInBoard();
        let tokenSummatory = 1;
        let nextX = positionInBoard.x+1;
        let nextY = positionInBoard.y+1;
        while (nextX < this.columns && nextY < this.rows) {
            let nextBox = this.boxes[nextX][nextY];
            if(nextBox != null) {
                if(nextBox.getState() == token.getPlayer()) {
                    tokenSummatory++;
                    if(tokenSummatory == this.connectGoal) {
                        return true;
                    }
                }
                else {
                    tokenSummatory = 0;
                }
            }
            nextX++;
            nextY++;
        }
        let previousX = positionInBoard.x-1;
        let previousY = positionInBoard.y-1;
        while (previousX >= 0 && previousY >= 0) {
            let previousBox = this.boxes[previousX][previousY];
            if(previousBox != null) {
                if(previousBox.getState() == token.getPlayer()) {
                    tokenSummatory++;
                    if(tokenSummatory == this.connectGoal) {
                        return true;
                    }
                }
                else {
                    tokenSummatory = 0;
                }
            }
            previousX--;
            previousY--;
        }
        return false;
    }

    verifyOnRightDiagonal(token) {
        let positionInBoard = token.getPositionInBoard();
        let tokenSummatory = 1;
        let nextX = positionInBoard.x+1;
        let nextY = positionInBoard.y-1;
        while (nextX < this.columns && nextY >= 0) {
            let nextBox = this.boxes[nextX][nextY];
            if(nextBox != null) {
                if(nextBox.getState() == token.getPlayer()) {
                    tokenSummatory++;
                    if(tokenSummatory == this.connectGoal) {
                        return true;
                    }
                }
                else {
                    tokenSummatory = 0;
                }
            }
            nextX++;
            nextY--;
        }
        let previousX = positionInBoard.x-1;
        let previousY = positionInBoard.y+1;
        while (previousX >= 0 && previousY < this.rows) {
            let previousBox = this.boxes[previousX][previousY];
            if(previousBox != null) {
                if(previousBox.getState() == token.getPlayer()) {
                    tokenSummatory++;
                    if(tokenSummatory == this.connectGoal) {
                        return true;
                    }
                }
                else {
                    tokenSummatory = 0;
                }
            }
            previousX--;
            previousY++;
        }
        return false;
    }

    fillBoard() {
        let actualX = this.posX;
        let actualY = this.posY;
    
        //HORIZONTAL (COLUMNAS)
        for (let x = 0; x < this.columns; x++) {
            this.boxes[x] = new Array();
            //VERTICAL (FILAS)
            for (let y = 0; y < this.rows; y++) {
                
                this.boxes[x][y] = (new Box(actualX, actualY, this.width/this.columns, this.height/this.rows,
                                        this.primaryColor, this.secondaryColor)
                                    );
                
                actualY += this.height/this.rows;
            }
            actualX += this.width/this.columns;
            actualY = this.posY;
        }

    }

    write(ctx) {
        for(let x = 0; x < this.boxes.length; x++) {
            for(let y = 0; y < this.boxes[x].length; y++) {
                this.boxes[x][y].write(ctx);
            }
        }
    }

}