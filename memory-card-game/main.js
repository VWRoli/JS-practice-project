'use strict';
//Variables
const cardEl = document.querySelectorAll('.card-items');
const cardWrapperEl = document.querySelectorAll('.card-wrapper');

//Flip cards
for (let i = 0; i < cardEl.length; i++)
  cardEl[i].addEventListener('click', function () {
    console.log('click');
    cardWrapperEl[i].classList.toggle('active');
  });
