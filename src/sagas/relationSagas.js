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
    const getFriendResult = yield apiClient.data.friends(config);
    if (getFriendResult.status === 200 && getFriendResult.data.rows[0]) {
      yield put({ type: actionTypes.UPDATE_FRIENDS, payload: getFriendResult.data.rows[0] });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetFriendsSaga() {
  yield takeEvery(actionTypes.GET_FRIENDS, getFriendsSaga);
}
