import { debounce } from './utils.js';
import { renderPublication } from './render-publications.js';

const MAX_PICTURE_COUNT = 10;

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const SORTFUNCTION = {
  getRandomNumber: () => 0.5 - Math.random(),
  compareDiscussed: (a, b) => b.comments.length - a.comments.length
};

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
      filteringPictures = pictures.toSorted(SORTFUNCTION.getRandomNumber).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTERS.discussed:
      filteringPictures = pictures.toSorted(SORTFUNCTION.compareDiscussed);
      break;
  }

  debounceRender(filteringPictures);
};

const onFilterClick = (evt) => {
  const targetButton = evt.target;
  const currentButton = document.querySelector(`.${ACTIVE_BUTTON}`);

  if (!targetButton.matches('button') || currentButton === targetButton) {
    return;
  }

  currentButton.classList.toggle(ACTIVE_BUTTON);
  targetButton.classList.toggle(ACTIVE_BUTTON);
  activeFilter = targetButton.getAttribute('id');

  useFilter();
};

const configFilter = (picturesData) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onFilterClick);
  pictures = picturesData;
};

export {configFilter};
