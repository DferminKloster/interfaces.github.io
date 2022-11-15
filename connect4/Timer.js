class Timer {

    constructor (count) {
        this.count = count;
        this.contador = 0;
    }

    startCount(countInDOM, changeTurn) {
        for(let seconds = this.count; seconds > 0; seconds--) {
            setTimeout(() => {
                countInDOM.innerHTML = seconds;
            }, 1000);
        }
        changeTurn();
    }

    resetCount() {
        this.contador = 0;
    }
}