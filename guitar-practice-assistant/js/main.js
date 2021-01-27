'use strict';
//? VARIABLES
const inputTitle = document.querySelector('#title-input');
const inputDuration = document.querySelector('#duration-input');
const inputType = document.querySelector('.form-input-type');

const btnNew = document.querySelector('#add-new-item');
const btnSlide = document.querySelector('.slide-btn');

const form = document.querySelector('.new-practice-item');
const formGroup = document.querySelector('.form-group');

const messageBox = document.querySelector('.message-box');

class PracticeItem {
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
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

  constructor() {
    //Get data from localStorage
    this._getLocalStorage();
    //Event handlers
    btnNew.addEventListener('click', this._newPracticeItem.bind(this));
    btnSlide.addEventListener('click', this._showHideForm.bind(this));
    form.addEventListener('submit', this._newPracticeItem.bind(this));
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

      console.log(practiceItem);
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

    //Set local storage
    this._setLocalStorage();
  }
  _addPracticeItem({ title, duration, type }) {
    let html = `<li class="practice-item list-practice-item ${type}-item">
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
        >Time: <span class="practice-item-time-value"></span>${duration}
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
}
const app = new App();
