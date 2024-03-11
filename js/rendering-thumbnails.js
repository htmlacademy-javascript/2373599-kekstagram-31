import {posts} from './create-description-photo';

const template = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');

const photos = posts();

const photosFragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const photoThumbnails = template.cloneNode(true);

  const image = photoThumbnails.querySelector('.picture__img');
  image.src = url;
  image.alt = description;

  photoThumbnails.querySelector('.picture__likes').textContent = likes;
  photoThumbnails.querySelector('.picture__comments').textContent = comments.length;

  photosFragment.appendChild(photoThumbnails);
});

containerPictures.appendChild(photosFragment);

