// Candy Crush Saga
// Jiya Khalsa Bangar
// 10 October, Friday, 2025
//
// Extra for Experts:
// - explored do...while loops
// - used html and css as part of the sketch

// Things to add
// - Board (done)
// - Candies (done)
// - Setting it to the middle of the screen (done)
// - Candy position (done)
// - Add a counter (done)
// - Add a Start Screen (in progress)
// - Background (done)
// - Add messages (in progress)


let rows = 9;
let columns = 9;
let cellSize = 50;
let board = [];
let score = 0;
let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];

let currentTile;
let otherTile;
let playerStarted = false;

let moveCount = 0;
let messages = ["Sweet!", "Delicious!", "Marvelous!", "Fantastic!", "Divine!", "Glorious!", "Lovely!"];
let bombCandy = "Choco"; // this will be the bomb image
let bombCount = 0;
let maxBombs = 3; // maximum bombs allowed at one time
let bombsPlaced = false; // track if we’ve already added starting bombs

window.onload = function() {
  startGame();

  //takes 1/10 of a second
  window.setInterval(function() {
    if (playerStarted) {
      crushCandy();
      slideCandy();
      generateCandy();
    }
}, 100);
}

// function genrates random candies and some of them as bombs
function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

  function startGame() {
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
        
        let tile = document.createElement("img");
        tile.id = r.toString() + "-" + c.toString();
        
        // make sure the new candy doesn't form a match of 3
        let candy = randomCandy();
        
        while (r >= 2 && board[r-1][c].src.includes(candy) && board[r-2][c].src.includes(candy)) {
          candy = randomCandy();
        }
        while (c >= 2 && row[c-1].src.includes(candy) && row[c-2].src.includes(candy)) {
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
    // at the end of startGame
    bombsPlaced = true;
    }
    placeStartingBombs();
    bombsPlaced = true;
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

function dragLeave() {

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
  let moveLeft = c2 == c - 1 && r == r2;
  let moveRight = c2 == c + 1 && r == r2;
  let moveUp = r2 == r - 1 && c == c2;
  let moveDown = r2 == r + 1 && c == c2;

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

    } else {
      // if move is invalid, swap back
      let temp2 = currentTile.src;
      currentTile.src = otherTile.src;
      otherTile.src = temp2;
    }
  }
}

function crushCandy() {
  crushThree();
  document.getElementById("score").innerText = score;
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if (candy1.src.includes("Choco") || candy2.src.includes("Choco") || candy3.src.includes("Choco")) {
                explodeBomb(r, c);
            }

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if (candy1.src.includes("Choco") || candy2.src.includes("Choco") || candy3.src.includes("Choco")) {
                explodeBomb(r, c);
            }

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
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
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            // spawn a new bomb if ready
            if (newBombReady) {
                board[0][c].src = "./images/" + bombCandy + ".png";
                newBombReady = false;
            } else {
                board[0][c].src = "./images/" + randomCandy() + ".png";
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
  for (let i = r-1; i <= r+1; i++) {
    for (let j = c-1; j <= c+1; j++) {
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
    // loop over entire board and crush all candies of a random color
    let targetColor = candies[Math.floor(Math.random() * candies.length)];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (board[i][j].src.includes(targetColor) || board[i][j].src.includes("Choco")) {
                board[i][j].src = "./images/blank.png";
                score += 10;
            }
        }
    }
    showMessage("LIGHTNING!"); // pop up message
}
