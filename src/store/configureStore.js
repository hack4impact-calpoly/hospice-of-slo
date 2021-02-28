import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import vigilReducer from '../reducers/vigilRedcer';
import userReducer from '../reducers/userReducer';

const rootReducer = combineReducers({
  vigils: vigilReducer,
  users: userReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
