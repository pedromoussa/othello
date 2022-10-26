let direcao = {
    "0" : [-1, -1],
    "1" : [-1, 0],
    "2" : [-1, 1],
    "3" : [0, -1],
    "4" : [0, 1],
    "5" : [1, -1],
    "6" : [1, 0],
    "7" : [1, 1]
};

const tabuleiro = new Array(64);

function criaTabuleiro() {

    for(let i = 0; i < 64; i++) {
        tabuleiro[i] = [0];
    }

}

function checaJogadaValida(numJogador) {

    let jogadasValidas = new Array();

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(tabuleiro[i][j] == numJogador) {
                for(let k = 0; k < 8; k++) {
                    let jogadaValida = encontraQuadradoValido(i, j, direcao[k], numJogador);
                    if(jogadaValida != null && !(jogadasValidas.includes(jogadaValida))) {
                        jogadasValidas.concat(jogadaValida);
                    }
                }
            }
        }
    }

}

function encontraQuadradoValido(i, j, direcao, numJogador) {

    let passouDeOponente = false;

    while(i >= 0 && i < 8 && j >= 0 && j < 8) {
        switch(tabuleiro[i][j]) {
            case 0:
                if(passouDeOponente == true) {
                    return [i, j];
                } else {
                    return null;
                }
            case numJogador: return null;
            default: passouDeOponente = true;
        }
        i += direcao[0];
        j += direcao[1];
    }

    return null;

}

function trocaQuadrados(i, j, numJogador) {
    for(let k = 0; k < 8; k++) {
        if(direcaoTemTroca(i, j, direcao[k], numJogador)) {
            trocaPecas(i, j, direcao[k], numJogador);
        }
    }
}

function direcaoTemTroca(i, j, direcao, numJogador) {

    let passouDeOponente = false;

    while(i >= 0 && i < 8 && j >= 0 && j < 8) {
        switch(tabuleiro[i][j]) {
            case 0: return false;
            case numJogador:
                if(passouDeOponente == true) {
                    return true;
                }
                return false;
            default: passouDeOponente = true;
        }
        i += direcao[0];
        j += direcao[1];
    }

}

function trocaPecas(i, j, direcao, numJogador) {

    i += direcao[0];
    j += direcao[1];

    while (tabuleiro[i][j] !== numJogador){
		tabuleiro[i][j] = numJogador;
        i += direcao[0];
        j += direcao[1];
    }

}