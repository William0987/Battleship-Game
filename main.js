function boardBuilder(boardName) {
  const board = document.getElementById(boardName);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.className = 'square';
      board.appendChild(square);
    }
  }

  return board;
}

const playerBoard = boardBuilder('playerBoard');
const aiBoard = boardBuilder('aiBoard');
const shipContainer = document.getElementById("shipContainer");
const shipsUsed = document.querySelectorAll('.shipUsed');
const squares = playerBoard.getElementsByClassName('square');
const aiSquares = aiBoard.getElementsByClassName('square');
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

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const rotateBtn = document.getElementById("rotateBtn");
const turnIndicator = document.getElementById("turnIndicator");
const warningIndicator = document.getElementById("placeShipsWarn");
const shipContainerEl = shipContainer.getElementsByClassName("shipUsed");

startBtn.addEventListener("click", startButton);
restartBtn.addEventListener("click", restartButton);
rotateBtn.addEventListener("click", rotateButton);

function startButton(){
  for(let i = 0; i<aiSquares.length; i++){
    if(aiSquares[i].classList.contains("isShip")){
      turnIndicator.innerText = "You have already started the game.";
      return;
    }
  }
  for(let i = 0; i<shipContainerEl.length; i++){
    if(shipContainerEl[i].classList.contains("shipUsed")){
      warningIndicator.innerText = "Error. All ships need to be placed first before you can start the game."
      return;
    }
  }

  addAIShips(aiBoard, 4);
  
  for(const square of aiSquares){
    square.addEventListener('click', () => playerClickSquare(square, 'aiBoard'));
  }
}

function restartButton(){
  location.reload();
}

function rotateButton(){
  
}