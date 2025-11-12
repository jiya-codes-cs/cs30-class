// Treaure Hunt Game
// Jiya Khalsa Bangar
// October 30, Thursday
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// TO DO LIST:
// - Make the grid (windowWidth && windowHeight) {DONE}
// - Add the mindsweeper thing like 1, 2 etc and then randomize it {Later}
// - Add the tunnel in the end position 
// - Add boulders in the end, money bag randomized && insect somewhere near the boulder (use textures and images refer to OpenGameArt)
// - Add the character that can move with the mouse && arrows
// - Add inventory at the bottom of the scrreen so take out 12% of the windowWidth and then add that
// - Display the rules above
// - Add money rain wehn they reach the Tunnel
// - Add Congratulations and Play Again button at the end
// - Add sound effects or just one backgound sound

let theGrid;
const GRID_SIZE = 15;
let cellSize;

let playerCol = 0;
let playerRow = 0;

let tunnelCol;
let tunnelRow;

let boulderList = [];
let moneyBagList = [];

let gameWon = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //leaving 12% for inventory section at the bottom
  const gridAreaHeight = height * 0.88;  
  cellSize = min(gridAreaHeight, width) / GRID_SIZE;

  // creates the grid
  theGrid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // places tunnel (goal)
  tunnelCol = GRID_SIZE - 1;
  tunnelRow = GRID_SIZE - 1;

  // generates boulders and money bags 
  generateObstacles();

  // Calculates Mindsweeper numbers and logic 
  // addMindsweeperNumbers();
}

function draw() {
  background(200);

  displayRules();
  showGrid();
  drawPlayer();
  drawTunnel();
  drawBoulders();
  drawMoneyBags();
  drawInventoryBar();

  if (gameWon) {
    displayWinMessage();
  }
}

function showGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      fill("white");
      stroke(0);
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function drawPlayer() {
  fill("blue");
  square(playerCol * cellSize, playerRow * cellSize, cellSize);
}

function drawTunnel() {
  fill("black");
  square(tunnelCol * cellSize, tunnelRow * cellSize, cellSize);
}

function drawBoulders() {
  fill("grey");
  for (let boulder of boulderList) {
    square(boulder.x * cellSize, boulder.y * cellSize, cellSize);
  }
}

function drawMoneyBags() {
  fill("gold");
  for(let bag of moneyBagList) {
    square(bag.x * cellSize, bag.y * cellSize, cellSize);
  }
}

// this function creates the inventory section at the bottom
function drawInventoryBar() {
  fill(230);
  rect(0 * height * 0.88, width, height * 0.12); // this creates the bottom position  
  fill("black");
  textSize(18);
  textAlign(CENTER, CENTER); // deals with text alignment 
  text("Inventory is here!", width / 2, height * 0.94);
}

function displayRules() {
  fill("black");
  textSize(16);
  textAlign(LEFT, TOP);
  text("Use arrow keys to move. Reach the GOLD tunnel to win!", 10, 10);
}

function displayWinMessage() {
  fill("black");
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Congratulations! You WON", width/2, height/2);
}

// this function genrates random grid 
function generateRandomGrid(cols, rows) {
  let grid = [];
  for (let y = 0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) {
      grid[y].push(0);
    }
  }
  return grid;
}

// this function genrates obstacles 
function generateObstacles() {
  // Add 6 boulders
  for (let i = 0; i < 6; i++) {
    let x = floor(random(GRID_SIZE));
    let y = floor(random(GRID_SIZE));
    if ((x !== 0 || y !== 0) && (x !== tunnelCol || y !== tunnelRow)) {
      // sets boulders position to x:10 and y:20 for example while returning an array length 1 
      // instead of it being separate x and y values and returning an array length of 2
      boulderList.push({x, y});
    }
  }

  // Add 4 money bags
  for (let i = 0; i < 4; i++) {
    let x = floor(random(GRID_SIZE));
    let y = floor(random(GRID_SIZE));
    if ((x !== 0 || y !== 0) && (x !== tunnelCol || y !== tunnelRow)) {
      moneyBagList.push({x, y});
    }
  }
}

function keysPressed() {
  if (gameWon)  {
    return;
  }

  let nextX = playerCol;
  let nextY = playerRow;

  if (keyCode === LEFT_ARROW && playerCol > x) {
    nextX--;
  }
  if (keyCode === RIGHT_ARROW && playerCol < GRID_SIZE - 1) {
    nextX++;
  }
  if (keyCode === UP_ARROW && playerRow > 0) {
    nextY--;
  }
  if (keyCode === DOWN_ARROW && playerRow < GRID_SIZE - 1) {
    nextY++;
  }

  // Checks boulders before moving
  if(!isBoulder (nextX, nextY)) {
    playerCol = nextX;
    playerRow = nextY;
  }

  // Checks if we reached a tunnel
  if (playerCol === tunnelCol && playerRow === tunnelRow) {
    gameWon = true;
  }
}

function isBoulder(x, y) {
  for(let boulder of boulderList) {
    if(boulder.x === x && boulder.y === y) {
      return true;
    }
  }
  return false;
}