// Interactive Scene
// Jiya Khalsa Bangar
// 29th September, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let screen = 0; // 0 = button screen, 1 = ball screen
let button;

// ball variables
let ballX = 300;
let ballY = 300;
let ballDX = 3;
let ballDY = 2;
let ballSize = 40;
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
    // drawBall();
    makeSquares();
  }
}

function makeSquares(){
  let columns = 6;
  let rows = 5;
  sizeOfSquare = width/columns;

  for (let a = 0; a < columns; a++) {
    for (let b = 0; b < columns; b ++) {
      rect(a * sizeOfSquare, b * sizeOfSquare, 125, 100);
    }
  }
}
// function drawBall() {
//   // move ball
//   ballX += ballDX;
//   ballY += ballDY;

//   // bounce off edges
//   if (ballX < ballSize/2 || ballX > width - ballSize/2) {
//     ballDX *= -1;
//   }
//   if (ballY < ballSize/2 || ballY > height - ballSize/2) {
//     ballDY *= -1;
//   }

//   // draw ball
//   fill(100, 150, 255);
//   ellipse(ballX, ballY, ballSize, ballSize);
// }

