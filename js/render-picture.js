import {isEscapeKey} from './utils.js';
import {photosList} from './rendering-thumbnails.js';
import {clearComments, renderComments} from './render-comments.js';

const body = document.querySelector('body');
const pictureContainer = document.querySelector('.pictures');
const modalBigPicture = document.querySelector('.big-picture');
const bigPictureImg = modalBigPicture.querySelector('.big-picture__img img');
const pictureLikes = modalBigPicture.querySelector('.likes-count');
const socialCaption = modalBigPicture.querySelector('.social__caption');
const bigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPictureClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const openBigPicture = (pictureId) => {
  const currentPhoto = photosList.find((photo) => photo.id === Number(pictureId));

  bigPictureImg.src = currentPhoto.url;
  pictureLikes.textContent = currentPhoto.likes;
  socialCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  modalBigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', closeBigPictureClick);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const openModalBigPicture = () => {
  pictureContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      evt.preventDefault();
      openBigPicture(currentPicture.dataset.pictureId);
    }
  });
};

function closeBigPicture () {
  modalBigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeBigPictureClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  clearComments();
}

export {openModalBigPicture, closeBigPicture};
