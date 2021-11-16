import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import user from './scenes/authentication/reducer';

export default combineReducers({
  routing: routerReducer,
  form: reduxFormReducer,
  user,
});
