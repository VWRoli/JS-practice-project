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

let randomNote, clickedNote, newNoteEl;
let score = 0;

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
  console.log(randomNote);

  //CREATE NOTE ELEMENT
  const createNoteEl = () => {
    newNoteEl = document.createElement('div');
    newNoteEl.className = 'note';
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
const buttonsAll = document.querySelector('.buttons-wrapper');

buttonsAll.addEventListener('click', function (e) {
  if (!e.target.dataset.note) return;
  clickedNote = e.target.dataset.note;
  console.log(clickedNote);
  noteComparison(randomNote, clickedNote);
});

//? COMPARE NOTES
function noteComparison(note1, note2) {
  let win = note1 === note2 ? true : false;
  //show note
  newNoteEl.textContent = note1;
  newNoteEl.style.background = win ? `var(--successColor)` : `var(--failColor)`;
  win ? score++ : score;
  scoreLabel.textContent = score;
}
