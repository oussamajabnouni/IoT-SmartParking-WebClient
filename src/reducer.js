
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';

import home from './reducers/home';

import settings from './reducers/settings';

export default combineReducers({
  auth,
  common,
  home,
  settings
});
