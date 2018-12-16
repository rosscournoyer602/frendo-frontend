import { all } from 'redux-saga/effects';
import {
  watchAuthUserSaga,
  watchUnauthUserSaga,
  trySignInUserSaga,
  trySignUpUserSaga
} from './authSagas';

export default function* rootSaga() {
  yield all([watchAuthUserSaga(), watchUnauthUserSaga(), trySignInUserSaga(), trySignUpUserSaga()]);
}
