// Функция для проверки длины строки.
const checkLengthString = (string, maxLength) => string.length <= maxLength;

checkLengthString('JavaScript is interesting', 30);
checkLengthString('JavaScript is interesting', 25);
checkLengthString('JavaScript is interesting', 15);


//Рабочая функция
/*const isPalindrome = function(string) {
  string = string.toString().toUpperCase().replace(/\s|[,.!?"/-]/g, '');
  return string === string.split('').reverse().join('');
};

console.log(isPalindrome('Лёша на полке клопа нашёл '));*/

// Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string) => {
  const normalizeString = string.toString().toLowerCase().replace(/\s|[,.!?"/-]/g, '');
  normalizeString.split('').reverse().join('');
  let newString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString[i];
  }
  return normalizeString === newString;
};

isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome(12321);
isPalindrome('12 321 ');
isPalindrome('Лёша на своей полке клопа нашёл ');

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа
const findNumber = (string) => {
  const result = parseInt(string.toString().replace(/^\D+/g, ''), 10);
  return result;
};

findNumber('2023 год');
findNumber('ECMAScript 2022');
findNumber('1 кефир, 0.5 батона');
findNumber('агент 007');
findNumber('а я томат');

// функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и
// возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
const convertToMinute = (timeInHour) => {
  const timeParts = timeInHour.split(':');

  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

const workingDayTime = (startWorkingDay, finishWorkingDay, startMeet, durationMeeting) => {
  const startWorkMinutes = convertToMinute(startWorkingDay);
  const finishWorkMinutes = convertToMinute(finishWorkingDay);
  const startMeetMinutes = convertToMinute(startMeet);

  if (startMeetMinutes + durationMeeting > finishWorkMinutes || startMeetMinutes < startWorkMinutes) {
    return false;
  }
  return true;
};

workingDayTime('08:00', '17:30', '14:00', 90); // true
workingDayTime('8:0', '10:0', '8:0', 120); // true
workingDayTime('08:00', '14:30', '14:00', 90); // false
workingDayTime('14:00', '17:30', '08:0', 90); // false
workingDayTime('8:00', '17:30', '08:00', 900); // false
