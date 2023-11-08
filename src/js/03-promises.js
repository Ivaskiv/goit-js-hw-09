const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepdelayInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
console.log(delayInput);
console.log(stepdelayInput);
function createPromise(position, delay) {
  //генератор випадкового true або false (fulfill/reject)
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}
