'use strict';
//Variables
const cardEl = document.querySelectorAll('.card-items');
const cardBackEl = document.querySelectorAll('.card-back');
const cardWrapperEl = document.querySelectorAll('.card-wrapper');
const startBtnEl = document.querySelector('.start-btn');
const showcaseEl = document.querySelector('.showcase');
const gameEl = document.querySelector('.game');
const timerEl = document.querySelector('.timer');
const resetBtnEl = document.querySelectorAll('.btn-reset');
const currentTimeEl = document.querySelector('.current-time');
const displayMessage = document.querySelector('.display-message');

const cardsArray = [
  { icon: `<i class="fas fa-dog fa-4x"></i>`, color: `#945a38` },
  { icon: `<i class="fas fa-dog fa-4x"></i>`, color: `#945a38` },
  { icon: `<i class="fas fa-car fa-4x"></i>`, color: `#ffb003` },
  { icon: `<i class="fas fa-car fa-4x"></i>`, color: `#ffb003` },
  { icon: `<i class="fas fa-tree fa-4x"></i>`, color: `#3c31cc` },
  { icon: `<i class="fas fa-tree fa-4x"></i>`, color: `#3c31cc` },
  { icon: `<i class="fas fa-heart fa-4x"></i>`, color: `#e52a5a` },
  { icon: `<i class="fas fa-heart fa-4x"></i>`, color: `#e52a5a` },
  { icon: `<i class="fas fa-infinity fa-4x"></i>`, color: `#9a03ff` },
  { icon: `<i class="fas fa-infinity fa-4x"></i>`, color: `#9a03ff` },
  { icon: `<i class="fas fa-apple-alt fa-4x"></i>`, color: `#31cccc` },
  { icon: `<i class="fas fa-apple-alt fa-4x"></i>`, color: `#31cccc` },
];

let time = 0;
let timer, min, sec;
let currentArray = [];
let currentElement;
let tempIndex = [];
let wonGame = false;

//Flip cards
const flipCards = () => {
  for (let i = 0; i < cardEl.length; i++)
    cardEl[i].addEventListener('click', function () {
      cardWrapperEl[i].classList.toggle('active');
      currentElement = cardBackEl[i].innerHTML;

      //Log index number of card clicks
      tempIndex.push(cardsArray.indexOf(cardsArray[i]));

      //Log userinput
      if (currentArray.length < 2) {
        //add clicked item
        currentArray.push(currentElement);
        console.log(currentArray);
        console.log(cardsArray);
        if (currentArray[0] === currentArray[1] && currentArray.length === 2) {
          ///////////////////////////////////////////////////
          //Do not delete it but put elements into new array
          //create new array  for matches
          //put matched cards into this array
          //make this cards disappear
          //
          //checkForWin(wonGame);
          ///////////////////////////////////////////////////
          //remove cards from array
          cardsArray.forEach((el) => {
            if (currentArray[0] === el.icon) {
              console.log(el.icon);
              //Remove from cardsArray
              console.log(tempIndex);
              tempIndex.sort((a, b) => a - b);
              for (let i = tempIndex.length - 1; i >= 0; i--) {
                cardsArray.splice(tempIndex[i], 1, 'x');
                console.log(cardsArray);
                console.log(tempIndex[i]);
                //make cards disappear
                document
                  .querySelector(`.item-${tempIndex[i] + 1}`)
                  .classList.add('visibility');
              }
              tempIndex = [];

              //Check for win, win = every array element is X
              wonGame = cardsArray.every((el) => el === 'x');
              checkForWin(wonGame);
            }
          });

          //empty current
          currentArray = [];
          console.log(currentArray);
        } else if (currentArray.length === 2) {
          //clear current
          currentArray = [];
          tempIndex = [];
          console.log(currentArray);
          //flip it back and go on
          setTimeout(() => {
            turnDownCards();
          }, 1000);
        }
      }
    });
};

//Start game
const startNewGame = () => {
  startTimer(time);
  showcaseEl.classList.toggle('hidden');
  gameEl.classList.toggle('hidden');
  shuffleArray(cardsArray);
  setCards();
  flipCards();
};
startBtnEl.addEventListener('click', startNewGame);

//Start counter
const startTimer = (time) => {
  //Start counting seconds
  timer = setInterval(function () {
    const now = new Date();
    time++;
    //Convert time to minutes and seconds
    min = String(Math.trunc(time / 60)).padStart(2, 0);
    sec = String(time % 60).padStart(2, 0);

    //Show time
    timerEl.textContent = `${min}:${sec}`;
  }, 1000);
};

//Reset button
const resetGame = () => {
  //Reset timer
  clearInterval(timer);
  time = 0;
  //Show time
  timerEl.textContent = `00:00`;
  //Start timer again
  startTimer(time);
  //
  displayMessage.classList.add('hidden');
  //reset cards
  //turnDownCards();
  cardEl.forEach((el) => el.classList.remove('visibility'));
  //cardEl.forEach((el) => el.classList.remove('visibility'));
  //
  // const removeVisibility = ()=>{

  // }
  // cardEl.classList.remove('visibility');
  //
  //had to delay because transition is 1s
  setTimeout(() => {
    shuffleArray(cardsArray);
    setCards();
  }, 1000);
};

resetBtnEl.forEach((btn) => btn.addEventListener('click', resetGame));

//Set cards
const setCards = () => {
  for (let i = 0; i < cardBackEl.length; i++) {
    cardBackEl[i].innerHTML = cardsArray[i].icon;
    cardBackEl[i].style.background = cardsArray[i].color;
  }
};

//schuffle array
console.log(cardsArray);
function shuffleArray(array) {
  array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log(array);
  return array;
}

//Turn cards over
const turnDownCards = () => {
  //remove active class from all
  for (let i = 0; i < cardEl.length; i++)
    cardWrapperEl[i].classList.remove('active');
};

//Check for win
const checkForWin = (boolean) => {
  if (wonGame) {
    //Display Messasge
    displayMessage.classList.remove('hidden');
    gameEl.classList.toggle('hidden');
    //record high score
    currentTimeEl.textContent = `${min}:${sec}`;
    //Stop clock
    clearInterval(timer);
    time = 0;
  }
};
