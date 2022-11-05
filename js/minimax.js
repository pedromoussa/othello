function miniMax(numJogador, ...tabuleiro) {
	let numOponente;
	if(numJogador == 1){ numOponente = 2; }
	else { numOponente = 1; }

	let jogadasValidas = checaSeJogadaEhValida(numJogador, tabuleiro);
	if(jogadasValidas.length == 0) {
		return null;
	}

	let melhorJogada = jogadasValidas[0];
	let pontuacaoMelhorJogada = -99;
	for(let i=0; i < jogadasValidas.length; i++) {
		let tabuleiroNovo = trocaQuadrados(jogadasValidas[i], numJogador, tabuleiro);
		let valor = miniMaxCalculaValor(numJogador, numJogador, numOponente, 1, tabuleiroNovo);
		if (valor > pontuacaoMelhorJogada) {
			melhorJogada = jogadasValidas[i];
			pontuacaoMelhorJogada = valor;
		}
	}
}

function miniMaxCalculaValor(primeiroNumJogador, numJogador, numOponente, profundidade, ...tabuleiro) {
	//Deixando só com 3 pq acho que pode ficar bem lento, podemos testar com mais depois
	if(profundidade == 3) {
		return Pontuacao(tabuleiro,numJogador)
	}

	let jogadasValidas = checaSeJogadaEhValida(tabuleiro,numjogador);
	if(jogadasValidas.length == 0) { 
		return miniMaxCalculaValor(tabuleiro,primeiroNumJogador,numOponente,numJogador,profundidade+1);
	}

	// let melhorJogada;
	let pontuacaoMelhorJogada;
	if(primeiroNumJogador == numJogador) {
		pontuacaoMelhorJogada = -99;
	} else { pontuacaoMelhorJogada = 99; }

	for(let i=0; i < jogadasValidas.length; i++) {
		// trocaQuadrados não recebe tabuleiro como parametro
		let tabuleiroNovo = trocaQuadrados(jogadasValidas[i],numJogador, tabuleiro);
		let valor = miniMaxCalculaValor(primeironumJogador, numOponente, numJogador, profundidade+1, tabuleiroNovo);
		if(primeiroNumJogador == numJogador && valor > pontuacaoMelhorJogada){
			pontuacaoMelhorJogada = valor;
		}
		else if(primeiroNumJogador == numOponente && valor < pontuacaoMelhorJogada){
			pontuacaoMelhorJogada = valor;
		}
	}
	return pontuacaoMelhorJogada;
}