const slider = document.getElementById('board-size-slider');
let gridSize = slider.value;
const board = document.getElementById("board");
const sliderTooltip = document.getElementById("sliderTooltip");
let boardData = [];
let moveOrder = [];
let player = 1;


function generateCells(size){
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  boardData = [];
  moveOrder = [];
  nextMoves = [];
  winCells = [];
  player = 1;
  gameState = true;

  for (let i = 0; i < size * size; i++) {
    boardData.push(0);
    let cell = document.createElement('div');
    cell.classList.add("cell");
    cell.id = "cell".concat(i.toString());
    cell.onclick = () => {cellClicked(i)};
    board.appendChild(cell);
  }
}

function cellClicked(cellNumber) {
  playMove(cellNumber)
}

slider.addEventListener('input', () => {
  let size = slider.value;
  gridSize = size;
  sliderTooltip.innerText = `${size} x ${size}`;
  let thumbPos = ((parseInt((slider.style.width).slice(0,-2)))/20.5) * (size-10);
  sliderTooltip.style.bottom = `${thumbPos-490}px`;
  //console.log(slider.style.width);

  generateCells(size);
});

generateCells(gridSize);
