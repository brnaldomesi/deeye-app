// import { dataSelector, isRequestPending } from '../api'

// export const postsListSelector = dataSelector('postsList', []);

import { createSelector } from 'reselect';
import fp from 'lodash/fp';

export const postsSelector = fp.get('posts')
export const postsListSelector = createSelector(
  postsSelector,
  fp.get('postsList')
);
