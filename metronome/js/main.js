'use strict';
//? VARIABLES
const playBtn = document.querySelector('.play-btn');
//? SOUNDS
const clap = document.getElementById('clap-sound');
const hihat = document.getElementById('hi-hat-sound');
const kick = document.getElementById('kick-sound');
const openhat = document.getElementById('open-hat-sound');
const boom = document.getElementById('boom-sound');
const ride = document.getElementById('ride-sound');
const snare = document.getElementById('snare-sound');
const tom = document.getElementById('tom-sound');
const tink = document.getElementById('tink-sound');

let metronomeLoop = false;
let playMetronome;

//Play button
playBtn.addEventListener('click', function () {
  metronomeLoop = !metronomeLoop;
  resetMetronome();
  startStopBtn();
  loopMetronome();
});
//Loops metronome
function loopMetronome() {
  playMetronome = setInterval(startStopBtn, 1000);
}
//Starts/stops metronome
function startStopBtn() {
  if (!metronomeLoop) return;
  tink.play();
}
//Clears time interval
function resetMetronome() {
  clearInterval(playMetronome);
}
