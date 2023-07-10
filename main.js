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
let horizontalOrientation = true;
let verticalOrientation = false;

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

  if (evt.target.parentElement.id === 'playerBoard' && verticalOrientation === true && !evt.target.classList.contains("isShip")){
    const shipSize = parseInt(shipToDrag.getAttribute('ship-size'));
    const dropStartPos = Array.from(squares).indexOf(evt.target);
    const dropEndPos = dropStartPos + (shipSize*10-10);
    let classIsShip = false;

    if (dropEndPos <= squares.length){
      for (let i = dropStartPos; i <= dropEndPos; i+=10) {
        if(squares[i].classList.contains('isShip')){
          classIsShip = true;
          break;
        }
      }
      
      if(!classIsShip){  
        for(let i = dropStartPos; i <= dropEndPos; i+=10){
          squares[i].classList.add('isShip');
          if(shipSize === 5){
            squares[i].style.backgroundColor = "coral";
          }
          if(shipSize === 4){
            squares[i].style.backgroundColor = "indigo";
          }
          if(shipSize === 3){
            squares[i].style.backgroundColor = "darkgoldenrod";
          }
          if(shipSize === 2){
            squares[i].style.backgroundColor = "brown";
          }
        }
      } else{
        return;
      }

      shipToDrag.draggable = false;
      shipToDrag.removeEventListener('dragstart', dragStart);
      shipToDrag.parentNode.removeChild(shipToDrag);
    }
  }

  if (evt.target.parentElement.id === 'playerBoard' && horizontalOrientation === true && !evt.target.classList.contains("isShip")){
    const shipSize = parseInt(shipToDrag.getAttribute('ship-size'));
    const dropStartPos = Array.from(squares).indexOf(evt.target);
    const dropEndPos = dropStartPos + shipSize;
    let classIsShip = false;
    const startPosArr = dropStartPos.toString().split('').map(Number);
    const endPosArr = dropEndPos.toString().split('').map(Number);

    if (dropEndPos <= squares.length && (startPosArr[0] === endPosArr[0] || endPosArr[1] === 0)) {
      for (let i = dropStartPos; i < dropEndPos; i++) {
        if(squares[i].classList.contains('isShip')){
          classIsShip = true;
          break;
        }
      }
      
      if(!classIsShip){  
        for(let i = dropStartPos; i < dropEndPos; i++){
          squares[i].classList.add('isShip');
          if(shipSize === 5){
            squares[i].style.backgroundColor = "coral";
          }
          if(shipSize === 4){
            squares[i].style.backgroundColor = "indigo";
          }
          if(shipSize === 3){
            squares[i].style.backgroundColor = "darkgoldenrod";
          }
          if(shipSize === 2){
            squares[i].style.backgroundColor = "brown";
          }
        }
      } else{
        return;
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
    let randomNum = Math.random() < 0.5;
    let horizontalOrientation = randomNum;
    if(horizontalOrientation){
      let randomPos = randomSquarePos(board);
      let startPos = Array.from(aiSquares).indexOf(randomPos);
      let endPos = startPos + (i+2);
      let startPosArr = startPos.toString().split('').map(Number);
      let endPosArr = endPos.toString().split('').map(Number);
      let classIsShip = false;
      for (let m = startPos; m < endPos; m++) {
        if(aiSquares[m].classList.contains('isShip')){
          classIsShip = true;
        }
      }
      while(classIsShip === true){
        while(endPos > aiSquares.length && ((startPosArr[0] != endPosArr[0]) || (endPosArr[1] != 0))){
          randomPos = randomSquarePos(board);
          startPos = Array.from(aiSquares).indexOf(randomPos);
          endPos = startPos + (i+2);
          startPosArr = startPos.toString().split('').map(Number);
          endPosArr = endPos.toString().split('').map(Number);
          for (let m = startPos; m < endPos; m++) {
            if(aiSquares[m].classList.contains('isShip')){
            classIsShip = true;
            }
          }
        };
      }

      for(let k = startPos; k < endPos; k++){
        aiSquares[k].classList.add('isShip');
        aiSquares[k].style.backgroundColor = "white";
        aiSquares[k].style.border = "1px solid lightgrey"
      }
    }
    if(!horizontalOrientation){
      let randomPos = randomSquarePos(board);
      let startPos = Array.from(aiSquares).indexOf(randomPos);
      let endPos = startPos + ((i+1)*10);
      let startPosArr = startPos.toString().split('').map(Number);
      let endPosArr = endPos.toString().split('').map(Number);
      let classIsShip = false;
      for (let m = startPos; m <= endPos; m+=10) {
        if(aiSquares[m].classList.contains('isShip')){
          classIsShip = true;
        }
      }
      while(classIsShip === true && endPos > aiSquares.length){
        randomPos = randomSquarePos(board);
        startPos = Array.from(aiSquares).indexOf(randomPos);
        endPos = startPos + (i+2);
        startPosArr = startPos.toString().split('').map(Number);
        endPosArr = endPos.toString().split('').map(Number);
        for (let m = startPos; m < endPos; m+=10) {
          if(aiSquares[m].classList.contains('isShip')){
          classIsShip = true;
          }
        };
      }

      for(let k = startPos; k <= endPos; k+=10){
        aiSquares[k].classList.add('isShip');
        aiSquares[k].style.backgroundColor = "white";
        aiSquares[k].style.border = "1px solid lightgrey"
      }
    }
  }
}

function playerClickSquare(square, board) {
  if (board === 'aiBoard' && (warningIndicator.innerText === "You have started the game. Click on any square on your opponent's board that you would like to attack first." || warningIndicator.innerText === "Opponent has missed. It is your turn now." || warningIndicator.innerText === "You hit a ship. You can attack again.")) {
    if (square.classList.contains('isShip')) {
      square.classList.remove("isShip");
      square.classList.add("hit");
      square.innerText = "X"
      square.removeEventListener('click', playerClickSquare);
      warningIndicator.innerText = "You hit a ship. You can attack again.";
      turnIndicator.innerText = "Game has started.";
    } else if(square.classList.contains("hit") || square.classList.contains("miss")){
      return;
    }
    else {
      square.classList.add("miss");
      square.innerText = "O"
      square.removeEventListener('click', playerClickSquare);
      warningIndicator.innerText = "You missed. It is your opponent's turn to attack. Please wait..."
      turnIndicator.innerText = "Game has started."
      setTimeout(activateAI, 1000);
    }
    winnerIndicator();
  }
}

function activateAI(){
  if(warningIndicator.innerText === "You missed. It is your opponent's turn to attack. Please wait..." || warningIndicator.innerText === "Opponent has hit your ship. It will attack again."){
    const randomSquare = randomSquarePos(playerBoard);
    if(randomSquare.classList.contains("isShip")){
      randomSquare.classList.remove("isShip");
      randomSquare.classList.add("hit");
      randomSquare.innerText = "X";
      warningIndicator.innerText = "Opponent has hit your ship. It will attack again.";
      winnerIndicator();
      setTimeout(activateAI, 1000);
    } else if (randomSquare.classList.contains("hit") || randomSquare.classList.contains("miss")){
      activateAI();
    } else if (randomSquare.classList.contains("square")){
      randomSquare.classList.add("miss");
      randomSquare.innerText = "O";
      warningIndicator.innerText = "Opponent has missed. It is your turn now.";
    }
  }
}

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const rotateBtn = document.getElementById("rotateBtn");
const turnIndicator = document.getElementById("turnIndicator");
const warningIndicator = document.getElementById("placeShipsWarn");
const shipContainerEl = shipContainer.getElementsByClassName("shipUsed");
const ship1 = document.getElementById("ship1");
const ship2 = document.getElementById("ship2");
const ship3 = document.getElementById("ship3");
const ship4 = document.getElementById("ship4");

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
  warningIndicator.innerText = "You have started the game. Click on any square on your opponent's board that you would like to attack first."
  turnIndicator.innerText = "You have the first turn to attack your opponent's ships."

  for(const square of aiSquares){
    square.addEventListener('click', () => playerClickSquare(square, 'aiBoard'));
  }
  rotateBtn.style.display = 'none';
  shipContainer.style.display = 'none';
}

