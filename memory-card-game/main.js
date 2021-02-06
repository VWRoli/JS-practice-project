'use strict';
//Variables
const startBtnEl = document.querySelector('.start-btn');
const showcaseEl = document.querySelector('.showcase');
const gameEl = document.querySelector('.game');
const timerEl = document.querySelector('.timer');
const resetBtnEl = document.querySelectorAll('.btn-reset');
const currentTimeEl = document.querySelector('.current-time');
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
let time,
  timer,
  min,
  sec,
  newCardsArray,
  faceUpCardsArray,
  matchedCardsArray,
  clickedCards;

//Event listeners
startBtnEl.addEventListener('click', startNewGame);
resetBtnEl.forEach((btn) => btn.addEventListener('click', startNewGame));
cardGrid.addEventListener('click', flipCards);

function init() {
  cardGrid.innerHTML = '';
  time = 0;
  faceUpCardsArray = [];
  matchedCardsArray = [];
  clickedCards = [];
}

//Start game
function startNewGame() {
  init();
  //Start timer
  startTimer();
  //Change screen
  showcaseEl.classList.add('hidden');
  gameEl.classList.remove('hidden');
  displayMessage.classList.add('hidden');
  //Shuffle cards
  newCardsArray = shuffleArray(cardsArray);
  //Render shuffled cards
  newCardsArray.map((card) => createCards(card));
}

//Start counter
const startTimer = () => {
  //Reset timer
  clearInterval(timer);
  time = 0;
  timerEl.textContent = `00:00`;

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
  clickedCards.push(clicked);

  //To turn back cards
  const cardWrapperEl = document.querySelectorAll('.card-wrapper');

  //If two cards are face up
  if (clickedCards.length === 2) {
    //compare
    compareCards(clickedCards, cardWrapperEl);
    clickedCards = [];
  }
}

//Compare cards
function compareCards(cards, allCards) {
  const flippedCardIcon = cards.map(
    (card) => card.querySelector('.card-back').innerHTML
  );
  //compare two array items
  if (flippedCardIcon[0] === flippedCardIcon[1]) {
    //Put matched cards into an array
    matchedCardsArray.push(flippedCardIcon[0]);
    matchedCardsArray.push(flippedCardIcon[1]);

    deleteMatchedCards(cards);
    //Handle array that contains matched cards
    handleMatchedCards(matchedCardsArray);
  } else {
    //Flip back unmatched cards
    setTimeout(() => {
      allCards.forEach((card) => card.classList.remove('active'));
    }, 1000);
  }
}

//Delete matched cards from screen
function deleteMatchedCards(cards) {
  setTimeout(() => {
    cards.forEach((card) => card.classList.add('invisibility'));
  }, 1000);
}

//Handle mathed cards
function handleMatchedCards(matchedCards) {
  if (matchedCards.length === newCardsArray.length) {
    //Display Messasge
    displayMessage.classList.remove('hidden');
    gameEl.classList.toggle('hidden');
    //record high score
    currentTimeEl.textContent = `${min}:${sec}`;
  }
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
