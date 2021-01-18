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
  let playerOption = clicked.dataset.options;
  console.log(playerOption);
  //Guard clause
  if (!clicked) return;
});

//Random generator
const computer = () => {
  let randomNumber = Math.floor(Math.random() * rps.length);

  let computerOption = rps[randomNumber].option;
  console.log(computerOption);
  computerEl.innerHTML = rps[randomNumber].html;
  computerEl.style.background = rps[randomNumber].bgColor;
};
computer();

//comparison
const compare = (playerOption, computerOption) => {
  if (playerOption === computerOption) {
    //tie
  } else if (playerOption === rock && computerOption === paper) {
    //won
  } else if (playerOption === rock && computerOption === scissors) {
    //player or computer === paper
    //won
  } else if (playerOption === paper && computerOption === rock) {
    //player or computer === scissors
    //won
  } else if (playerOption === paper && computerOption === scissors) {
    //player or computer === scissors
    //won
  } else if (playerOption === scissors && computerOption === rock) {
    //player or computer === scissors
    //won
  } else if (playerOption === scissors && computerOption === paper) {
    //player or computer === scissors
    //won
  }
};

//Game won function
const win = (winner) => {
  console.log(`${winner} Won!`);
};
