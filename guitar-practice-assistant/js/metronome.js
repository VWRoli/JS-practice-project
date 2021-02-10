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
  _synth;

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
    //Create Synth
    this._synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0 },
    }).toDestination();

    this._loopBeat = new Tone.Loop(this._sound.bind(this), '4n');

    //Set bpm
    Tone.Transport.bpm.value = this._bpm;
    //Start sound
    Tone.Transport.start();
    this._loopBeat.start(0);
  }
  //Stop metronome
  _stopMetronome() {
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
    this._synth.triggerAttackRelease('A5', 0.03, time);
  }
}

const myMetronome = new Metronome();
