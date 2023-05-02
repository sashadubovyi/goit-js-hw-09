const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.body;

let interval = null;
let isActive = false;

start.addEventListener('click', startChangeColor);
stop.addEventListener('click', stopChangeColor);

function startChangeColor() {
  if (isActive) return;
  isActive = true;
  interval = setInterval(changeBackground, 1000);
}

function stopChangeColor() {
  if (!isActive) return;
  isActive = false;
  clearInterval(interval);
}

function changeBackground() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
