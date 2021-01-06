'use strict';
//Variables
const cardEl = document.querySelectorAll('.card-items');
const cardBackEl = document.querySelectorAll('.card-back');
const cardWrapperEl = document.querySelectorAll('.card-wrapper');
const startBtnEl = document.querySelector('.start-btn');
const showcaseEl = document.querySelector('.showcase');
const gameEl = document.querySelector('.game');
const timerEl = document.querySelector('.timer');
const resetBtnEl = document.querySelector('.btn-reset');

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
let timer;
let currentArray = [];
let currentElement;

//Flip cards
const flipCards = () => {
  for (let i = 0; i < cardEl.length; i++)
    cardEl[i].addEventListener('click', function () {
      cardWrapperEl[i].classList.toggle('active');
      currentElement = cardBackEl[i].innerHTML;
      //Log userinput
      if (currentArray.length < 2) {
        //add clicked item
        currentArray.push(currentElement);
        console.log(currentArray);

        if (currentArray[0] === currentArray[1] && currentArray.length === 2) {
          console.log('correct');
          //remove cards from array

          //empty current
          currentArray = [];
          console.log(currentArray);
          //   if(cardsArray === []){
          //won
          //   }
        } else if (currentArray.length === 2) {
          //clear current
          currentArray = [];
          console.log(currentArray);
          //flip it back and go on
          setTimeout(() => {
            turnDownCards();
          }, 1000);
        }
      } else {
        //flip open cards over
        //turnDownCards();
        //console.log(currentArray);
        //reset current
      }
    });
};

//Start game
startBtnEl.addEventListener('click', function () {
  startTimer(time);
  showcaseEl.classList.toggle('hidden');
  gameEl.classList.toggle('hidden');
  shuffleArray(cardsArray);
  setCards();
  flipCards();
});

//Start counter
const startTimer = (time) => {
  //Start counting seconds
  timer = setInterval(function () {
    const now = new Date();
    time++;
    //Convert time to minutes and seconds
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    //Show time
    timerEl.textContent = `${min}:${sec}`;
  }, 1000);
};

//Reset button
resetBtnEl.addEventListener('click', function () {
  //Reset timer
  clearInterval(timer);
  time = 0;
  //Show time
  timerEl.textContent = `00:00`;
  //Start timer again
  startTimer(time);
  //reset cards
  turnDownCards();

  //had to delay because transition is 1s
  setTimeout(() => {
    shuffleArray(cardsArray);
    setCards();
  }, 1000);
});

//Set cards
const setCards = () => {
  for (let i = 0; i < cardBackEl.length; i++) {
    cardBackEl[i].innerHTML = cardsArray[i].icon;
    cardBackEl[i].style.background = cardsArray[i].color;
  }
};

//schuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  array.slice();
  console.log(array);
  return array;
}

//Turn cards over
const turnDownCards = () => {
  //remove active class from all
  for (let i = 0; i < cardEl.length; i++)
    cardWrapperEl[i].classList.remove('active');
};
