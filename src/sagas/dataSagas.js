/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import apiClient from './apiClient';

function* addPersonSaga(action) {
  try {
    const userToken = window.localStorage.getItem('token');
    const addPersonResult = yield apiClient.data.addPerson(action.payload, userToken);
    console.log(addPersonResult);
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchAddPersonSaga() {
  yield takeEvery(actionTypes.ADD_PERSON, addPersonSaga);
}
