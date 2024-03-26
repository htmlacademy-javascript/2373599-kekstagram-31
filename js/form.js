import { isEscapeKey } from './utils';
import { error, isValidHashtags } from './checking-validity-hashtags';

const body = document.querySelector('body'); //задать класс modal-open, при закрытии формы редактирования удалить класс modal-open
const uploadForm = document.querySelector('.img-upload__form'); //Поле для загрузки нового изображения на сайт
const uploadInput = uploadForm.querySelector('.img-upload__input'); //Изначальное состояние поля для загрузки изображения
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //Форма редактирования изображения. Нужно удалать класс hidden, при закрытии формы редактирования возвращается класс hidden.
const uploadCancel = uploadForm.querySelector('.img-upload__cancel'); //Кнопка для закрытия формы редактирования изображения
const textHashtags = uploadForm.querySelector('.text__hashtags'); //Поле для ввода хештега
const userComment = uploadForm.querySelector('.text__description'); //Поле для ввода комментария

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
  const valid = pristine.validate();
  if (valid) {
    uploadForm.submit();
  }
});

export {initUploadModal};
