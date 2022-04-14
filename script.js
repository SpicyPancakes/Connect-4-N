// Constants
const statusEl = document.getElementById("Status");
const playEl = document.querySelector("#play");
const resetEl = document.querySelector("#reset");

const playerOneEl = document.querySelector("#player1");
const playerOneScore = document.querySelector("#p1");
const playerTwoEl = document.querySelector("#player2");
const playerTwoScore = document.querySelector("#p2");
const cellsEl = document.querySelectorAll(".box");

let playerOneScoreNum = 0;
let playerTwoScoreNum = 0;

const players = [1, -1];
let turn = -1;
let turnCounter;
let quoteList = [
  "Put the bunny back in the box.",
  "Sorry boss, but there's only two men I trust. One of them's me. The other's not you.",
  "Hey! My mama lives in a trailer!",
  "Somehow they managed to get every creep and freak in the universe on this one plane.",
  "Define irony. Bunch of idiots dancing on a plane to a song made famous by a band that died in a plane crash.",
  "Make a move and the bunny gets it.",
];
let cage = new Audio("Audio/con-cage.wav");
let cage2 = new Audio("Audio/con-bunny.wav");

// Winning combinations
const winningCombos = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [6, 5, 4, 3],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [13, 12, 11, 10],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [20, 19, 18, 17],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [28, 29, 30, 31],
  [33, 32, 31, 30],
  [29, 30, 31, 32],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [38, 39, 40, 41],
  [0, 7, 14, 21],
  [1, 8, 15, 22],
  [2, 9, 16, 23],
  [3, 10, 17, 24],
  [4, 11, 18, 25],
  [5, 12, 19, 26],
  [6, 13, 20, 27],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
  [35, 28, 21, 14],
  [36, 29, 22, 15],
  [37, 30, 23, 16],
  [38, 31, 24, 17],
  [39, 32, 25, 18],
  [40, 33, 26, 19],
  [41, 34, 27, 20],
  [0, 8, 16, 24],
  [1, 9, 17, 25],
  [2, 10, 18, 26],
  [21, 15, 9, 3],
  [27, 19, 11, 3],
  [4, 10, 16, 22],
  [5, 11, 17, 23],
  [6, 12, 18, 24],
  [7, 15, 23, 31],
  [8, 16, 24, 32],
  [9, 17, 25, 33],
  [34, 26, 18, 10],
  [28, 22, 16, 10],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [13, 19, 25, 31],
  [14, 22, 30, 38],
  [39, 31, 23, 15],
  [40, 32, 24, 16],
  [35, 29, 23, 17],
  [41, 33, 25, 17],
  [36, 30, 24, 18],
  [37, 31, 25, 19],
  [20, 26, 32, 38],
];

statusEl.textContent =
  "Well, Baby-O, it's not exactly mai-thais and yatzee out here but... let's do it!";

//Event Listeners
playEl.addEventListener("click", playGame);
resetEl.addEventListener("click", resetGame);

//Game Init Fn
function playGame() {
  function turnState(i) {
    if (turn === 1) {
      cellsEl[i].classList.remove("empty");
      cellsEl[i].classList.add("taken");
      cellsEl[i].classList.add("red");
      cellsEl[i].innerHTML = 1;
      turnTracker();
    } else if (turn === -1) {
      cellsEl[i].classList.remove("empty");
      cellsEl[i].classList.add("taken");
      cellsEl[i].classList.add("green");
      cellsEl[i].innerHTML = -1;
      turnTracker();
    }
  }
  for (let i = 0; i < cellsEl.length; i++) {
    cellsEl[i].addEventListener("click", function () {
      if (
        cellsEl[i].classList.contains("end") &&
        !cellsEl[i].classList.contains("taken")
      ) {
        turnState(i);
      } else if (
        cellsEl[i + 7].classList.contains("taken") &&
        !cellsEl[i].classList.contains("taken")
      ) {
        turnState(i);
      } else {
        statusEl.textContent = "Nope, try again...";
        return;
      }
    });
  }
  cage.play()
  checkBoard();
  turnCounter = -1;
  turnTracker();
  playEl.removeEventListener("click", playGame);
}

// Turn Tracker, adds animation for turn indicatior as Indi
function turnTracker() {
  turn *= -1;
  turnCounter += 1;
  if (turn === 1) {
    statusEl.textContent = `CONNECT 4! Player One's turn!`;
    playerOneEl.classList.add("indi3");
  } else if (turn === -1) {
    statusEl.textContent = `CONNECT 4! Player Two's turn!`;
    playerTwoEl.classList.add("indi4");
    //Test functionallity after for Tie checker
  }
  setTimeout(removeIndi, 1600);
  function removeIndi() {
    playerOneEl.classList.remove("indi3");
    playerTwoEl.classList.remove("indi4");
  }
  checkBoard();
}

//Check for win combos
function checkBoard() {
  for (let y = 0; y < winningCombos.length; y++) {
    const square1 = cellsEl[winningCombos[y][0]];
    const square2 = cellsEl[winningCombos[y][1]];
    const square3 = cellsEl[winningCombos[y][2]];
    const square4 = cellsEl[winningCombos[y][3]];
    if (
      square1.classList.contains("red") &&
      square2.classList.contains("red") &&
      square3.classList.contains("red") &&
      square4.classList.contains("red")
    ) {
      playerOneScoreNum += 1;
      statusEl.textContent = "Player One Wins! Resetting board!";
      playerOneScore.textContent = "Wins: " + playerOneScoreNum;
      turn = 1;
      setTimeout(resetBoard, 1400);
    } else if (
      square1.classList.contains("green") &&
      square2.classList.contains("green") &&
      square3.classList.contains("green") &&
      square4.classList.contains("green")
    ) {
      playerTwoScoreNum += 1;
      statusEl.textContent = "Player Two Wins! Resetting board!";
      playerTwoScore.textContent = "Wins: " + playerTwoScoreNum;
      turn = -1;
      setTimeout(resetBoard, 1400);
    }
  }
  if (turnCounter === 42) {
    statusEl.textContent = `WELP,NOBODY WINS`;
    setTimeout(resetBoard, 1400);
  }
}

// Game reset
function resetGame() {
  let quoteNumber = Math.floor(Math.random() * quoteList.length);
  statusEl.textContent = quoteList[quoteNumber];
  resetBoard();
  playerOneScore.textContent = "";
  playerTwoScore.textContent = "";
  playerOneScoreNum = 0;
  playerTwoScoreNum = 0;
  turn = -1;
  turnCounter = 0;
  cage2.play();
}
//Soft reset
function resetBoard() {
  for (let i = 0; i < cellsEl.length; i++) {
    cellsEl[i].innerHTML = "";
    cellsEl[i].classList.remove("green");
    cellsEl[i].classList.remove("red");
    cellsEl[i].classList.remove("taken");
    cellsEl[i].classList.add("empty");
  }
  turnCounter = 0;
}
