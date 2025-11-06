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

let GRID_SIZE;
let cellSize;
let playerX = 0;
let playerY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = height * 0.88/ GRID_SIZE ; //leaving 12% for inventory section at the bottom 
  }
  else {
    cellSize = width * 0.88/GRID_SIZE; //leaving 12% for inventory section at the bottom
  }
  // creates the grid
  theGrid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // places tunnel (goal)
  tunnelX = GRID_SIZE - 1;
  tunnelY = GRID_SIZE - 1;

  // generates boulders and money bags
  genrateObstacles();
}

function draw() {
  background(220);
  showGrid();
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
  square(playerX * cellSize, playerY * cellSize, cellSize);
}

function drawTunnel() {
  fill("black");
  square(tunnelX * cellSize, tunnelY * cellSize, cellSize);
}

function drawBoulders() {
  fill("grey");
  square(boulder.x * cellSize, boulder.y * cellSize, cellSize);
}

function drawMoneyBags() {
  fill("gold");
  for(let bag of moneyBags) {
    square(boulder.x * cellSize, boulder.y * cellSize, cellSize);
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
  textAlign(TOP, LEFT);
  text("• You need to get to the end of the tunnel. • Collect as many money bags as you can! •Buy inventory with that money to kill the bug and reach the tunnel. •Use Arrow keys to move. •", 10, 10);
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
  return newGrid;
}

// this function genrates obstacles 
function genrateObstacles() {
  // For now add 6 boulders (if needed we can adjust later)
  for(let i = 0; i < 6; i++) {
    let x = floor(random(GRID_SIZE));
    let y = floor(random(GRID_SIZE));
    if ((x !== 0 || y !== 0) && (x !== tunnelX || y !== tunnelY)) {
      // sets boulders position to x:10 and y:20 for example while returning an array length 1 
      // instead of it being separate x and y values and returning an array length of 2
      boulders.push({x, y});
    }
  }

  // Add 4 money bags
  for(let i = 0; i < 4; i++) {
    let x = floor(random(GRID_SIZE));
    let y = floor(random(GRID_SIZE));
    if ((x !== 0 || y !== 0) && (x !== tunnelX || y !== tunnelY)) {
      moneyBags.push({x, y});
    }
  }
}


function keysPressed() {
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


