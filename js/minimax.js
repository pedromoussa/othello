function miniMax(numJogador, tabuleiro) {
	let numOponente;
	if(numJogador == 1){ numOponente = 2; }
	else { numOponente = 1; }

	let jogadasValidas = checaJogadaValida(numJogador, tabuleiro);
	if(jogadasValidas.length == 0) {
		return null;
	}

	let melhorJogada = jogadasValidas[0];
	let pontuacaoMelhorJogada = -99;
	for(let i = 0; i < jogadasValidas.length; i++) {
		let tabuleiroNovo = trocaQuadrados(jogadasValidas[i][0], jogadasValidas[i][1], numJogador, tabuleiro);
		let valor = miniMaxCalculaValor(numJogador, numJogador, numOponente, 1, tabuleiroNovo);
		if (valor > pontuacaoMelhorJogada) {
			melhorJogada = jogadasValidas[i];
			pontuacaoMelhorJogada = valor;
		}
	}
	return melhorJogada;

}

function miniMaxCalculaValor(primeiroNumJogador, numJogador, numOponente, profundidade, tabuleiro) {

	let newTab = [];
	newTab = Object.assign(tabuleiro, newTab);

	//Deixando só com 3 pq acho que pode ficar bem lento, podemos testar com mais depois
	if(profundidade == 3) {
		return Pontuacao(numJogador, newTab)
	}

	let jogadasValidas = checaJogadaValida(numJogador, newTab);
	if(jogadasValidas.length == 0) { 
		return miniMaxCalculaValor(primeiroNumJogador, numOponente, numJogador, profundidade+1, newTab);
	}

	// let melhorJogada;
	let pontuacaoMelhorJogada;
	if(primeiroNumJogador == numJogador) {
		pontuacaoMelhorJogada = -99;
	} else { pontuacaoMelhorJogada = 99; }

	for(let i=0; i < jogadasValidas.length; i++) {
		let tabuleiroNovo = [];
		tabuleiroNovo = Object.assign(newTab, tabuleiroNovo);		
		trocaQuadrados(jogadasValidas[i],numJogador, tabuleiroNovo);
		let valor = miniMaxCalculaValor(primeiroNumJogador, numOponente, numJogador, profundidade+1, tabuleiroNovo);
		if(primeiroNumJogador == numJogador && valor > pontuacaoMelhorJogada){
			pontuacaoMelhorJogada = valor;
		}
		else if(primeiroNumJogador == numOponente && valor < pontuacaoMelhorJogada){
			pontuacaoMelhorJogada = valor;
		}
	}
	return pontuacaoMelhorJogada;
}

