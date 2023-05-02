import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

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
      alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
    }
  },
};

let timerId = null;
startBtn.disabled = true;

flatpickr('input#datetime-picker', options);

function changeTimerValue(selectedTime) {
  const timer = {
    start() {
      startBtn.disabled = true;
      input.disabled = true;

      const startTime = selectedTime;
      timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;

        console.log(deltaTime);

        if (deltaTime <= 0) {
          clearInterval(timerId);
        }
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

  // Remaining days
  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
  // Remaining hours
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
}
