class Timer {

    constructor (segundos, funcion) {
        //this.contenedor = contenedor;
        this.segundos = segundos;
        this.contador = segundos;
        this.funcion = funcion;
    }

    startCount() {
        if (this.segundos != this.contador) {
            this.resetCount();
        }
        for(let s = this.segundos; s >= 0; s--) {
            setTimeout(() => {
                //this.contenedor.innerHTML = this.contador;
                this.contador--;
            }, 1000);
        }
        this.funcion;
    }

    resetCount() {
        this.contador = this.segundos;
    }
}