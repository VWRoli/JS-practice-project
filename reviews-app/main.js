'use strict';
const imgEl = document.querySelector('.img-container');
const nameEl = document.querySelector('.full-name');
const jobEl = document.querySelector('.job-title');
const reviewEl = document.querySelector('.review-text');
const btnElAll = document.querySelectorAll('.btn');

const controls = document.querySelector('.controls');
let counter = 0;

const persons = [
  {
    img: `https://source.unsplash.com/pZTVa_Gt1f8/`,
    fullName: 'Anna Conda',
    jobTitle: 'Chief Inspiration Officer',
    review: `Aenizzle nizzle massa yo urna break yo neck, yall lobortizzle. Cool enizzle ma nizzle, bibendizzle mammasay mammasa mamma oo sa, shizzlin dizzle vizzle, imperdiet vitae, for sure. Vivamizzle egizzle gizzle at massa adipiscing cool. `,
  },

  {
    img: `https://source.unsplash.com/JyVcAIUAcPM/`,
    fullName: 'Vic Torius',
    jobTitle: 'Digital Overlord ',
    review: `Lorem ipsizzle dolizzle sit amizzle, consectetuer adipiscing elit. Nullam sapien velit, aliquet volutpat, cool fo shizzle, izzle my shizz, mah nizzle. Pellentesque crackalackin tortor. Gangsta erizzle. `,
  },

  {
    img: `https://source.unsplash.com/rDEOVtE7vOs/`,
    fullName: 'Paige Turner',
    jobTitle: 'Grand Master of Underlings',
    review: `Shiz quis you son of a bizzle. Donec ante. Maecenizzle rizzle maurizzle fizzle for sure. My shizz izzle pot. Crizzle brizzle tortor izzle hizzle consectetizzle condimentizzle. For sure check out this yo mamma sizzle crunk, consectetuer adipiscing nizzle. `,
  },

  {
    img: `https://source.unsplash.com/d2MSDujJl2g/`,
    fullName: 'Al Pacca',
    jobTitle: 'Señor System Administrator',
    review: `Etizzle elizzle boofron, ullamcorpizzle , ullamcorpizzle ut, scelerisque et, rizzle. Morbi eget neque. Dizzle felizzle. Dizzle nonummy, nisl shizzlin dizzle fringilla shut the shizzle up, libero mi varius rizzle, `,
  },

  {
    img: `https://source.unsplash.com/nV-3mvWNH7w/`,
    fullName: 'May Day',
    jobTitle: 'Director of Spam Reception ',
    review: `sed laorizzle yo mamma enim vizzle izzle. Curabitizzle away things owned elit. We gonna chung pot dolor nec boom shackalack. `,
  },
];

function htmlFiller(person) {
  //Adding image
  imgEl.style.background = `url(${person.img}) no-repeat center/cover`;
  //Adding Name
  nameEl.textContent = person.fullName;
  //Adding Job Title
  jobEl.textContent = person.jobTitle;
  //Adding review text
  reviewEl.textContent = person.review;
  //remove all other active classes
  btnElAll.forEach((element) => {
    element.classList.remove('active');
  });
  //Active class for slider
  activeClass();
}
htmlFiller(persons[counter]);

controls.addEventListener('click', function (e) {
  const clicked = e.target.id;
  if (!clicked) return;
  if (clicked === 'left') prevPerson();
  if (clicked === 'right') nextPerson();
  if (clicked === 'random') randomPerson();
});

//Arrow buttons
//left
function prevPerson() {
  counter--;
  if (counter < 0) counter = persons.length - 1;
  htmlFiller(persons[counter]);
}

//right
function nextPerson() {
  counter++;
  if (counter === persons.length) counter = 0;
  htmlFiller(persons[counter]);
}

//Random button
function randomPerson() {
  let randomNumber = Math.floor(Math.random() * persons.length);
  counter = randomNumber;
  htmlFiller(persons[randomNumber]);
}

function activeClass() {
  document.querySelector(`#btn-${counter}`).classList.add('active');
}
