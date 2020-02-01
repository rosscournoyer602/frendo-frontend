/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import { takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import apiClient from './apiClient';

function* getFriendsSaga(action) {
  const id = action.payload;
  try {
    const userToken = window.localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: userToken
      },
      params: {
        id
      }
    };
    const getFriendResult = yield apiClient.relations.getFriends(config);
    if (getFriendResult.status === 200 && getFriendResult.data) {
      yield put({ type: actionTypes.UPDATE_FRIENDS, payload: getFriendResult.data.rows });
    }
  } catch (error) {
    console.log(error);
  }
}

function* friendActionSaga(action) {
  try {
    const userToken = window.localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: userToken
      }
    };
    const updateFriendResult = yield apiClient.relations.updateFriends(action.payload, config);
    if (updateFriendResult.status === 200 && updateFriendResult.data) {
      yield put({ type: actionTypes.GET_FRIENDS, payload: action.payload.id1 });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getChatSaga(action) {
  try {
    const userToken = window.localStorage.getItem('token');
    const id = action.payload;
    const config = {
      headers: {
        Authorization: userToken
      },
      params: {
        id
      }
    };
    const getChatResult = yield apiClient.relations.getChat(config);
    if (getChatResult.status === 200 && getChatResult.data.rows[0]) {
      yield put({ type: actionTypes.UPDATE_MESSAGES, payload: getChatResult.data.rows[0] });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateChatSaga(action) {
  try {
    const userToken = window.localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: userToken
      }
    };
    yield apiClient.relations.updateChat(action.payload, config);
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetFriendsSaga() {
  yield takeEvery(actionTypes.GET_FRIENDS, getFriendsSaga);
}

export function* watchUpdateFriendsSaga() {
  yield takeEvery(actionTypes.FRIEND_ACTION, friendActionSaga);
}

export function* watchGetChatSaga() {
  yield takeEvery(actionTypes.GET_CHAT, getChatSaga);
}

export function* watchUpdateChatSaga() {
  yield takeEvery(actionTypes.UPDATE_CHAT, updateChatSaga);
}
