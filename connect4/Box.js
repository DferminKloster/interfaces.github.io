class Box {

    //POSICION DE LA FICHA DENTRO DE LA CELDA
    
    constructor(posX, posY, width, height, primaryColor, secondaryColor) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.primaryColor = primaryColor; //COLOR DE TABLERO
        this.secondaryColor = secondaryColor; //COLOR DEL INTERIOR
        this.isFIlledBy = null; //AQUI SE COLOCA EL OBJETO DE JUGADOR 
        
        //POSICION DE LA FICHA DENTRO DEL RECTANGULO
        this.posXficha = posX + this.width/2;
        this.posYficha = posY + this.height/2;
    }

    getState() {
        return this.isFIlledBy;
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
    getTokenData() {
        return {
            "posX": this.posX+this.width/2,
            "posY": this.posY+this.height/2,
            "height": this.height,
            "width": this.width,
            "size": (this.height/2) * 0.83
        };
    }
    changeState(player) {
        this.isFIlledBy = player;
        this.setTokenColor(player.getColor());
    }
    
    setTokenColor(color) {
        this.secondaryColor = color;
    }

    write(ctx) {
        //RECTANGULO (CELDA)
        ctx.beginPath();
        ctx.fillStyle = this.primaryColor;
        ctx.rect(this.posX, this.posY, this.width,this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        //CIRCULO (FICHA)
        ctx.beginPath();
        ctx.fillStyle = this.secondaryColor;
        ctx.arc(this.posX+this.width/2, this.posY+this.height/2, (this.height/2) * 0.83 , 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}