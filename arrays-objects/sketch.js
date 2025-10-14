// Candy Crush Saga
// Jiya Khalsa Bangar
// 10 October, Friday, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
    circle(this.column * cellSize + cellSize/2, this.row * cellSize + cellSize/2, cellSize * 0.8);
  }
}

let board = []; // 2D array for the board

function setup() {
  createCanvas(columns * cellSize, rows * cellSize);
  makeBoard();
}

function draw() {
  background(200);
  drawBoard();
}

function makeBoard() {
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < columns; c++) {
      let randomType = random(candyTypes);
      board[r][c] = new Candy(randomType, r, c);
    }
  }
}

function drawBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c].draw();
    }
  }
}

