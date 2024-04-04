import { renderingThumbnails } from './rendering-thumbnails';

const containerPictures = document.querySelector('.pictures');

let pictures = [];

const clearPublication = () => {
  containerPictures.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderPublication = (picturesData) => {
  clearPublication();
  pictures = picturesData;
  renderingThumbnails(pictures);
};

export {renderPublication};
