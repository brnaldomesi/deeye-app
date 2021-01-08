import * as types from './types'

import { createAction } from 'redux-actions';

export const getPostsList = createAction(types.GET_POSTS_LIST);
export const getPostsListSuccess = createAction(types.GET_POSTS_LIST_SUCCESS);
export const getPostsListFail = createAction(types.GET_POSTS_LIST_FAIL);
export const createPost = createAction(types.CREATE_POST);
export const createPostSuccess = createAction(types.CREATE_POST_SUCCESS);
export const uploadFile = createAction(types.UPLOAD_FILE);
export const togglePostVisibility = createAction(types.TOGGLE_POST_VISIBILITY);
export const togglePostVisibilitySuccess = createAction(types.TOGGLE_POST_VISIBILITY_SUCCESS);