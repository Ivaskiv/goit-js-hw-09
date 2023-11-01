//! Завдання 2 - таймер зворотного відліку
// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
//! Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerFields = document.querySelector('.field .value');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    if (selectedDate <= new Date()) {
      Notiflix.Notify.warning('Будь ласка, оберіть дату в майбутньому:)');
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};
const datePicker = flatpickr(dateTimePicker, options);
startBtn.addEventListener('click', () => {
  startTimer(datePicker.selectedDates[0]);
});
console.log(datePicker);
function startTimer(endDate) {
  if (endDate <= new Date()) {
    Notiflix.Notify.warning('Невірна кінцева дата!');
    return;
  }
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = endDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      updateTimeFields(0);
      Notiflix.Notify.success('Countdown finished');
    } else {
      updateTimeFields(timeDifference);
    }
  }, 1000);
}

function updateTimeFields(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  timerFields.textContent = `${addLeadingZero(days)}:${addLeadingZero(
    hours
  )}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor(((ms % day) % hour) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
console.log(flatpickr(dateTimePicker, options));
//--------------I-------------------------------------------
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const dateTimePicker = document.getElementById('datetime-picker');
// const startBtn = document.querySelector('[data-start]');
// const timerFields = document.querySelector('.field .value');
// const options = {
//   enableTime: true, //дозволяє вибирати як дату, так і час.
//   time_24hr: true, //вказує формат, у якому відображатиметься дата та час
//   defaultDate: new Date(), //встановлює початкову дату і час як поточну дату та час.
//   minuteIncrement: 1, //означає, що можна вибирати хвилини з кроком 1 хвилина. Ця опція корисна, коли вам потрібно обмежити вибір часу з певним інтервалом.
//   onClose(selectedDates) {
//     //перевірити, чи обрана дата в майбутньому?
//     const selectedDate = new Date(selectedDates[0]);
//     if (selectedDate <= new Date()) {
//       Notiflix.Notify.warning('Будь ласка, оберіть дату в майбутньому:)');
//       startBtn.setAttribute('disabled', true);
//     } else {
//       startBtn.removeAttribute('disabled');
//     }
//     console.log(selectedDates[0]); //якщо користувач вибрав дату та час, то функція onClose виведе вибрану дату та час у форматі JavaScript Date об'єкта, і це буде показано у консолі.
//   },
// };
// const datePicker = flatpickr(dateTimePicker, options);
// startBtn.addEventListener('click', () => {
//   startTimer(datePicker.selectedDates[0]);
// });
// function startTimer(endDate) {
//   if (endDate <= newDate()) {
//     Notiflix.Notify.warning('Невірна кінцева дата!');
//   }
//   // Оновлення інтерфейсу таймера кожну секунду
//   const timerInterval = setInterval(() => {
//     const currentTime = new Date();
//     const timeDifference = endDate - currentTime;

//     if (timeDifference <= 0) {
//       clearInterval(timerInterval);
//       updateTimeFields(0);
//       Notiflix.Notify.success('Countdown finished');
//     } else {
//       updateTimeFields(timeDifference);
//     }
//   }, 1000);
// }
// function updateTimeFields(timeDifference) {
//   const { days, hours, minutes, seconds } = convertMs(timeDifference);
//   timerFields.textContent = `${addLeadingZero(days)}:${addLeadingZero(
//     hours
//   )}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }
// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }
//----------------------------------------------------------
// function addZero(value) {
//   return value.toString().padStart(2, '0');
// }
// const formatDays = addZero(days);
// const formatHours = addZero(hours);
// const formatMinutes = addZero(minutes);
// const formatSecond = addZero(seconds);
// console.log(flatpickr(dateTimePicker, options));

//! Бібліотека flatpickr
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.

// // Описаний в документації
// import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";

// Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.

// <input type="text" id="datetime-picker" />

// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість в документації «Options», і використовуй його у своєму коді.

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

//! Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
//! Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.
//! НЕ БУДЕМО УСКЛАДНЮВАТИ
// Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити сторінку.

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//! Форматування часу
// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

//! Бібліотека повідомлень
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.
