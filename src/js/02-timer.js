//! Завдання 2 - таймер зворотного відліку
// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
//! Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  date: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
//------------
elements.startBtn.disabled = true;
//------------
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    const currentDate = new Date();
    console.log(selectedDate);
    //------------
    if (currentDate > selectedDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
    if (selectedDate > currentDate) {
      elements.startBtn.disabled = false;
      //------------
    }
  },
};

const datePicker = flatpickr(elements.date, options);
elements.startBtn.addEventListener('click', () => {
  startTimer(datePicker.selectedDates[0]);
});

function startTimer(endDate) {
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = endDate - currentTime;
    // коли timeRemaining стає менше або дорівнює нулю тобто таймер дійшов до кінцевої дати, таймер буде зупинено, і виведене повідомлення "Countdown finished"
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
  elements.daysEl.textContent = `${addLeadingZero(days)}`;
  elements.hoursEl.textContent = `${addLeadingZero(hours)}`;
  elements.minutesEl.textContent = `${addLeadingZero(minutes)}`;
  elements.secondsEl.textContent = `${addLeadingZero(seconds)}`;
}
