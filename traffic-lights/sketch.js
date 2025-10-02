// Traffic Light Starter Code
// Jiya Khalsa Bangar
// 1 October, Wednesday

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let state = 0;
let interval = 4000;
let lastChange = 0;
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  updateState();
  drawLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
function updateState() {
  let currentTime = millis();
  if (state === 0) {
    interval = 4000;
  }
  if (state === 1) {
    interval = 3000;
  }
  if (state === 2) {
    interval = 1500;
  }

  if (currentTime - lastChange > interval) {
    state = (state + 1) % 3;
    lastChange = currentTime;
  }
}

function drawLights() {
  if (state === 0) {
    fill (255, 0, 0);
    ellipse(width/2, height/2 - 65, 50, 50); //top - red
  }
  else if (state === 1) {
    fill(0, 255, 0);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom - green
  }
  else {
    fill(255, 255, 0);
    ellipse(width/2, height/2, 50, 50); //middle - yellow
  }
}
