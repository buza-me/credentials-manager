import { combineReducers } from 'redux';
import preferencesReducer from './preferencesReducer';
import commonReducer from './commonReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  preferencesReducer,
  commonReducer,
  dataReducer
});

export default rootReducer;
