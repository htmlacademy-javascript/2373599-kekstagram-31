import {renderingThumbnails} from './rendering-thumbnails.js';
import {openModalBigPicture} from './render-picture.js';
import {initUploadModal} from './image-upload-form.js';
//import { getData } from './api.js';

//getData().then((photos) => {
//  renderingThumbnails(photos);
//});

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderingThumbnails(photos);
  });


renderingThumbnails();
openModalBigPicture();
initUploadModal();
