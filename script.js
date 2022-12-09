const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

// Classes for X and O marks
const X_CLASS = 'ex';
const O_CLASS = 'oh';
let ohTurn;

// Winning combinations.
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// End text variables.
const endText = document.querySelector('[end-text]');
const endTextId = document.getElementById('end');

// Restart game variables.
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', start);

// Start game with the X as the beginning turn.
// Restart the game if the player hits restart.
start();
function start() {
  ohTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setHoverState();
  endTextId.classList.remove('show');
}

// End game and displays text for winners or if the game is a draw.
function end(draw) {
  if (draw) {
    endText.innerText = 'DRAW!';
  } else {
    if (ohTurn) {
      endText.innerText = 'Player O wins!';
    } else {
      endText.innerText = 'Player X wins!';
    }
  }
  endTextId.classList.add('show');
}

//***************************
// MAIN FUNCTION OF THE GAME
//***************************
function handleClick(e) {
  // 1. Place marks on the cells.
  const cell = e.target;
  const currentTurn = ohTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentTurn);

  // 2. Checks for winner.
  if (checkForWinner(currentTurn)) {
    end(false);
  } else if (isDraw()) {
    end(true);
  } else {
    swapTurns();
    setHoverState();
  }
}

// TODO: Place marks.
cellElements.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});
function placeMark(cell, currentTurn) {
  cell.classList.add(currentTurn);
}

// TODO: Checks for winner.
function checkForWinner(currentTurn) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentTurn);
    });
  });
}

// TODO: Checks for draw game.
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

// TODO: Switch turns.
function swapTurns() {
  ohTurn = !ohTurn;
}

// TODO: Add class to the board id so that it allows hover states.
function setHoverState() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (ohTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
