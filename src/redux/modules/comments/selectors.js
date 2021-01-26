import { createSelector } from 'reselect';
import fp from 'lodash/fp';

export const commentsSelector = fp.get('comments')
export const commentsListSelector = createSelector(
  commentsSelector,
  fp.get('commentsList')
);

export const commentsForCommentSelector = id => createSelector(
  commentsListSelector,
  commentsList => commentsList.filter(comment => comment.parent_id === id)
)
