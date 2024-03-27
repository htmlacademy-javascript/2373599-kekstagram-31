const uploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview');
const inputEffectLevel = uploadForm.querySelector('.effect-level__value');
const imgUploadEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');

noUiSlider.create(effectLevelSlider, {
  start: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  inputEffectLevel.value = effectLevelSlider.noUiSlider.get();
});

imgUploadEffectLevel.classList.add('hidden');

const getChangingEffects = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }

  switch (effect) {
    case 'original':
      imgUploadPreview.style.filter = 'none';
      break;
    case 'chrome':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        start: 1,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        imgUploadPreview.style.filter = `grayscale(${inputEffectLevel.value})`;
      });
      break;
    case 'sepia':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        start: 1,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        imgUploadPreview.style.filter = `sepia(${inputEffectLevel.value})`;
      });
      break;
    case 'marvin':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 100,
        },
        start: 100,
        step: 1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        imgUploadPreview.style.filter = `invert(${inputEffectLevel.value}%)`;
      });
      break;
    case 'phobos':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 3,
        },
        start: 3,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        imgUploadPreview.style.filter = `blur(${inputEffectLevel.value}px)`;
      });
      break;
    case 'heat':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 1,
          'max': 3,
        },
        start: 3,
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.on('update', () => {
        imgUploadPreview.style.filter = `brightness(${inputEffectLevel.value})`;
      });
  }
};

export {getChangingEffects};
