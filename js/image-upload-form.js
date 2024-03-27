import { isEscapeKey } from './utils';
import { error, isValidHashtags } from './checking-validity-hashtags';
import { getChangingEffects } from './effect-slider';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const userComment = uploadForm.querySelector('.text__description');
const btnScaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const btnScaleBigger = uploadForm.querySelector('.scale__control--bigger');
const inputScale = uploadForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const imgUploadEffects = uploadForm.querySelector('.img-upload__effects');

const SCALE_STEP = 0.25;
let scale = 1;

const clickToSmaller = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    inputScale.value = `${scale * 100}%`;
  }
};

const clickToBigger = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    inputScale.value = `${scale * 100}%`;
  }
};

const closeUploadWindow = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === textHashtags || document.activeElement === userComment) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

const initUploadModal = () => {
  uploadInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    uploadCancel.addEventListener('click', closeUploadWindow);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

function closePhotoEditor () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closeUploadWindow);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
}

//Валидация хештегов

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

pristine.addValidator(textHashtags, isValidHashtags, error);

//Валидация комментариев

const validationOfComment = (value) => value.length <= 140;

pristine.addValidator(userComment, validationOfComment, 'Длина комментария не должна превышать 140 символов!');

//Добавляем слушатель на форму, при неправильно введённых значениях в форму, отправить невозможно

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
});

btnScaleSmaller.addEventListener('click', clickToSmaller);

btnScaleBigger.addEventListener('click', clickToBigger);

imgUploadEffects.addEventListener('change', getChangingEffects);

export {initUploadModal};
