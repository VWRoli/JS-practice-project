'use script';

/* GAME LOGIC
- player 1 is always X
- Player 2 is always O 
- in every round it changes who starts the game  */
/* 
Steps:
- clicking active player puts down mark 
- has to be its own mark 
- save marks in an array
- check if has 3 next to each other
  - check if X or O
- if no continue
- draw
- if yes game won     
    - pop up window
    - add score
    - new game button 
        - clear board  
*/
//Variables
const gridItemsAll = document.querySelectorAll('.grid-item');
const gameMessageEl = document.querySelector('.game-message');
const overlayEl = document.querySelector('.overlay');
const messageEl = document.querySelector('#message');

const players = [0, 1, 2]; //2 is draw
const userInput = Array(9).fill('');
const scores = [0, 0, 0];

let activePlayer = 0;
let gameActive = true;

//active Player XO marking

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
        checkDraw(userInput);
        checkWinner(userInput);
        activePlayer = 1;
      } else if (activePlayer === 1 && gridItemsAll[i].innerHTML === '') {
        //Place O
        gridItemsAll[
          i
        ].innerHTML = `<i class="far fa-circle fa-6x assign-o"></i>`;

        //collecting user input
        userInput.splice([i], 1, 1);
        checkDraw(userInput);
        checkWinner(userInput);
        activePlayer = 0;
      }
    }
  });
}

//check winner
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
    console.log(activePlayer);
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
    console.log(activePlayer);
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
    console.log(activePlayer);
    gameActive = false;
  }
}

//Draw functionality
const checkDraw = function (userInput) {
  isDraw = userInput.every((el) => el !== '');
  if (isDraw === true) {
    console.log(isDraw);
    //openGameMessage();
  }
};

const openGameMessage = () => {
  gameMessageEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
  if (activePlayer === 0) {
    messageEl.textContent = `Player 1 Won!`;
  } else if (activePlayer === 1) {
    messageEl.textContent = `Player 2 Won!`;
  }
};
