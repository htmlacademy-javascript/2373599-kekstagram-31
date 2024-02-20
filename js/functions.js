const checkLengthString = (string, maxLength) => string.length <= maxLength;

checkLengthString('JavaScript is interesting', 30);
checkLengthString('JavaScript is interesting', 25);
checkLengthString('JavaScript is interesting', 15);


//Рабочая функция
/*const isPalindrome = function(data) {
  data = data.toString().toUpperCase().replace(/\s|[,.!?"/-]/g, '');
  return data === data.split('').reverse().join('');
};

console.log(isPalindrome('Лёша на полке клопа нашёл '));*/


const isPalindrome = (data) => {
  let normalizeString = data.toString().toLowerCase().replace(/\s|[,.!?"/-]/g, '');
  normalizeString = normalizeString.split('').reverse().join('');
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


const findNumber = (string) => {
  const convertedString = string.toString().replace(/^\D+/g, '').replace(/[^0-9]/g, '');
  const result = parseInt(convertedString, 10);
  return result;
};

findNumber('2023 год');
findNumber('ECMAScript 2022');
findNumber('1 кефир, 0.5 батона');
findNumber('агент 007');
findNumber('а я томат');
