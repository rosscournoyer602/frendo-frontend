import * as actionTypes from '../actions/actionTypes';
import { takeEvery } from 'redux-saga/effects'

function* authUserSaga(action) {
	yield console.log('AuthUser', action.payload);
}

function* unauthUserSaga(action) {
	yield console.log('Unauth User', action.payload);
}

export function* watchAuthUserSaga(action) {
	yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}

export function* watchUnauthUserSaga() {
	yield takeEvery(actionTypes.UNAUTH_USER, unauthUserSaga);
}
