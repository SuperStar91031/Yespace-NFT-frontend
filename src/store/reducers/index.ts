import { combineReducers } from 'redux';

import auth from './auth';
import snackbar from './snackbar';

const reducer = combineReducers({
  auth,
  snackbar
});

export default reducer;
