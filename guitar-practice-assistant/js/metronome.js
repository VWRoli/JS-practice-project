'use strict';

import * as Tone from 'tone';

const controls = document.querySelector('.controls');
const bpmNumberInput = document.querySelector('#bpm-number-input');
const bpmNumberDisplay = document.querySelector('.bpm-number-display');

const metronomeStartBtn = document.querySelector('.metronome-start-btn');
///////////////////////////////////////////////////////
//Actual metronome

class Metronome {
  _bpm = 120;
  _metronomeActive = false;
  _loopBeat;
  _bassSynth;

  constructor() {
    this._handleBpm();

    //Event handlers
    metronomeStartBtn.addEventListener(
      'click',
      this._startStopHandler.bind(this)
    );
    controls.addEventListener('click', this._handleControls.bind(this));
    bpmNumberInput.addEventListener('change', this._handleSlider.bind(this));
  }
  //BPM handler
  _handleBpm() {
    if (this._bpm >= 40 && this._bpm <= 180) {
      bpmNumberInput.value = this._bpm;
      bpmNumberDisplay.textContent = this._bpm;
    }
  }
  //Control handler
  _handleControls(e) {
    const target = e.target.closest('.control-btn');
    if (!target) return;

    if (target.classList.contains('btn-plus')) {
      this._bpm++;
      this._handleBpm();
    }
    if (target.classList.contains('btn-minus')) {
      this._bpm--;
      this._handleBpm();
    }
  }
  //Handle range slider
  _handleSlider() {
    this._bpm = bpmNumberInput.value;
    this._handleBpm();
  }
  //Start metronome
  _startMetronome() {
    console.log('Started!');
    this._bassSynth = new Tone.MembraneSynth().toDestination();
    this._loopBeat = new Tone.Loop(this._sound.bind(this), '4n');

    Tone.Transport.bpm.value = this._bpm;
    Tone.Transport.start();
    this._loopBeat.start(0);
  }
  //Stop metronome
  _stopMetronome() {
    console.log('Stopped!');
    this._loopBeat.stop();
  }
  //Handle start and stop function
  _startStopHandler() {
    if (this._metronomeActive) {
      metronomeStartBtn.innerHTML = `<i class="far fa-play-circle fa-9x gradient-btn"></i>`;
      this._stopMetronome();
    } else {
      metronomeStartBtn.innerHTML = `<i class="far fa-pause-circle fa-9x gradient-btn"></i>`;
      this._startMetronome();
    }
    this._metronomeActive = !this._metronomeActive;
  }

  _sound(time) {
    this._bassSynth.triggerAttackRelease('c1', '8n', time);
    console.log(time);
  }
}

const myMetronome = new Metronome();

///////////////////////////////////////////
//Test Code

//metronomeStartBtn.addEventListener('click', setup);
// let loopBeat;
// let bassSynth;
// function setup() {
//   bassSynth = new Tone.MembraneSynth().toDestination();
//   loopBeat = new Tone.Loop(sound, '4n');

//   Tone.Transport.bpm.value = 120;
//   Tone.Transport.start();
//   loopBeat.start(0);
// }

// function sound(time) {
//   bassSynth.triggerAttackRelease('c1', '8n', time);
//   console.log(time);
// }

// const loop = new Tone.Loop((time) => {
//   // triggered every eighth note.
//   console.log(time);
// }, '8n').start(0);

//////
// let _sound;
// metronomeStartBtn.addEventListener('click', function () {
//   const loop = new Tone.Loop((time) => {
//     console.log('loop');
//   }, 1).start(0);
//   Tone.Transport.start();
// });

// function _playSound() {
//   //Create sound
//   _sound = new Tone.Oscillator(880, 'sine').toDestination();

//   const now = Tone.now();
//   //start the oscillator at 0
//   _sound.start(now);
//   //stop it at 2
//   _sound.stop(now + 0.03);
// }
