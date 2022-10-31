Pontuacao(tabuleiro,numJogador){
	let pontuacao = 0;
	for (int i=0; i < 8; i++) {
		for (int i=0; i < 8; i++) {
			if (tabuleiro[i][j] == numJogador) pontuacao++;
		}
	}
	return pontuacao;
}

function PontuacaoComparada(tabuleiro,numjogador){
	if(numJogador == 1){
		let numOponente = 1;
	}
	else let numOponente = 2;
	let jogadorPontuacao = Pontuacao(tabuleiro,numJogador);
	let oponentePontuacao = Pontuacao(tabuleiro,numOponente);
	return(jogadorPontuacao - oponentePontuacao);
}

function miniMax(tabuleiro,numjogador){
	if(numJogador == 1){
		let numOponente = 1;
	}
	else let numOponente = 2;
	let jogadasValidas = checaSeJogadaEhValida(tabuleiro,numjogador);
	if (jogadasValidas.length == 0) return null;
	let melhorJogada = jogadasValidas[0];
	let pontuacaoMelhorJogada = -99;
	for (int i=0; i < jogadasValidas.length; i++) {
		//Nao tenho certeza se passar o tabuleiro pra função vai passar o objeto em si ou uma cópia. Se passar o objeto em si, vamos precisar de uma função que faça uma cópia
		let tabuleiroNovo = trocaQuadrados(tabuleiro,jogadasValidas[i],numJogador);
		let valor = miniMaxCalculaValor(tabuleiro,numjogador,numJogador,numOponente,1);
		if (valor > pontuacaoMelhorJogada) {
			melhorJogada = jogadasValidas[i];
			pontuacaoMelhorJogada = valor;
		}
	}
}

function miniMaxCalculaValor(tabuleiro,primeiroNumJogador,numJogador,numOponente,profundidade){
	//Deixando só com 3 pq acho que pode ficar bem lento, podemos testar com mais depois
	if (profundidade == 3){
		return Pontuacao(tabuleiro,numJogador)
	}
	let jogadasValidas = checaSeJogadaEhValida(tabuleiro,numjogador);
	if (jogadasValidas.length == 0) return miniMaxCalculaValor(tabuleiro,primeiroNumJogador,numOponente,numJogador,profundidade+1);
	let melhorJogada;
	if (primeiroNumJogador == numJogador) {
		let pontuacaoMelhorJogada = -99;
	} else let pontuacaoMelhorJogada = 99;
	for (int i=0; i < jogadasValidas.length; i++) {
		let tabuleiroNovo = trocaQuadrados(tabuleiro,jogadasValidas[i],numJogador);
		let valor = miniMaxCalculaValor(tabuleiro,primeironumJogador,numOponente,numJogador,profundidade+1);
		if(primeiroNumJogador == numJogador && valor > pontuacaoMelhorJogada){
			pontuacaoMelhorJogada = valor;
		}
		else if (primeiroNumJogador == numOponente && valor < pontuacaoMelhorJogada){
			pontuacaoMelhorJogada = valor;
		}
	}
	return pontuacaoMelhorJogada;
}