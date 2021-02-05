'use strict';
//? VARIABLES
const inputTitle = document.querySelector('#title-input');
const inputDuration = document.querySelector('#duration-input');
const inputType = document.querySelector('.form-input-type');

const btnNew = document.querySelector('#add-new-item');
const btnSlide = document.querySelector('.slide-btn');
const btnCloseItem = document.querySelector('.close-item');

const form = document.querySelector('.new-practice-item');
const formGroup = document.querySelector('.form-group');
const allPracticeItems = document.querySelector('#practice-items');

const messageBox = document.querySelector('.message-box');

const navbar = document.querySelector('.navbar');
const tabs = document.querySelectorAll('.nav-tab');
const contents = document.querySelectorAll('.content');
const homeContent = document.querySelector('.home');
const metronomeContent = document.querySelector('.metronome-container');

class PracticeItem {
  id = (Date.now() + '').slice(-10);

  constructor(title, duration) {
    this.title = title;
    this.duration = duration * 60; //In seconds
  }
}
//? CREATE SONG
class Song extends PracticeItem {
  type = 'song';
  constructor(title, duration) {
    super(title, duration);
  }
}
//? CREATE EXCERCISE
class Excercise extends PracticeItem {
  type = 'excercise';
  constructor(title, duration) {
    super(title, duration);
  }
}

//? APP ARCHITECTURE
class App {
  _practiceItems = [];
  _timerActive = false;
  _durationTarget;
  _targetListElement;
  _itemIndex;
  _playBtn;
  _itemId;
  _itemDuration;
  _currentDuration = false;
  _min;
  _sec;
  _timer;

  constructor() {
    //Get data from localStorage
    this._getLocalStorage();

    //Event handlers
    btnNew.addEventListener('click', this._newPracticeItem.bind(this));
    btnSlide.addEventListener('click', this._showHideForm.bind(this));
    form.addEventListener('submit', this._newPracticeItem.bind(this));
    allPracticeItems.addEventListener('click', this._clickHandler.bind(this));
    navbar.addEventListener('click', this._handleMenuTabs.bind(this));
  }
  //Toggle form
  _showHideForm() {
    formGroup.classList.toggle('form-group-hidden');
  }

