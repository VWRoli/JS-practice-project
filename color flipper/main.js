'use strict';

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

// Click event
document.querySelector('#random-color').addEventListener('click', function () {
  const randomNumbers = [];
  //generating a six digit random number
  for (let i = 0; i < 6; i++) {
    let rng = Math.floor(Math.random() * hex.length);
    randomNumbers.push(rng);
  }
  //Generating a random hex number
  const randomHexGenerator = randomNumbers.map((i) => (i = hex[i])).join('');

  //change body background to hex number
  document.body.style.backgroundColor = `#${randomHexGenerator}`;
  //Change text to hex number
  document.querySelector('#color-code').textContent = `#${randomHexGenerator}`;
});
