// Interactive Scene 
// Jiya Khalsa Bangar //
// 29th September, 2025 
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
let validWordList = [];

function preload() {
// loads the file as a string
  validWordList = loadStrings("valid-wordle-words.txt", () => {
// fixes the lowercase letters in the txt file as well as spacing issues
    validWordList = validWordList.map(word => word.trim().toUpperCase());
    console.log("Words loaded:", validWordList.length);
  });
}

let words = ["APPLE", "QUERY", "DATES", "TROVE", "QUILL", "SMITE", "SLEEK", "HUMOR", "FOUND", "SWIFT",
             "JOLLY", "TRITE", "ALOFT", "FUDGE", "YATCH", "GLYPH", "DROLL", "HATER", "SWILL", "JAZZY"]; 

let chosenWord = "";
let currentRow = 0;
let currentColumn = 0;
let guesses = []; // stores letters

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  button = createButton("Click to Start");
  button.style('font-size', '20px');
  button.style('background-color', "beige");
  button.size(200, 60);
  button.position(width/2 - 100, height/2 - 30);
  button.mousePressed(() => {
    screen = 1;
    button.hide();
    startGame();
    loop();
  });
}

function draw() {
  if (screen === 0) {
    background("lightblue");
  } else {
    background("white");
    makeSquares();
    drawLetters();
  }
}

function startGame() {
  chosenWord = random(words);
  currentRow = 0;
  currentColumn = 0;
  guesses = Array(rows).fill(null).map(() => Array(columns).fill(""));
  console.log("Word to guess:", chosenWord);
}

function makeSquares() {
  sizeOfSquare = 30;
  gap = 5;
  let totalGridWidth = columns * (sizeOfSquare + gap) - gap;
  let totalGridHeight = rows * (sizeOfSquare + gap) - gap;

  // center horizontally
  startX = (width - totalGridWidth) / 2;

  // place vertically so that the grid is in the upper middle part of the laptop screen
  startY = (height / 2) - totalGridHeight / 2 - 10;

  noFill();
  stroke("grey");
  strokeWeight(3);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let x = startX + c * (sizeOfSquare + gap);
      let y = startY + r * (sizeOfSquare + gap);
      rect(x, y, sizeOfSquare, sizeOfSquare);
    }
  }
}

// draw letters and color boxes like Wordle
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

function isRealWord(word) {
  //make everything uppercase to match your guesses
  return validWordList.includes(word.toUpperCase());
}

// typing letters
function keyPressed() {
  if (screen !== 1) return;

  if (keyCode === BACKSPACE) {
    if (currentColumn > 0) {
      currentColumn--;
      guesses[currentRow][currentColumn] = "";
    }
  } 
  else if (keyCode === ENTER) {
    if (currentColumn === columns) {
      let attempt = guesses [currentRow].join("");

      if (!isRealWord(attempt)) {
        alert(attempt + " is not a valid word!"); // gives an alert message onscreen
        return; // stops you from moving to the next row
      }
      currentRow++;
      currentColumn = 0;
    }
  }
}

function keyTyped() {
  if (screen !== 1) return;

  let letter = key.toUpperCase();
  if (letter.length === 1 && letter >= "A" && letter <= "Z") {
    if (currentColumn < columns) {
      guesses[currentRow][currentColumn] = letter;
      currentColumn++;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (screen === 0) button.position(width/2 - 100, height/2 - 30);
}
