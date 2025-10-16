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
      } while ((c>2 && board [r][c-1] === newColor && board [r][c-2].color === newColor) || (c>2 && board [r][c-1] === newColor && board [r][c-2].color === newColor)

      let randomType = random(candyTypes);
      board[r][c] = new Candy(randomType, r, c);
    }
    
  }
}

// created a function that makes the board on which the game will run
function drawBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c].draw();
    }
  }
}


