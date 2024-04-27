const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameState = Array(9).fill(null);
let gameActive = true;

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

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!gameActive || gameState[index] !== null) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        result.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== null)) {
        result.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[a] !== null;
    });
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = "X";
    gameActive = true;
    result.textContent = "";
}
