import {isEscapeKey} from './utils.js';
import { photos } from './rendering-thumbnails.js';

const body = document.querySelector('body');
const pictureContainer = document.querySelector('.pictures');
const modalBigPicture = document.querySelector('.big-picture');
const bigPictureImg = modalBigPicture.querySelector('.big-picture__img img');
const pictureLikes = modalBigPicture.querySelector('.likes-count');
const socialComments = modalBigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const socialCommentCount = modalBigPicture.querySelector('.social__comment-count');
const commentsLoader = modalBigPicture.querySelector('.comments-loader');
const socialCaption = modalBigPicture.querySelector('.social__caption');
const bigPictureCancel = modalBigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPictureClick = () => {
  closeBigPicture();
};

const openBigPicture = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = currentPhoto.url;
  pictureLikes.textContent = currentPhoto.likes;
  socialComments.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialCommentsAll = socialComment.cloneNode(true);

    socialCommentsAll.querySelector('.social__picture').src = comment.avatar;
    socialCommentsAll.querySelector('.social__picture').alt = comment.name;
    socialCommentsAll.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentsAll);
  });

  socialComments.appendChild(socialCommentsFragment);
  socialCaption.textContent = currentPhoto.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

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
}

export {openModalBigPicture};
