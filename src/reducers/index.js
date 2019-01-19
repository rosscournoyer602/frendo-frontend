import { combineReducers } from 'redux';
import authStatus from './authStatus';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  authStatus,
  currentUser
});

export default rootReducer;
