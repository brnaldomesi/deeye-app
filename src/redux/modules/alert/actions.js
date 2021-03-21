import * as types from './types'

import { createAction } from 'redux-actions';

export const getAlertList = createAction(types.GET_ALERT_LIST);
export const getAlertListSuccess = createAction(types.GET_ALERT_LIST_SUCCESS);
export const getAlertListFail = createAction(types.GET_ALERT_LIST_FAIL);
export const addBadgeCount = createAction(types.ADD_BADGE_COUNT);
export const emptyBadgeCount = createAction(types.EMPTY_BADGE_COUNT);
