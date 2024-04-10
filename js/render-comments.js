const modalBigPicture = document.querySelector('.big-picture');
const socialComments = modalBigPicture.querySelector('.social__comments'); //<ul class="social__comments">
const socialComment = socialComments.querySelector('.social__comment'); //<li class="social__comment">
const socialCommentShowCount = modalBigPicture.querySelector('.social__comment-shown-count'); //<span class="social__comment-shown-count">5</span>
const socialCommentTotalCount = modalBigPicture.querySelector('.social__comment-total-count'); //<span class="social__comment-total-count">125</span>
const commentsLoader = modalBigPicture.querySelector('.comments-loader'); //<button type="button" class="social__comments-loader  comments-loader">Загрузить еще

const COMMENTS_SHOW_STEP = 5;
let currentCount = 0;
let comments = [];

socialComments.innerHTML = '';

const renderNextComments = () => {
  const eliminatedComments = comments.slice(currentCount, currentCount + COMMENTS_SHOW_STEP);
  const visibleCommentsCount = eliminatedComments.length + currentCount;

  eliminatedComments.forEach((comment) => {
    const сommentNode = socialComment.cloneNode(true);
    const authorOfComment = сommentNode.querySelector('.social__picture');

    authorOfComment.src = comment.avatar;
    authorOfComment.alt = comment.name;
    сommentNode.querySelector('.social__text').textContent = comment.message;
    socialComments.append(сommentNode);

    socialCommentShowCount.textContent = visibleCommentsCount;
  });

  socialCommentTotalCount.textContent = comments.length;

  if (visibleCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  currentCount += COMMENTS_SHOW_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};

export {clearComments, renderComments};
