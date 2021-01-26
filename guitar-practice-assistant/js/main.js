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
class Excercise extends PracticeItem {
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

  //Clear input fields and hide form
  _hideForm() {
    inputTitle.value = inputDuration.value = '';
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
    const setErrorFor = (input, msg) => {
      //Change bg and add message
      input.style.background = '#ec6d8d';
      const small = input.nextElementSibling;
      small.textContent = msg;
    };
    const setSuccess = (input) => {
      input.style.background = '#fff';
      input.nextElementSibling.textContent = '';
    };

    //Check if user inputs are valid
    const checkInputs = () => {
      if (inValidTitle(title)) {
        setErrorFor(inputTitle, `Title cannot be blank`);
      }
      if (inValidDuration(duration)) {
        setErrorFor(inputDuration, `Between 1-99`);
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

      console.log(practiceItem);
    }

    this._hideForm();
  }
}
const app = new App();
