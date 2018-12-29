/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import apiClient from './apiClient';

function* trySignUpSaga(action) {
  try {
    const signUpResult = yield apiClient.auth.signUpUser(action.payload);
    yield put({ type: actionTypes.AUTH_USER });
    localStorage.setItem('token', signUpResult.data.token);
    window.location.href = '/';
  } catch (error) {
    alert(error.response.data);
  }
}

function* trySignInSaga(action) {
  try {
    const signInResult = yield apiClient.auth.signInUser(action.payload);
    yield put({ type: actionTypes.AUTH_USER });
    localStorage.setItem('token', signInResult.data.token);
    window.location.href = '/';
  } catch (error) {
    alert(error.response.data);
  }
}

export function* trySignUpUserSaga() {
  yield takeEvery(actionTypes.TRY_SIGNUP, trySignUpSaga);
}

export function* trySignInUserSaga() {
  yield takeEvery(actionTypes.TRY_SIGNIN, trySignInSaga);
}
