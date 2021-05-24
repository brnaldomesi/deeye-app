import * as types from './types'

import { createAction } from 'redux-actions';

export const getUserPostsList = createAction(types.GET_USER_POSTS_LIST);
export const getUserInfoCounter = createAction(types.GET_USER_INFO_COUNTER);
export const setUserSupport = createAction(types.SET_USER_SUPPORT);
export const setUserNotification = createAction(types.SET_USER_NOTIFICATION);
export const setUserInfoUpdate = createAction(types.SET_USER_INFO_UPDATE);
