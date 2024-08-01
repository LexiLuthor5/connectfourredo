// script.js
const rows = 6;
const cols = 7;
const board = Array.from({ length: rows }, () => Array(cols).fill(null));
let currentPlayer = 'red';

const boardElement = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');
const winMessageElement = document.getElementById('win-message');

function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
    winMessageElement.textContent = ''; // Clear the win message
    winMessageElement.style.display = 'none'; // Hide the win message
}

function handleCellClick(event) {
    const col = event.target.dataset.col;
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            const disc = document.createElement('div');
            disc.classList.add('disc', currentPlayer);
            cell.appendChild(disc);
            if (checkWinner(row, col)) {
                winMessageElement.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`;
                winMessageElement.style.display = 'block'; // Show the win message
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
            return;
        }
    }
}

function checkWinner(row, col) {
    const directions = [
        [[0, 1], [0, -1]], // horizontal
        [[1, 0], [-1, 0]], // vertical
        [[1, 1], [-1, -1]], // diagonal down-right
        [[1, -1], [-1, 1]] // diagonal down-left
    ];

    for (const [[dx1, dy1], [dx2, dy2]] of directions) {
        let count = 1;
        for (let d = 1; d <= 3; d++) {
            const x1 = row + dx1 * d;
            const y1 = col + dy1 * d;
            const x2 = row + dx2 * d;
            const y2 = col + dy2 * d;
            if (x1 >= 0 && x1 < rows && y1 >= 0 && y1 < cols && board[x1][y1] === currentPlayer) {
                count++;
            } else {
                break;
            }
            if (x2 >= 0 && x2 < rows && y2 >= 0 && y2 < cols && board[x2][y2] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            board[row][col] = null;
        }
    }
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();




