import { createSelector } from 'reselect';
import fp from 'lodash/fp';

export const alertsSelector = fp.get('alert')
export const alertsListSelector = createSelector(
  alertsSelector,
  fp.get('alertList')
);

export const badgeCountSelector = createSelector(
  alertsSelector,
  fp.get('badgeCount')
);