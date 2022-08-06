import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const value = Array.from(document.querySelectorAll('span.value'));
const labels = Array.from(document.querySelectorAll('.label'));
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const fields = Array.from(document.querySelectorAll('div.field'));
const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector(`button[data-start]`);

input.style.width = '250px';
input.style.fontSize = '20px';
input.style.padding = '5px';
startBtn.style.fontSize = '20px';
startBtn.style.padding = '5px';

timer.style.display = 'flex';
timer.style.marginTop = '20px';

for (const field of fields) {
  field.style.marginRight = '20px';
}
for (const values of value) {
  values.style.display = 'block';
  values.style.textAlign = 'center';
  values.style.fontSize = '55px';
  values.style.lineHeight = '1.5';
}
for (const label of labels) {
  label.style.display = 'block';
  label.style.textAlign = 'center';
  label.style.fontSize = '20px';
  label.style.textTransform = 'uppercase';
  label.style.lineHeight = '0.2';
}

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '500px',
      });
    }
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      startBtn.disabled = false;
      localStorage.setItem('selectedDate', `${selectedDates[0].getTime()}`);
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  if (`${num}`.length === 1) {
    return (num = `${num}`.padStart(2, '0'));
  } else {
    return `${num}`;
  }
}

startBtn.addEventListener('click', () => {
  const intFunction = () => {
    const selectDate = localStorage.getItem('selectedDate');
    const dateToday = new Date();
    const getDatet = dateToday.getTime();
    const ms = selectDate - getDatet;
    const objDate = convertMs(ms);
    if (ms < 1000) {
      clearInterval(timerId);
    }
    const getSpan = () => {
      dataDays.textContent = `${addLeadingZero(objDate.days)}`;
      dataHours.textContent = `${addLeadingZero(objDate.hours)}`;
      dataMinutes.textContent = `${addLeadingZero(objDate.minutes)}`;
      dataSeconds.textContent = `${addLeadingZero(objDate.seconds)}`;
    };
    getSpan();
  };
  const timerId = setInterval(intFunction, 1000);
});