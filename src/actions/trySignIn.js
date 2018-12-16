import { TRY_SIGNIN } from './actionTypes';

const trySignIn = (email, password) => ({
  type: TRY_SIGNIN,
  payload: {
    email,
    password
  }
});

export default trySignIn;
