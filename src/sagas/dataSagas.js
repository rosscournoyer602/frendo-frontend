import { takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import apiClient from './apiClient';

function* addPersonSaga(action) {
  try {
    const userToken = window.localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
		const addPersonResult = yield apiClient.data.addPerson(action.payload, config);
    if (addPersonResult && addPersonResult.status === 200) {
      yield put({ type: actionTypes.UPDATE_USER, payload: addPersonResult.data });
      yield put({ type: actionTypes.CHANGE_UPDATE_STATUS, payload: 'success' });
    }
  } catch (error) {
    yield put({ type: actionTypes.CHANGE_UPDATE_STATUS, payload: 'success' });
    alert(error.response.data);
  }
}

function* getPersonSaga(action) {
  const id = action.payload;
  try {
    const userToken = window.localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      params: {
        id
      }
    };
		const getPersonResult = yield apiClient.data.getPerson(config);
    if (getPersonResult.status === 200) {
      yield put({ type: actionTypes.UPDATE_USER, payload: getPersonResult.data });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateAvatarSaga(action) {
  const { user, currentAvatar, data } = action.payload;
  const body = { user, currentAvatar, data }; 
  const userToken = window.localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  };
  try {
    const updateAvatarResult = yield apiClient.data.updateAvatar(body, config);
    if (updateAvatarResult.status && updateAvatarResult.status === 200) {
      yield put({ type: actionTypes.GET_PERSON, payload: user });
      yield put({ type: actionTypes.CHANGE_UPDATE_STATUS, payload: 'success' });
    }
  } catch (error) {
    yield put({ type: actionTypes.CHANGE_UPDATE_STATUS, payload: 'failure' });
  }
}

function* searchUsersSaga(action) {
  const userToken = window.localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    },
    params: {
      q: action.payload
    }
  };
  try {
		const searchUserResult = yield apiClient.data.searchUser(config);
    if (searchUserResult.status === 200) {
      yield put({ type: actionTypes.UPDATE_SEARCH, payload: searchUserResult.data });
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

export function* watchUpdateAvatarSaga() {
  yield takeEvery(actionTypes.UPDATE_AVATAR, updateAvatarSaga);
}

export function* watchSearchUsersSaga() {
  yield takeEvery(actionTypes.SEARCH_USERS, searchUsersSaga);
}
