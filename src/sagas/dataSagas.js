/* eslint-disable require-yield */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import apiClient from './apiClient';

function* addPersonSaga(action) {
  try {
    const userToken = window.localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: userToken
      }
    };
    const addPersonResult = yield apiClient.data.addPerson(action.payload, config);
    if (addPersonResult && addPersonResult.status === 200) {
      yield put({ type: actionTypes.UPDATE_USER, payload: action.payload });
    }
  } catch (error) {
    alert(error.response.data);
  }
}

function* getPersonSaga(action) {
  const { email } = action.payload;
  try {
    const userToken = window.localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: userToken
      },
      params: {
        email
      }
    };
    const getPersonResult = yield apiClient.data.getPerson(config);
    if (getPersonResult.status === 200 && getPersonResult.data.rows[0]) {
      yield put({ type: actionTypes.UPDATE_USER, payload: getPersonResult.data.rows[0] });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddPersonSaga() {
  yield takeEvery(actionTypes.ADD_PERSON, addPersonSaga);
}

export function* watchGetPersonSaga() {
  yield takeEvery(actionTypes.GET_PERSON, getPersonSaga);
}
