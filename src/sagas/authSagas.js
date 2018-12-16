import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

function* authUserSaga(action) {
  yield console.log('AuthUser', action.payload);
}

function* unauthUserSaga(action) {
  yield console.log('Unauth User', action.payload);
}

export function* watchAuthUserSaga() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}

export function* watchUnauthUserSaga() {
  yield takeEvery(actionTypes.UNAUTH_USER, unauthUserSaga);
}
