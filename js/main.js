import { renderingThumbnails } from './rendering-thumbnails.js';
import { openModalBigPicture } from './render-picture.js';
import { initUploadModal } from './image-upload-form.js';
import { closePhotoEditor } from './image-upload-form.js';
import { setUserFormSubmit } from './image-upload-form.js';
import { getData } from './api.js';
import { showErrorMessage } from './messages.js';

getData().then((photos) => {
  renderingThumbnails(photos);
}).catch((error) => {
  showErrorMessage(error.message);
});

setUserFormSubmit(closePhotoEditor);
openModalBigPicture();
initUploadModal();
