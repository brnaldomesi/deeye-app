import { createSelector } from 'reselect';
import fp from 'lodash/fp';

export const postsSelector = fp.get('posts')
export const postsListSelector = createSelector(
  postsSelector,
  fp.get('postsList')
);

export const postSelector = id => createSelector(
  postsListSelector,
  postsList => postsList.find(i => i.id === id)
)
