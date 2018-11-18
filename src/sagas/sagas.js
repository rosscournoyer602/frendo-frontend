import {put, takeEvery, all} from 'redux-saga/effects'
import { watchAuthUserSaga, watchUnauthUserSaga } from './authSagas';

export default function* rootSaga() {
	yield all([
			watchAuthUserSaga(),
			watchUnauthUserSaga()
	]);
}