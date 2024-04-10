import { renderThumbnail } from './render-thumbnail.js';
import { onOpenBigPictureClick } from './modal-picture.js';
import { onUploadModalChange, closePhotoEditor, onSetUserFormSubmit } from './image-upload-form.js';
import { getData } from './api.js';
import { showErrorMessage } from './messages.js';
import { onUploadImageChange } from './upload-image.js';
import { configFilter } from './filters.js';


getData().then((photos) => {
  renderThumbnail(photos);
  configFilter(photos);
}).catch((error) => {
  showErrorMessage(error.message);
});

onSetUserFormSubmit(closePhotoEditor);
onOpenBigPictureClick();
onUploadModalChange();
onUploadImageChange();
