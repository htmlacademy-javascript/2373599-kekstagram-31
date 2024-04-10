import { isEscapeKey } from './utils.js';
import { onDocumentKeydown } from './image-upload-form.js';

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
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const disableButton = (text) => {
  btnSubmit.disabled = true;
  btnSubmit.textContent = text;
};

const enableButton = (text) => {
  btnSubmit.disabled = false;
  btnSubmit.textContent = text;
};

//Сообщения при отправке формы(успех/ошибка)

const onOutsideModalSuccessClick = (clickEvt) => {
  const successMessage = body.querySelector('.success');
  const successInner = successMessage.querySelector('.success__inner');
  const withinBoundariesSuccess = clickEvt.composedPath().includes(successInner);
  if (!withinBoundariesSuccess) {
    removeSuccessListeners();
  }
};

const onOutsideModalErrorClick = (clickEvt) => {
  const errorMessage = body.querySelector('.error');
  const errorInner = errorMessage.querySelector('.error__inner');
  const withinBoundariesError = clickEvt.composedPath().includes(errorInner);
  if (!withinBoundariesError) {
    removeErrorListeners();
  }
};

const onSuccessfulByKeydown = (keydownEvt) => {
  if (isEscapeKey(keydownEvt)) {
    removeSuccessListeners();
  }
};

const onErrorByKeydown = (keydownEvt) => {
  if (isEscapeKey(keydownEvt)) {
    keydownEvt.preventDefault();
    removeErrorListeners();
  }
};

const onSuccessButtonClick = () => {
  removeSuccessListeners();
};

const onErrorButtonClick = () => {
  removeErrorListeners();
};

const successMessageClickHandler = () => {
  body.appendChild(successTemplate);
  const successButton = body.querySelector('.success__button');
  document.addEventListener('click', onOutsideModalSuccessClick);
  document.addEventListener('keydown', onSuccessfulByKeydown);
  successButton.addEventListener('click', onSuccessButtonClick);
};

function removeSuccessListeners () {
  document.removeEventListener('click', onOutsideModalSuccessClick);
  document.removeEventListener('keydown', onSuccessfulByKeydown);
  const successMessage = body.querySelector('.success');
  successMessage.parentNode.removeChild(successMessage);
}

const errorMessageClickHandler = () => {
  body.appendChild(errorTemplate);
  const errorButton = body.querySelector('.error__button');
  document.addEventListener('click', onOutsideModalErrorClick);
  document.addEventListener('keydown', onErrorByKeydown);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function removeErrorListeners () {
  document.removeEventListener('click', onOutsideModalErrorClick);
  document.removeEventListener('keydown', onErrorByKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
  const errorMessage = body.querySelector('.error');
  errorMessage.parentNode.removeChild(errorMessage);
}

export {
  showErrorMessage,
  disableButton,
  enableButton,
  submitButtonText,
  successMessageClickHandler,
  errorMessageClickHandler
};

