let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let playerXName = 'Player X';
let playerOName = 'Player O';

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

const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const modal = document.getElementById('winner-modal');
const closeModal = document.querySelector('.close');
const winnerMessage = document.getElementById('winner-message');

// New: Sounds for moves and results
const moveSound = new Audio('move-sound.mp3'); // Replace with your sound files
const winSound = new Audio('win-sound.mp3');
const drawSound = new Audio('draw-sound.mp3');

// Player name inputs
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const startGameBtn = document.getElementById('start-game');
const gameArea = document.getElementById('game-area');

// Start the game with player names
startGameBtn.addEventListener('click', () => {
    playerXName = playerXInput.value || 'Player X';
    playerOName = playerOInput.value || 'Player O';
    statusText.textContent = `${playerXName}'s turn`;
    gameArea.style.display = 'block';  // Show the game area
});

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Play move sound
    moveSound.play();

    checkResult();
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winSound.play();
        gameActive = false;
        let winner = currentPlayer === 'X' ? playerXName : playerOName;
        statusText.textContent = `${winner} Wins!`;
        showWinnerModal(`${winner} Wins!`);
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        drawSound.play();
        gameActive = false;
        statusText.textContent = `It's a Draw!`;
        showWinnerModal(`It's a Draw!`);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
};

const restartGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `${playerXName}'s turn`;
    board.forEach(cell => {
        cell.textContent = '';
        cell.style.color = ''; 
    });
};

// Show modal with winner or draw message
const showWinnerModal = (message) => {
    winnerMessage.textContent = message;
    modal.style.display = 'flex';
};

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

board.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
