import { MAX_NUMBER_HASHTAGS, MAX_NUMBER_SYMBOLS } from './const';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const userComment = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

let errorMessage = ''; //изменяимая переменная для записи в неё сообщения об ошибке

const error = () => errorMessage; //функция, которая будет возвращать сообщение об ошибках

const isValidHashtags = (value) => {
  errorMessage = '';

  const hashtagsText = value.toLowerCase().trim();

  if (hashtagsText.length === 0) {
    return true;
  }

  const hashtagArray = hashtagsText.split(/\s+/);

  const rules = [
    {
      check: hashtagArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа \'#\' (решётка)!'
    },
    {
      check: hashtagArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной \'#\' решётки!'
    },
    {
      check: hashtagArray.some((item) => item.length > MAX_NUMBER_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_NUMBER_SYMBOLS} символов, включая решётку!`
    },
    {
      check: hashtagArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги должны разделяться пробелами!'
    },
    {
      check: hashtagArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться!'
    },
    {
      check: hashtagArray.length > MAX_NUMBER_HASHTAGS,
      error: `Нельзя указывать больше ${MAX_NUMBER_HASHTAGS} хэштегов!`
    },
    {
      check: hashtagArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы!'
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(textHashtags, isValidHashtags, error);

const validationOfComment = (value) => value.length <= 140;

pristine.addValidator(userComment, validationOfComment, 'Длина комментария не должна превышать 140 символов!');

export {pristine};
