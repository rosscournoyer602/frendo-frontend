import { all } from 'redux-saga/effects';
import { trySignInUserSaga, trySignUpUserSaga } from './authSagas';
import {
  watchAddPersonSaga,
  watchGetPersonSaga,
  watchUpdateAvatarSaga,
  watchSearchUsersSaga
} from './dataSagas';
import { watchGetFriendsSaga } from './relationSagas';

export default function* rootSaga() {
  yield all([
    trySignInUserSaga(),
    trySignUpUserSaga(),
    watchAddPersonSaga(),
    watchGetPersonSaga(),
    watchUpdateAvatarSaga(),
    watchGetFriendsSaga(),
    watchSearchUsersSaga()
  ]);
}
