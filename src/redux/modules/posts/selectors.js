import { createSelector } from 'reselect'
import fp from 'lodash/fp'
import { isRequestPending } from '../api'

export const postsSelector = fp.get('posts')

export const postsListSelector = createSelector(
  postsSelector,
  fp.get('postsList')
);
