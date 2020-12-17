'use strict';

/*? VARIABLES */
const drumsAllEl = document.querySelectorAll('.drums');

/*? FUNCTIONS */
function removeDrums() {
  setTimeout(function () {
    for (let i = 0; i < drumsAllEl.length; i++) {
      if (drumsAllEl[i].classList.contains('play-drums')) {
        drumsAllEl[i].classList.remove('play-drums');
      }
    }
  }, 100);
}

function addDrums() {
  for (let i = 0; i < drumsAllEl.length; i++) {
    if (!drumsAllEl[i].classList.contains('play-drums')) {
      drumsAllEl[i].classList.add('play-drums');
    }
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'a') {
    document.getElementById('clap-sound').currentTime = 0;
    document.getElementById('clap-sound').play();
    document.getElementById('clap').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 's') {
    document.getElementById('hi-hat-sound').currentTime = 0;
    document.getElementById('hi-hat-sound').play();
    document.getElementById('hi-hat').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 'd') {
    document.getElementById('kick-sound').currentTime = 0;
    document.getElementById('kick-sound').play();
    document.getElementById('bass').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 'f') {
    document.getElementById('open-hat-sound').currentTime = 0;
    document.getElementById('open-hat-sound').play();
    document.getElementById('open-hat').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 'g') {
    document.getElementById('boom-sound').currentTime = 0;
    document.getElementById('boom-sound').play();
    document.getElementById('boom').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 'h') {
    document.getElementById('ride-sound').currentTime = 0;
    document.getElementById('ride-sound').play();
    document.getElementById('ride').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 'j') {
    document.getElementById('snare-sound').currentTime = 0;
    document.getElementById('snare-sound').play();
    document.getElementById('snare').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 'k') {
    document.getElementById('tom-sound').currentTime = 0;
    document.getElementById('tom-sound').play();
    document.getElementById('tom').classList.add('play-drums');
    removeDrums();
  } else if (e.key === 'l') {
    document.getElementById('tink-sound').currentTime = 0;
    document.getElementById('tink-sound').play();
    document.getElementById('tink').classList.add('play-drums');
    removeDrums();
  }
});
