const colorMap = {0:"white", 1:"rgb(100, 131, 255)", 2:"rgb(237, 99, 115)"}
let gameState = true;
let winCells = [];

function playMove(cellNumber, action = "normalPlay") {
  if ((boardData[cellNumber] != 0) || (!gameState && action != "goFoward")) {return};
  if (action != "goFoward") {nextMoves = []};
  boardData[cellNumber] = player;
  document.getElementById("cell".concat(cellNumber.toString())).style.backgroundColor = colorMap[player];
  moveOrder.push(cellNumber);

  let evaluation = winEval(cellNumber);
  if (evaluation) {winDetected(evaluation)}


  player = 3 - player;
}

function resetFunction() {
  console.log("reset");
  colorBack();
  boardData = [];
  moveOrder = [];
  nextMoves = [];
  winCells = [];
  player = 1;
  gameState = true;
  
  
  for (let i = 0; i < (slider.value)**2; i++) {
    document.getElementById("cell".concat(i.toString())).style.backgroundColor = colorMap[0];
    boardData.push(0);
  }
}

function goBack() {
  if (moveOrder.length == 0) {return};
  let lastMove = moveOrder.pop();
  nextMoves.push(lastMove);
  boardData[lastMove] = 0;
  document.getElementById("cell".concat(lastMove.toString())).style.backgroundColor = colorMap[0];
  player = 3 - player;

  colorBack();
  gameState = true;
  winCells = [];
}
function goFoward() {
  
  if (nextMoves.length == 0) {return};
  console.log("NEXT MOVE")
  playMove(nextMoves.pop(), "goFoward")
  console.log(moveOrder, nextMoves)
}

function winDetected(winInfo) {
  let increment = {0:gridSize,1:(parseInt(gridSize)-1),2:-1,3:(-parseInt(gridSize)-1)}[winInfo[1]]
  for (let i = 0; i < 5; i++) {
    console.log("cell".concat((winInfo[0]-(increment*i)).toString()))
    let cellToColor = document.getElementById("cell".concat((winInfo[0]-(increment*i)).toString()));
    console.log(cellToColor)
    cellToColor.style.filter = "brightness(0.83)";
    cellToColor.style.borderColor = "rgb(126, 255, 180)";
    winCells.push(cellToColor);
  }
  gameState = false;
}

function colorBack() {
  if (winCells.length == 0) {return};
  for (let winCell of winCells) {
    winCell.style.filter = "brightness(1)";
    winCell.style.borderColor = "rgb(218, 218, 218)"
  }
}