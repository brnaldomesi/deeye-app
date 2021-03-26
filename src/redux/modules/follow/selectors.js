import { createSelector } from 'reselect';
import fp from 'lodash/fp';

export const followsSelector = fp.get('follow');
export const followListSelector = createSelector(
  followsSelector,
  fp.get('followList')
);
