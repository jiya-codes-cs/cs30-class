// Connected Nodes OOP Demo

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for(let node of nodes) {
    node.update();
    node.connectTo(nodes);
    
  }
  for(let node of nodes) {
    node.display();
  }
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX, mouseY);
  nodes.push(somePoint);
}


class MovingPoint {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.05;
    this.radius = 15;
    this.speed = 5;
    this.color = color(random(255), random(255), random(255));
    this.reach = 200;
    this.maxRadius = 50;
    this.minRadius = 15;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeByMouse();
  }

  adjustSizeByMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;
    }
  }

  connectTo(nodesArray) {
    for(let otherNodes of nodesArray) {
      if(this !== otherNodes) {
        let distanceAway = dist(this.x, this.y, otherNodes.x, otherNodes.y);
        if (distanceAway < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherNodes.x, otherNodes.y);
        }

      }
    }
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale from 0 to 1 from movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += dx;
    this.y += dy;

    //move on time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    if(this.x < 0) {
      this.x += width;
    }
    if(this.x > width) {
      this.x -= width;
    }
    if(this.y < 0) {
      this.y += height;
    }
    if(this.y > height) {
      this.y -= height;
    }
  }
}
