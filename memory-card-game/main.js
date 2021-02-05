'use strict';
//Variables
//const cardEl = document.querySelectorAll('.card-items');
//const cardBackEl = document.querySelectorAll('.card-back');
//const cardWrapperEl = document.querySelectorAll('.card-wrapper');
const startBtnEl = document.querySelector('.start-btn');
const showcaseEl = document.querySelector('.showcase');
const gameEl = document.querySelector('.game');
const timerEl = document.querySelector('.timer');
const resetBtnEl = document.querySelectorAll('.btn-reset');
//const currentTimeEl = document.querySelector('.current-time');
const displayMessage = document.querySelector('.display-message');

const cardGrid = document.querySelector('.grid-wrapper');

const cardsArray = [
  { id: 1, icon: `<i class="fas fa-dog fa-4x"></i>`, color: `#945a38` },
  { id: 2, icon: `<i class="fas fa-dog fa-4x"></i>`, color: `#945a38` },
  { id: 3, icon: `<i class="fas fa-car fa-4x"></i>`, color: `#ffb003` },
  { id: 4, icon: `<i class="fas fa-car fa-4x"></i>`, color: `#ffb003` },
  { id: 5, icon: `<i class="fas fa-tree fa-4x"></i>`, color: `#3c31cc` },
  { id: 6, icon: `<i class="fas fa-tree fa-4x"></i>`, color: `#3c31cc` },
  { id: 7, icon: `<i class="fas fa-heart fa-4x"></i>`, color: `#e52a5a` },
  { id: 8, icon: `<i class="fas fa-heart fa-4x"></i>`, color: `#e52a5a` },
  { id: 9, icon: `<i class="fas fa-infinity fa-4x"></i>`, color: `#9a03ff` },
  { id: 10, icon: `<i class="fas fa-infinity fa-4x"></i>`, color: `#9a03ff` },
  { id: 11, icon: `<i class="fas fa-apple-alt fa-4x"></i>`, color: `#31cccc` },
  { id: 12, icon: `<i class="fas fa-apple-alt fa-4x"></i>`, color: `#31cccc` },
];

let time = 0;
let timer, min, sec, newCardsArray;
const faceUpArray = [];

//Event listeners
startBtnEl.addEventListener('click', startNewGame);
resetBtnEl.forEach((btn) => btn.addEventListener('click', resetGame));
cardGrid.addEventListener('click', flipCards);

//Start game
function startNewGame() {
  //Start timer
  startTimer();
  //Change screen
  showcaseEl.classList.toggle('hidden');
  gameEl.classList.toggle('hidden');
  //Shuffle cards
  newCardsArray = shuffleArray(cardsArray);
  console.log(newCardsArray);
  //Render shuffled cards
  newCardsArray.map((card) => createCards(card));
}

//Start counter
const startTimer = () => {
  //Start counting seconds
  timer = setInterval(function () {
    time++;
    //Convert time to minutes and seconds
    min = String(Math.trunc(time / 60)).padStart(2, 0);
    sec = String(time % 60).padStart(2, 0);

    //Show time
    timerEl.textContent = `${min}:${sec}`;
  }, 1000);
};

//Reset button
function resetGame() {
  //Reset timer
  clearInterval(timer);
  time = 0;
  timerEl.textContent = `00:00`;
  startTimer(time);

  //
  //displayMessage.classList.add('hidden');
  //gameEl.classList.remove('hidden');
  //reset cards
  //turnDownCards();
  //cardEl.forEach((el) => el.classList.remove('invisibility'));
  //had to delay because transition is 1s
  // setTimeout(() => {
  //   shuffleArray(cardsArray);
  //   setCards();
  // }, 1000);
}

//Create cards
function createCards({ id, icon, color }) {
  const html = `
  <div class="card-items item-${id}">
          <div class="card-wrapper">
            
            <div class="card-front"></div>
            <div class="card-back" style="background:${color};">${icon}</div>
          </div>
        </div>`;
  cardGrid.insertAdjacentHTML('afterbegin', html);
}

//Set cards
function setCards() {
  newCardsArray.map((card) => (card.innerHTML = card.icon));
}

//Flip cards
function flipCards(e) {
  const clicked = e.target.closest('.card-items');
  if (!clicked) return;
  clicked.firstElementChild.classList.toggle('active');
  let flippedCard = clicked.querySelector('.card-back').innerHTML;
  //push these into an array
  faceUpArray.push(flippedCard);
  console.log(faceUpArray);
  //max is two
}

//Handle face up cards
function faceUpCards(card1, card2) {
  //Create array for them
  faceUpArray = [card1, card2];
  //push their icon
}

function compareCards() {
  //compare two array items
}

//Schuffle and create new array of cards
function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// 'use strict';
// //Variables
// const cardEl = document.querySelectorAll('.card-items');
// const cardBackEl = document.querySelectorAll('.card-back');
// const cardWrapperEl = document.querySelectorAll('.card-wrapper');
// const startBtnEl = document.querySelector('.start-btn');
// const showcaseEl = document.querySelector('.showcase');
// const gameEl = document.querySelector('.game');
// const timerEl = document.querySelector('.timer');
// const resetBtnEl = document.querySelectorAll('.btn-reset');
// const currentTimeEl = document.querySelector('.current-time');
// const displayMessage = document.querySelector('.display-message');

