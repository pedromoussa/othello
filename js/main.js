window.onload = function() {

    criaTabuleiro();

}

function criaTabuleiro() {

    const tabuleiro = [new Array()];
    for(let i = 0; i < 8; i++) {
        tabuleiro[i] = [0, 0, 0, 0, 0, 0, 0, 0];
    }

    tabuleiro[3][3] = 1
    tabuleiro[3][4] = 2
    tabuleiro[4][4] = 1
    tabuleiro[4][3] = 2

    criaQuadrado();

    atribuiCor('inR3C3', 1);
    atribuiCor('inR3C4', 2);
    atribuiCor('inR4C4', 1);
    atribuiCor('inR4C3', 2);

    mostraJogadasValidas(1, tabuleiro);

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

function mostraJogadasValidas(numJogador, tabuleiro) {

    let jogadasValidas = checaJogadaValida(numJogador, tabuleiro);

    jogadasValidas.forEach(e => {

        atribuiCor(`inR${e[0]}C${e[1]}`, 0);
        
    });

}