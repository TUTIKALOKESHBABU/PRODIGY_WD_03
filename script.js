const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || gameState[index] !== "") return;
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
    } else if (!gameState.includes("")) {
      statusText.textContent = "It's a Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  });
});

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(i => gameState[i] === currentPlayer);
  });
}

restartBtn.addEventListener('click', () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
});
