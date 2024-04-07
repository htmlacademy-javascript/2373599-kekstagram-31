import { isEscapeKey } from './utils.js';
import { pristine } from './checking-validity-hashtags.js';
import { getChangingEffects } from './effect-slider.js';
import { addScalesListeners, removeScalesListeners, resetScale } from './scale.js';
import { sendData } from './api.js';
import { submitBtnText, disabledBtn, enableBtn, handleSuccessMessage, handleErrorMessage } from './messages.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imgUploadEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const userComment = uploadForm.querySelector('.text__description');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const imgUploadEffects = uploadForm.querySelector('.img-upload__effects');
const errorMessage = body.querySelector('.error__inner');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== textHashtags && document.activeElement !== userComment && !errorMessage) {
    evt.preventDefault();
    uploadForm.reset();
    closePhotoEditor();
  }
};

function initUploadModal () {
  uploadInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    uploadCancel.addEventListener('click', closePhotoEditor);
    document.addEventListener('keydown', onDocumentKeydown);
    addScalesListeners();
    pristine.validate();
  });
}

function closePhotoEditor () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closePhotoEditor);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
  imgUploadPreview.style.filter = 'none';
  imgUploadEffectLevel.classList.add('hidden');
  pristine.reset();
  uploadForm.reset();
  resetScale();

  if (closePhotoEditor) {
    imgUploadPreview.style.transform = 'none';
    removeScalesListeners();
  } else if (initUploadModal()) {
    addScalesListeners();
  }
}
//Добавляем слушатель на форму, при неправильно введённых значениях в форму, отправить невозможно

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      disabledBtn(submitBtnText.SENDING);
      textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          handleSuccessMessage();
          closePhotoEditor();
        })
        .catch(() => {
          handleErrorMessage();
        })
        .finally(() => {
          enableBtn(submitBtnText.IDLE);
        });
    }
  });
};

imgUploadEffects.addEventListener('change', getChangingEffects);

export {initUploadModal, setUserFormSubmit, closePhotoEditor};
