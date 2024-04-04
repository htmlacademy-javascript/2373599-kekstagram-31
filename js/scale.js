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

const clickToSmaller = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    inputScale.value = `${scale * 100}%`;
  }
};

const clickToBigger = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${scale})`;
    inputScale.value = `${scale * 100}%`;
  }
};

function addScalesListeners () {
  btnScaleSmaller.addEventListener('click', clickToSmaller);
  btnScaleBigger.addEventListener('click', clickToBigger);
}

function removeScalesListeners () {
  btnScaleSmaller.removeEventListener('click', clickToSmaller);
  btnScaleBigger.removeEventListener('click', clickToBigger);
}

export {addScalesListeners, removeScalesListeners, resetScale};
