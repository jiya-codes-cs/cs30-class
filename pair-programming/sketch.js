// OOP Pair Programming Starter Code
// Your Names
// The Date


// ------------------------------------------------------------------------- //
// You don't need to edit this section, but you should read it carefully to 
// understand what is required in the classes.

let enterprise;
let shipImage, bulletImage;

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width/2, height/2, shipImage);
}

function draw() {
  background("black");
  enterprise.update();
  enterprise.display();
}

function keyPressed() {
  // you only need to use this if you are doing the extra for experts...
  enterprise.handleKeyPress();
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.image = theImage;

    this.bullets = [];
  }

  update() {
    // move ship -- you might want to use the keyIsDown() function here
    if(keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if(keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if(keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if(keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }

    // if doing extra for experts, show bullet(s)
    for(let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet = this.bullets[i];
      bullet.update();

      if (!bullet.isOnScreen()) {
        this.bullets.splice(i, 1);
      }
    }
  }

  display() {
    // show the ship
    noStroke();
    image(this.image, this.x, this.y);

    for (let bullet of this.bullets) {
      bullet.display();
    }
  }

  handleKeyPress() {
    // you only need to use this if you are doing the extra for experts...
    // if you are, you should make a bullet if the space key was pressed
    if(key === " ") {
      let bx = this.x + this.image.width / 2 - bulletImage.width / 2;
      let by = this.y - 20;
      let bullet = new Bullet(bx,by, 0, -1, bulletImage);
      this.bullets.push(bullet);
    }

  }
}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.image = theImage;
  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    this.x += this.dx;
    this.y += this.dy;
  }

  display() {
    // show the bullet
    image(this.image, this.x, this.y );
  }

  isOnScreen() {
    // check if the bullet is still on the screen
    if(this.x < 0 || this.x > width || this.y < 0 || this.y > height){
      return false;
    }
    else {
      return true;
    }
  }
}

