'use strict';
const questionElAll = document.querySelectorAll('.fa-plus-square');

for (let i = 0; i < questionElAll.length; i++) {
  questionElAll[i].addEventListener('click', function () {
    this.nextElementSibling.classList.toggle('show-text');
  });
}
