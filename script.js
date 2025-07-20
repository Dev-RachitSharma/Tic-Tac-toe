const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');

const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

let currentPlayer = 'X';
let gameActive = true;
const board = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0, scoreO = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
  const index = [...cells].indexOf(e.target);
  if (board[index] !== "" || !gameActive) return;

  clickSound.play();
  board[index] = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());
  e.target.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;
  let winningCells = [];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCells = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    winSound.play();
    winningCells.forEach(i => cells[i].classList.add('winning'));

    if (currentPlayer === 'X') {
      scoreX++;
      scoreXEl.textContent = scoreX;
    } else {
      scoreO++;
      scoreOEl.textContent = scoreO;
    }

  } else if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    drawSound.play();
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function restartGame() {
  board.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('x', 'o', 'winning');
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X's Turn";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

restartGame();
