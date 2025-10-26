// Candy Crush Saga
// Jiya Khalsa Bangar
// 10 October, Friday, 2025
//
// Extra for Experts:
// - used html and css as part of the sketch


// Board Setup
let rows = 9;
let columns = 9;
let cellSize = 50;
let board = [];
let score = 0;

// Possible candy colors
let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];

// Track selected tiles for drag and swap
let currentTile;
let otherTile;

// Game state flags
let playerStarted = false;
let moveCount = 0;

// Feedback and bomb setup
let messages = ["Sweet!", "Delicious!", "Marvelous!", "Fantastic!", "Divine!", "Glorious!", "Lovely!"];
let bombCandy = "Choco"; // this will be the bomb image
let bombCount = 0;
let maxStartBombs = 3; // maximum bombs allowed at one time
let bombsPlaced = false; // track if we’ve already added starting bombs
let newBombReady = false; // used when we want to spawn a bomb later
let gameInterval;

window.onload = function() {
  // Display start screen before the game begins
  document.getElementById("startScreen").style.display = "flex";

  // Set up game loop (but don't start yet)
  gameInterval = setInterval(function() {
    if (playerStarted) {
      crushCandy();
      slideCandy();
      generateCandy();
    }
  }, 100);

  // Add click event to start image with fade out animation
  document.getElementById("startImage").addEventListener("click", function() {
    let screen = document.getElementById("startScreen");
    screen.style.opacity = "0";
    setTimeout(() => {
      screen.style.display = "none";
      startGame();
    }, 500); // Matches transition time
  });
};

// genrates random candies and some of them as bombs
function randomCandy() {
  if (!bombsPlaced && bombCount < maxStartBombs) {
    if (Math.random() < 0.0) { // 0% chance each tile at start to avoid random bombs forming 3 in a row
      bombCount++;
      return bombCandy;
    }
  }
  // otherwise return a normal candy
  return candies[Math.floor(Math.random() * candies.length)];
}

// Main game initialization
function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
        
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
        
      // make sure the new candy doesn't form a match of 3
      let candy = randomCandy();
        
      while (r >= 2 && board[r - 1][c].src.includes(candy) && board[r - 2][c].src.includes(candy)) {
        candy = randomCandy();
      }
      while (c >= 2 && row[c - 1].src.includes(candy) && row[c - 2].src.includes(candy)) {
        candy = randomCandy();
      }
        
      tile.src = "./images/" + candy + ".png";
        
      // implementing drag functionality
      tile.addEventListener("dragstart", dragStart); // clicks on candy to initialize drag process
      tile.addEventListener("dragover", dragOver); // clicks on candy and moves it to drag the candy
      tile.addEventListener("dragenter", dragEnter); // dragging candy onto another candy
      tile.addEventListener("dragleave", dragLeave); // leave candy over another candy
      tile.addEventListener("drop", dragDrop); // dropping a candy over another candy
      tile.addEventListener("dragend", dragEnd); // sfter the dragging process is completed we drop the candy
      
      document.getElementById("board").append(tile);
      row.push(tile);
    }
  board.push(row);
  }
  // after all rows are created
  placeStartingBombs();
  bombsPlaced = true; // mark that bombs are placed
}