// const cardsArray = [
//   { icon: `<i class="fas fa-dog fa-4x"></i>`, color: `#945a38` },
//   { icon: `<i class="fas fa-dog fa-4x"></i>`, color: `#945a38` },
//   { icon: `<i class="fas fa-car fa-4x"></i>`, color: `#ffb003` },
//   { icon: `<i class="fas fa-car fa-4x"></i>`, color: `#ffb003` },
//   { icon: `<i class="fas fa-tree fa-4x"></i>`, color: `#3c31cc` },
//   { icon: `<i class="fas fa-tree fa-4x"></i>`, color: `#3c31cc` },
//   { icon: `<i class="fas fa-heart fa-4x"></i>`, color: `#e52a5a` },
//   { icon: `<i class="fas fa-heart fa-4x"></i>`, color: `#e52a5a` },
//   { icon: `<i class="fas fa-infinity fa-4x"></i>`, color: `#9a03ff` },
//   { icon: `<i class="fas fa-infinity fa-4x"></i>`, color: `#9a03ff` },
//   { icon: `<i class="fas fa-apple-alt fa-4x"></i>`, color: `#31cccc` },
//   { icon: `<i class="fas fa-apple-alt fa-4x"></i>`, color: `#31cccc` },
// ];

// let time = 0;
// let timer, min, sec;
// let currentArray = [];
// let winArray = [];
// let currentElement;
// let tempIndex = [];
// let wonGame = false;

// //Flip cards
// const flipCards = () => {
//   for (let i = 0; i < cardEl.length; i++)
//     cardEl[i].addEventListener('click', function (e) {
//       const faceUp = e.target.classList.contains('active');
//       if (faceUp === false) {
//         cardWrapperEl[i].classList.toggle('active');
//         currentElement = cardBackEl[i].innerHTML;

//         //Log index number of card clicks
//         tempIndex.push(cardsArray.indexOf(cardsArray[i]));

//         //Log userinput
//         if (currentArray.length < 2) {
//           //add clicked item
//           currentArray.push(currentElement);
//           if (
//             currentArray[0] === currentArray[1] &&
//             currentArray.length === 2
//           ) {
//             //put matched cards into this array
//             winArray.push(currentArray[0]);
//             winArray.push(currentArray[1]);

//             //make this cards disappear
//             for (let i = 0; i < tempIndex.length; i++) {
//               document
//                 .querySelector(`.item-${tempIndex[i] + 1}`)
//                 .classList.add('invisibility');
//             }

//             //Win check
//             if (winArray.length === cardsArray.length) {
//               wonGame = true;
//               winArray = [];
//               tempIndex = [];
//             } else {
//               wonGame = false;
//             }
//             checkForWin(wonGame);

//             //empty current
//             currentArray = [];
//             tempIndex = [];
//           } else if (currentArray.length === 2) {
//             //clear current
//             currentArray = [];
//             tempIndex = [];
//             //flip it back and go on
//             setTimeout(() => {
//               turnDownCards();
//             }, 1000);
//           }
//         }
//       }
//     });
// };

// //Start game
// const startNewGame = () => {
//   startTimer(time);
//   showcaseEl.classList.toggle('hidden');
//   gameEl.classList.toggle('hidden');
//   shuffleArray(cardsArray);
//   setCards();
//   flipCards();
// };
// startBtnEl.addEventListener('click', startNewGame);

// //Start counter
// const startTimer = (time) => {
//   //Start counting seconds
//   timer = setInterval(function () {
//     const now = new Date();
//     time++;
//     //Convert time to minutes and seconds
//     min = String(Math.trunc(time / 60)).padStart(2, 0);
//     sec = String(time % 60).padStart(2, 0);

//     //Show time
//     timerEl.textContent = `${min}:${sec}`;
//   }, 1000);
// };

// //Reset button
// const resetGame = () => {
//   //Reset timer
//   clearInterval(timer);
//   time = 0;
//   timerEl.textContent = `00:00`;
//   startTimer(time);
//   //
//   displayMessage.classList.add('hidden');
//   gameEl.classList.remove('hidden');
//   //reset cards
//   turnDownCards();
//   cardEl.forEach((el) => el.classList.remove('invisibility'));
//   //had to delay because transition is 1s
//   setTimeout(() => {
//     shuffleArray(cardsArray);
//     setCards();
//   }, 1000);
// };

// resetBtnEl.forEach((btn) => btn.addEventListener('click', resetGame));

// //Set cards
// const setCards = () => {
//   for (let i = 0; i < cardBackEl.length; i++) {
//     cardBackEl[i].innerHTML = cardsArray[i].icon;
//     cardBackEl[i].style.background = cardsArray[i].color;
//   }
// };

// //schuffle array
// function shuffleArray(array) {
//   array.slice();
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// //Turn cards over
// const turnDownCards = () => {
//   //remove active class from all
//   for (let i = 0; i < cardEl.length; i++)
//     cardWrapperEl[i].classList.remove('active');
// };

// //Check for win
// const checkForWin = (boolean) => {
//   if (wonGame) {
//     //Display Messasge
//     displayMessage.classList.remove('hidden');
//     gameEl.classList.toggle('hidden');
//     //record high score
//     currentTimeEl.textContent = `${min}:${sec}`;
//     //Stop clock
//     clearInterval(timer);
//     time = 0;
//   }
// };
