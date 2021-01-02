'use strict';
const modalBtnAll = document.querySelectorAll('.btn');
const modalWindowEl = document.querySelector('.modal-window');
const overlayEl = document.querySelector('.overlay');
const escModalEl = document.querySelector('.fa-times');
const arrowEl = document.querySelector('#chevron');
const sidebarEl = document.querySelector('.sidebar');

//////////////////////////////////////////////////////////
//Modal
const openCloseModal = () => {
  modalWindowEl.classList.toggle('hidden');
  overlayEl.classList.toggle('hidden');
};
//Open modal buttons
for (let i = 0; i < modalBtnAll.length; i++)
  modalBtnAll[i].addEventListener('click', openCloseModal);

//Close modal button
escModalEl.addEventListener('click', openCloseModal);
//close modal with ovarlay click
overlayEl.addEventListener('click', openCloseModal);
//Close modal window with Esc
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindowEl.classList.contains('hidden'))
    openCloseModal();
});

/////////////////////////////////////////////////////////
//Sidebar

arrowEl.addEventListener('click', function () {
  //Rotate arrow
  arrowEl.classList.toggle('rotate');
  arrowEl.classList.toggle('rotate-back');
  //sidebar move in-out
  sidebarEl.classList.toggle('move-in');
  sidebarEl.classList.toggle('move-out');
});
/////////////////////////////////////////////////////////
//Toggle navbar
document.querySelector('#burger-icon').addEventListener('click', function () {
  document.querySelector('.navbar').classList.toggle('active');
  console.log('click');
});
