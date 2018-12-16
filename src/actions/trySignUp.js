import { TRY_SIGNUP } from './actionTypes';

const trySignUp = (email, password, confirmPassword) => ({
  type: TRY_SIGNUP,
  payload: {
    email,
    password,
    confirmPassword
  }
});

export default trySignUp;