  //Add new prctice items
  _newPracticeItem(e) {
    const inValidTitle = (title) => title === '';
    const inValidDuration = (duration) => duration <= 0 || duration >= 100;
    let validInput = false;
    let practiceItem;

    e.preventDefault();
    //Get data from form
    const title = inputTitle.value.trim();
    const duration = +inputDuration.value.trim();
    const type = inputType.value;

    //Set error message function
    const setErrorFor = (input) => {
      //Change bg
      input.style.background = '#ec6d8d';
      this._messageHandler(
        `Title cannot be empty, and the minutes should be a number between 1-99`
      );
    };
    const setSuccess = (input) => {
      input.style.background = '#fff';
    };

    //Check if user inputs are valid
    const checkInputs = () => {
      if (inValidTitle(title)) {
        setErrorFor(inputTitle);
      }
      if (inValidDuration(duration)) {
        setErrorFor(inputDuration);
      }
      if (!inValidTitle(title) && !inValidDuration(duration)) {
        setSuccess(inputTitle);
        setSuccess(inputDuration);
        return (validInput = true);
      }
    };

    //
    if (type === 'song' && checkInputs()) {
      practiceItem = new Song(title, duration);
    }
    if (type === 'excercise' && checkInputs()) {
      practiceItem = new Excercise(title, duration);
    }
    //Add practice item to list
    if (practiceItem === undefined) return;
    //Clear input fields
    inputTitle.value = inputDuration.value = '';

    //add new object to array
    this._practiceItems.push(practiceItem);

    //Add practice item to UI
    this._addPracticeItem(practiceItem);
    console.log(practiceItem);
    //Set local storage
    this._setLocalStorage();
  }
  _addPracticeItem({ title, duration, type, id }) {
    //converting duration to minutes and second
    const min = String(Math.trunc(duration / 60)).padStart(2, 0);
    const sec = String(duration % 60).padStart(2, 0);

    let html = `<li class="practice-item list-practice-item ${type}-item" id="${id}">
    <span class="close-item"><i class="fas fa-times" ></i></span>
    <h2 class="practice-item-title">${title}</h2>
    <div class="practice-item-details">
      <span class="practice-item-type"
        >Type: ${
          type === 'song'
            ? `<i class="fas fa-music"></i>`
            : `<i class="fas fa-dumbbell"></i>`
        }
        
      </span>
      <span class="practice-item-time"
        >Time: <span class="practice-item-time-value">${min}:${sec}</span>
        <i class="far fa-clock"></i
      ></span>
    </div>
    <div class="play-btn-wrapper">
      <button class="play-btn">
        <i class="far fa-play-circle fa-2x"></i>
      </button>
    </div>
  </li>`;
    form.insertAdjacentHTML('afterend', html);
  }
  _clickHandler(e) {
    //Select list practice item
    this._targetListElement = e.target.closest('.list-practice-item');
    if (this._targetListElement === null) return;
    this._durationTarget = this._targetListElement.querySelector(
      '.practice-item-time-value'
    );
    //Start/stop btn element
    this._playBtn = e.target.closest('.play-btn');
    //Find ID number
    this._itemId = this._targetListElement.id;
    //Find ID index in the array
    this._itemIndex = this._practiceItems
      .map((item) => item.id)
      .indexOf(this._itemId);

    //Only gets assigned once
    if (this._currentDuration === false) {
      this._itemDuration = this._practiceItems[this._itemIndex].duration;
    }

    //Close button clicked
    if (e.target.classList.contains('fa-times')) {
      this._deleteItem();
    }
    //Start button clicked
    if (this._playBtn) {
      this._startStop();
    }
  }
  _startStop() {
    if (this._timerActive) {
      this._playBtn.innerHTML = `<i class="far fa-play-circle  fa-2x"></i>`;
      clearTimeout(this._timer);
    } else {
      this._playBtn.innerHTML = `<i class="far fa-pause-circle fa-2x"></i>`;
      this._timer = setInterval(() => this._setTime(), 1000);
    }
    this._timerActive = !this._timerActive;
  }
  _setTime() {
    this._currentDuration = true;
    this._itemDuration--;

    this._min = String(Math.trunc(this._itemDuration / 60)).padStart(2, 0);
    this._sec = String(this._itemDuration % 60).padStart(2, 0);

    this._durationTarget.textContent = `${this._min}:${this._sec}`;

    if (this._itemDuration === 0) {
      clearInterval(this._timer);
      // Disable practised item
      this._targetListElement.style.opacity = `0.5`;
      this._targetListElement.style.pointerEvents = `none`;
      this._currentDuration = false;
      this._timerActive = false;
    }
  }
  _deleteItem() {
    //remove from array
    this._itemIndex >= 0 && this._practiceItems.splice(this._itemIndex, 1);
    //Remove from UI
    this._targetListElement.remove();
    //Remove from localstorage
    this._setLocalStorage();
  }

  _messageHandler(...msg) {
    messageBox.style.top = '10%';
    messageBox.textContent = msg;
    setTimeout(() => {
      messageBox.style.top = '-50%';
    }, 2000);
  }
  _setLocalStorage() {
    localStorage.setItem('practiceItems', JSON.stringify(this._practiceItems));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('practiceItems'));

    if (!data) return;

    this._practiceItems = data;

    this._practiceItems.forEach((item) => this._addPracticeItem(item));
  }
  _handleMenuTabs(e) {
    const clicked = e.target.closest('.nav-tab');
    if (!clicked) return;

    const clickedId = clicked.id;
    //Remove active from all other when clicked
    tabs.forEach((tab) => tab.classList.remove('nav-active'));
    //Add to the one clicked
    clicked.classList.add('nav-active');
    //Hide and show content
    if (clickedId === 'home') {
      metronomeContent.classList.add('hidden');
      homeContent.classList.remove('hidden');
    } else {
      homeContent.classList.add('hidden');
      metronomeContent.classList.remove('hidden');
    }
  }
}
const app = new App();
