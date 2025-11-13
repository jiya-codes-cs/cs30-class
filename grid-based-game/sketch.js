// Treaure Hunt Game
// Jiya Khalsa Bangar
// October 30, Thursday
//
// Extra for Experts:
// - used do...while loops to keep randomizing positions until valid spots were found (no overlaps, fair placement for boulders and money bags)

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
let moneyScore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //leaving 12% for inventory section at the bottom
  const gridAreaHeight = height * 0.88;

  //covers horizontally till the end of the screen  
  cellSize = min(width / GRID_SIZE, gridAreaHeight / GRID_SIZE);

  // creates the grid
  theGrid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // places tunnel (goal)
  tunnelCol = GRID_SIZE - 1;
  tunnelRow = GRID_SIZE - 1;

  // generates boulders and money bags 
  generateObstacles(GRID_SIZE);
}

function draw() {
  background(200);

  displayRules();
  showGrid();
  drawBoulders();
  drawMoneyBags();
  drawTunnel();
  drawPlayer();
  drawInventoryBar();
  displayMoneyScore();

  if (gameWon) {
    displayWinMessage();
  }
}

function showGrid() {
  for (let y = 0; y < theGrid.length; y++) {
    for (let x = 0; x < theGrid[0].length; x++) {
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
  rect(0 , height * 0.88, width, height * 0.12); // this creates the bottom position  
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
function generateObstacles(rowsToUse) {
  // resets both lists to make sure there are no duplicates
  boulderList = [];
  moneyBagList = [];

  // Add 6 boulders (randomized positions but not on start/tunnel)
  for (let i = 0; i < 6; i++) {
    let x, y;

    // keep picking random x,y till we find a valid empty spot for the boulder
    do {
      x = floor(random(GRID_SIZE));
      y = floor(random(rowsToUse));
    } while (
      x === 0 && y === 0 || x === tunnelCol && y === tunnelRow || // not at player start or not at tunnel
      boulderList.some(b => b.x === x && b.y === y)  // no duplicate boulders
    );

    // sets boulders position to x:10 and y:20 for example while returning an array length 1 
    // instead of it being separate x and y values and returning an array length of 2
    boulderList.push({ x, y }); 
  }

  // Add 10 money bags (avoids boulders and each other)
  for (let i = 0; i < 8; i++) {
    let x, y;

    // keeps looping until the bag spawns in a free spot (not on boulder, not overlapping)
    do {
      x = floor(random(GRID_SIZE));
      y = floor(random(rowsToUse));
    } while (
      x === 0 && y === 0 || x === tunnelCol && y === tunnelRow ||  // not at player start or not at tunnel
      boulderList.some(b => b.x === x && b.y === y) ||  // not on boulder
      moneyBagList.some(bag => bag.x === x && bag.y === y)  // not overlapping another bag
    );

    moneyBagList.push({ x, y }); // pushes money bag object to list
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

function keyPressed() {
  if (gameWon) {
    return;
  }

  let nextX = playerCol;
  let nextY = playerRow;

  if (key === "a" || key === "A") {
    if (playerCol > 0) {
      nextX--;
    }
  }
  else if (key === "d" || key === "D") {
    if (playerCol < GRID_SIZE - 1) {
      nextX++;
    }
  }
  else if (key === "w" || key === "W") {
    if (playerRow > 0) {
      nextY--;
    }
  }
  else if (key === "s" || key === "S") {
    if (playerRow < GRID_SIZE - 1) {
      nextY++;
    }
  }

  // Move if not a boulder
  if (!isBoulder(nextX, nextY)) {
    playerCol = nextX;
    playerRow = nextY;
    collectMoney(nextX, nextY);
  }

  // Check for win
  if (playerCol === tunnelCol && playerRow === tunnelRow) {
    gameWon = true;
  }
}

// removes money bag from board and updates score
function collectMoney(x, y) {
  for (let i = moneyBagList.length - 1; i >= 0; i--) {
    let bag = moneyBagList[i];
    if (bag.x === x && bag.y === y) {
      moneyBagList.splice(i, 1); // removes bags from array and displays an empty spot
      moneyScore += 100;         // this is the increment score for each money bag that you get
      break;
    }
  }
}

function displayMoneyScore() {
  fill(180);
  rect(width - 120, 10, 110, 50); // creates a small box in top-right corner
  fill("black");
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Money: $" + moneyScore, width - 65, 35);
}