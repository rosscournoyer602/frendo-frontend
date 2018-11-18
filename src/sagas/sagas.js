import {put, takeEvery, all} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'

function* authUserSaga(action) {
	yield console.log('AuthUser', action.payload);
}

function* unauthUserSaga(action) {
	yield console.log('Unauth User', action.payload);
}

function* watchAuthUserSaga(action) {
	yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}

function* watchUnauthUserSaga() {
	yield takeEvery(actionTypes.UNAUTH_USER, unauthUserSaga);
}

export default function* rootSaga() {
	yield all([
			watchAuthUserSaga(),
			watchUnauthUserSaga()
	]);
}