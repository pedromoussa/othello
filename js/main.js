window.onload = function() {

    pickColour();
    criaTabuleiro();

}

let playerNumber = 2;
let computerNumber = 1;

let outOfMoves = 0;
let playerTurn = true;

let TABULEIRO = new Array();
let jogadasValidas = [];

function criaTabuleiro() {

    for(let i = 0; i < 8; i++) {
        TABULEIRO[i] = [0, 0, 0, 0, 0, 0, 0, 0];
    }

    TABULEIRO[3][3] = 1
    TABULEIRO[3][4] = 2
    TABULEIRO[4][4] = 1
    TABULEIRO[4][3] = 2

    criaQuadrado();

    atribuiCor('inR3C3', 1);
    atribuiCor('inR3C4', 2);
    atribuiCor('inR4C4', 1);
    atribuiCor('inR4C3', 2);

}

function criaQuadrado() {

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            const quadrado = document.createElement('div');
            quadrado.id = `R${i}C${j}`
            quadrado.className = 'quadrado';
            document.getElementsByClassName('canvas')[0].appendChild(quadrado);
            const peca = document.createElement('div');
            peca.id = `inR${i}C${j}`;
            peca.className = 'peca';
            peca.style.display = 'none';
            document.getElementById(`R${i}C${j}`).appendChild(peca);
            peca.addEventListener('click', function () { colocaPeca(i, j, playerNumber); }  );
        }
    }

}

function atribuiCor(id, numJogador) {

    const peca = document.getElementById(id);
    peca.style.display = 'block';
    if(numJogador == 1) {
        peca.style.backgroundColor = 'white';
        return;
    } else if(numJogador == 2) {
        peca.style.backgroundColor = 'black';
        return;
    }
    peca.style.backgroundColor = 'transparent';
}

function entregaJogadasValidas(numJogador, tabuleiro) {

    jogadasValidas = checaJogadaValida(numJogador, tabuleiro);

    if(jogadasValidas.length == 0) {
        outOfMoves++;
        if(outOfMoves == 2) {
            showScoreboard();
        } else { 
			playerTurn = false;
            aiPlay();
        }
    } else { 

        jogadasValidas.forEach(e => {

        atribuiCor(`inR${e[0]}C${e[1]}`, 0);
            
    });

}

/* 
*  params: coordenadas da peca jogada 
*  return: void
*  coloca a nova peca no tabuleiro
*  atualiza as novas possibilidades de jogadas 
*/
function colocaPeca(i, j, numJogador) {

    if(jogadasValidas.length == 0) {
        outOfMoves++;
        if(outOfMoves == 2) {
            showScoreboard();
        } 
        aiPlay();
    }

    jogadasValidas.forEach(e => {
        if(e[0] == i && e[1] == j) {
            jogadasValidas.forEach(e => {
                let peca = document.getElementById(`inR${e[0]}C${e[1]}`);
                peca.style.display = 'none';
            });
            outOfMoves = 0;
            atribuiCor(`inR${i}C${j}`, numJogador);
            trocaQuadrados(i, j, numJogador, TABULEIRO, false);
			playerTurn = false;
            aiPlay();
        }
    });
	
}

function aiPlay() {
	
	setTimeout(() => {
		if (playerTurn == false){
			playerTurn = true;
			let tabuleiro = new Array();
			copiaTabuleiro(TABULEIRO, tabuleiro);
			let jogadaAI = miniMax(computerNumber, tabuleiro);
			if(jogadaAI !== null) {
				outOfMoves = 0;
				atribuiCor(`inR${jogadaAI[0]}C${jogadaAI[1]}`, computerNumber);
				trocaQuadrados(jogadaAI[0], jogadaAI[1], computerNumber, TABULEIRO, false);
			} else {
				outOfMoves++;
				if(outOfMoves == 2) {
					showScoreboard();
				}
			}
			entregaJogadasValidas(playerNumber, TABULEIRO);
		}
	}, 1000)

}

function copiaTabuleiro(tabuleiroOriginal, tabuleiroCopia){
	for(let i = 0; i < 8; i++) {
		tabuleiroCopia[i] = [...tabuleiroOriginal[i]];
	}
}

function showScoreboard() {

    let scoreP = Pontuacao(playerNumber, TABULEIRO);
    let scoreIA = Pontuacao(computerNumber, TABULEIRO);

    const board = document.createElement('div');
    board.className = 'scoreboard';
    document.getElementsByTagName('body')[0].appendChild(board);
    const placar = document.createElement('p');
    document.getElementsByClassName('scoreboard')[0].appendChild(placar);
    placar.innerText = `Player: ${scoreP}   |   Computer: ${scoreIA}`;

}

function pickColour() {

    const text = document.createElement('p');
    text.className = 'texto';
    document.body.appendChild(text);

    text.innerText = `Escolha sua cor: `;

    const buttonB = document.createElement('button');
    const buttonW = document.createElement('button');

    buttonB.className = 'botaoB';
    document.body.appendChild(buttonB);

    buttonW.className = 'botaoW';
    document.body.appendChild(buttonW);

    buttonB.onclick = function() {
        playerNumber = 2;
        computerNumber = 1;
        entregaJogadasValidas(2, TABULEIRO);
        buttonB.style.display = 'none';
        buttonW.style.display = 'none';
    }

    buttonW.onclick = function () { 
        playerNumber = 1;
        computerNumber = 2;
        buttonB.style.display = 'none';
        buttonW.style.display = 'none';
		playerTurn = false;
        aiPlay();
    }

}