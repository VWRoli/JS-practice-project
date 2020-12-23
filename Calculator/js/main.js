'use strict';

const btnEL = document.querySelectorAll('.btn');
const delEl = document.querySelector('.btn-delete');
const smallDisplayEL = document.querySelector('.small-display');
const mainDisplayEl = document.querySelector('.main-display');

let userInput = '';

//User input to a string

for (let i = 0; i < btnEL.length; i++)
  btnEL[i].addEventListener('click', function () {
    if (mainDisplayEl.textContent !== '') {
      userInput = '';
      userInput += btnEL[i].textContent;
      smallDisplayEL.textContent = userInput;
      mainDisplayEl.textContent = '';
    } else {
      userInput += btnEL[i].textContent;
      //display user input
      smallDisplayEL.textContent = userInput;
    }
  });

//Results
document.querySelector('.btn-equal').addEventListener('click', function () {
  const result = math.evaluate(userInput);
  mainDisplayEl.textContent = (result.toFixed(7) * 10) / 10;
});

//Clear button
document.querySelector('.btn-clear').addEventListener('click', function () {
  userInput = '';
  smallDisplayEL.textContent = '';
  mainDisplayEl.textContent = '';
});

//Backspace button
delEl.addEventListener('click', function () {
  if (userInput.length > 0 && mainDisplayEl.textContent === '') {
    let deleteLastCh = userInput.slice(0, -1);
    userInput = deleteLastCh;
    smallDisplayEL.textContent = userInput;
  }
});
