//! Завдання 2 - таймер зворотного відліку
// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
//! Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
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
    const selectedDate = new Date(selectedDates[0]);
    if (selectedDate <= new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};
const datePicker = flatpickr(date, options);
startBtn.addEventListener('click', () => {
  startTimer(datePicker.selectedDates[0]);
});
// console.log(datePicker.selectedDates[0]);
function startTimer(endDate) {
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = endDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      updateTimeFields(0);
      Notiflix.Notify.success('Countdown finished');
    } else {
      updateTimeFields(timeRemaining);
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function updateTimeFields(timeRemaining) {
  const { days, hours, minutes, seconds } = convertMs(timeRemaining);
  daysEl.textContent = `${addLeadingZero(days)}`;
  hoursEl.textContent = `${addLeadingZero(hours)}`;
  minutesEl.textContent = `${addLeadingZero(minutes)}`;
  secondsEl.textContent = `${addLeadingZero(seconds)}`;
}
