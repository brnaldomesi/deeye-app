import * as types from './types'

import { createAction } from 'redux-actions';

export const getPostsList = createAction(types.GET_POSTS_LIST);
export const getPostsListSuccess = createAction(types.GET_POSTS_LIST_SUCCESS);
export const getPostsListMoreSuccess = createAction(types.GET_POSTS_LIST_MORE_SUCCESS);
export const getPostsListFail = createAction(types.GET_POSTS_LIST_FAIL);

export const getPostsListForUnsigned = createAction(types.GET_POSTS_LIST_FOR_UNSIGNED);

export const getPost = createAction(types.GET_POST);

export const createPost = createAction(types.CREATE_POST);
export const createPostSuccess = createAction(types.CREATE_POST_SUCCESS);

export const uploadFile = createAction(types.UPLOAD_FILE);
export const deleteFile = createAction(types.DELETE_FILE);
export const deleteFileSuccess = createAction(types.DELETE_FILE_SUCCESS);

export const hidePost = createAction(types.HIDE_POST);

export const deletePost = createAction(types.DELETE_POST);
export const deletePostSuccess = createAction(types.DELETE_POST_SUCCESS);

export const updatePost = createAction(types.UPDATE_POST);
export const updatePostSuccess = createAction(types.UPDATE_POST_SUCCESS);
export const updateFollowSuccess = createAction(types.UPDATE_FOLLOW_SUCCESS);

export const reportPost = createAction(types.REPORT_POST);
export const savePost = createAction(types.SAVE_POST);
export const likePost = createAction(types.LIKE_POST);

export const sharePost = createAction(types.SHARE_POST);