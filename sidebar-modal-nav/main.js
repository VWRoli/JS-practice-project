'use strict';
const modalBtnAll = document.querySelectorAll('.btn');
const modalWindowEl = document.querySelector('.modal-window');
const overlayEl = document.querySelector('.overlay');
const escModalEl = document.querySelector('.fa-times');
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