function restartButton(){
  location.reload();
}

let angleOfShip = 0;

function rotateButton(){
  angleOfShip += 90;
  for(const ship of shipsUsed){
    ship.style.transform = `rotate(${angleOfShip}deg)`
  }
  if(horizontalOrientation){
    horizontalOrientation = false;
    verticalOrientation = true;
  } else{
    horizontalOrientation = true;
    verticalOrientation = false;
  }
}

function winnerIndicator(){
  if(warningIndicator.innerText === "You hit a ship. You can attack again." || warningIndicator.innerText === "Opponent has missed. It is your turn now."){
    let classArr = Array.from(aiSquares).flatMap(square => Array.from(square.classList));
    if(!classArr.includes('isShip')){
      warningIndicator.innerText = "You have sunk all of your opponent's ships!";
      turnIndicator.innerText = "You won! Please click on the 'Restart' button if you want to play again."
    } else{
      classArr = [];
      return;
    }
  }

  if(warningIndicator.innerText === "You missed. It is your opponent's turn to attack. Please wait..." || warningIndicator.innerText === "Opponent has hit your ship. It will attack again."){
    let classArr = Array.from(squares).flatMap(square => Array.from(square.classList));
    if(!classArr.includes("isShip")){
      warningIndicator.innerText = "All your ships have been sunk.";
      turnIndicator.innerText = "You lost! Please click on the 'Restart' button if you want to play again."
      } else{
        classArr = []
        return;
      }
  }
}

