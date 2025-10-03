// Interactive Scene
// Jiya Khalsa Bangar
// 29th September, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let screen = 0; // 0 = button screen, 1 = ball screen
let button;

// ball variables
let myFont;

function preload() {
  myFont = loadFont('PressStart2P-Regular.ttf');
}

function windowResized() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  } 
  else {
    createCanvas(windowWidth, windowWidth);
  }
}

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  } 
  else {
    createCanvas(windowWidth, windowWidth);
  }
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
  });
  
}

function draw() {
  background("lightblue");

  if (screen === 0) {
    // nothing else needed — button is already there
  } 
  else if (screen === 1) {
    makeSquares();
  }
}

function makeSquares(){
  let columns = 6;
  let rows = 5;
  sizeOfSquare = width/10;
  let totalGridWidth = columns * sizeOfSquare;
  let totalGridHeight = rows * sizeOfSquare;

  // Setting the position to center horizontally
  let startX = (width - totalGridWidth) / 2;

  // Aligning the code to the top of the page (also left some margin for neatness)
  let startY = height * 0.1;
  noFill();
  stroke ("grey");
  strokeWeight(3);

  for (let a = 0; a < rows; a++) {
    for (let b = 0; b < columns; b ++) {
      //makes a screen with boxes
      rect( startX + b * sizeOfSquare, startY  + a * sizeOfSquare, sizeOfSquare, sizeOfSquare);
    }
  }
}


