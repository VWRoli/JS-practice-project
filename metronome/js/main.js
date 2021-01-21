'use strict';

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
//? VARIABLES
const playBtn = document.querySelector('.play-btn');

//metronome();

////////////////////////////////////////////////
class Metronome {
  constructor() {
    this.metronomeLoop = false;
    this.playMetronome;
    playBtn.addEventListener('click', this.play.bind(this));
  }
  //Play button
  play() {
    this.metronomeLoop = !this.metronomeLoop;
    this.resetMetronome();
    if (this.metronomeLoop === false) return;
    this.startMetronome();
    this.loopMetronome();
  }

  //Loops metronome
  loopMetronome() {
    this.playMetronome = setInterval(this.startMetronome, 1000);
  }
  //Starts/stops metronome
  startMetronome() {
    hihat.play();
  }
  //Clears time interval
  resetMetronome() {
    clearInterval(this.playMetronome);
  }
}
const metronome = new Metronome();

////////////////////////////////////////////////
