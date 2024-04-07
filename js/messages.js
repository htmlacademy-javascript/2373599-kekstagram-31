import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const btnSubmit = uploadForm.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

//Сообщение при ошибке запроса на сервер
const ALERT_SHOW_TIME = 5000;

const errorLoadDataTemplate = document.querySelector('#data-error').content;

const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, ALERT_SHOW_TIME);
};

//Интерактивность кнопки "Опубликовать"
const submitBtnText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const disabledBtn = (text) => {
  btnSubmit.disabled = true;
  btnSubmit.textContent = text;
};

const enableBtn = (text) => {
  btnSubmit.disabled = false;
  btnSubmit.textContent = text;
};

//Сообщения при отправке формы(успех/ошибка)

const closeOutsideModalSuccess = function (clickEvt) {
  const successMessage = body.querySelector('.success');
  const successInner = successMessage.querySelector('.success__inner');
  const withinBoundariesSuccess = clickEvt.composedPath().includes(successInner);
  if (!withinBoundariesSuccess) {
    removeSuccessListeners();
  }
};

const closeOutsideModalError = function (clickEvt) {
  const errorMessage = body.querySelector('.error');
  const errorInner = errorMessage.querySelector('.error__inner');
  const withinBoundariesError = clickEvt.composedPath().includes(errorInner);
  if (!withinBoundariesError) {
    removeErrorListeners();
  }
};

const closeSuccessfulByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    keydownEvt.preventDefault();
    removeErrorListeners();
  }
};

const bySuccessButton = () => {
  removeSuccessListeners();
};

const byErrorButton = () => {
  removeErrorListeners();
};

const handleSuccessMessage = function () {
  body.appendChild(successTemplate);
  const successButton = body.querySelector('.success__button');
  document.addEventListener('click', closeOutsideModalSuccess);
  document.addEventListener('keydown', closeSuccessfulByKeydown);
  successButton.addEventListener('click', bySuccessButton);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeOutsideModalSuccess);
  document.removeEventListener('keydown', closeSuccessfulByKeydown);
  const successMessage = body.querySelector('.success');
  successMessage.parentNode.removeChild(successMessage);
}

const handleErrorMessage = function () {
  body.appendChild(errorTemplate);
  const errorButton = body.querySelector('.error__button');
  document.addEventListener('click', closeOutsideModalError);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorButton.addEventListener('click', byErrorButton);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeOutsideModalError);
  document.removeEventListener('keydown', closeErrorByKeydown);
  const errorMessage = body.querySelector('.error');
  errorMessage.parentNode.removeChild(errorMessage);
}

export {
  showErrorMessage,
  disabledBtn,
  enableBtn,
  submitBtnText,
  handleSuccessMessage,
  handleErrorMessage
};

