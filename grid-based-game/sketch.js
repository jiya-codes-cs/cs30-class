// Treaure Hunt Game
// Jiya Khalsa Bangar
// October 30, Thursday
//
// Extra for Experts:
// - used do...while loops to keep randomizing positions until valid spots were found (no overlaps, fair placement for boulders and money bags)
// - used the arrow functions to check if boulders or moneybags in the list matches the grid cell 

let theGrid;
const GRID_SIZE = 15;
let cellSize;

let playerCol = 0;
let playerRow = 0;

let chestCol;
let chestRow;

let boulderList = [];
let moneyBagList = [];

let gameWon = false;
let moneyScore = 0;

let chestImg; // stores the treasure chest image
let moneyBagImg; // stores the money bag image
let groundImg; // stores the ground tile image
let boulderImg; // stores the boulder image
let characterImg; // stores the character image
let startScreenImg; // stores the start screen image

let gameStarted = false;
let offsetX; 

function preload() {
  // load treasure chest image so it's ready before setup
  chestImg = loadImage("treasureChest.jpg");
  moneyBagImg = loadImage("moneyBag.png");
  groundImg = loadImage("Ground.JPG");
  boulderImg = loadImage("Boulders.jpg");
  characterImg = loadImage("Character.jpg");// player character
  startScreenImg = loadImage("startScreen.png"); // start screen image
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //leaving 12% for inventory section at the bottom
  const gridAreaHeight = height * 0.88;

  //covers horizontally till the end of the screen  
  cellSize = min(width / GRID_SIZE, gridAreaHeight / GRID_SIZE);

  // calculate horizontal offset to center the grid
  offsetX = (width - GRID_SIZE * cellSize) / 2;
  // creates the grid
  theGrid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // places tunnel (goal)
  chestCol = GRID_SIZE - 1;
  chestRow = GRID_SIZE - 1;

  // this function generates boulders and money bags 
  generateObstacles();
}

function draw() {
  if (!gameStarted) {
    image(startScreenImg, 0, 0, width, height);
    return; // stop drawing the game until started
  }
  background(200);

  showGrid();
  drawBoulders();
  drawMoneyBags();
  drawChest();
  drawPlayer();
  drawInventoryBar();
  displayMoneyScore();

  if (gameWon) {
    displayWinMessage();
  }
}

function showGrid() {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      // check if this cell is not a boulder, money bag, or tunnel
      // checks if any boulder in the list matches this grid cell using an arrow function
      // .some checks if this grid cell contains a boulder
      let isBoulderCell = boulderList.some(b => b.col === col && b.row === row);

      // checks if any money bag is at this grid cell using an arrow function
      // .some checks if this grid cell contains a moneybag
      let isMoneyBagCell = moneyBagList.some(bag => bag.col === col && bag.row === row);
      let isChestCell = col === chestCol && row === chestRow;

      if (!isBoulderCell && !isMoneyBagCell && !isChestCell) {
        // draw ground tile
        image(groundImg, col * cellSize + offsetX, row * cellSize, cellSize, cellSize);
      } 
      else {
        // leaving blank
        // specific drawing functions will draw boulder/money/chest automatically
      }
    }
  }
}

function drawPlayer() {
  // draw character image at player's current grid position
  image(characterImg, playerCol * cellSize + offsetX, playerRow * cellSize, cellSize, cellSize);
}

function drawChest() {
  // always draw the treasure chest image at the chest location
  image(chestImg, chestCol * cellSize + offsetX, chestRow * cellSize, cellSize, cellSize);
}

function drawBoulders() {
  for (let boulder of boulderList) {
    // draw the boulder image at the boulder's grid position
    image(boulderImg, boulder.col * cellSize + offsetX, boulder.row * cellSize, cellSize, cellSize);
  }
}

function drawMoneyBags() {
  fill("gold");
  for(let bag of moneyBagList) {
    // draws the money bag images at the bag's grid locations
    image(moneyBagImg, bag.col * cellSize + offsetX, bag.row * cellSize, cellSize, cellSize);
  }
}

// this function creates the inventory section at the bottom
function drawInventoryBar() {
  fill(230);
  rect(0, height * 0.88, width, height * 0.12);  
  fill("black");
  textSize(18);
  textAlign(LEFT, CENTER); 
  text("Inventory:", 20, height * 0.94);

  const totalBags = 8; // total slots
  const startX = 150; // starting x for the first slot
  const y = height * 0.92; // vertical position for images
  const spacing = 50; // space between images

  // draw the 8 money bag images
  for (let i = 0; i < totalBags; i++) {
    image(moneyBagImg, startX + i * spacing, y, 40, 40);

    // if this bag has been collected, draw a checkmark
    // assuming each bag gives 100 points this if statement would run smoothly
    if (i < moneyScore / 100) {      
      fill("green");
      textSize(24);
      // this is the position checkmark below image
      text("✓", startX + i * spacing + 12, y + 45); 
    }
  }
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
  for (let row = 0; row < rows; row++) {
    grid.push([]);
    for (let col = 0; col < cols; col++) {
      grid[row].push(0);
    }
  }
  return grid;
}

// this function genrates obstacles 
function generateObstacles() {
  boulderList = generateObjects(6, "boulder");
  moneyBagList = generateObjects(8, "moneyBag", boulderList);
}

// Helper function to generate objects
function generateObjects(num, type, avoidList = []) {
  const list = [];
  for (let i = 0; i < num; i++) {
    let col, row;

    do {
      col = floor(random(GRID_SIZE));
      row = floor(random(GRID_SIZE));
    } while (
      col === 0 && row === 0 || col === chestCol && row === chestRow || // avoids player start and chest
      list.some(obj => obj.col === col && obj.row === row) || // avoid duplicates
      avoidList.some(obj => obj.col === col && obj.row === row) // avoid other type objects if needed
    );

    list.push({ col, row });
  }
  return list;
}

function isBoulder(col, row) {
  for(let boulder of boulderList) {
    if(boulder.col === col && boulder.row === row) {
      return true;
    }
  }
  return false;
}

function keyPressed() {
  if (!gameStarted && keyCode === ENTER) {
    gameStarted = true;
    return;
  }

  if (gameWon || !gameStarted) {
    return;
  }
  let nextCol = playerCol;
  let nextRow = playerRow;

  if (key === "a" || key === "A") {
    if (playerCol > 0) {
      nextCol--;
    }
  }
  else if (key === "d" || key === "D") {
    if (playerCol < GRID_SIZE - 1) {
      nextCol++;
    }
  }
  else if (key === "w" || key === "W") {
    if (playerRow > 0) {
      nextRow--;
    }
  }
  else if (key === "s" || key === "S") {
    if (playerRow < GRID_SIZE - 1) {
      nextRow++;
    }
  }

  // Move if not a boulder
  if (!isBoulder(nextCol, nextRow)) {
    playerCol = nextCol;
    playerRow = nextRow;
    collectMoney(nextCol, nextRow);
  }

  // Check for win
  if (playerCol === chestCol && playerRow === chestRow) {
    gameWon = true;
  }
}

// removes money bag from board and updates score
function collectMoney(col, row) {
  for (let i = moneyBagList.length - 1; i >= 0; i--) {
    let bag = moneyBagList[i];
    if (bag.col === col && bag.row === row) {
      // removes bags from array and displays an empty spot
      moneyBagList.splice(i, 1); 
      // this is the increment score for each money bag that you get
      moneyScore += 100;         
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
