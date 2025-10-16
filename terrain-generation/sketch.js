// Terrain Generation
// Jiya Khalsa Bangar
// 16 October, Thursday 

let terrain = [];
const NUMBER_OF_RECTS = 1250;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();
}

function draw() {
  background(220);
  fill("green");
  stroke("green");

  for (let theRect of terrain) {
    rect(theRect.x, theRect.y, theRect.w, theRect.h);
  }
}
function generateTerrain(){
  let theWidth = width/NUMBER_OF_RECTS;
  let time = 0;
  let deltaTime = 0.001;
  for (let i = 0; i < NUMBER_OF_RECTS; i++) {
    let theHeight = noise(time) * height;
    let someRect = spawnRectangle(theWidth * i, theWidth, theHeight);
    terrain.push(someRect);
    time += deltaTime;
  }
  
}
function spawnRectangle(leftSide, rectWidth, rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}