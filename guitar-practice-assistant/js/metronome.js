'use strict';

const controls = document.querySelector('.controls');
const bpmNumberInput = document.querySelector('#bpm-number-input');
const bpmNumberDisplay = document.querySelector('.bpm-number-display');

const metronomeStartBtn = document.querySelector('.metronome-start-btn');
///////////////////////////////////////////////////////
//Actual metronome

class Metronome {
  _bpm = 120;
  //How often we tick
  _tempo;
  //So we can stop the ticker
  _timeout;
  _expected;
  _hiHat;
  _context = new (window.AudioContext || window.webkitAudioContext)();

  _metronomeActive = false;
  constructor() {
    this._fetchAudio();
    this._handleBpm();
    this._calcMsTempo();

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
    this._calcMsTempo();
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
  //Calc tempo
  _calcMsTempo() {
    // 1m is 60 000ms
    //60 000 / bpm = tempo
    this._tempo = 60000 / this._bpm;
  }
  //Start metronome
  _startMetronome() {
    console.log('Started!');
    //Set expected time
    this._expected = Date.now() + this._tempo;
    this._timeout = setTimeout(this._tick.bind(this), this._tempo); //todo
  }
  //Stop metronome
  _stopMetronome() {
    clearTimeout(this._timeout);
    console.log('Stopped!');
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
  //Ticker, runs and adjusts the time
  _tick() {
    //How much do we drift from expected time
    let timeDrift = Date.now() - this._expected;
    //Increase expected time with tempo
    this._expected += this._tempo;
    //Play sound
    this._playHiHat();
    console.log(timeDrift);
    //Adjust tempo
    this._timeout = setTimeout(this._tick.bind(this), this._tempo - timeDrift);
  }
  _fetchAudio() {
    fetch('./sounds/snare.wav')
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => this._context.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        this._hiHat = decodedAudio;
      });
  }
  _playHiHat() {
    const playSound = this._context.createBufferSource();
    playSound.buffer = this._hiHat;
    playSound.connect(this._context.destination);
    playSound.start(this._context.currentTime);
  }
}

const myMetronome = new Metronome();
