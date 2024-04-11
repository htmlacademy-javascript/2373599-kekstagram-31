import { isEscapeKey } from './utils.js';
import { pristine } from './validity-upload-form.js';
import { addEffects, removeEffects } from './effect-slider.js';
import { addScalesListeners, removeScalesListeners, resetScale } from './scale.js';
import { sendData } from './api.js';
import { submitButtonText, getDisableButton, getEnableButton, successMessageClickHandler, errorMessageClickHandler } from './messages.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const userComment = uploadForm.querySelector('.text__description');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== textHashtags && document.activeElement !== userComment) {
    evt.preventDefault();
    uploadForm.reset();
    closePhotoEditor();
  }
};

const onUploadModalChange = () => {
  uploadInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    uploadCancel.addEventListener('click', closePhotoEditor);
    document.addEventListener('keydown', onDocumentKeydown);
    addScalesListeners();
    addEffects();
  });
};

function closePhotoEditor () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closePhotoEditor);
  document.removeEventListener('keydown', onDocumentKeydown);
  removeEffects();
  pristine.reset();
  uploadForm.reset();
  resetScale();

  if (closePhotoEditor) {
    imgUploadPreview.style.transform = 'none';
    removeScalesListeners();
  } else if (onUploadModalChange()) {
    addScalesListeners();
  }
}
//Добавляем слушатель на форму, при неправильно введённых значениях в форму, отправить невозможно

const onSetUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      getDisableButton(submitButtonText.SENDING);
      textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          successMessageClickHandler();
          pristine.reset();
          closePhotoEditor();
        })
        .catch(() => {
          errorMessageClickHandler();
        })
        .finally(() => {
          getEnableButton(submitButtonText.IDLE);
        });
    }
  });
};

export {onUploadModalChange, onSetUserFormSubmit, closePhotoEditor, onDocumentKeydown};
