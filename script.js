const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

cellElements.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});

// Classes for X and O marks
const X_CLASS = 'ex';
const O_CLASS = 'oh';
let ohTurn;

// Start game with the X as the beginning turn.
start();
function start() {
  ohTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener('click', handleClick, { once: true });
  });
  setHoverState();
}

function handleClick(e) {
  // Place marks on the cells.
  const cell = e.target;
  const currentTurn = ohTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentTurn);

  // Checks for winner.

  // Checks for loser.

  // Switch turns.
  swapTurns();

  // Apply hover states.
  setHoverState();
}

function placeMark(cell, currentTurn) {
  cell.classList.add(currentTurn);
}

function swapTurns() {
  ohTurn = !ohTurn;
}

// Add class to the board id so that it allows hover states.
function setHoverState() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (ohTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
