class Player {

    constructor(name, color, image) {
        this.name = name;
        this.color = color;
        this.image = image;
        this.tokens = new Array();
    }

    setTokens(tokenCount) {
       let tokenList = new Array();
        for(let t = 0; t < tokenCount; t++) {
            tokenList.push(new Token(this));
        }
        this.tokens = tokenList;
    }

    resetToken() {
        this.tokens = new Array();
    }

    addToken(token) {
        this.tokens.push(token);
    }

    getTokens() {
        return this.tokens;
    }

    getTokenByPosition(x,y){
        let token = null;
        this.tokens.forEach((t)=>{
            if(t.isSelected(x,y))
                token = t;
        });
        if(token){
            this.tokens = this.tokens.filter((t)=> token !== t);
        }
        return token;
    }

    getColor() {
        return this.color;
    }

    getImage() {
        return this.image;
    }

    getName() {
        return this.name;
    }
}