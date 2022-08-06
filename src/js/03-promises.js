import Notiflix, {Notify} from 'notiflix';
Notiflix.Notify.init({
  useIcon: false,
})

const createBtn = document.querySelector('button');
const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
  return promise;
};

const sumTime = (sum, arg1, arg2, counter) => {
  return (sum = arg1 + arg2 * (counter - 1));
};

createBtn.addEventListener('click', event => {
  event.preventDefault();

  const delayInput = Number(form.elements.delay.value);
  const delayStepsInput = Number(form.elements.step.value);
  const amountInput = form.elements.amount.value;

  for (let i = 1; i <= amountInput; i++){
    let newTime = 0;
    const actualTime = sumTime(newTime, delayInput, delayStepsInput, i);
    createPromise(i, actualTime)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`)
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`)
      })
  }
});