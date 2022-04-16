const cells = document.querySelectorAll('[cell]'); //seletor de todas as clases cell
const board = document.querySelector('#board'); //seletor da id board
const gameEndElement = document.querySelector('[data-game-end-text]'); 
const gameEndMessage = document.querySelector('#gameEndMessage') //seleciona a mensagem de fim de jogo
const restartButton = document.querySelector('#restartButton')

let xTurn = true; //para o jogo iniciar com o turno de x

//start game
const startGame = () => {
    xTurn = true;
    for (const cell of cells) {
        board.classList.remove('o')
        cell.classList.remove('x', 'o')
        cell.addEventListener('click', handleClick, {once: true});
    }

    board.classList.add("x");
    gameEndMessage.classList.remove("show-game-end-message")
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd); // adiciona o elemento correspondente ao turno de inicio a classe
};

const swapTurns = () => {
    xTurn = !xTurn; //troca o turno para o

    //limpa as classes do jogo anterior
    board.classList.remove('x')
    board.classList.remove('o')

    //verifica de quem é o turno e identifica o que deve ser adicionado a classe
    if (xTurn) {
        board.classList.add('x')
    } else {
        board.classList.add('o')
    }
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const checkWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every((index) => {
            return cells[index].classList.contains(currentPlayer);
        });
    });
};

const checkDraw = () => {
    return [ ... cells].every((cell) => {
        return cell.classList.contains('o') || cell.classList.contains('x')
    })
}

const endGame = (isDraw) => {
    if (isDraw) {
        gameEndElement.innerText = "O jogo empatou!";
    } else {
        gameEndElement.innerText = xTurn 
            ? 'O X venceu!' 
            : 'O Circulo venceu!';
    }
    gameEndMessage.classList.add("show-game-end-message")
};

const handleClick = (e) => {
    // 1 - colocar o elemento na classe (x ou o)
    const cell = e.target;
    const classToAdd = xTurn ? 'x' : 'o';
    placeMark(cell, classToAdd);

    // 2 - verificar por vitória
    const isWin = checkWin(classToAdd);

    // 3 - verificar por empate
    const isDraw = checkDraw();
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // 4 - mudar o elemento da classe
        swapTurns();
    }
};

startGame();

//reiniciar o jogo 
restartButton.addEventListener('click', startGame);