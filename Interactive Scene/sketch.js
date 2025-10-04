// Interactive Scene
// Jiya Khalsa Bangar
// 29th September, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let screen = 0; // 0 = button screen, 1 = wordle screen
let button;
let columns = 6;
let rows = 5;
let sizeOfSquare;
let gap;
let startX;
let startY;

let words = ["APPLE", "QUERY", "DATES", "TROVE", "QUILL", "GLYPH", "SMITE", "ALOFT", "SLEEK", "HUMOR", "JAZZY", "TRITE", "FOUND", "FUDGE", "SWIFT", "YATCH", "DROLL", "JOLLY", "HATER", "SWILL"]; //20 words

let chosenWord = "";
let currentRow = 0;
let currentColumn = 0;
let guesses = []; // stores letters

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (screen === 0) {
    button.position(width/ 2 - 100, height/ 2 -30);
  } 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  
  button = createButton("Click to Start");
  button.style('font-family', 'myFont' );
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
  background("white");

  if (screen === 0) {
    // nothing else needed (button is already there)
  } 
  else {
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
  let gap = sizeOfSquare * 0.2; // 20% of the box size is spacing
  let totalGridWidth = columns * (sizeOfSquare + gap) - gap;
  let totalGridHeight = rows * (sizeOfSquare + gap) - gap;

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
  textAlign(CENTER,CENTER);
  textSize(sizeOfSquare * 0.6);
  fill(0);
  noStroke();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let letter = guesses [r][c];
      if (letter !== "") {
        let x = startX + c * (sizeOfSquare + gap) + sizeOfSquare / 2;
        let y = startY + r * (sizeOfSquare + gap) + sizeOfSquare / 2;
        text(letter, x, y);
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




//I AM MAKING A WORDLE GAME IN P5JS AND I WANT TO CHECK IF THE USER IS WRITING A LEGITIMATE WORD HOW CAN i DO THAT AND I want to check every 5 letter word possible