let gameStarted = false;

let canvas = document.querySelector("#tetris");
let nextCanvas = document.querySelector("#next");
let nextCtx = nextCanvas.getContext("2d");
nextCtx.scale(30, 30);

let scoreboard = document.querySelector("h2");
let ctx = canvas.getContext("2d");
ctx.scale(30, 30);

const SHAPES = [
  [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
  ],
  [
    [0,1,0],
    [0,1,0],
    [1,1,0]
  ],
  [
    [0,1,0],
    [0,1,0],
    [0,1,1]
  ],
  [
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ],
  [
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],
  [
    [1,1,1],
    [0,1,0],
    [0,0,0]
  ],
  [
    [1,1],
    [1,1]
  ]
];

const COLORS = [
  "#fff",
  "#9b5fe0",
  "#16a4d8",
  "#60dbe8",
  "#8bd346",
  "#efdf48",
  "#f9a52c",
  "#d64e12"
];

const ROWS = 20;
const COLS = 10;

let grid = generateGrid();
let fallingPieceObj = null;
let score = 0;
let highScore = 0;

let nextPieceObj = randomPieceObject();

setInterval(() => {
  if (gameStarted) {
    newGameState();
  }
}, 500);

function newGameState() {
  checkGrid();
  if (!fallingPieceObj) {
    fallingPieceObj = nextPieceObj;
    nextPieceObj = randomPieceObject();
    renderNextPiece();
  }
  moveDown();
}

function checkGrid() {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    let allFilled = true;
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 0) {
        allFilled = false;
      }
    }
    if (allFilled) {
      count++;
      grid.splice(i, 1);
      grid.unshift(new Array(COLS).fill(0));
    }
  }
  if (count == 1) {
    score += 10;
  } else if (count == 2) {
    score += 30;
  } else if (count == 3) {
    score += 50;
  } else if (count > 3) {
    score += 100;
  }
  if (score > highScore) {
    highScore = score;
  }
  scoreboard.innerHTML = "Score: " + score + " | High Score: " + highScore;
}

function generateGrid() {
  let grid = [];
  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let j = 0; j < COLS; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}

function randomPieceObject() {
  let ran = Math.floor(Math.random() * 7);
  let piece = SHAPES[ran];
  let colorIndex = ran + 1;
  let x = 4;
  let y = 0;
  return { piece, colorIndex, x, y };
}

function renderPiece() {
  let piece = fallingPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] == 1) {
        ctx.fillStyle = COLORS[fallingPieceObj.colorIndex];
        ctx.fillRect(fallingPieceObj.x + j, fallingPieceObj.y + i, 1, 1);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.05;
        ctx.strokeRect(fallingPieceObj.x + j, fallingPieceObj.y + i, 1, 1);
      }
    }
  }
}

function renderNextPiece() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  let piece = nextPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        nextCtx.fillStyle = COLORS[nextPieceObj.colorIndex];
        nextCtx.fillRect(j, i, 1, 1);
        nextCtx.strokeStyle = "black";
        nextCtx.lineWidth = 0.05;
        nextCtx.strokeRect(j, i, 1, 1);
      }
    }
  }
}

function moveDown() {
  if (!collision(fallingPieceObj.x, fallingPieceObj.y + 1))
    fallingPieceObj.y += 1;
  else {
    let piece = fallingPieceObj.piece;
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j] == 1) {
          let p = fallingPieceObj.x + j;
          let q = fallingPieceObj.y + i;
          grid[q][p] = fallingPieceObj.colorIndex;
        }
      }
    }
    if (fallingPieceObj.y == 0) {
      alert("game over");
      grid = generateGrid();
      score = 0;
      scoreboard.innerHTML = "Score: " + score + " | High Score: " + highScore;
    }
    fallingPieceObj = null;
  }
  renderGame();
}

function moveLeft() {
  if (!collision(fallingPieceObj.x - 1, fallingPieceObj.y))
    fallingPieceObj.x -= 1;
  renderGame();
}

function moveRight() {
  if (!collision(fallingPieceObj.x + 1, fallingPieceObj.y))
    fallingPieceObj.x += 1;
  renderGame();
}

function rotate() {
  let rotatedPiece = [];
  let piece = fallingPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    rotatedPiece.push([]);
    for (let j = 0; j < piece[i].length; j++) {
      rotatedPiece[i].push(0);
    }
  }
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      rotatedPiece[i][j] = piece[j][i];
    }
  }
  for (let i = 0; i < rotatedPiece.length; i++) {
    rotatedPiece[i] = rotatedPiece[i].reverse();
  }
  if (!collision(fallingPieceObj.x, fallingPieceObj.y, rotatedPiece))
    fallingPieceObj.piece = rotatedPiece;
  renderGame();
}

function collision(x, y, rotatedPiece) {
  let piece = rotatedPiece || fallingPieceObj.piece;
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] == 1) {
        let p = x + j;
        let q = y + i;
        if (p >= 0 && p < COLS && q >= 0 && q < ROWS) {
          if (grid[q][p] > 0) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
  }
  return false;
}

function renderGame() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      ctx.fillStyle = COLORS[grid[i][j]];
      ctx.fillRect(j, i, 1, 1);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 0.05;
      ctx.strokeRect(j, i, 1, 1);
    }
  }
  if (fallingPieceObj) {
    renderPiece();
  }
}

document.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key == "ArrowDown") {
    moveDown();
  } else if (key == "ArrowLeft") {
    moveLeft();
  } else if (key == "ArrowRight") {
    moveRight();
  } else if (key == "ArrowUp") {
    rotate();
  }
});

document.getElementById("startButton").addEventListener("click", function () {
  gameStarted = true;
  document.getElementById("instructions").style.display = "none";
  newGameState();
});
