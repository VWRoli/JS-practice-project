'use strict';
//*STRINGS
const higheString = [
  'F',
  'F#',
  'G',
  'G',
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
];

const bString = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

const gString = [
  'G#',
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
];
const dString = [
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
];
const aString = [
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
];
const loweString = [
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
];

const allStrings = [
  higheString,
  bString,
  gString,
  dString,
  aString,
  loweString,
];
////////////////////////////////////////////////
//*GET RANDOM STRING
const getRandomString = (strings) => {
  return Math.floor(Math.random() * strings.length);
};
const randomString = getRandomString(allStrings);
console.log(randomString);

//*GET RANDOM NOTE
const getRandomNote = (string) => {
  return Math.floor(Math.random() * string.length);
};
const randomNote = getRandomNote(allStrings[randomString]);

console.log(randomNote);
