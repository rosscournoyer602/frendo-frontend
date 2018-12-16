import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

function* trySignUpSaga(action) {
  yield console.log('TrySignUp', action.payload);
}

function* trySignInSaga(action) {
  yield console.log('TrySignIn', action.payload);
}

function* authUserSaga(action) {
  yield console.log('AuthUser', action.payload);
}

function* unauthUserSaga(action) {
  yield console.log('Unauth User', action.payload);
}

export function* trySignUpUserSaga() {
  yield takeEvery(actionTypes.TRY_SIGNUP, trySignUpSaga);
}

export function* trySignInUserSaga() {
  yield takeEvery(actionTypes.TRY_SIGNIN, trySignInSaga);
}

export function* watchAuthUserSaga() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}

export function* watchUnauthUserSaga() {
  yield takeEvery(actionTypes.UNAUTH_USER, unauthUserSaga);
}
