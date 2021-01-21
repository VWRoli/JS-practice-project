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
const bpmForm = document.querySelector('.bpm');
const bpmInput = document.querySelector('#bpm-number-input');

////////////////////////////////////////////////
class Metronome {
  constructor() {
    this.metronomeLoop = false;
    this.playMetronome;
    this.bpm;
    this.beat;

    playBtn.addEventListener('click', this.play.bind(this));
    bpmForm.addEventListener('submit', this.getBpm);
  }
  //Set default BPM
  _defaultBPM() {
    //bpmInput.value = 120;
  }
  //Get user input BPM
  getBpm(e) {
    e.preventDefault();
    //this.bpm = bpmInput.value;
  }

  //Play button
  play() {
    const changePlayBtn = () =>
      !this.metronomeLoop
        ? (playBtn.innerHTML = `<i class="far fa-play-circle fa-9x"></i>`)
        : (playBtn.innerHTML = `<i class="far fa-pause-circle fa-9x"></i>`);

    this.metronomeLoop = !this.metronomeLoop;
    this.resetMetronome();
    changePlayBtn();
    if (this.metronomeLoop === false) return;
    this.startMetronome();
    this.loopMetronome();
  }

  //Loops metronome
  loopMetronome() {
    this.playMetronome = setInterval(this.startMetronome, 500);
  }
  //Starts metronome
  startMetronome() {
    hihat.play();
  }
  //Clears time interval
  resetMetronome() {
    clearInterval(this.playMetronome);
  }
}
const metronome = new Metronome();
