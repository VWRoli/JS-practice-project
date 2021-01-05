'use script';
//Variables
const gridItemsAll = document.querySelectorAll('.grid-item');
const gameMessageEl = document.querySelector('.game-message');
const overlayEl = document.querySelector('.overlay');
const messageEl = document.querySelector('#message');
const player1El = document.querySelectorAll('.player-1');
const player2El = document.querySelectorAll('.player-2');
const drawEl = document.querySelectorAll('.draw');

const players = [0, 1, 2]; //2 is draw
let userInput = Array(9).fill('');
//Player1, player 2 and draws
const scores = [0, 0, 0];
let drawCounter = 0;

let activePlayer = 0;
//Starterplayer = true player 0 will start the game, false player 1 will start the game
//starterplayer always changes
let starterPlayer = true;
let winStatePlayer1 = false;
let winStatePlayer2 = false;
let isDraw = false;
let gameActive = true;

//Determine who will start the game, first time always player 1 starts
const determineStarterPlayer = () => {
  switch (starterPlayer) {
    case true:
      starterPlayer = false;
      activePlayer = 1;
      break;
    default:
      starterPlayer = true;
      activePlayer = 0;
  }
};

//Score system
const addScores = () => {
  if (winStatePlayer1) {
    scores[0]++;
  }
  if (winStatePlayer2) {
    scores[1]++;
  }
  if (isDraw) {
    scores[2]++;
  }
  showScores(scores);
};

//Show scores
const showScores = (arr) => {
  for (let i = 0; i < player1El.length; i++) {
    player1El[i].textContent = arr[0];
    player2El[i].textContent = arr[1];
    drawEl[i].textContent = arr[2];
  }
};
showScores(scores);

//active Player putting down XO
for (let i = 0; i < gridItemsAll.length; i++) {
  gridItemsAll[i].addEventListener('click', function () {
    if (gameActive) {
      if (activePlayer === 0 && gridItemsAll[i].innerHTML === '') {
        //place X
        gridItemsAll[
          i
        ].innerHTML = `<i class="fas fa-times fa-7x assign-x"></i>`;
        //collecting user input
        userInput.splice([i], 1, 0);
        checkWinner(userInput);
        activePlayer = 1;
      } else if (activePlayer === 1 && gridItemsAll[i].innerHTML === '') {
        //Place O
        gridItemsAll[
          i
        ].innerHTML = `<i class="far fa-circle fa-6x assign-o"></i>`;

        //collecting user input
        userInput.splice([i], 1, 1);
        checkWinner(userInput);
        activePlayer = 0;
      }
    }
  });
}

//check who is the winner
const whoWon = (activePlayer) => {
  if (activePlayer === 0) {
    winStatePlayer1 = true;
    addScores();
    openGameMessage();
  } else if (activePlayer === 1) {
    winStatePlayer2 = true;
    addScores();
    openGameMessage();
  }
};

//Draw functionality
const checkDraw = function (userInput) {
  if (winStatePlayer1 === false && winStatePlayer2 === false) {
    isDraw = userInput.every((el) => el !== '');
    if (isDraw) {
      addScores();
      openGameMessage();
    }
  }
};

//check winning conditions
function checkWinner(userInput) {
  //horizontal check
  if (
    (userInput[0] === userInput[1] &&
      userInput[1] === userInput[2] &&
      userInput[0] === activePlayer) ||
    (userInput[3] === userInput[4] &&
      userInput[4] === userInput[5] &&
      userInput[3] === activePlayer) ||
    (userInput[6] === userInput[7] &&
      userInput[7] === userInput[8] &&
      userInput[6] === activePlayer)
  ) {
    //Check who is the winner
    whoWon(activePlayer);
    gameActive = false;
  } else if (
    //vertical check
    (userInput[0] === userInput[3] &&
      userInput[3] === userInput[6] &&
      userInput[0] === activePlayer) ||
    (userInput[1] === userInput[4] &&
      userInput[4] === userInput[7] &&
      userInput[1] === activePlayer) ||
    (userInput[2] === userInput[5] &&
      userInput[5] === userInput[8] &&
      userInput[2] === activePlayer)
  ) {
    //Check who is the winner
    //console.log(userInput);
    whoWon(activePlayer);
    gameActive = false;
  } else if (
    //diagonal check
    (userInput[0] === userInput[4] &&
      userInput[4] === userInput[8] &&
      userInput[0] === activePlayer) ||
    (userInput[2] === userInput[4] &&
      userInput[4] === userInput[6] &&
      userInput[2] === activePlayer)
  ) {
    //Check who is the winner
    whoWon(activePlayer);
    gameActive = false;
  }
  checkDraw(userInput);
}

const openGameMessage = () => {
  gameMessageEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
  if (winStatePlayer1) {
    messageEl.textContent = `Player 1 Won!`;
  }
  if (winStatePlayer2) {
    messageEl.textContent = `Player 2 Won!`;
  }
  if (isDraw) {
    messageEl.textContent = `It's a draw!`;
  }
};

//New game button
document.querySelector('#new-game').addEventListener('click', function () {
  //
  determineStarterPlayer();
  //remove message box
  gameMessageEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
  //clear board
  for (let i = 0; i < gridItemsAll.length; i++) {
    gridItemsAll[i].innerHTML = ``;
  }
  //clear userinput array
  userInput.length = 0;
  userInput = Array(9).fill('');
  //change game status
  gameActive = true;
  //set back win states
  winStatePlayer1 = false;
  winStatePlayer2 = false;
  isDraw = false;
});
