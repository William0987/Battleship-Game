function boardBuilder(boardName) {
  const board = document.getElementById(boardName);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.className = 'square';
      square.addEventListener('click', () => playerClickSquare(square, boardName));
      board.appendChild(square);
    }
  }

  return board;
}

const playerBoard = boardBuilder('playerBoard');
const aiBoard = boardBuilder('aiBoard');
const shipsUsed = document.querySelectorAll('.shipUsed');
const squares = playerBoard.getElementsByClassName('square');
let shipToDrag = null;

for (const ships of shipsUsed) {
  ships.addEventListener('dragstart', dragStart);
}

for (const square of squares) {
  square.addEventListener('dragenter', dragEnter);
  square.addEventListener('dragover', dragOver);
  square.addEventListener('dragleave', dragLeave);
  square.addEventListener('drop', dragDrop);
}

function dragStart(evt) {
  shipToDrag = evt.target;
}

function dragEnter(evt) {
  evt.preventDefault();
  evt.target.classList.add('dragHover');
}

function dragOver(evt) {
  evt.preventDefault();
}

function dragLeave(evt) {
  evt.target.classList.remove('dragHover');
}

function dragDrop(evt) {
  evt.preventDefault();
  evt.target.classList.remove('dragHover');

  if (evt.target.parentElement.id === 'playerBoard' && !evt.target.classList.contains('isShip')) {
    const shipSize = parseInt(shipToDrag.getAttribute('ship-size'));
    const dropStartPos = Array.from(squares).indexOf(evt.target);
    const dropEndPos = dropStartPos + shipSize;

    if (dropEndPos <= squares.length) {
      for (let i = dropStartPos; i < dropEndPos; i++) {
        squares[i].classList.add('isShip');
      }

      shipToDrag.draggable = false;
      shipToDrag.removeEventListener('dragstart', dragStart);
      shipToDrag.parentNode.removeChild(shipToDrag);
    }
  }
}

function randomSquarePos(board) {
  const squares = board.getElementsByClassName('square');
  const rndmPos = Math.floor(Math.random() * squares.length);
  return squares[rndmPos];
}

function addAIShips(board, amountOfShips) {
  for (let i = 0; i < amountOfShips; i++) {
    let square;
    do {
      square = randomSquarePos(board);
    } while (square.classList.contains('isShip'));

    square.classList.add('isShip');
  }
}

addAIShips(aiBoard, 4);

function playerClickSquare(square, board) {
  if (board === 'aiBoard') {
    if (square.classList.contains('isShip')) {
      square.style.backgroundColor = 'red';
      square.removeEventListener('click', playerClickSquare);
    } else {
      square.style.backgroundColor = 'orange';
      square.removeEventListener('click', playerClickSquare);
      activateAI();
    }
  }
}

function activateAI(){

}