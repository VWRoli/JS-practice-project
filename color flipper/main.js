'use strict';

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const randomNumbers = [];
const randomHex = [];

//generating a six digit ranfom number
for (let i = 0; i < 6; i++) {
  let rng = Math.floor(Math.random() * hex.length);
  randomNumbers.push(rng);
}
console.log(randomNumbers);
//Generating a random hex number
const randomHexGenerator = randomNumbers.map((i) => (i = hex[i])).join('');
console.log(randomHexGenerator);

document.querySelector('#random-color').addEventListener('click', function () {
  console.log('clicked');
});