function placeStartingBombs() {
  let bombsAdded = 0;

  // Step 1: Place two bombs together (horizontal or vertical)
  let horizontal = Math.random() < 0.5;
  let r1, c1;

  if (horizontal) {
    r1 = Math.floor(Math.random() * rows);
    c1 = Math.floor(Math.random() * (columns - 1));
    board[r1][c1].src = "./images/" + bombCandy + ".png";
    board[r1][c1 + 1].src = "./images/" + bombCandy + ".png";
  } 
  else {
    r1 = Math.floor(Math.random() * (rows - 1));
    c1 = Math.floor(Math.random() * columns);
    board[r1][c1].src = "./images/" + bombCandy + ".png";
    board[r1 + 1][c1].src = "./images/" + bombCandy + ".png";
  }
  bombCount += 2;
  bombsAdded += 2;

  // Step 2: Place the third bomb at an extended position so that swapping it completes the set of 3
  let placedThird = false;
  if (horizontal) {
    // Try to place at c1 + 3 (extend right), ensuring no 3 or more in a row
    let extendC = c1 + 3;
    if (extendC < columns && !board[r1][extendC].src.includes(bombCandy) && !board[r1][c1 + 2].src.includes(bombCandy)) {
      board[r1][extendC].src = "./images/" + bombCandy + ".png";
      bombCount++;
      bombsAdded++;
      placedThird = true;
    } 
    else {
      // Try to place at c1 - 3 (extend left), ensuring no 3 or more in a row
      extendC = c1 - 3;
      if (extendC >= 0 && !board[r1][extendC].src.includes(bombCandy) && !board[r1][c1 - 2].src.includes(bombCandy)) {
        board[r1][extendC].src = "./images/" + bombCandy + ".png";
        bombCount++;
        bombsAdded++;
        placedThird = true;
      }
    }
  } 
  else {
    // Try to place at r1 + 3 (extend down), ensuring no 3 or more in a column
    let extendR = r1 + 3;
    if (extendR < rows && !board[extendR][c1].src.includes(bombCandy) && !board[r1 + 2][c1].src.includes(bombCandy)) {
      board[extendR][c1].src = "./images/" + bombCandy + ".png";
      bombCount++;
      bombsAdded++;
      placedThird = true;
    } 
    else {
      // Try to place at r1 - 3 (extend up), ensuring no 3 or more in a column
      extendR = r1 - 3;
      if (extendR >= 0 && !board[extendR][c1].src.includes(bombCandy) && !board[r1 - 2][c1].src.includes(bombCandy)) {
        board[extendR][c1].src = "./images/" + bombCandy + ".png";
        bombCount++;
        bombsAdded++;
        placedThird = true;
      }
    }
  }

  // Step 3: Place 1 or 2 more bombs randomly, ensuring no 3 in a row
let additionalBombs = Math.floor(Math.random() * 2) + 1; // 1 or 2
for (let i = 0; i < additionalBombs; i++) {
  let placed = false;
  let attempts = 0;
  while (!placed && attempts < 100) { // limit attempts to avoid infinite loop
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (!board[r][c].src.includes(bombCandy)) {
      // Check if placing here would form 3 in a row horizontally
      let canPlace = true;
      if (c >= 2 && board[r][c - 1].src.includes(bombCandy) && board[r][c - 2].src.includes(bombCandy)) {
        canPlace = false;
      }
      if (c <= columns - 3 && board[r][c + 1].src.includes(bombCandy) && board[r][c + 2].src.includes(bombCandy)) {
        canPlace = false;
      }
      // Check vertically
      if (r >= 2 && board[r - 1][c].src.includes(bombCandy) && board[r - 2][c].src.includes(bombCandy)) {
        canPlace = false;
      }
      if (r <= rows - 3 && board[r + 1][c].src.includes(bombCandy) && board[r + 2][c].src.includes(bombCandy)) {
        canPlace = false;
      }
      if (canPlace) {
        board[r][c].src = "./images/" + bombCandy + ".png";
        bombsAdded++;
        bombCount++;
        placed = true;
      }
    }
    attempts++;
  }
}
}

//fuction refers to the tile that was clicked before dragging
function dragStart() {
  currentTile = this; 
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

// this function refers to the target tile that was dropped on 
function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (!currentTile || !otherTile) {
    return; // stop if nothing was dragged
  }

  // get coordinates of current tile
  let currentCoords = currentTile.id.split("-");
  let r = Number(currentCoords[0]);
  let c = Number(currentCoords[1]);

  // get coordinates of other tile
  let otherCoords = otherTile.id.split("-");
  let r2 = Number(otherCoords[0]);
  let c2 = Number(otherCoords[1]);

  // check adjacency
  let moveLeft = c2 === c - 1 && r === r2;
  let moveRight = c2 === c + 1 && r === r2;
  let moveUp = r2 === r - 1 && c === c2;
  let moveDown = r2 === r + 1 && c === c2;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    // swap the two candies
    let temp = currentTile.src;
    currentTile.src = otherTile.src;
    otherTile.src = temp;

    // check if swap makes a valid match
    let validMove = checkValid();

    if (validMove) {
      playerStarted = true;
      moveCount++;

      // show message every 3 valid moves
      if (moveCount % 3 == 0) {
        let randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showMessage(randomMessage);
      }

      // trigger bomb if any of the swapped tiles is a bomb
      if (currentTile.src.includes("Choco")) {
        triggerBomb(r, c);
      }
      if (otherTile.src.includes("Choco")) {
        triggerBomb(r2, c2);
      }

    } 
    else {
      // if move is invalid, swap back
      let temp2 = currentTile.src;
      currentTile.src = otherTile.src;
      otherTile.src = temp2;
    }
  }
}

function crushThree() {
  // check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {

      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      // if these 3 are the same (and not blank)
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;

        // check if there's a 4th one next to it (horizontal)
        if (c + 3 < columns && board[r][c + 3].src == candy1.src) {
          board[r][c + 3].src = "./images/blank.png";
          score += 10;
          newBombReady = true; // get ready to make a bomb next
        }
      }
    }
  }

  // check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {

      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];

      // if these 3 are the same (and not blank)
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;

        // check if there's a 4th one below it (vertical)
        if (r + 3 < rows && board[r + 3][c].src == candy1.src) {
          board[r + 3][c].src = "./images/blank.png";
          score += 10;
          newBombReady = true; // get ready to make a bomb next
        }
      }
    }
  }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];

            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];

            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function crushCandy() {
  crushThree();
  document.getElementById("score").innerText = score;

  // check if score reached 1000
  if (score >= 1000) {
    endGame();
  }
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;

        for (let r = rows-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {

      // if a bomb is ready, make it appear
      if (newBombReady) {
        board[0][c].src = "./images/" + bombCandy + ".png";
        newBombReady = false; // reset after adding the bomb
      }

      // otherwise just make a normal candy
      else {
        let randomColor = candies[Math.floor(Math.random() * candies.length)];
        board[0][c].src = "./images/" + randomColor + ".png";
      }
    }
  }
}

