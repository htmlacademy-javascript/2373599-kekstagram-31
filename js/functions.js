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


const findNumber = (string) => {
  const result = parseInt(string.toString().replace(/^\D+/g, ''), 10);
  return result;
};

findNumber('2023 год');
findNumber('ECMAScript 2022');
findNumber('1 кефир, 0.5 батона');
findNumber('агент 007');
findNumber('а я томат');
