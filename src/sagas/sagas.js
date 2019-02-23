import { all } from 'redux-saga/effects';
import { trySignInUserSaga, trySignUpUserSaga } from './authSagas';
import { watchAddPersonSaga, watchGetPersonSaga, watchUpdateAvatarSaga } from './dataSagas';

export default function* rootSaga() {
  yield all([
    trySignInUserSaga(),
    trySignUpUserSaga(),
    watchAddPersonSaga(),
    watchGetPersonSaga(),
    watchUpdateAvatarSaga()
  ]);
}
