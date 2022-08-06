const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');


btnStart.style.width = '150px';
btnStart.style.height = '50px';
btnStart.style.fontSize = '20px';
btnStart.style.position = 'absolute';
btnStart.style.left = '10vw';

btnStop.style.width = '150px';
btnStop.style.height = '50px';
btnStop.style.fontSize = '20px';
btnStop.style.position = 'absolute';
btnStop.style.left = '25vw';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let bgChange = null;

const colorChanger = () => {
  return (body.style.backgroundColor = `${getRandomHexColor()}`);
};

const colorStop = () => {
  clearInterval(bgChange);
  btnStart.disabled = false;
};

btnStart.addEventListener('click', () => {
  bgChange = setInterval(colorChanger, 1000);
  btnStart.disabled = true;
});

btnStop.addEventListener('click', colorStop);