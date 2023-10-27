document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('game-board');
  const resetButton = document.getElementById('reset-button');
  const columns = 7;
  const rows = 6;
  const winCount = 4;
  let currentPlayer = 'red';
  let currentPlayerName = 'Player 1';
  let isGameOver = false;

  // Prompt for player names
  const player1Input = prompt('Enter Player 1 name:');
  const player2Input = prompt('Enter Player 2 name:');
  const player1Name = player1Input || 'Player 1';
  const player2Name = player2Input || 'Player 2';

  // Display player names
  const playerNames = document.createElement('div');
  playerNames.id = 'player-names';
  playerNames.textContent = `Current Player: ${currentPlayerName}`;
  document.body.insertBefore(playerNames, board);

  // Create the game board
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.column = col;
      cell.dataset.row = row;
      board.appendChild(cell);
    }
  }

  // Function to handle player moves
  function handleMove(event) {
    if (isGameOver) return;

    const col = event.target.dataset.column;
    const availableCells = document.querySelectorAll(
      `.cell[data-column="${col}"]:not(.red):not(.yellow)`
    );

    if (availableCells.length === 0) return;

    const cell = availableCells[availableCells.length - 1];
    cell.classList.add(currentPlayer);

    if (checkWin(cell)) {
      isGameOver = true;
      showGameOverScreen(`${currentPlayerName} wins!`);
    } else {
      checkDraw();
      togglePlayer();
    }
  }

  // Function to check for a winning condition
  function checkWin(cell) {
    const col = parseInt(cell.dataset.column);
    const row = parseInt(cell.dataset.row);

    // Check for a win in all directions: horizontal, vertical, and both diagonals
    const directions = [
      [1, 0], // Right
      [0, 1], // Up
      [1, 1], // Diagonal /
      [-1, 1], // Diagonal \
    ];

    for (const [colDir, rowDir] of directions) {
      let count = 1;
      count += countInDirection(col, row, colDir, rowDir);
      count += countInDirection(col, row, -colDir, -rowDir);

      if (count >= winCount) return true;
    }

    return false;
  }

  function countInDirection(col, row, colDir, rowDir) {
    const color = currentPlayer;
    let count = 0;
    let c = col + colDir;
    let r = row + rowDir;

    while (c >= 0 && c < columns && r >= 0 && r < rows) {
      const cell = document.querySelector(`.cell[data-column="${c}"][data-row="${r}"]`);
      if (cell && cell.classList.contains(color)) {
        count++;
        c += colDir;
        r += rowDir;
      } else {
        break;
      }
    }

    return count;
  }

  // Check for a draw
  function checkDraw() {
    const cells = document.querySelectorAll('.cell');
    if ([...cells].every(cell => cell.classList.contains('red') || cell.classList.contains('yellow'))) {
      isGameOver = true;
      showGameOverScreen("It's a draw!");
    }
  }

  // Show game-over screen
  function showGameOverScreen(message) {
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'game-over';
    gameOverScreen.innerHTML = `<p>${message}</p><button id="new-game-button">New Game</button>`;
    document.body.appendChild(gameOverScreen);

    const newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', startNewGame);
  }

  // Event listener for cell clicks
  board.addEventListener('click', handleMove);

  // Event listener for the reset button
  resetButton.addEventListener('click', startNewGame);

  // Function to start a new game
  function startNewGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('red', 'yellow');
    });
    currentPlayer = 'red';
    currentPlayerName = player1Name;
    isGameOver = false;

    // Remove game-over screen if it exists
    const gameOverScreen = document.getElementById('game-over');
    if (gameOverScreen) {
      gameOverScreen.parentNode.removeChild(gameOverScreen);
    }
  }

  // Function to toggle the current player
  function togglePlayer() {
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    currentPlayerName = currentPlayerName === player1Name ? player2Name : player1Name;
    playerNames.textContent = `Current Player: ${currentPlayerName}`;
  }
});
// Add this JavaScript code to trigger the striking animation
// when the four boxes get matched, and show the game-over screen after 5 seconds.

// Example usage when you detect a win:
// Replace these with your logic to detect the win and select the matching cells.

const matchedCells = document.querySelectorAll('.matched-cell');

// Trigger the animation for the matched cells
matchedCells.forEach((cell) => {
  cell.classList.add('strike');
});

// Show the game-over screen after 5 seconds
setTimeout(() => {
  const gameOverScreen = document.getElementById('game-over');
  gameOverScreen.style.display = 'block';
}, 5000);
