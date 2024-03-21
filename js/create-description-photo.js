import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomElement
} from './utils.js';

import {NAMES, MESSAGES, DESCRIPTIONS} from './data.js';

const MIN_COMMENT = 0;

const MAX_COMMENT = 30;

const MIN_LIKES = 15;

const MAX_LIKES = 200;

//Создание комментария
const commentsNumber = () => getRandomInteger(MIN_COMMENT, MAX_COMMENT);

const createId = createRandomIdFromRangeGenerator(1, 25);
const createPhotoId = createRandomIdFromRangeGenerator(1, 25);

const getUniqueId = createRandomIdFromRangeGenerator(1, 1000);

const createComments = () => ({
  id: getUniqueId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES),
});

const post = () => (
  {
    id: createPhotoId(),
    url: `photos/${createId()}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: commentsNumber()}, createComments),
  }
);

const posts = () => Array.from({length: 25}, post);

export {posts};
