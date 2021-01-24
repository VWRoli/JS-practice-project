'use strict';
//? STRINGS
const allStrings = {
  higheString: ['F', 'F#', 'G', 'G', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
  bString: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  gString: ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
  dString: ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
  aString: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
  loweString: ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
};

////////////////////////////////////////////////
const strings = document.querySelectorAll('.strings');
const noteEl = document.querySelector('.note');
const scoreLabel = document.querySelector('.score');
const buttonsAll = document.querySelector('.buttons-wrapper');
const messageBox = document.querySelector('.message-box');
const finalScoreLabel = document.querySelector('.final-score');
const newGameBtn = document.querySelector('.new-game');

let randomNote, clickedNote, newNoteEl, win, nextRound;
let score = 0;
let guess = 10;

scoreLabel.textContent = score;

//? CREATE RANDOM NOTE
function createRandomNote() {
  let stringEl;
  const stringsArr = Object.keys(allStrings);

  // GET RANDOM STRING
  const getRandomString = () => {
    const randomStringNumber = Math.floor(Math.random() * stringsArr.length);
    return stringsArr[randomStringNumber];
  };
  const randomString = getRandomString();

  // GET RANDOM NOTE
  const getRandomNote = () => {
    const noteNumber = Math.floor(
      Math.random() * allStrings[randomString].length
    );
    return {
      noteIndex: noteNumber,
      noteName: allStrings[randomString][noteNumber],
    };
  };
  const randomNoteObj = getRandomNote();
  randomNote = randomNoteObj.noteName;

  //CREATE NOTE ELEMENT
  const createNoteEl = () => {
    newNoteEl = document.createElement('div');
    newNoteEl.id = 'note';
    newNoteEl.textContent = '?';
    //Sets position on freteboard
    newNoteEl.style.left = `${randomNoteObj.noteIndex * 100 + 25}px`;
    stringEl.insertAdjacentElement('afterbegin', newNoteEl);
  };

  //SHOW RANDOM NOTE
  const showRandomNote = (stringname) => {
    //delete random note div from all strings
    //Get a random string name and find it on the fretboard
    stringEl = [...strings].find((string) =>
      string.classList.contains(stringname)
    );
    createNoteEl();
  };
  showRandomNote(randomString);
}
createRandomNote();

//? BUTTONS
buttonsAll.addEventListener('click', function (e) {
  if (!e.target.dataset.note) return;
  clickedNote = e.target.dataset.note;
  noteComparison(randomNote, clickedNote);
  guess--;
  buttonsAll.style.pointerEvents = 'none';
});

//? COMPARE NOTES
function noteComparison(note1, note2) {
  win = note1 === note2 ? true : false;
  //show note
  newNoteEl.textContent = note1;
  win ? newNoteEl.classList.add('success') : newNoteEl.classList.add('fail');

  //Handle scores and win
  win ? score++ : score;
  scoreLabel.textContent = score;

  if (guess > 1) {
    //Next round
    nextRound = setTimeout(function () {
      removeNote();
      createRandomNote();
      buttonsAll.style.pointerEvents = 'auto';
    }, 1000);
  } else {
    //Game completed!
    finalScoreLabel.textContent = score;
    messageBox.style.top = '10%';
    buttonsAll.style.pointerEvents = 'none';
  }
}

function removeNote() {
  if (
    newNoteEl.classList.contains('fail') ||
    newNoteEl.classList.contains('success')
  ) {
    newNoteEl.parentNode.removeChild(newNoteEl);
  }
}

//New game button
newGameBtn.addEventListener('click', function () {
  messageBox.style.top = '-50%';
  guess = 10;
  score = 0;
  scoreLabel.textContent = score;
  newNoteEl.parentNode.removeChild(newNoteEl);
  createRandomNote();
  buttonsAll.style.pointerEvents = 'auto';
});