function showMessage(text) {
  let message = document.getElementById("message");
  message.innerText = text;
  message.style.opacity = "1";
  message.style.transform = "translate(-50%, -50%) scale(1.2)";

  setTimeout(function() {
    message.style.opacity = "0";
    message.style.transform = "translate(-50%, -50%) scale(1)";
  }, 1000);
}

function explodeBomb(r, c) {
  for (let i = r - 1; i <= r + 1; i++) {
    for (let j = c - 1; j <= c + 1; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < columns) {
        // if the crushed candy is a bomb, decrease count too
        if (board[i][j].src.includes("Choco")) {
          bombCount--;
          if (bombCount < 0) bombCount = 0;
        }

        board[i][j].src = "./images/blank.png"; // crush candy
        score += 10;
      }
    }
  }
  showMessage("BOOM!");
}

function triggerBomb(r, c) {
  // pick a random color to clear
  let targetColor = candies[Math.floor(Math.random() * candies.length)];
  
  // create a lightning effect by flashing affected tiles
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let tile = board[i][j];
      if (tile.src.includes(targetColor) || tile.src.includes("Choco")) {
        // add a "flash" effect
        tile.style.transition = "0.2s";
        tile.style.filter = "brightness(2)"; // makes it look like a flash
        setTimeout(() => {
        tile.style.filter = "brightness(1)"; // back to normal
        }, 200);
      }
    }
  }

  // delay the actual crush so player sees the lightning
  setTimeout(() => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let tile = board[i][j];
        if (tile.src.includes(targetColor) || tile.src.includes("Choco")) {
          tile.src = "./images/blank.png";
          score += 10;
        }
      }
    }
  }, 300); // small delay to show the flash
  showMessage("LIGHTNING!");
}

// this function creates the play again button 
function endGame() {
  // stop the game loop
  clearInterval(gameInterval);

  // show the popup like a message
  showEndMessage("Congratulations!");
}

function showEndMessage(text) {
  let box = document.createElement("div");
  box.id = "endBox";
  box.innerHTML = `
    <h2>${text}</h2>
    <button id="playAgain">Play Again</button>
  `;
  document.body.appendChild(box);

  // make the text black
  box.querySelector("h2").style.color = "black";

  // initial style for animation
  box.style.position = "absolute";
  box.style.top = "50%";
  box.style.left = "50%";
  box.style.transform = "translate(-50%, -50%) scale(0)";
  box.style.background = "white";
  box.style.padding = "30px";
  box.style.textAlign = "center";
  box.style.borderRadius = "10px";
  box.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  box.style.zIndex = "1000";
  box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  box.style.opacity = "0";

  // trigger the fade + scale animation
  setTimeout(() => {
    box.style.transform = "translate(-50%, -50%) scale(1.2)";
    box.style.opacity = "1";
  }, 10);

  // hover effect on button
  let btn = document.getElementById("playAgain");
  btn.style.cursor = "pointer";
  btn.style.padding = "10px 20px";
  btn.style.border = "none";
  btn.style.borderRadius = "5px";
  btn.style.background = "gold";
  btn.style.color = "white";
  btn.style.fontSize = "16px";
  btn.style.transition = "transform 0.2s ease, background 0.2s ease";

  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.1)";
    btn.style.background = "gold";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
    btn.style.background = "gold";
  });

  // click to play again
  btn.addEventListener("click", () => {
    // shrink out before removing
    box.style.transform = "translate(-50%, -50%) scale(0)";
    box.style.opacity = "0";
    setTimeout(() => {
      box.remove();
      resetGame();
    }, 300);
  });
}

function resetGame() {
  // reset scores and variables
  score = 0;
  moveCount = 0;
  playerStarted = false;
  bombCount = 0;
  bombsPlaced = false;
  newBombReady = false;

  // clear score display
  document.getElementById("score").innerText = score;

  // clear board
  let boardEl = document.getElementById("board");
  boardEl.innerHTML = "";
  board = [];

  // start again
  startGame();

  // restart the game loop
  clearInterval(gameInterval);
  gameInterval = setInterval(function() {
    if (playerStarted) {
      crushCandy();
      slideCandy();
      generateCandy();
    }
  }, 100);
}