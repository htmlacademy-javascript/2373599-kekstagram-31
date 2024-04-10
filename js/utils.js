//Проверка нажатой клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция устранения дребизга
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, debounce};
