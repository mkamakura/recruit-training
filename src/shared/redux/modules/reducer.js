import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reduxAsyncLoader } from 'redux-async-loader';
import counter from './counter';

export default combineReducers({
  counter,
  routing: routerReducer,
  reduxAsyncLoader,
});
