import { combineReducers } from 'redux';
import sharedReducer from './preferencesReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  sharedReducer,
  dataReducer
});

export default rootReducer;
