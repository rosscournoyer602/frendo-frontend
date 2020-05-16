import { combineReducers } from 'redux';
import authStatus from './authStatus';
import currentUser from './currentUser';
import userAvatar from './userAvatar';
import friends from './friends';
import searchResults from './searchResults';
import messages from './messages';
import updateStatus from './updateStatus';

const rootReducer = combineReducers({
  authStatus,
  currentUser,
  userAvatar,
  friends,
  searchResults,
  messages,
  updateStatus
});

export default rootReducer;
