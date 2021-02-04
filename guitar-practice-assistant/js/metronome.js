'use strict';

const controls = document.querySelector('.controls');
const bpmNumberInput = document.querySelector('#bpm-number-input');
const bpmNumberDisplay = document.querySelector('.bpm-number-display');

let bpm = 120;

//Handle bpm changes
function handleBpm() {
  if (bpm >= 40 && bpm <= 218) {
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
