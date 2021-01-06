'use strict';
//Variables
const cardEl = document.querySelectorAll('.card-items');
const cardWrapperEl = document.querySelectorAll('.card-wrapper');
const startBtnEl = document.querySelector('.start-btn');
const showcaseEl = document.querySelector('.showcase');
const gameEl = document.querySelector('.game');

//Flip cards
for (let i = 0; i < cardEl.length; i++)
  cardEl[i].addEventListener('click', function () {
    console.log('click');
    cardWrapperEl[i].classList.toggle('active');
  });

//Start game
startBtnEl.addEventListener('click', function () {
  console.log('click');
  showcaseEl.classList.toggle('hidden');
  gameEl.classList.toggle('hidden');
});
