const uploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const inputEffectLevel = uploadForm.querySelector('.effect-level__value');
const imgUploadEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectsList = uploadForm.querySelector('.effects__list');

let effectName;

const optionsEffects = {
  'chrome': [0, 1, 0.1, ''],
  'sepia': [0, 1, 0.1, ''],
  'marvin': [0, 100, 1, '%'],
  'phobos': [0, 3, 0.1, 'px'],
  'heat': [0, 3, 0.1, ''],
};

noUiSlider.create(effectLevelSlider, {
  start: 1,
  step: 0.1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const getChangingEffects = (effect, value) => {
  const options = optionsEffects[effect];
  switch(effect) {
    case 'none':
      imgUploadPreview.style.filter = 'none';
      break;
    case 'chrome':
      imgUploadPreview.style.filter = `grayscale(${value}${options[3]})`;
      break;
    case 'sepia':
      imgUploadPreview.style.filter = `sepia(${value}${options[3]})`;
      break;
    case 'marvin':
      imgUploadPreview.style.filter = `invert(${value}${options[3]})`;
      break;
    case 'phobos':
      imgUploadPreview.style.filter = `blur(${value}${options[3]})`;
      break;
    case 'heat':
      imgUploadPreview.style.filter = `brightness(${value}${options[3]})`;
      break;
  }
};

const updateEffectOptions = (effect) => {
  const options = optionsEffects[effect];
  effectLevelSlider.noUiSlider.updateOptions({
    start: options[1],
    step: options[2],
    range: {
      min: options[0],
      max: options[1]
    }
  });
  inputEffectLevel.value = options[1];
  getChangingEffects(effect, options[1]);
};

const applyOriginalEffect = () => {
  imgUploadEffectLevel.classList.add('visually-hidden');
  inputEffectLevel.value = '';
  getChangingEffects('none', 0);
};

const onSliderChange = () => {
  inputEffectLevel.value = effectLevelSlider.noUiSlider.get();
  getChangingEffects(effectName, inputEffectLevel.value);
};

const onRadioClick = (evt) => {
  if(evt.target.value){
    effectName = evt.target.value;
    if (effectName !== 'none') {
      imgUploadEffectLevel.classList.remove('visually-hidden');
      updateEffectOptions(effectName);
    } else {
      applyOriginalEffect();
    }
  }
};

const addEffects = () => {
  applyOriginalEffect();
  effectsList.addEventListener('click', onRadioClick);
  effectLevelSlider.noUiSlider.on('slide', onSliderChange);
};

const removeEffects = () => {
  effectsList.removeEventListener('click', onRadioClick);
  effectLevelSlider.noUiSlider.off();
};

export {addEffects, removeEffects};
