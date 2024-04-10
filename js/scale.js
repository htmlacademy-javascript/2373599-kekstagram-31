const uploadForm = document.querySelector('.img-upload__form');
const btnScaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const btnScaleBigger = uploadForm.querySelector('.scale__control--bigger');
const inputScale = uploadForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');

const SCALE_STEP = 0.25;
let scale = 1;

const resetScale = () => {
  scale = 1;
};

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    inputScale.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    inputScale.value = `${scale * 100}%`;
  }
};

const addScalesListeners = () => {
  btnScaleSmaller.addEventListener('click', onSmallerClick);
  btnScaleBigger.addEventListener('click', onBiggerClick);
};

const removeScalesListeners = () => {
  btnScaleSmaller.removeEventListener('click', onSmallerClick);
  btnScaleBigger.removeEventListener('click', onBiggerClick);
};

export {addScalesListeners, removeScalesListeners, resetScale};
