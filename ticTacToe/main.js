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
- if yes game won     
    - pop up window
    - add score
    - new game button 
        - clear board  
*/
//Variables
const gridItemsAll = document.querySelectorAll('.grid-item');
const players = [0, 1];
let activePlayer = 0;
const userInput = ['', '', '', '', '', '', '', '', ''];
const x = 'x';
const o = 'o';

//active Player XO marking
for (let i = 0; i < gridItemsAll.length; i++) {
  gridItemsAll[i].addEventListener('click', function () {
    if (activePlayer === 0 && gridItemsAll[i].innerHTML === '') {
      //place X
      gridItemsAll[i].innerHTML = `<i class="fas fa-times fa-7x assign-x"></i>`;
      activePlayer = 1;
      //collecting user input
      userInput.splice([i], 1, x);
      console.log(userInput);
    } else if (activePlayer === 1 && gridItemsAll[i].innerHTML === '') {
      //Place O
      gridItemsAll[
        i
      ].innerHTML = `<i class="far fa-circle fa-6x assign-o"></i>`;
      activePlayer = 0;

      //collecting user input
      userInput.splice([i], 1, o);
      console.log(userInput);
    }
  });
}

/* 
const winXConditions = [
  ['x', 'x', 'x', '', '', '', '', '', ''],
  ['', '', '', 'x', 'x', 'x', '', '', ''],
  ['', '', '', '', '', '', 'x', 'x', 'x'],
  ['x', '', '', 'x', '', '', 'x', '', ''],
  ['', 'x', '', '', 'x', '', '', 'x', ''],
  ['', '', 'x', '', '', 'x', '', '', 'x'],
  ['', '', 'x', '', 'x', '', 'x', '', ''],
  ['x', '', '', '', 'x', '', '', '', 'x'],
];
 */
/* 
function checkWinner(userInput) {
  //horizontal check
  if (
    (userInput[0] === userInput[1] &&
      userInput[0] === userInput[2] &&
      userInput[0] !== '') ||
    (userInput[3] === userInput[4] &&
      userInput[3] === userInput[5] &&
      userInput[3] !== '') ||
    (userInput[6] === userInput[7] &&
      userInput[6] === userInput[8] &&
      userInput[6] !== '')
  ) {
    //Check who is the winner
  } else if (
    //vertical check
    (userInput[0] === userInput[3] &&
      userInput[0] === userInput[6] &&
      userInput[0] !== '') ||
    (userInput[1] === userInput[4] &&
      userInput[1] === userInput[7] &&
      userInput[1] !== '') ||
    (userInput[2] === userInput[5] &&
      userInput[2] === userInput[8] &&
      userInput[2] !== '')
  ) {
    //Check who is the winner
  } else if (
    //diagonal check
    (userInput[0] === userInput[4] &&
      userInput[0] === userInput[8] &&
      userInput[0] !== '') ||
    (userInput[2] === userInput[4] &&
      userInput[2] === userInput[6] &&
      userInput[2] !== '')
  ) {
    //Check who is the winner
  }
}
 */
/* 
function checkWinner(userInput) {
  //horizontal check
  if (
    (userInput[0] === userInput[1] && userInput[0] === userInput[2]) ||
    (userInput[3] === userInput[4] && userInput[3] === userInput[5]) ||
    (userInput[6] === userInput[7] && userInput[6] === userInput[8])
  ) {
    //Win message
    console.log('winner');
  }
  //vertical check
  if (
    (userInput[0] === userInput[3] && userInput[0] === userInput[6]) ||
    (userInput[1] === userInput[4] && userInput[1] === userInput[7]) ||
    (userInput[2] === userInput[5] && userInput[2] === userInput[8])
  ) {
    //Win message
    console.log('winner');
  }
  //diagonal check
  if (
    (userInput[0] === userInput[4] && userInput[0] === userInput[8]) ||
    (userInput[2] === userInput[4] && userInput[2] === userInput[6])
  ) {
    //Win message
    console.log('winner');
  }
} */
