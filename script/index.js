


const $ = elem => document.querySelector(elem);
const $$ = elems => document.querySelectorAll(elems);
const $app = $('.app');
const $resetBtn = $('.resetBtn');
const $statusDisplay = $('.status');
const $finalResult = $('.finalResult');

$resetBtn.addEventListener('click', () => resetGame());


// Current Game state
let gameState = ["", "", "", "", "", "", "", "", ""];
let activeGame = true;
let currentPlayer = "X";
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Final Messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const container = document.createElement('div');
    container.className = 'container';

// TODO: Create functions: (setCurrentMove, finalStatus, ResetGame, gameStatus)
const handleClick = (currentBox) => {
    const {boxindex} = currentBox.target.dataset;
    if (gameState[boxindex] !== "" || !activeGame) {
        return;
    }
    setCurrentMove(currentBox.target, boxindex);
    resultStatus();
};

const setCurrentMove = (box, boxIndex) => {
    gameState[boxIndex] = currentPlayer;
    box.innerHTML = currentPlayer;
};

const resultStatus = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        $finalResult.innerHTML = winningMessage();
        activeGame = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        $finalResult.innerHTML = drawMessage();
        activeGame = false;
        return;
    }
    handlePlayerChange();
};

const resetGame = () => {
    activeGame = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    $statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.block')
               .forEach(block => block.innerHTML = "");
};

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    $statusDisplay.innerHTML = currentPlayerTurn();
}

// DOM LOADED
document.addEventListener('DOMContentLoaded', () =>{
    let html = ``;
    for(let i=0; i < 9; i++){
        html += `<div data-boxIndex=${i} class="block"></div>`;
    }
    container.innerHTML = html;
    $app.append(container);
    const $$blocks = $$('.block');
    $$blocks.forEach( (block)=> block.addEventListener('click', handleClick));
});
