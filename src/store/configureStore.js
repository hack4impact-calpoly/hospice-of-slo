import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import vigilReducer from '../reducers/vigilReducer';
import usersReducer from '../reducers/usersReducer';
import userReducer from '../reducers/userReducer';
import discussionsReducer from '../reducers/discussionReducer';
import historyReducer from '../reducers/historyReducer';

const rootReducer = combineReducers({
  vigils: vigilReducer,
  users: usersReducer,
  user: userReducer,
  discussions: discussionsReducer,
  historyShifts: historyReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
