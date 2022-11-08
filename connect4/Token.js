class Token {

    constructor(player) {
        this.player = player;
        this.image = player.getImage();
        this.color = player.getColor();
        this.positionInBoard = null;
        this.posX = null;
        this.posY = null;
        this.size = null;
    }

    setPosX(pos) {
        this.posX = pos;
    }
    setPosY(pos) {
        this.posY = pos;
    }
    setSize(size) {
        this.size = size;
    }
    setPositionInBoard(x,y) {
        this.positionInBoard = {
            "x": x,
            "y": y
        };
    }
    getPositionInBoard() {
        return this.positionInBoard;
    }
    getPlayer() {
        return this.player;
    }
    getColor() {
        return this.color;
    }
    isSelected(x,y){
        let aux = (this.posX - x) * (this.posX - x) + (this.posY - y) * (this.posY - y);
        let dist = Math.sqrt(aux);
        let r = this.size;
        if(dist < r) {
            return true;
        }
        else {
            return false;
        }
    }

    write(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.drawImage(this.image, this.posX-25, this.posY-25, 50, 50);
        ctx.closePath();
    }
}