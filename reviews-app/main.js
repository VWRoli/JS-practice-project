'use strict';
const imgEl = document.querySelector('.img-container');
const nameEl = document.querySelector('.full-name');
const jobEl = document.querySelector('.job-title');
const reviewEl = document.querySelector('.review-text');

let counter = 0;

const person1 = {
  img: `https://source.unsplash.com/pZTVa_Gt1f8/`,
  fullName: 'Anna Conda',
  jobTitle: 'Chief Inspiration Officer',
  review: `Aenizzle nizzle massa yo urna break yo neck, yall lobortizzle. Cool enizzle ma nizzle, bibendizzle mammasay mammasa mamma oo sa, shizzlin dizzle vizzle, imperdiet vitae, for sure. Vivamizzle egizzle gizzle at massa adipiscing cool. `,
  slider: 1,
};

const person2 = {
  img: `https://source.unsplash.com/JyVcAIUAcPM/`,
  fullName: 'Vic Torius',
  jobTitle: 'Digital Overlord ',
  review: `Lorem ipsizzle dolizzle sit amizzle, consectetuer adipiscing elit. Nullam sapien velit, aliquet volutpat, cool fo shizzle, izzle my shizz, mah nizzle. Pellentesque crackalackin tortor. Gangsta erizzle. `,
  slider: 2,
};

const person3 = {
  img: `https://source.unsplash.com/rDEOVtE7vOs/`,
  fullName: 'Paige Turner',
  jobTitle: 'Grand Master of Underlings',
  review: `Shiz quis you son of a bizzle. Donec ante. Maecenizzle rizzle maurizzle fizzle for sure. My shizz izzle pot. Crizzle brizzle tortor izzle hizzle consectetizzle condimentizzle. For sure check out this yo mamma sizzle crunk, consectetuer adipiscing nizzle. `,
  slider: 3,
};

const person4 = {
  img: `https://source.unsplash.com/d2MSDujJl2g/`,
  fullName: 'Al Pacca',
  jobTitle: 'Señor System Administrator',
  review: `Etizzle elizzle boofron, ullamcorpizzle , ullamcorpizzle ut, scelerisque et, rizzle. Morbi eget neque. Dizzle felizzle. Dizzle nonummy, nisl shizzlin dizzle fringilla shut the shizzle up, libero mi varius rizzle, `,
  slider: 4,
};

const person5 = {
  img: `https://source.unsplash.com/nV-3mvWNH7w/`,
  fullName: 'May Day',
  jobTitle: 'Director of Spam Reception ',
  review: `sed laorizzle yo mamma enim vizzle izzle. Curabitizzle away things owned elit. We gonna chung pot dolor nec boom shackalack. `,
  slider: 5,
};

const persons = [person1, person2, person3, person4, person5];

function htmlFiller(person) {
  //Adding image
  imgEl.style.background = `url(${person.img}) no-repeat center/cover`;
  //Adding Name
  nameEl.textContent = person.fullName;
  //Adding Job Title
  jobEl.textContent = person.jobTitle;
  //Adding review text
  reviewEl.textContent = person.review;
  //Active class for slider
}
htmlFiller(persons[counter]);

//Arrow buttons
//counter function
//console.log(counter);
function scroller() {
  if (counter >= persons.length) {
    counter = 0;
  } else if (counter < 0) {
    counter = persons.length - 1;
  }
}
//left
document
  .querySelector('.fa-chevron-left')
  .addEventListener('click', function () {
    counter--;
    scroller();
    htmlFiller(persons[counter]);
  });

//right
document
  .querySelector('.fa-chevron-right')
  .addEventListener('click', function () {
    counter++;
    scroller();
    htmlFiller(persons[counter]);
  });

//Random button
document.querySelector('#button').addEventListener('click', function () {
  let randomNumber = Math.floor(Math.random() * persons.length);
  htmlFiller(persons[randomNumber]);
  randomNumber = counter;
});
