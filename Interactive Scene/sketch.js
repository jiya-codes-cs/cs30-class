// Interactive Scene
// Jiya Khalsa Bangar
// 29th September, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let screen = 0; // 0 = button screen, 1 = wordle screen
let button;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (screen === 0) {
    button.position(width/ 2 - 100, height/ 2 -30);
  } 
}

function setup() {
  createCanvas(windowHeight, windowHeight);
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
    loop(); 
  });
  
}

function draw() {
  background("lightblue");

  if (screen === 0) {
    background("lightblue");
    // nothing else needed — button is already there
  } 
  else {
    background("white");
    makeSquares();
  }
}

function makeSquares(){
  let columns = 6;
  let rows = 5;
  sizeOfSquare = width / 12; // slightly smaller so spacing fits
  let gap = sizeOfSquare * 0.2; // 20% of the box size is spacing
  let totalGridWidth = columns * (sizeOfSquare + gap) - gap;
  let totalGridHeight = rows * (sizeOfSquare + gap) - gap;

  // center horizontally
  let startX = (width - totalGridWidth) / 2;

  // align near top
  let startY = height * 0.1; // 10% from top is needed for spacing
  

  
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


