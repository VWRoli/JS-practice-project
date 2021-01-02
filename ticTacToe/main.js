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

//active Player XO marking
for (let i = 0; i < gridItemsAll.length; i++) {
  gridItemsAll[i].addEventListener('click', function () {
    if (activePlayer === 0 && gridItemsAll[i].innerHTML === '') {
      //place X
      gridItemsAll[i].innerHTML = `<i class="fas fa-times fa-7x assign-x"></i>`;
      activePlayer = 1;
      //Im getting an array of the number
      console.log([i]);
    } else if (activePlayer === 1 && gridItemsAll[i].innerHTML === '') {
      //Place O
      gridItemsAll[
        i
      ].innerHTML = `<i class="far fa-circle fa-6x assign-o"></i>`;
      activePlayer = 0;
    }
  });
}
