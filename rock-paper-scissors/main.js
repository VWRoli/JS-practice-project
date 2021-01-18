'use strict';
//Variables
const playerEl = document.querySelector('.player');
const computerEl = document.querySelector('.computer-option');

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

  computer();
  compare(player, computer);
});

//Random generator
const computer = () => {
  let randomNumber = Math.floor(Math.random() * rps.length);

  let computer = rps[randomNumber].option;
  computerEl.innerHTML = rps[randomNumber].html;
  computerEl.style.background = rps[randomNumber].bgColor;
  return computer;
};

let winner;
//comparison
const compare = (player, computer) => {
  if (player === computer) {
    //tie
  } else if (player === `rock` && computer === `paper`) {
    winner = computer;
    win(winner);
  } else if (player === `rock` && computer === `scissors`) {
    winner = player;
    win(winner);
  } else if (player === `paper` && computer === `rock`) {
    winner = player;
    win(winner);
  } else if (player === `paper` && computer === `scissors`) {
    winner = computer;
    win(winner);
  } else if (player === `scissors` && computer === `rock`) {
    winner = computer;
    win(winner);
  } else if (player === `scissors` && computer === `paper`) {
    winner = player;
    win(winner);
  }
};

//Game won function
const win = (winner) => {
  console.log(`${winner} Won!`);
};
