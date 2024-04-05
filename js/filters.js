import { debounce } from './utils.js';
import { renderPublication } from './render-publications.js';
import { MAX_PICTURE_COUNT, FILTERS, SORTFUNCTION } from './const.js';

const debounceRender = debounce(renderPublication);

const imgFilters = document.querySelector('.img-filters'); //блок с фильтрами

const ACTIVE_BUTTON = 'img-filters__button--active'; //класс активной кнопки

let activeFilter = FILTERS.default;
let pictures = [];

const useFilter = () => {
  let filteringPictures = [];

  switch(activeFilter) {
    case FILTERS.default:
      filteringPictures = pictures;
      break;
    case FILTERS.random:
      filteringPictures = pictures.toSorted(SORTFUNCTION.random).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTERS.discussed:
      filteringPictures = pictures.toSorted(SORTFUNCTION.discussed);
      break;
  }

  debounceRender(filteringPictures);
};

const getChangingFilter = (evt) => {
  const targetButton = evt.target;
  const currentButton = document.querySelector(`.${ACTIVE_BUTTON}`);

  if (!targetButton.matches('button')) {
    return;
  }

  if (currentButton === targetButton) {
    return;
  }

  currentButton.classList.toggle(ACTIVE_BUTTON);
  targetButton.classList.toggle(ACTIVE_BUTTON);
  activeFilter = targetButton.getAttribute('id');

  useFilter();
};

function configFilter (picturesData) {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', getChangingFilter);
  pictures = picturesData;
}

export {configFilter};
