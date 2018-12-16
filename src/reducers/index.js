import { combineReducers } from 'redux';
import authStatus from './authStatus';

const rootReducer = combineReducers({
  authStatus
});

export default rootReducer;
