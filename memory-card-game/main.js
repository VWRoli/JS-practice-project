'use strict';
//Variables
const cardEl = document.querySelectorAll('.card-items');
const cardWrapperEl = document.querySelectorAll('.card-wrapper');
const startBtnEl = document.querySelector('.start-btn');
const showcaseEl = document.querySelector('.showcase');
const gameEl = document.querySelector('.game');
const timerEl = document.querySelector('.timer');
const resetBtnEl = document.querySelector('.btn-reset');

let time = 0;
let timer;

//Flip cards
for (let i = 0; i < cardEl.length; i++)
  cardEl[i].addEventListener('click', function () {
    console.log('click');
    cardWrapperEl[i].classList.toggle('active');
  });

//Start game
startBtnEl.addEventListener('click', function () {
  startTimer(time);
  showcaseEl.classList.toggle('hidden');
  gameEl.classList.toggle('hidden');
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
});
