/* eslint-disable import/named */
import { all } from 'redux-saga/effects';
import { trySignInUserSaga, trySignUpUserSaga } from './authSagas';
import {
  watchAddPersonSaga,
  watchGetPersonSaga,
  watchUpdateAvatarSaga,
  watchSearchUsersSaga
} from './dataSagas';
import {
  watchGetFriendsSaga,
  watchUpdateFriendsSaga,
  watchGetChatSaga,
  watchUpdateChatSaga
} from './relationSagas';

export default function* rootSaga() {
  yield all([
    trySignInUserSaga(),
    trySignUpUserSaga(),
    watchAddPersonSaga(),
    watchGetPersonSaga(),
    watchUpdateAvatarSaga(),
    watchGetFriendsSaga(),
    watchSearchUsersSaga(),
    watchUpdateFriendsSaga(),
    watchGetChatSaga(),
    watchUpdateChatSaga()
  ]);
}
