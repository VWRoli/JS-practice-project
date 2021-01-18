'use strict';
//Variables
const playerEl = document.querySelector('.player');
const computerEl = document.querySelector('.computer-option');
const nextRound = document.querySelector('#next-round');

let winner, computer;

const rps = [
  {
    option: `rock`,
    html: `<i class="far fa-hand-rock fa-7x"></i>`,
    bgColor: `linear-gradient(to top left, #e52a5a, #ff585f)`,
  },
  {
    option: `paper`,
    html: `<i class="far fa-hand-paper fa-7x"></i>`,
    bgColor: `linear-gradient(to top left, #39b385, #9be15d)`,
  },
  {
    option: `scissors`,
    html: `<i class="far fa-hand-scissors fa-7x"></i>`,
    bgColor: `linear-gradient(to top left, #ffb003, #ffcb03)`,
  },
];

//Clicking buttons
playerEl.addEventListener('click', function (e) {
  const clicked = e.target.closest('.player-option');
  let player = clicked.dataset.options;
  console.log(player);
  //Guard clause
  if (!clicked) return;

  computerRandom();
  console.log(computer);
  compare(player, computer);
});

//Random generator
const computerRandom = () => {
  let randomNumber = Math.floor(Math.random() * rps.length);

  computer = rps[randomNumber].option;
  computerEl.innerHTML = rps[randomNumber].html;
  computerEl.style.background = rps[randomNumber].bgColor;
  return computer;
};

//comparison
const compare = (player, computer) => {
  if (player === computer) {
    //tie
    console.log(`tie`);
  } else if (player === `rock` && computer === `paper`) {
    console.log(`computer won`);
    winner = computer;
  } else if (player === `rock` && computer === `scissors`) {
    console.log(`player won`);
    winner = player;
  } else if (player === `paper` && computer === `rock`) {
    console.log(`player won`);
    winner = player;
  } else if (player === `paper` && computer === `scissors`) {
    console.log(`computer won`);
    winner = computer;
  } else if (player === `scissors` && computer === `rock`) {
    console.log(`computer won`);
    winner = computer;
  } else if (player === `scissors` && computer === `paper`) {
    console.log(`player won`);
    winner = player;
  }
};

//Game won function
const win = (winner) => {
  console.log(`${winner} Won!`);
};

//next round button
nextRound.addEventListener('click', function () {
  computerEl.innerHTML = ``;
  computerEl.style.background = `linear-gradient(to top left, #c8c8c8, #a8a7a7)`;
});
