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

function Pontuacao(numJogador, tabuleiro) {
	let pontuacao = 0;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			if(tabuleiro[i][j] == numJogador) { pontuacao++; }
		}
	}
	return pontuacao;
}

function PontuacaoComparada(numJogador, tabuleiro){
	let numOponente;
	if(numJogador == 1){ numOponente = 2; }
	else { numOponente = 1; }
	let jogadorPontuacao = Pontuacao(numJogador, tabuleiro);
	let oponentePontuacao = Pontuacao(numOponente, tabuleiro);
	return(jogadorPontuacao - oponentePontuacao);
}

function checaJogadaValida(numJogador, tabuleiro) {
    let jogadasValidas = new Array();

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(tabuleiro[i][j] == numJogador) {
                for(let k = 0; k < 8; k++) {
                    let jogadaValida = encontraQuadradoValido(i, j, direcao[k], numJogador, tabuleiro);
                    if(jogadaValida != null && !(inclui(jogadaValida[0], jogadaValida[1], jogadasValidas))) {
                        jogadasValidas.push(jogadaValida);
                    }
                }
            }
        }
    }

    return jogadasValidas;

}

function encontraQuadradoValido(i, j, direcao, numJogador, tabuleiro) {
	let numOponente;
	if(numJogador == 1){ numOponente = 2; }
	else { numOponente = 1; }

    let passouDeOponente = false;
    i += direcao[0];
    j += direcao[1];
    while(i >= 0 && i < 8 && j >= 0 && j < 8) {
        switch(tabuleiro[i][j]) {
            case 0:
                if(passouDeOponente == true) {
                    return [i, j];
                } else {
                    return null;
                }
            case numJogador: return null;
            case numOponente: passouDeOponente = true;
        }
        i += direcao[0];
        j += direcao[1];
    }

    return null;

}

function trocaQuadrados(i, j, numJogador, tabuleiroTemp, isTest) {
    for(let k = 0; k < 8; k++) {
        if(direcaoTemTroca(i, j, direcao[k], numJogador, tabuleiroTemp,isTest)) {
            trocaPecas(i, j, direcao[k], numJogador, tabuleiroTemp, isTest);
        }
    }
}

function direcaoTemTroca(i, j, direcao, numJogador, tabuleiroTemp, isTest) {
	let numOponente;
	if(numJogador == 1){ numOponente = 2; }
	else { numOponente = 1; }

    let passouDeOponente = false;
    i += direcao[0];
    j += direcao[1];
    while(i >= 0 && i < 8 && j >= 0 && j < 8) {
        switch(tabuleiroTemp[i][j]) {
            case 0: return false;
            case numJogador:
                if(passouDeOponente == true) {
                    return true;
                }
                return false;
            case numOponente: passouDeOponente = true;
        }
        i += direcao[0];
        j += direcao[1];
    }

}

function trocaPecas(i, j, direcao, numJogador, tabuleiroTemp, isTest) {
	
	tabuleiroTemp[i][j] = numJogador;
    i += direcao[0];
    j += direcao[1];

    while (tabuleiroTemp[i][j] != numJogador){
		tabuleiroTemp[i][j] = numJogador;
        if (!isTest) { atribuiCor(`inR${i}C${j}`, numJogador); }
        i += direcao[0];
        j += direcao[1];
    }
}

function inclui(i, j, jogada) {
    jogada.forEach(e => {
        if(e[0] == i && e[1] == j) {
            return true;
        }
    });
}