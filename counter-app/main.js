'use strict';
const counterDisplayEl = document.querySelector('.counter-display');
//Counter
let counter = 0;

const setCounter = function () {
  counterDisplayEl.textContent = counter;
};
setCounter();

//Colorization
const colorization = function () {
  if (counter > 0) {
    counterDisplayEl.classList.remove('negative');
    counterDisplayEl.classList.add('positive');
  } else if (counter < 0) {
    counterDisplayEl.classList.remove('positive');
    counterDisplayEl.classList.add('negative');
  } else {
    counterDisplayEl.classList.remove('positive');
    counterDisplayEl.classList.remove('negative');
  }
};
//decrease button
document.querySelector('#decrease').addEventListener('click', function () {
  counter--;
  setCounter();
  colorization();
});
//reset button
document.querySelector('#reset').addEventListener('click', function () {
  counter = 0;
  setCounter();
  colorization();
});
//increase button
document.querySelector('#increase').addEventListener('click', function () {
  counter++;
  setCounter();
  colorization();
});
