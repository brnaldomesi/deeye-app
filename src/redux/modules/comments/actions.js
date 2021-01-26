import * as types from './types'

import { createAction } from 'redux-actions';

export const getCommentsForComment = createAction(types.GET_COMMENTS_FOR_COMMENT);
export const getCommentsForCommentSuccess = createAction(types.GET_COMMENTS_FOR_COMMENT_SUCCESS);

export const createCommentForComment = createAction(types.CREATE_COMMENT_FOR_COMMENT);
export const createCommentForCommentSuccess = createAction(types.CREATE_COMMENT_FOR_COMMENT_SUCCESS);

export const createCommentForPost = createAction(types.CREATE_COMMENT_FOR_POST);

export const likeComment = createAction(types.LIKE_COMMENT);

export const updateCommentSuccess = createAction(types.UPDATE_COMMENT_SUCCESS);
