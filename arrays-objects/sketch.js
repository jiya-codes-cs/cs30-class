// Candy Crush Saga
// Jiya Khalsa Bangar
// 10 October, Friday, 2025
//
// Extra for Experts:
// - explored do...while loops

// Things to add
// - Board (done)
// - Candies (done)
// - Setting it to the middle of the screen
// - Candy position
// - Add a Timer
// - Add a Start Screen
// - Add messages

let rows = 8;
let columns = 8;
let cellSize = 50;

// just basic colors for now (maybe change to images later?)
let candyTypes = ["red", "blue", "green", "yellow", "purple"];

class Candy {
  constructor(type, row, column) {
    this.type = type;
    this.row = row;
    this.column = column;
  }

  draw() {
    fill(this.type);
    noStroke();
    circle(this.column * cellSize + cellSize/2, this.row * cellSize + cellSize/2, cellSize * 0.8);
  }
}

let board = []; // 2D array for the board
let selectedCandy = null;

function setup() {
  createCanvas(columns * cellSize, rows * cellSize);
  makeBoard();
}

function draw() {
  background(200);
  drawBoard();
}

// created random color candy's that will be displayed on the board
function makeBoard() {
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < columns; c++) {
      let newColor;
      do {
        newColor = random(candyColors);
      } while (c>=2 && board [r][c-1] === newColor && board [r][c-2].color === newColor || 
               r>=2 && board [r-1][c] === newColor && board [r-2][c].color === newColor);
      board[r][c] = new Candy(newColor, r, c);
    }
  }
}

// created a function that makes the board on which the game will run
function drawBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c].draw();
      //highlight selected candy 
      if (selectedCandy && selectedCandy.row === r && selectedCandy.columns === c) {
        strokeWeight(4);
        stroke(255, 255, 0);
        noFill();
        rect(c * cellSize + 2, r * cellSize + 2, cellSize - 4, cellSize - 4);
      }
    }
  }
}

// created a function that selects candy when mouse is pressed
function mousePressed(){
  let c = floor(mouseX / cellSize);
  let r = floor(mouseY/ cellSize);
  if (r>= 0 && r <rows && c>= 0 && c < columns) {
    if(!selectedCandy) {
      selectedCandy = board[r][c]; //select first candy
    }
    else {
      // try to swap if neighbour is same
      if(isNeighbor(selectedCandy, board[r][c])) {
        swapCandies(selectedCandy, board[r][c]);
        selectedCandy = null;
      }
      else {
        selectedCandy = board[r][c]; //change selection (swap done)
      }
    }
  }
}

// this function checks if 2 candies are neighbors
function isNeighbor(c1,c2) {
  return abs(c1.row - c2.row) + abs(c1.column - c2.column) === 1;
}

// this funcion swaps 2 candies
function swapCandies() {
  let tempColor = c1.color;
  c1.color = c2.color;
  c2.color = tempColor;
}

// remove matches (3 or more in a row or column)
function removeMatches() {
  let toRemove = [];
  // check horizontally
  for(let r = 0; r < rows; r++) {
    for(let c = 0; columns - 2; c++) {
      if (board[r][c].color === board[r+1][c].color && board[r][c].color === board[r+2][c]) {
        toRemove.push([r][c], [r+1][c], [r+2][c]);
      }
    }
  }
}

// removes canies by setting color to null
for(let [r,c] of toRemove) {
  board[r][c].color = null;
}

// applies gravity and fills emppty slots
function applyGravity() {
  for(let c= 0; c < columns; c++) {
    for(let r= rows - 1; r>= 0; r--) {
      if (board[r][c].color === null) {
        // move candies above down
        for (let k = r; k > 0; k--) {
          board[k][c].color = board[k-1][c].color;
        }
        // top candy gets new random color
        board[0][c].color = random(candyColors);
      }
    }
  }
}
