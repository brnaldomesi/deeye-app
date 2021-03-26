import * as types from './types'

import { createAction } from 'redux-actions';

export const getFollowList = createAction(types.GET_FOLLOW_LIST);
export const getFollowListSuccess = createAction(types.GET_FOLLOW_LIST_SUCCESS);
export const getFollowListFail = createAction(types.GET_FOLLOW_LIST_FAIL);
export const setFollow = createAction(types.SET_FOLLOW);
