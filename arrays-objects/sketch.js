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
// - Candy position (in progress)
// - Add a Timer
// - Add a Start Screen
// - Add messages

let rows = 8;
let columns = 8;
let cellSize = 50;

let candyColors = ["red", "blue", "green", "yellow", "purple"];

class Candy {
  constructor(color, row, column) {
    this.color = color;
    this.row = row;
    this.column = column;
  }

  draw() {
    if (!this.color) {
      fill(this.color);
      stroke(0);
      strokeWeight(2);
      circle(this.column * cellSize + cellSize/2, this.row * cellSize + cellSize/2, cellSize * 0.8); 
    }
  }
}

let board = [];
let selectedCandy = null;

function setup() {
  createCanvas(columns * cellSize, rows * cellSize);
  makeBoard();
}

function draw() {
  background(220);
  drawBoard();

  // continuously checks for matches and applies gravity
  if (removeMatches()) {
    applyGravity();
  }
}


// created random color candy's that will be displayed on the board
function makeBoard() {
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < columns; c++) {
      let newColor;
      do {
        newColor = random(candyColors);
      } while (c >= 2 && board[r][c-1].color === newColor && board[r][c-2].color === newColor ||
               r >= 2 && board[r-1][c].color === newColor && board[r-2][c].color === newColor);
      board[r][c] = new Candy(newColor, r, c);
    }
  }
}
// created a function that makes the board on which the game will run
function drawBoard() {
  for (let r = 0; r < rows; r++) {         
    for (let c = 0; c < columns; c++) {
      board[r][c].draw();
      // highlight selected candy
      if (selectedCandy && selectedCandy.row === r && selectedCandy.column === c) {
        strokeWeight(4);
        stroke(255, 255, 0);
        noFill();
        rect(c * cellSize + 2, r * cellSize + 2, cellSize - 4, cellSize - 4);
      }
    }
  }
}

// created a function that selects candy when mouse is pressed
function mousePressed() {
  let c = floor(mouseX / cellSize);
  let r = floor(mouseY / cellSize);
  if (r >= 0 && r < rows && c >= 0 && c < columns) {
    if (!selectedCandy) {
      selectedCandy = board[r][c]; // select first candy
    } 
    else {
      // try to swap if neighbor
      if (isNeighbor(selectedCandy, board[r][c])) {
        swapCandies(selectedCandy, board[r][c]);
        selectedCandy = null;

      // only swap if it creates a match
      if (!hasMatch()) swapCandies(selectedCandy, board[r][c]); {
        selectedCandy = null;
      }
    } 
    else {
      selectedCandy = board[r][c]; // change selection (swap done)
    }
  }
}


// this function checks if 2 candies are neighbors
function isNeighbor(a, b) {
  return abs(a.row - b.row) + abs(a.column - b.column) === 1;
}

// this funcion swaps 2 candies
function swapCandies(c1, c2) {
  let tempColor = a.color;
  a.color = b.color;
  b.color = tempColor;
}

// function checks if any matches exist
function hasMatch() {
  return removeMatches(true);
}

// remove matches (3 or more in a row or column)
function removeMatches() {
  let matched = [];

  // horizontal matches
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let color = board[r][c].color;
      if(!color) continue;
      if (board[r][c + 1].color === color && board[r][c + 2].color === color) {
        let k = c;
        while(k < columns && board[r][k].color === color) {
          matched.push([r],[k]);
          k++;
        }
        c = k - 1;
      }
    }
  }
  // vertical matches
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let color = board[r][c].color;
      if(!color) continue;
      if (board[r + 1][c].color === color && board[r + 2][c].color === color) {
        let k = r;
        while(k < rows && board[r][k].color === color) {
          matched.push([k],[c]);
          k++;
        }
        r = k - 1;
      }
    }
  }

  if (testOnly) return matched.length > 0; 

  // removes canies by setting color to null
  for (let [r,c] of toRemove) {
    board[r][c].color = null;
  }
  return matched.length > 0;
}

// applies gravity and fills empty slots
function applyGravity() {
  for (let c = 0; c < columns; c++) {
    for (let r = rows - 1; r >= 0; r--) {
      if (board[r][c].color === null) {

        // move candies above down
        for (let k = r; k > 0; k--) {
          board[k][c].color = board[k - 1][c].color;
        }

        // top candy gets new random color
        board[0][c].color = random(candyColors);
      }
    }
  }
}