import { all } from 'redux-saga/effects';
import { trySignInUserSaga, trySignUpUserSaga } from './authSagas';

export default function* rootSaga() {
  yield all([trySignInUserSaga(), trySignUpUserSaga()]);
}
