// Perlin Bubbles
// Jiya Khalsa Bangar
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  spawnbubble();

  // add a new bubble every half a second
  window.setInterval(spawnbubble, 500);
}

function draw() {
  background(220);

  for (let bubble of theBubbles) {
    //move
    bubble.x = noise(bubble.time) * width;
    bubble.y = noise(bubble.time + bubble.buffer) * height;
    bubble.time += bubble.deltaTime;

    //display
    fill(bubble.r, bubble.g, bubble.b);
    circle(bubble.x, bubble.y, bubble.diameter);
  }
}

function spawnbubble() {
  let _time = random(1000);
  let _buffer = random(1000);
  let theBubble = {
    time: random(1000),
    buffer: random(1000),
    x: noise(_time) * width,
    y: noise(_time + _buffer) * height,
    diameter: random(20,50),
    deltaTime: 0.01,
    r: random(255),
    g: random(255),
    b: random(255),
  };

  theBubbles.push(theBubble);
}