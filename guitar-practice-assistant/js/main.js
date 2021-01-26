'use strict';
//? VARIABLES
const inputTitle = document.querySelector('#title-input');
const inputDuration = document.querySelector('#duration-input');
const inputType = document.querySelector('.form-input-type');
const btnNew = document.querySelector('#add-new-item');
const form = document.querySelector('.new-practice-item');

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
class excercise extends PracticeItem {
  type = 'excercise';
  constructor(title, duration) {
    super(title, duration);
  }
}

//? APP ARCHITECTURE
class App {
  constructor() {
    //Event handlers
    btnNew.addEventListener('click', this._newPracticeItem.bind(this));
    form.addEventListener('submit', this._newPracticeItem.bind(this));
  }
  //Add new prctice items
  _newPracticeItem(e) {
    const validTitle = (title) => title === '';
    const validDuration = (duration) => duration <= 0 || duration >= 100;

    e.preventDefault();
    //Get data from form
    const title = inputTitle.value.trim();
    const duration = +inputDuration.value.trim();
    const type = inputType.value;

    //Set error message function
    const setErrorFor = (input, msg) => {
      //Change bg and add message
      input.style.background = '#ec6d8d';
      const small = input.nextElementSibling;
      small.textContent = msg;
    };

    //Check if user inputs are valid
    const checkInputs = () => {
      if (validTitle(title)) {
        setErrorFor(inputTitle, `Title cannot be blank`);
      }
      if (validDuration(duration)) {
        setErrorFor(inputDuration, `Between 1-99`);
      }
    };
    checkInputs();
    if (type === 'song' && validTitle(title) && validDuration(duration)) {
      console.log(title, duration, type);
    }
    if (type === 'excercise' && validTitle(title) && validDuration(duration)) {
      console.log(title, duration, type);
    }
  }
}

const app = new App();
