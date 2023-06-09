import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      selectTime = selectedDates[0];
    }
  },
};
let selectTime;
let timerId = null;
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  changeTimerValue(selectTime);
});

flatpickr('input#datetime-picker', options);

function changeTimerValue(selectedTime) {
  const timer = {
    start() {
      startBtn.disabled = true;
      inputEl.disabled = true;
      const startTime = selectedTime.getTime();
      timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        if (deltaTime <= 0) {
          return clearInterval(timerId);
        }

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;

        console.log(deltaTime);
      }, 1000);
    },
  };

  timer.start();
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
