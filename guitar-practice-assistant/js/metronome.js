'use strict';

const controls = document.querySelector('.controls');
const bpmNumberInput = document.querySelector('#bpm-number-input');
const bpmNumberDisplay = document.querySelector('.bpm-number-display');

let bpm = 120;

//Handle bpm changes
function handleBpm() {
  if (bpm >= 40 && bpm <= 180) {
    bpmNumberInput.value = bpm;
    bpmNumberDisplay.textContent = bpm;
  }
}
handleBpm();

//Change bpm with range slider
bpmNumberInput.addEventListener('change', function () {
  bpm = this.value;
  handleBpm();
});

//Change bpm with buttons
controls.addEventListener('click', function (e) {
  const target = e.target.closest('.control-btn');
  if (!target) return;

  if (target.classList.contains('btn-plus')) {
    bpm++;
    handleBpm();
  }
  if (target.classList.contains('btn-minus')) {
    bpm--;
    handleBpm();
  }
});
///////////////////////////////////////////////////////
//Actual metronome
const metronomeStartBtn = document.querySelector('.metronome-start-btn');

class Metronome {
  //How often we tick
  _tempo = 500;
  //So we can stop the ticker
  _timeout;
  _expected;
  _hiHat;
  _context = new (window.AudioContext || window.webkitAudioContext)();

  _metronomeActive = false;
  constructor() {
    this._fetchAudio();
    //Event handlers
    metronomeStartBtn.addEventListener(
      'click',
      this._startStopHandler.bind(this)
    );
  }
  //Start metronome
  _startMetronome() {
    console.log('Started!');
    //Set expected time
    this._expected = Date.now() + this._tempo;
    this._timeout = setTimeout(this._tick.bind(this), this._tempo);
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
  //todo error handling when leaving tab
  _fetchAudio() {
    fetch('./sounds/hihat.wav')
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

////////////////////////////
//const context = new (window.AudioContext || window.webkitAudioContext)();
//let hiHat;

// fetch('./sounds/hihat.wav')
//   .then((data) => data.arrayBuffer())
//   .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
//   .then((decodedAudio) => {
//     hiHat = decodedAudio;
//   });

// function playHiHat() {
//   const playSound = context.createBufferSource();
//   playSound.buffer = hiHat;
//   playSound.connect(context.destination);
//   playSound.start(context.currentTime);
// }

//window.addEventListener('mousedown', playHiHat);
