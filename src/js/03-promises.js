import Notiflix from 'notiflix';
const { Notify } = require('notiflix');

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  // const formELement = event.target;
  // const delay = parseInt(formELement.elements.delay.value);
  // const step = parseInt(formELement.elements.step.value);
  // const amount = parseInt(formELement.elements.amount.value);
  // if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
  //   alert('Please enter valid numbers');
  //   return;
  // }
  // console.log({ delay, step, amount });
  const { delay, step, amount } = event.target.elements;
  const [parsedDelay, parsedStep, parsedAmount] = [delay, step, amount].map(
    input => parseInt(input.value)
  );
  // if ([parsedDelay, parsedStep, parsedAmount].some(isNaN)) {
  //   Notiflix.Notify.warning('Please enter valid numbers');
  //   return;
  // }
  let currentDelay = parsedDelay;
  for (let i = 1; i <= parsedAmount; i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.success(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    currentDelay += parsedStep;
  }
});

function createPromise(position, delay) {
  const obj = { position, delay };
  //генератор випадкового true або false (fulfill/reject)
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // shouldResolve ? resolve(obj) : reject(obj);
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}
//! ТЕОРІЯ
//https://css.in.ua/js/object/Array/method/some
//https://w3schoolsua.github.io/js/js_promise_en.html#gsc.tab=0
