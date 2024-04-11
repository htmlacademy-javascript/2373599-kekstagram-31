import { visualizeThumbnails } from './render-thumbnail';

const containerPictures = document.querySelector('.pictures');

let pictures = [];

const clearPublication = () => {
  containerPictures.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderPublication = (picturesData) => {
  clearPublication();
  pictures = picturesData;
  visualizeThumbnails(pictures);
};

export {renderPublication};
