'use strict';
// Variables
let guess, score, randomNumber, randomNoteEl, active, correct;

const guessEl = document.querySelector('.guesses');
const scoreEl = document.querySelector('.score');
const noteElAll = document.querySelectorAll('.note');
const btnElAll = document.querySelectorAll('.btn');
const gameStatsEl = document.querySelector('.game-stats');
const newBtnEl = document.querySelector('.new-game');

//Generating random number
function rng() {
  randomNumber = Math.floor(Math.random() * 72) + 1;
  randomNoteEl = document.querySelector(`.note-${randomNumber}`);
  // Generate a random note
  //Show the randomly generated note
  randomNoteEl.classList.add('memorize');
  randomNoteEl.classList.remove('hidden');
}

// End of game
function endOfGame() {
  //Game finished
  guess--;
  guessEl.textContent = guess;

  active = false;

  gameStatsEl.classList.remove('game-stats');
  gameStatsEl.classList.add('finished-game-stats');

  newBtnEl.classList.remove('hidden');
  randomNoteEl.classList.remove('memorize');

  if (correct === randomNoteEl.textContent) {
    randomNoteEl.classList.add('correct');
    //Score +1
    score++;
    scoreEl.textContent = score;
  } else {
    randomNoteEl.classList.add('incorrect');
  }
}

// Game initialization
function init() {
  //Hide notes
  for (let i = 0; i < noteElAll.length; i++) {
    noteElAll[i].classList.add('hidden');
    noteElAll[i].classList.remove('correct');
    noteElAll[i].classList.remove('incorrect');
  }
  //Default stats
  guess = 100;
  score = 0;
  guessEl.textContent = guess;
  scoreEl.textContent = score;
  active = true;
  rng();
  gameStatsEl.classList.add('game-stats');
  gameStatsEl.classList.remove('finished-game-stats');
  newBtnEl.classList.add('hidden');
}
init();

//Generate next random note
function nextNote() {
  setTimeout(function () {
    active = true;
    //set default
    randomNoteEl.classList.remove('memorize');
    randomNoteEl.classList.remove('incorrect');
    randomNoteEl.classList.remove('correct');
    randomNoteEl.classList.add('hidden');
    //GENERATE RANDOM NUMBER AGAIN
    rng();
  }, 2000);
}

//note buttons
for (let i = 0; i < btnElAll.length; i++) {
  btnElAll[i].addEventListener('click', function () {
    if (active) {
      correct = btnElAll[i].textContent;
      console.log(correct);
      //Check if textcontent matches
      if (btnElAll[i].textContent === randomNoteEl.textContent) {
        if (guess > 1) {
          //Guesses -1
          guess--;
          guessEl.textContent = guess;
          //Score +1
          score++;
          scoreEl.textContent = score;
          //Show note
          randomNoteEl.classList.remove('memorize');
          randomNoteEl.classList.add('correct');
          active = false;
          nextNote();
        } else {
          //Game finished
          endOfGame();
        }
      } else {
        // false guess
        if (guess > 1) {
          //Guesses -1
          guess--;
          guessEl.textContent = guess;

          //Show note
          randomNoteEl.classList.remove('memorize');
          randomNoteEl.classList.add('incorrect');
          active = false;
          nextNote();
        } else {
          //Game finished
          endOfGame();
        }
      }
    }
  });
}

//New game button
document.querySelector('.new-game').addEventListener('click', function () {
  init();
});
