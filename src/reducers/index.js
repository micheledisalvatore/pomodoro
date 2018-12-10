import { combineReducers } from 'redux';

import counter from './counter';
import session from './session';

const appReducer = combineReducers({
  counter,
  session,
});

export default appReducer;
