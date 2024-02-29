//Исходные данные
const NAMES = [
  'Елена',
  'Екатерина',
  'Ольга',
  'Дмитрий',
  'Николай',
  'Андрей',
  'Иван',
  'Александр',
  'Анна',
  'Татьяна',
  'Михаил'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Интересная фотография.',
  'На этой фотографии изображено множество деталей.',
  'Мне кажется, фотографию сделал профессионал',
  'На фотографии мы видим весёлых котиков',
  'Перед нами чудесный летний лес, на который хочется смотреть вечно.',
  'Они выглядят счастливыми.',
  'Я считаю, что снимок получился удачным.',
  'Мне понравилась фотография, потому что она передает эмоции и атмосферу.'
];

const MIN_COMMENT = 0;

const MAX_COMMENT = 30;

const MIN_LIKES = 15;

const MAX_LIKES = 200;

//Создание случайных неповторяющихся идентификаторов из указанного диапазона
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//Создание генератора случайных элементов
const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

//Создание комментария
const createComment = () => {
  const getUniqueId = createRandomIdFromRangeGenerator(1, 1000);

  return {
    id: getUniqueId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES),
  };
};

//Получаем на выходе
const post = () => {
  const commentsNumber = getRandomInteger(MIN_COMMENT, MAX_COMMENT);
  const createId = createRandomIdFromRangeGenerator(1, 25)();

  return {
    id: createId,
    url: `photos/${createId}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: commentsNumber}, createComment),
  };
};

post();
