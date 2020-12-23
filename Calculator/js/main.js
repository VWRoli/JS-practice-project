'use strict';

const btnEL = document.querySelectorAll('.btn');
const delEl = document.querySelector('.btn-delete');
const smallDisplayEL = document.querySelector('.small-display');
const mainDisplayEl = document.querySelector('.main-display');

let userInput = '';

//User input to a string

for (let i = 0; i < btnEL.length; i++)
  btnEL[i].addEventListener('click', function () {
    userInput += btnEL[i].textContent;
    //display user input
    smallDisplayEL.textContent = userInput;
    console.log(userInput);
  });

//Results
document.querySelector('.btn-equal').addEventListener('click', function () {
  const result = math.evaluate(userInput);
  mainDisplayEl.textContent = result;
});

//Clear button
document.querySelector('.btn-clear').addEventListener('click', function () {
  userInput = '';
  console.log(userInput);
  smallDisplayEL.textContent = '';
  mainDisplayEl.textContent = '';
});

//Backspace button
delEl.addEventListener('click', function () {
  if (userInput.length > 0) {
    let deleteLastCh = userInput.slice(0, -1);
    userInput = deleteLastCh;
    smallDisplayEL.textContent = userInput;
    console.log(userInput);
  }
});
