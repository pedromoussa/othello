

function checaSeJogadaEhValida(tabuleiro,numJogador) {
	jogadasValidas = new Array();
	for (i de 1 a 8) {
		for (j de 1 a 8) {
			if (tabuleiro[i][j] == numJogador){
				for (direcao de 1 a 8) {
					jogadaValida = encontraQuadradoValido(tabuleiro,i,j,direcao,numJogador);
					if (jogadaValida != null && !(jogadaValida in jogadasValidas)) jogadasValidas.add(jogadaValida)
				}
			}
		}
	}
}

function encontraQuadradoValido(tabuleiro,i,j,direcao,numJogador){
	passouDeOponente = false;
	while (i >= 0 && i < 8 && j >= 0 && j < 8){
		switch (tabuleiro[i][j]) {
			case 0:
				if (passouDeOponente = true) return [i][j];
				else return null
			case numjogador:
				return null
			case !numjogador:
				passouDeOponente = true;
		}
		i,j += direcao;
	}
	return null;
}

function trocaQuadrados(tabuleiro,i,j,numjogador){
	for (direcao de 1 a 8){
		if (direcaoTemTroca(tabuleiro,i,j,direcao,numjogador)) trocarPecas(tabuleiro,i,j,direcao,numJogador);
	}
}

function direcaoTemTroca(tabuleiro,i,j,direcao,numjogador){
	passouDeOponente = false;
	while (i >= 0 && i < 8 && j >= 0 && j < 8){
		switch (tabuleiro[i][j]) {
			case 0:
				return false
			case numjogador:
				if (passouDeOponente = true) return true;
				return false
			case !numjogador:
				passouDeOponente = true;
		}
		i,j += direcao;
	}
}

function trocarPecas(tabuleiro,i,j,direcao,numJogador){
	i,j += direcao;
	while (tabuleiro[i][j] != numJogador){
		tabuleiro[i][j] = numJogador;
		i,j += direcao;
	}
}

glossário:

tabuleiro: variavel representando a matriz que corresponde ao tabuleiro 
i e j: coordenadas do tabuleiro
direcao: variavel correspondendo a direcoes iteraveis em x e y. Poderia possivelmente ser um par tipo Pair(1,0) ou Pair(-1,-1) por exemplo
numJogador: o valor que corresponde às pecas do jogador. Pode ser 1 pro jogador 1 e 2 pro jogador 2 por exemplo.