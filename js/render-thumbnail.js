const template = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');

let photosList;
const getPhotos = () => photosList;

const visualizeThumbnails = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photosList = photos;

  photos.forEach(({id, url, description, likes, comments}) => {
    const photoThumbnails = template.cloneNode(true);

    photoThumbnails.dataset.pictureId = id;
    const image = photoThumbnails.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    photoThumbnails.querySelector('.picture__likes').textContent = likes;
    photoThumbnails.querySelector('.picture__comments').textContent = comments.length;
    photosFragment.appendChild(photoThumbnails);
  });
  containerPictures.appendChild(photosFragment);
};

export {visualizeThumbnails, getPhotos};
