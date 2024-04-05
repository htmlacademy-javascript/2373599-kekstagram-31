import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const btnSubmit = uploadForm.querySelector('.img-upload__submit');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

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
body.appendChild(templateSuccess);
const messageOfSuccess = body.querySelector('.success');
messageOfSuccess.classList.add('hidden');
const successInner = messageOfSuccess.querySelector('.success__inner');
const successBtn = successInner.querySelector('.success__button');

body.appendChild(templateError);
const messageOfError = body.querySelector('.error');
messageOfError.classList.add('hidden');
const errorInner = messageOfError.querySelector('.error__inner');
const errorBtn = errorInner.querySelector('.error__button');

const closeSuccessfulByClick = function (evt) {
  if (messageOfSuccess === evt.target) {
    messageOfSuccess.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByClick = function (evt) {
  if (messageOfError === evt.target) {
    messageOfError.classList.add('hidden');
    removeErrorListeners();
  }
};

const closeSuccessfulByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    messageOfSuccess.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt)) {
    messageOfError.classList.add('hidden');
    removeErrorListeners();
  }
};

const bySuccessBtn = () => {
  messageOfSuccess.classList.add('hidden');
  removeSuccessListeners();
};

const byErrorBtn = () => {
  messageOfError.classList.add('hidden');
  removeErrorListeners();
};

const handleSuccessMessage = function () {
  document.addEventListener('click', closeSuccessfulByClick);
  document.addEventListener('keydown', closeSuccessfulByKeydown);
  successBtn.addEventListener('click', bySuccessBtn);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeSuccessfulByClick);
  document.removeEventListener('keydown', closeSuccessfulByKeydown);
  successBtn.removeEventListener('click', bySuccessBtn);
}

const handleErrorMessage = function () {
  document.addEventListener('click', closeErrorByClick);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorBtn.addEventListener('click', byErrorBtn);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeErrorByClick);
  document.removeEventListener('keydown', closeErrorByKeydown);
  errorBtn.removeEventListener('click', byErrorBtn);
}

export {
  showErrorMessage,
  disabledBtn,
  enableBtn,
  submitBtnText,
  handleSuccessMessage,
  handleErrorMessage,
  messageOfSuccess,
  messageOfError
};

