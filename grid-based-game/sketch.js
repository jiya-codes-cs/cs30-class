// Treaure Hunt Game
// Jiya Khalsa Bangar
// October 30, Thursday
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// TO DO LIST:
// - Make the grid (windowWidth && windowHeight) {DONE}
// - Add the mindsweeper thing like 1, 2 etc and then randomize it
// - Add the tunnel in the end position 
// - Add boulders in the end, money bag randomized && insect somewhere near the boulder
// - Add the character that can move with the mouse && arrows
// - Add inventory at the bottom of the scrreen so take out 12% of the windowWidth and then add that
// - Display the rules above
// - Add money rain wehn they reach the Tunnel
// - Add Congratulations and Play Again button at the end
// - Add sound effects or just one backgound sound


let theGrid;
const SQUARE_DIMENSIONS = 10;

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width/SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height/SQUARE_DIMENSIONS;
  }
  theGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function draw() {
  background(220);
  showGrid();
}

function showGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if (theGrid[y][x] === 1) {
        fill("black");
      }
      else if (theGrid[y][x] === 0) {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  if (theGrid[y][x] === 1) {
    theGrid[y][x] = 0;
  }
  else if (theGrid[y][x] === 0) {
    theGrid[y][x] = 1;
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}