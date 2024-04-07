const MAX_PICTURE_COUNT = 10;

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const SORTFUNCTION = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length
};

const MAX_NUMBER_HASHTAGS = 5; //максимальное количество хештегов
const MAX_NUMBER_SYMBOLS = 20; //максимальная длина хештега

export {
  MAX_PICTURE_COUNT,
  FILTERS,
  SORTFUNCTION,
  MAX_NUMBER_HASHTAGS,
  MAX_NUMBER_SYMBOLS
};
