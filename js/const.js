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

export {MAX_PICTURE_COUNT, FILTERS, SORTFUNCTION};
