const modalBigPicture = document.querySelector('.big-picture');
const socialComments = modalBigPicture.querySelector('.social__comments'); //<ul class="social__comments">
const socialComment = socialComments.querySelector('.social__comment'); //<li class="social__comment">
const socialCommentShowCount = modalBigPicture.querySelector('.social__comment-shown-count'); //<span class="social__comment-shown-count">5</span>
const socialCommentTotalCount = modalBigPicture.querySelector('.social__comment-total-count'); //<span class="social__comment-total-count">125</span>
const commentsLoader = modalBigPicture.querySelector('.comments-loader'); //<button type="button" class="social__comments-loader  comments-loader">Загрузить еще

const COMMENTS_SHOW_STEP = 5;

const renderNextComments = (comments, i = 0, callback) => {
  socialComments.innerHTML = '';
  const commentsLength = comments.length;

  const visibleCommentsCount = COMMENTS_SHOW_STEP + (COMMENTS_SHOW_STEP * i);
  const eliminatedComments = comments.slice(0, visibleCommentsCount);

  commentsLoader.removeEventListener('click', callback);

  for (const element of eliminatedComments) {
    const comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;

    socialCommentShowCount.textContent = eliminatedComments.length;

    socialComments.append(comment);
  }

  socialCommentTotalCount.textContent = commentsLength;

  if (commentsLength < COMMENTS_SHOW_STEP || commentsLength <= visibleCommentsCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const buttonClickHandler = () => {
    renderNextComments(comments, i + 1, buttonClickHandler);
  };

  commentsLoader.addEventListener('click', buttonClickHandler);
};

const clearComments = () => {
  socialComments.innerHTML = '';
};

export {clearComments, renderNextComments};
