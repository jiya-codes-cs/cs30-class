// Interactive Scene
// Jiya Khalsa Bangar
// 29th September, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let screen = 0; // 0 = button screen, 1 = wordle screen
let button;

let columns = 5;
let rows = 6;
let sizeOfSquare;
let gap;
let startX;
let startY;

let words = ["APPLE", "QUERY", "DATES", "TROVE", "QUILL", "GLYPH", "SMITE", "ALOFT", "SLEEK", "HUMOR", "JAZZY", "TRITE", "FOUND", "FUDGE", "SWIFT", "YATCH", "DROLL", "JOLLY", "HATER", "SWILL"]; //20 words

let chosenWord = "";
let currentRow = 0;
let currentColumn = 0;
let guesses = []; // stores letters

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  
  button = createButton("Click to Start");
  button.style('font-size', '20px' );
  button.style('background-color', "beige");
  button.size(200, 60);
  button.position(width/2 - 100, height/2 - 30);
  button.mousePressed(() => {
    screen = 1;
    button.hide(); // hide button when switching screens
    startGame(); // starts the game when button is pressed
    loop();
  });
  
}

function draw() {
  if (screen === 0) {
    background("lightblue");
    // nothing else needed (button is already there)
  } 
  else {
    background("white");
    makeSquares();
    drawLetters();
  }
}

function startGame(){
  // choses a random word 
  chosenWord = random(words);
  currentRow = 0;
  currentColumn = 0;
  guesses = Array(rows). fill(null).map(() => Array(columns).fill(""));
  console.log("Word to guess:", chosenWord); // for testing
}
function makeSquares(){
  sizeOfSquare = width / 12; // slightly smaller so spacing fits
  gap = sizeOfSquare * 0.2; // 20% of the box size is spacing
  let totalGridWidth = columns * (sizeOfSquare + gap) - gap;

  // center horizontally
  startX = (width - totalGridWidth) / 2;
  // align near top
  startY = height * 0.1; // 10% from top is needed for spacing

  noFill();
  stroke ("grey");
  strokeWeight(3);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c ++) {
      let x = startX + c * (sizeOfSquare + gap);
      let y = startY + r * (sizeOfSquare + gap);
      //makes a screen with boxes
      rect( x, y, sizeOfSquare, sizeOfSquare);
    }
  }
}

function drawLetters() {
  textAlign(CENTER, CENTER);
  textSize(sizeOfSquare * 0.6);
  noStroke();

  for (let r = 0; r < rows; r++) {
    // compute colors for row only if row has been submitted (full)
    let rowColors = Array(columns).fill(color(255)); // default white
    if (r < currentRow) {
      // make a copy of chosenWord letters to handle duplicates
      let wordLetters = chosenWord.split("");
      let guessLetters = guesses[r].slice();

      // first pass: green
      for (let c = 0; c < columns; c++) {
        if (guessLetters[c] === wordLetters[c]) {
          rowColors[c] = color(0, 255, 0); // green
          wordLetters[c] = null; // remove from consideration
          guessLetters[c] = null; 
        }
      }

      // second pass: yellow
      for (let c = 0; c < columns; c++) {
        if (guessLetters[c] && wordLetters.includes(guessLetters[c])) {
          rowColors[c] = color(255, 255, 0); // yellow
          wordLetters[wordLetters.indexOf(guessLetters[c])] = null; // remove first occurrence
        } else if (guessLetters[c] && rowColors[c] !== color(0, 255, 0)) {
          rowColors[c] = color(200); // grey
        }
      }
    }

    // draw boxes + letters
    for (let c = 0; c < columns; c++) {
      let x = startX + c * (sizeOfSquare + gap);
      let y = startY + r * (sizeOfSquare + gap);
      fill(rowColors[c]);
      rect(x, y, sizeOfSquare, sizeOfSquare);

      if (guesses[r][c] !== "") {
        fill(0);
        text(guesses[r][c], x + sizeOfSquare/2, y + sizeOfSquare/2);
      }
    }
  }
}

// handles typing
function keyPressed(){
  if (screen !== 1) return; //only active when game screen is there

  if (keyCode === BACKSPACE) {
    if (currentColumn > 0) {
      currentColumn --;
      guesses [currentRow] [currentColumn] = "";
    } 
  else if (keyCode === ENTER) {
    if (currentColumn === columns) {
      currentRow ++;
      currentColumn = 0;
    }
  } 
  }
}

function keyTyped() {
  if (screen !== 1) return;
      // only accepts letters
  let letter = key.toUpperCase();
  if (letter.length === 1 && letter >= "A" && letter <= "Z") {
    if (currentColumn < columns) {
      guesses [currentRow] [currentColumn] = letter;
      currentColumn ++;
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (screen === 0) button.position(width/ 2 - 100, height/ 2 -30);
}



//I AM MAKING A WORDLE GAME IN P5JS AND I WANT TO CHECK IF THE USER IS WRITING A LEGITIMATE WORD HOW CAN i DO THAT AND I want to check every 5 letter word possible