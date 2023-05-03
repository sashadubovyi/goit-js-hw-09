const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.body;

let interval = null;
start.disabled = false;
stop.disabled = true;

start.addEventListener('click', startChangeColor);
stop.addEventListener('click', stopChangeColor);

function startChangeColor() {
  if (start.disabled) return;
  start.disabled = true;
  stop.disabled = false;
  interval = setInterval(changeBackground, 1000);
}

function stopChangeColor() {
  if (!start.disabled) return;
  start.disabled = false;
  stop.disabled = true;
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
